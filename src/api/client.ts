import { AxiosError, create } from 'axios';

export const apiClient = create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message = error.code === 'ECONNABORTED'
      ? 'La tienda está tardando demasiado en responder.'
      : error.response
        ? 'No pudimos cargar la información de la tienda.'
        : 'Comprueba tu conexión a internet.';
    return Promise.reject(new Error(message));
  },
);
