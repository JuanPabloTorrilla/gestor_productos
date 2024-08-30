import path from 'node:path';
import express from 'express'
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import {router} from './routes/index';
import {product} from './routes/product';
import {customer} from './routes/customer';
import {pedidos} from './routes/pedidos';
import './eventController'

export const appExpress = express()

//Settings
appExpress.set('port', process.env.PORT || 3002);
appExpress.use(cors({
    origin: 'http://localhost:5174',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

//Middlewares
appExpress.use(express.json())
appExpress.use(bodyParser.json());
appExpress.use(morgan('dev'));
appExpress.use((error: any, _req: any, res: any, _next: any) => {
  console.error('Error no manejado:', error);
  res.status(500).send('Error interno del servidor');
});

//Routes
appExpress.use(router);
appExpress.use('/api/products', product);
appExpress.use('/api/customers', customer);
appExpress.use('/api/pedidos', pedidos);


//Services

//Public
appExpress.use(express.static(path.join(__dirname, '../public')));
