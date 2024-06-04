import { ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
}

export interface ProductContextProps {
  products: Product[];
}

export interface ProductProviderProps {
  children: ReactNode;
}

declare const ProductProvider: React.FC<ProductProviderProps>;

export const useProduct: () => ProductContextProps;