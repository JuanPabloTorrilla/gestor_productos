import { useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box} from '@mui/material';
import { useProduct } from '../context/productContext';


export function Productos () {
    const [searchTerm, setSearchTerm] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const { product, asignar, products } = useProduct()
    
    // Función para filtrar productos por término de búsqueda
    const filteredProductsMarca = products.filter(product =>
        product.brand.toLowerCase().includes(brandFilter.toLowerCase())
        );

    const filteredProductsNombre = filteredProductsMarca.filter(product =>
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
            <FormControl>
                <InputLabel id="demo-simple-select-label">Filtrar por marca</InputLabel>
                <Select
                    label="filter by brand"
                    id="demo-simple-select"
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(e.target.value)}
                    sx={{width: 200}}
                    defaultValue=''
                >
                    <MenuItem value=''>Todos</MenuItem>
                    {products.map(product => <MenuItem key={product.id_product} value={product.brand}>{product.brand}</MenuItem>)}
                </Select>
            </FormControl>
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
                        {filteredProductsNombre.map((product) => (
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