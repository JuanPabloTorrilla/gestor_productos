import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { useState } from 'react';
import React from 'react';
import {AgregarProductoModal} from './AgregarProductoModal'
import { useProduct } from '../context/productContext';


export const Detail = ()=>{

    const { product, modalAbierto, cerrarModal, abrirModal } = useProduct()
    

    return(
        <Card sx={{ maxWidth: 345 }}>
            {product &&(<div>
            <CardMedia           
                sx={{ height: 100, objectFit: 'contain' }}
                image="src/assets/react.svg"
                title="react"
                background-size="contain"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                 Producto: {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                 Descripción: {product.description}
                </Typography>
            </CardContent>
            <CardActions>
                <AgregarProductoModal open= {modalAbierto} onClose={()=>{cerrarModal()}}/>
                <Button onClick={()=>abrirModal()} size="small">Agregar al carrito</Button>
            </CardActions>
            </div>)}
        </Card>
    )
}
