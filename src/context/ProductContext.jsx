import { createContext, useState, useContext, useEffect } from "react";
import axios from 'axios';
import { useSSE } from '../context/SseContext';

export const ProductContext = createContext();

export const useProduct = () => {
    const context = useContext(ProductContext);
    if(!context) {
        throw new Error('useProduct must be used within an ProductProvider');
    }
    return context;
}

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [carritoAbierto, setCarritoAbierto] = useState(false);
    const { updateEvents, deleteEvents } = useSSE();

    const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:3002/api/products');
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }
    
      useEffect(() => {
        fetchProducts();
      }, []);

      useEffect(() => {
        fetchProducts();
      }, [updateEvents]);

      useEffect(() => {
        fetchProducts();
      }, [deleteEvents]);

  // Función para abrir el modal del carrito
  const abrirCarrito = () => {
    console.log(carritoAbierto)
    setCarritoAbierto(true);
    };

    // Función para cerrar el modal del carrito
  const cerrarCarrito = () => {
    setCarritoAbierto(false);
  };
    // Función para abrir el modal del carrito
    const abrirModal = () => {
        setModalAbierto(true);
        };

        // Función para cerrar el modal del carrito
    const cerrarModal = () => {
        setModalAbierto(false);
    };

    const asignar = (producto) => {
        setProduct(producto)
        console.log(producto)
    }

    return (
        <ProductContext.Provider value={{ products,product, asignar, modalAbierto, abrirModal, cerrarModal, carritoAbierto, abrirCarrito, cerrarCarrito}}>
            {children}
        </ProductContext.Provider>
    );
}