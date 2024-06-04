import './App.css'
import {  Box, Container, List, ListItem,} from '@mui/material'
import {Header} from './components/Header'
import {Productos} from './components/Productos'
import { ProductProvider } from './context/ProductContext'
import { Detail } from './components/Detail'
import { Actions } from './components/Actions'

function App() {
// Funciones de la App
  return (
    <ProductProvider>
      <div id="titlebar">
        <div id="titlebar-center">
            <span id="titlebar-text">Gestión de Productos</span>
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
      <Header children = ""/>
      <Container sx= {{ display:'flex', position:'fixed', top: 180, left: 0, alignItems:'flex-start', justifyContent:'space-between'}}>
        <Productos products={[]} />
        <Container>
          <List>
              <ListItem>
                <Actions productId=''/>
              </ListItem>
          </List>
          <Detail productId=''/>
        </Container>
      </Container>
      <Box sx={{position:'absolute',background:'#1976d2',bottom:0, width: '100%', color:'white', textAlign:'center'}}>
            <p>Este software ha sido desarrollado por asdad. Para solicitar soluciones informáticas contáctese con asdas@asdasd.com</p>
      </Box>
    </ProductProvider>
  );
}

export default App