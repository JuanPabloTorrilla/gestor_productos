import React from "react";
import { useState } from "react";
import {Button, TextField, ButtonGroup, Box, Modal, ClickAwayListener} from '@mui/material';
import {Detail} from './Detail'
import { useProduct } from "../context/productContext";
import { carrito } from "./Carrito";


export const AgregarProductoModal = ({open, onClose})=> {
    const {product} = useProduct()
    const [cantidad, setCantidad] = useState(1)
    const aumentar = () => {
        setCantidad(cantidad + 1)
    }
    const disminuir = () => {
        setCantidad(cantidad - 1)
    }
    const handleClose = () => {
        setCantidad(1)
        onClose();
    };
    const agregarBtn = () => {
        for (let i = 0; i < cantidad; i++) {
            carrito.agregarProducto(product)
        }
        setCantidad(1)
        onClose()
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="carrito-modal-title"
            aria-describedby="carrito-modal-description"
        >   
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, minWidth: 300 }}>
                <ClickAwayListener onClickAway={handleClose}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <ButtonGroup size="small" aria-label="small outlined button group" sx={{justifyContent: "space-between"}}>
                            <Button onClick={disminuir}>-</Button>
                            <TextField value={cantidad} style={{width: 100}} inputStyle={{ textAlign: 'center' }} onChange={e => setCantidad(e.target.value)}
                             > </TextField>
                            <Button onClick={aumentar}>+</Button>
                        </ButtonGroup>
                        <div >
                            <Button onClick={agregarBtn} variant="contained" style={{ margin: '10px' }} sx={{ mt: 2 }}>Agregar</Button>
                            <Button onClick={handleClose} variant="contained" style={{ margin: '10px' }} sx={{ mt: 2 }}>Cerrar</Button>
                        </div>
                        
                    </div>
                </ClickAwayListener>
            </Box>
        </Modal> 
    );
  }