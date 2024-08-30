
import EventSource from 'eventsource';
const es = new EventSource('http://localhost:3000/events');
const axios = require('axios');
import db from '../database';
import { fetchProducts } from './routes/product';
import { events } from "./routes/events";

const addNewProduct = async () => {
    axios.get('http://localhost:3000/api/products')
        .then(async (response: any) => {
            const products = response.data;
            const oldProducts = await fetchProducts();
            const newProducts = products.filter((product: any) => !oldProducts.some((oldProduct: any) => oldProduct.id_product === product.id_product));
            if (newProducts.length > 0) {
                const placeholders = newProducts.map(() => '(?, ?, ?, ?, ?, ?, ?)').join(', ');
                const sql = `INSERT INTO products (code, name, brand, discount,cost, sale_menor, updated_at) VALUES ${placeholders}`;

                // Aplanar los datos para que coincidan con los placeholders en la consulta SQL
                const values = newProducts.flatMap((product: any) => [product.code, product.name, product.brand, product.discount, product.cost, product.sale_menor, product.updated_at]);
                // Ejecutar la consulta SQL
                console.log(sql, values);
                db.run(sql, values, function (err: any) {
                if (err) {
                    console.error('Error al insertar datos:', err);
                } else {
                    console.log(`Datos insertados exitosamente. Filas afectadas:`);
                    events.sendEvent({ type: 'addProduct', action: 'fetchProducts' });
                }
                });
            }
        })
        .catch((error: Error) => {
            console.error(error);
        });
}

const deleteOldProducts = async () => {
    axios.get('http://localhost:3000/api/products')
        .then(async (response: any) => {
            const products = response.data;
            const oldProducts = await fetchProducts();
            const toDelete = oldProducts.filter((product: any) => !products.some((newProduct: any) => newProduct.id_product === product.id_product));
            const values = toDelete.map((product: any) => product.id_product);
            console.log(toDelete);
            if(products.length < oldProducts.length) {
                const placeholders = values.map(() => '(?)').join(', ');
                const sql = `DELETE FROM products WHERE id_product IN (${placeholders})`;
                // Ejecutar la consulta SQL
                console.log(sql, values);
                db.run(sql, values, function (err: any) {
                    if (err) {
                        console.error('Error al eliminar datos:', err);
                    } else {
                        console.log(`Products deleted successfully. Filas afectadas:`);
                        events.sendEvent({ type: 'deleteProduct', action: 'fetchProducts' });
                    }
                });
            }
        })
        .catch((error: Error) => {
            console.error(error);
        });
}

const updateProducts = async () => {
    axios.get('http://localhost:3000/api/products')
        .then(async (response: any) => {
            const products = response.data;
            const oldProducts = await fetchProducts();
            const updatedProducts = products.filter((product: any) => oldProducts.some((oldProduct: any) => oldProduct.updated_at < product.updated_at && oldProduct.id_product === product.id_product));
            if (updatedProducts.length > 0) {
                const placeholders = updatedProducts.map(() => '(?, ?, ?, ?, ?, ?, ?)').join(', ');
                const sql = `INSERT INTO products (code, name, brand, discount,cost, sale_menor, updated_at) VALUES ${placeholders}`;
                // Aplanar los datos para que coincidan con los placeholders en la consulta SQL
                const values = updatedProducts.flatMap((product: any) => [product.code, product.name, product.brand, product.discount, product.sale_mayor, product.sale_menor, product.updated_at]);
                // Ejecutar la consulta SQL
                console.log(sql, values);
                db.run(sql, values, function (err: any) {
                    if (err) {
                        console.error('Error al insertar datos:', err);
                    } else {
                        console.log(`Products updated successfully. Filas afectadas:`);
                        events.sendEvent({ type: 'updateProduct', action: 'fetchProducts' });
                    }
                });
            }
        })
        .catch((error: Error) => {
            console.error(error);
        });
}

es.onmessage = (event: any) => {
    console.log('Evento recibido:', event.data);
    const message = JSON.parse(event.data);
    console.log(message.type);
    // Procesar el evento
    if (message.type === 'addProduct') {
        addNewProduct();
    }
    if (message.type === 'deleteProduct') {
        deleteOldProducts();
    }
    if (message.type === 'updateProduct') {
        updateProducts();
    }
};