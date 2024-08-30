import { router } from "./index";
import db from "../../database"
import axios from "axios";

export const fetchProducts = (async(): Promise<{ id_product: any }[]> => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM products';
    db.all(query, [], (err: any, rows: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    }); 
  }); 
});

router.get('/api/products', async (req, res) => {
  req.setTimeout(0);
  try {
    const products = await fetchProducts()
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

const startCheck = async () => {
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
                    }
                    });
                }
            })
            .catch((error: Error) => {
                console.error(error);
            });
}

startCheck()

export const product  = router