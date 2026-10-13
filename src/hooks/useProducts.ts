import { useQuery } from '@tanstack/react-query';
import { getProduct, getProducts } from '../api/products';

export const productKeys = {
  all: ['products'] as const,
  detail: (id: number) => ['products', id] as const,
};

export const useProducts = () => useQuery({ queryKey: productKeys.all, queryFn: getProducts });

export const useProductDetail = (id: number | null) => useQuery({
  queryKey: productKeys.detail(id ?? 0),
  queryFn: () => getProduct(id as number),
  enabled: id !== null,
});
