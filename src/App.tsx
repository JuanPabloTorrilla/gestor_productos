import { useState } from 'react'
import './App.css'
import { Modal, ButtonGroup, ClickAwayListener,TextField, Box, Container, Toolbar, Typography, AppBar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Card, CardActions, CardContent, CardMedia, Button} from '@mui/material'
import { ShoppingCartCheckout, ShoppingCart } from '@mui/icons-material';
import {carrito} from './components/Carrito'
import {Header} from './components/Header'
import {Productos} from './components/Productos'
import { ProductProvider } from './context/ProductContext.jsx'
import { CarritoModal } from './components/CarritoModal'
import { Detail } from './components/Detail'
import { Actions } from './components/Actions'

function App() {
// Funciones de la App
  return (
    <ProductProvider>
      <div id="titlebar">
        <div id="titlebar-center">
            <span>Gestión de Productos</span>
        </div>
        <div id="titlebar-btn">
          <div id="titlebar-left">
              <button id="minimize-btn">-</button>
          </div>
          <div id="titlebar-right">
              <button id="close-btn">x</button>
          </div>
        </div>
      </div>
      <Header />
      <Container sx= {{ display:'flex', position:'fixed', top: 180, left: 0, alignItems:'flex-start', justifyContent:'space-between'}}>
        <Productos />
        <Container>
      <List sx= {{display:'flex', flexDirection:'column'}}>
          <ListItem >
            <Actions />
          </ListItem>
        </List>
        <Detail />
      </Container>
      </Container>
      <Box sx={{position:'absolute',background:'#1976d2',bottom:0, width: '100%', color:'white', textAlign:'center'}}>
            <p>Este software ha sido desarrollado por asdad. Para solicitar soluciones informáticas contáctese con asdas@asdasd.com</p>
      </Box>
    </ProductProvider>
  );
}

export default App