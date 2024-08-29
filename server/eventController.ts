
import EventSource from 'eventsource';
const es = new EventSource('http://localhost:3000/events');
const axios = require('axios');
import db from '../database';
import { fetchProducts } from './routes/product';


es.onmessage = (event: any) => {
    console.log('Evento recibido:', event.data);
    const message = JSON.parse(event.data);
    console.log(message.type);
    // Procesar el evento
    if (message.type === 'addProduct') {
        axios.get('http://localhost:3000/api/products')
            .then(async (response: any) => {
                const products = response.data;
                const oldProducts = await fetchProducts();
                const newProducts = products.filter((product: any) => !oldProducts.some((oldProduct: any) => oldProduct.id_product === product.id_product));
                if (newProducts.length > 0) {
                    const placeholders = newProducts.map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').join(', ');
                    const sql = `INSERT INTO products (code, name, brand, category, stock, discount,cost, sale_mayor, sale_menor, updated_at) VALUES ${placeholders}`;

                    // Aplanar los datos para que coincidan con los placeholders en la consulta SQL
                    const values = newProducts.flatMap((product: any) => [product.code, product.name, product.brand, product.category, product.stock, product.discount, product.cost, product.sale_mayor, product.sale_menor, product.updated_at]);
                    // Ejecutar la consulta SQL
                    console.log(sql, values);
                    db.run(sql, values, function (err: any) {
                    if (err) {
                        console.error('Error al insertar datos:', err);
                    } else {
                        console.log(`Datos insertados exitosamente. Filas afectadas:`);
                    }
                    });
                }
            })
            .catch((error: Error) => {
                console.error(error);
            });
    }
};