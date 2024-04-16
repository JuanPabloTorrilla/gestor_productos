import {carrito} from './Carrito';


// Crear un objeto Date a partir de la fecha actual en milisegundos
const fecha = new Date(Date.now());

// Obtener el día, mes y año
const dia = fecha.getDate().toString().padStart(2, '0'); // Obtener el día y asegurarse de que tenga dos dígitos
const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Obtener el mes (se suma 1 porque los meses van de 0 a 11) y asegurarse de que tenga dos dígitos
const año = fecha.getFullYear();

// Formatear la fecha en formato dd/mm/yyyy
const fechaFormateada = `${dia}/${mes}/${año}`;

const cliente = {
    name: 'pablo',
    email: 'pablo@algo',
    phone: '123456',
    address: 'calle falsa 123'
}

class Pedido {
    constructor() {
        this.pedido = {
            cliente: cliente,
            productos: carrito.productosPedido(),
            total: 0,
            fecha: fechaFormateada
        }
        this.listaPedidos = JSON.parse(sessionStorage.getItem('pedidos')) || [];
    }

    guardarPedidos () {
        carrito.productosPedido().forEach(producto => {
            this.pedido.total += producto.total
        })
        this.listaPedidos.push(this.pedido);
        sessionStorage.setItem('pedidos', JSON.stringify(this.listaPedidos));
        sessionStorage.setItem('pedido', JSON.stringify(this.pedido));
        carrito.vaciarCarrito();
    }

    verPedidos() {
        this.listaPedidos.forEach(pedido => console.log(pedido));
    }
}

export const pedidos = new Pedido()