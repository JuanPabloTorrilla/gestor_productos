import { ReactElement } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ProductosProps {
  products: Product[];
}

export declare const Productos: React.FC<ProductosProps>;

// export default Productos;