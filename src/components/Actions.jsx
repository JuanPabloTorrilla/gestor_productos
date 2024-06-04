import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ShoppingCartCheckout, ShoppingCart } from '@mui/icons-material';
import {carrito} from './Carrito';
import {CarritoModal} from './CarritoModal';
import { useProduct } from '../context/productContext';
import { pedidos } from './Pedidos';

export function Actions(){
  const {carritoAbierto, abrirCarrito, cerrarCarrito} = useProduct()
    return(
        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
          <ListItem sx={{justifyContent:'space-evenly'}}>
            <CarritoModal open= {carritoAbierto} onClose={()=>cerrarCarrito()}/>
            <ShoppingCart onClick={()=> abrirCarrito()}/>
            <ShoppingCartCheckout onClick={()=> {console.log(sessionStorage.getItem('pedido'))}}/>
            <ShoppingCart onClick={()=> carrito.vaciarCarrito()}/>
            <ShoppingCart onClick={()=> pedidos.verPedidos()}/>
          </ListItem>
        </List>
    )
}