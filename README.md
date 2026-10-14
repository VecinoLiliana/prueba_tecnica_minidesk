# MiniDesk Store — ÉLAN

Aplicación móvil de tienda construida con Expo, React Native y TypeScript. Consume Fake Store API e implementa el flujo completo de catálogo, detalle, carrito sincronizado, checkout simulado y confirmación.

## Instalación y ejecución

### Requisitos

- Node.js 20 o superior
- npm
- Expo Go compatible con Expo SDK 57, simulador o build de desarrollo

```bash
npm install
npx expo start
```

Desde Expo CLI se puede abrir la app en Expo Go mediante el código QR. También están disponibles `npm run ios`, `npm run android` y `npm run web`.

## Versiones utilizadas

- Node.js 26.3.1
- Expo SDK 57
- React Native 0.86
- React 19
- TypeScript 6 en modo estricto

## Estructura y organización

- `src/app`: rutas de Expo Router y composición de pantallas. La navegación queda visible en el árbol de archivos.
- `src/api`: cliente HTTP, endpoints y validación de respuestas. Aísla la fuente externa de la UI.
- `src/components`: piezas visuales reutilizables agrupadas por dominio (`cart`, `product`, `ui`).
- `src/hooks`: adaptadores entre componentes, estado global y estado remoto.
- `src/store`: estado global de carrito y checkout, separado del estado remoto.
- `src/types`: contratos TypeScript compartidos del dominio.
- `src/utils`: transformaciones de presentación sin estado.
- `src/constants`: tokens visuales para mantener consistencia.

La organización separa navegación, dominio, datos y presentación. Esto evita que las pantallas conozcan detalles de Axios o de la implementación interna del store y permite escalar cada área de forma independiente.

## Decisiones técnicas

### 1. Manejo de estado global

**Elección: Zustand.** El carrito necesita escrituras frecuentes desde tres pantallas y lecturas granulares por producto. Zustand resuelve este caso con una API pequeña, tipada y sin actions, reducers ni providers adicionales. Frente a Redux, reduce boilerplate sin perder un flujo de actualización predecible.

**Cuándo elegiría Redux:** en una aplicación enterprise con muchos equipos, dominios y eventos transversales; cuando fueran necesarios middleware complejos, trazabilidad estricta de acciones, Redux DevTools como parte central del debugging o convenciones organizativas más rígidas.

**Qué vive en estado global:** artículos, cantidades y acciones del carrito; además, el resumen del checkout completado necesario para renderizar la confirmación. Son datos compartidos entre rutas.

**Qué no vive en estado global:** catálogo y detalles pertenecen al estado remoto de TanStack Query; búsqueda, categoría, formulario, loading y errores locales pertenecen a sus pantallas. No duplicarlos evita inconsistencias y actualizaciones globales innecesarias.

**Rendimiento:** `useProductQuantity(id)` suscribe cada control únicamente a la cantidad de su producto y `useCartBadge()` únicamente al total de unidades. Las acciones también se seleccionan por separado. Los componentes de producto usan `memo`, las listas usan claves estables y los totales se derivan del carrito en vez de mantener copias sincronizadas.

### 2. Navegación y rutas dinámicas

**Elección: Expo Router.** Se integra con Expo, ofrece deep links y convierte el árbol de archivos en rutas reconocibles y tipadas, reduciendo configuración manual frente al enfoque legacy de React Navigation.

```text
src/app/index.tsx             /
src/app/products/index.tsx    /products
src/app/products/[id].tsx     /products/:id
src/app/cart.tsx              /cart
src/app/checkout.tsx          /checkout
src/app/success.tsx           /success
```

El detalle obtiene `id` mediante `useLocalSearchParams`, normaliza posibles arreglos, exige un entero positivo y habilita la consulta solamente si es válido. Como el detalle consulta `/products/:id`, funciona mediante acceso directo sin depender del listado.

