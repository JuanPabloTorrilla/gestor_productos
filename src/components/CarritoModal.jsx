import {carrito} from './Carrito';
import { Modal, Button, Typography, List, Box, ListItem, ListItemText, ClickAwayListener } from '@mui/material';
import { pedidos } from './Pedidos'
import { useProduct } from '../context/productContext';

export const CarritoModal = ({ open, onClose }) => {
    const { cerrarCarrito } = useProduct();
    const guardarPedidos = () => {
        pedidos.guardarPedidos();
        cerrarCarrito();
    }
    const productos = carrito.productosPedido();
    console.log(productos)
    const handleClose = () => {
        onClose();
    };
    
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="carrito-modal-title"
            aria-describedby="carrito-modal-description"
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, minWidth: 300, width: 500, maxHeight: 500 }}>
                <ClickAwayListener onClickAway={handleClose}>
                    <div>
                        <Typography id="carrito-modal-title" variant="h5" component="h2" gutterBottom>
                            Carrito de Compras
                        </Typography>
                        <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                            {carrito.productos.length > 0 ? (
                                <List>
                                    {productos.map((producto, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={`Producto: id-${producto.id}-${producto.name}`} secondary={`cantidad: ${producto.cantidad}`} />
                                            <ListItemText secondary={`Total: ${producto.total}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Typography variant="body1" component="p">
                                    El carrito está vacío.
                                </Typography>
                            )}
                        </Box>
                        {carrito.productos.length > 0 ? (
                            <Typography variant="body1" component="p">
                                Total: {carrito.sumarTotal()}
                            </Typography>
                        ) : null}
                        <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>Cerrar</Button>
                        {carrito.productos.length > 0 ?(
                        <Button onClick={guardarPedidos}variant='contained' sx={{ mt: 2, ml:2 }}>Realizar pedido</Button>):(null)}
                    </div>
                </ClickAwayListener>
            </Box>
        </Modal>
    );
}