import { useState } from 'react'
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box} from '@mui/material';
import { useProduct } from '../context/productContext';


export function Productos () {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([{id:11, name: 'WEGA', description: 'Descripción del producto marca x con características x', price: 100},
    {id:1, name: 'WEGA', description: 'Descripción del producto marca x con características x', price: 100},
    {id:2, name: 'MANNOL', description: 'Descripción del producto marca x con características x', price: 100},
    {id:3, name: 'EXTRIMA', description: 'Descripción del producto marca x con características x', price: 100},
    {id:4, name: 'WEGA', description: 'Descripción del producto marca x con características x', price: 100},
    {id:5, name: 'ELAION', description: 'Descripción del producto marca x con características x', price: 100},
    {id:6, name: 'EXTRIMA', description: 'Descripción del producto marca x con características x', price: 100},
    {id:7, name: 'EXTRIMA', description: 'Descripción del producto marca x con características x', price: 100},
    {id:8, name: 'MANNOL', description: 'Descripción del producto marca x con características x', price: 100},
    {id:9, name: 'MANNOL', description: 'Descripción del producto marca x con características x', price: 100},
    {id:10, name: 'EXTRIMA', description: 'Descripción del producto marca x con características x', price: 100}]); // Aquí deberías tener tu lista de productos

    const { product, asignar } = useProduct()
    // Función para seleccionar filas
    

    
    // Función para filtrar productos por término de búsqueda
    const filteredProductsMarca = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const filteredProductsNombre = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
    return(
        <Box sx={{ alignItems:'flex-start',}}>
            <TextField
                label="Buscar producto por marca"
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
                            <TableCell>Marca</TableCell>
                            <TableCell>Producto</TableCell>
                            <TableCell>Precio</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow key={product.id} onClick={()=>asignar(product)} hover  style={{ cursor: 'pointer' }}>
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