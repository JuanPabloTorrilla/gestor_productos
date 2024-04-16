import { createContext, useState, useContext, useEffect } from "react";

export const ProductContext = createContext();

export const useProduct = () => {
    const context = useContext(ProductContext);
    if(!context) {
        throw new Error('useProduct must be used within an ProductProvider');
    }
    return context;
}

export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [carritoAbierto, setCarritoAbierto] = useState(false);

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
        <ProductContext.Provider value={{ product, asignar, modalAbierto, abrirModal, cerrarModal, carritoAbierto, abrirCarrito, cerrarCarrito}}>
            {children}
        </ProductContext.Provider>
    );
}