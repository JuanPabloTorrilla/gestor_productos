import { useState } from "react";
import { Modal, Button, Typography, List, Box } from '@mui/material';
import { useProduct } from "../context/productContext";

class Carrito {
    constructor() {
        this.productos = JSON.parse(sessionStorage.getItem('carrito')) || [];
        this.total = 0;
    }

    guardarCarrito() {
        // Guardar productos del carrito en el sessionStorage
        sessionStorage.setItem('carrito', JSON.stringify(this.productos));
    }

    agregarProducto(producto) {
        // Agregar un producto al carrito
        if(producto.name != ''){
            this.productos.push(producto);
            this.guardarCarrito();
            console.log('se agregó el producto',producto)
            }
    }

    vaciarCarrito() {
        this.productos = [];
        this.total = 0;
        this.guardarCarrito();
    }

    productosPedido(){    
        const productosAgrupados = {};
        this.productos.forEach(producto => {
            if (productosAgrupados[producto.id]) {
                productosAgrupados[producto.id].cantidad++;
                productosAgrupados[producto.id].total += producto.price;
            } else {
                productosAgrupados[producto.id] = { ...producto, cantidad: 1, total: producto.price };
            }
        });
        return Object.values(productosAgrupados)
    }

    sumarTotal() {
        this.total = 0
        this.productos.forEach(producto => {
            this.total += producto.price
        });
        return this.total
    }
}

export const carrito = new Carrito()
