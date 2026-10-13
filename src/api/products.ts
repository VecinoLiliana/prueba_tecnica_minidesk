import { apiClient } from './client';
import type { Product } from '../types/product';

const isProduct = (value: unknown): value is Product => {
  if (!value || typeof value !== 'object') return false;
  const product = value as Partial<Product>;
  return typeof product.id === 'number' && typeof product.title === 'string' &&
    typeof product.price === 'number' && typeof product.description === 'string' &&
    typeof product.category === 'string' && typeof product.image === 'string' &&
    typeof product.rating?.rate === 'number' && typeof product.rating?.count === 'number';
};

export const getProducts = async () => {
  const { data } = await apiClient.get<unknown>('/products');
  if (!Array.isArray(data) || !data.every(isProduct)) throw new Error('La tienda devolvió datos no válidos.');
  return data;
};

export const getProduct = async (id: number) => {
  const { data } = await apiClient.get<unknown>(`/products/${id}`);
  if (!isProduct(data)) throw new Error('Producto no encontrado.');
  return data;
};
