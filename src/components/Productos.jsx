import { useState } from 'react'
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import {Detail} from './Detail'
import { useProduct } from '../context/productContext';


export function Productos () {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([{id:11, name: 'Producto 1', description: 'Descripción del producto marca x con características x', price: 100},
    {id:1, name: 'Producto 1', description: 'Descripción del producto marca x con características x', price: 100},
    {id:2, name: 'Producto 2', description: 'Descripción del producto marca x con características x', price: 100},
    {id:3, name: 'Producto 3', description: 'Descripción del producto marca x con características x', price: 100},
    {id:4, name: 'Producto 4', description: 'Descripción del producto marca x con características x', price: 100},
    {id:5, name: 'Producto 5', description: 'Descripción del producto marca x con características x', price: 100},
    {id:6, name: 'Producto 6', description: 'Descripción del producto marca x con características x', price: 100},
    {id:7, name: 'Producto 7', description: 'Descripción del producto marca x con características x', price: 100},
    {id:8, name: 'Producto 8', description: 'Descripción del producto marca x con características x', price: 100},
    {id:9, name: 'Producto 9', description: 'Descripción del producto marca x con características x', price: 100},
    {id:10, name: 'Producto 10', description: 'Descripción del producto marca x con características x', price: 100}]); // Aquí deberías tener tu lista de productos

    const { product, asignar } = useProduct()
    // Función para seleccionar filas
    

    
    // Función para filtrar productos por término de búsqueda
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    return(
        <Box sx={{ alignItems:'flex-start',}}>
            <TextField
                label="Buscar producto"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                style={{ marginBottom: '20px' }}
            />
            <TableContainer component={Paper} sx={{height:350, width:550}}>
                <Table stickyHeader aria-label="sticky table" size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Precio</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow key={product.id} onClick={()=>asignar(product)} hover style={{ cursor: 'pointer' }}>
                                <TableCell sx={{paddingBottom:0, paddingTop:0}}>{product.id}</TableCell>
                                <TableCell sx={{paddingBottom:0, paddingTop:0}}>{product.name}</TableCell>
                                <TableCell sx={{paddingBottom:0, paddingTop:0}}>{product.description}</TableCell>
                                <TableCell sx={{paddingBottom:0, paddingTop:0}}>{product.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}