El stack sigue bienvenida → catálogo → detalle/carrito → checkout → confirmación. Al pagar se usa `router.replace('/success')`, se elimina checkout del historial inmediato y se vacía el carrito. Si se intenta abrir checkout vacío, no se puede procesar y se ofrece volver al catálogo. La confirmación sin una orden válida redirige a productos.

### 3. Cache del lado del cliente

TanStack Query administra la lista y cada detalle con claves estables. La configuración global usa:

- `staleTime: 5 minutos`: evita repetir consultas mientras el catálogo sigue siendo razonablemente fresco.
- `gcTime: 10 minutos`: conserva datos inactivos para regresar rápidamente sin mantenerlos indefinidamente.
- `retry: 3`: tolera fallos intermitentes de la API pública.
- `refetchOnWindowFocus: true`: revalida al recuperar el foco.

Se cachean lista y detalle porque son datos remotos reutilizables. No se cachean con React Query el carrito ni checkout porque son estado cliente/transaccional. Si una revalidación falla, TanStack Query puede conservar los datos previamente cacheados; en una carga sin datos se presenta error y acción de reintento.

### 4. Custom hooks

- `useProducts()`: define la consulta y clave de cache del catálogo.
- `useProductDetail(id)`: consulta un producto y evita requests cuando el ID no es válido.
- `useCart()`: reúne acciones compartidas y deriva cantidad total e importe sin almacenar valores duplicados.
- `useCartBadge()`: suscripción específica para el indicador persistente.
- `useProductQuantity(id)`: suscripción granular que sincroniza solo el control del producto afectado.

Los hooks encapsulan coordinación real entre datos y UI; no son alias visuales ni abstracciones decorativas.

### 5. Capa de datos y peticiones

**Elección: Axios.** Permite centralizar `baseURL`, timeout e interceptores y mantiene los endpoints fuera de las pantallas. `api/client.ts` configura un timeout de 10 segundos y traduce errores de red, timeout y HTTP a mensajes comprensibles. `api/products.ts` contiene las operaciones de catálogo y detalle.

Las respuestas externas se reciben como `unknown` y se validan antes de exponerlas como `Product`, evitando confiar ciegamente en la API. TanStack Query añade reintentos, cache y estados de carga/error; la UI ofrece feedback y reintento manual.

### 6. Calidad general

TypeScript está configurado en modo `strict`. La UI reutiliza componentes y tokens, contempla safe navigation, estados vacío/loading/error, diseño adaptable y etiquetas de accesibilidad en acciones principales. La separación por responsabilidades mantiene la lógica de negocio fuera de los componentes visuales.

## Funcionalidad implementada

- Bienvenida opcional y acceso al catálogo.
- Catálogo remoto con loading, error, éxito, búsqueda, categorías y pull-to-refresh.
- Ruta dinámica directa con imagen, título, precio, descripción, categoría y rating.
- Controles `+` y `−` sincronizados en listado, detalle y carrito; nunca bajan de cero.
- Indicador del carrito persistente y actualizado en tiempo real.
- Carrito con precio unitario, cantidad, subtotal, total, eliminación, vacío y checkout.
- Checkout mock validado con estado de procesamiento.
- Confirmación de pago, limpieza del carrito y protección frente a checkout procesado.

## Fuera de alcance y mejoras futuras

No incluye autenticación, backend propio, base de datos, persistencia en servidor ni cobros reales, tal como pide el alcance. El formulario no debe recibir datos bancarios reales.

Con más tiempo añadiría persistencia local opcional del carrito, cache persistente offline, pruebas unitarias y seguimiento de paquetes, pedidos con historial, skeletons animados, haptics, internacionalización del lenguaje, área de reseñas de cada producto, observabilidad y automatización de capturas para cada plataforma.

## Evidencia visual

El video del mockup muestra la navegación y las principales funcionalidades de la aplicación móvil de una tienda de ropa, incluyendo las acciones disponibles para el usuario.

https://github.com/user-attachments/assets/335a2e48-b04e-4ab3-bcc9-d23e507d518c


## Verificación

```bash
npm run lint
npx tsc --noEmit
npx expo-doctor
npx expo export --platform web
```
