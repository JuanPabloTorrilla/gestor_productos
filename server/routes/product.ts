import { router } from "./index";
import db from "../../database"

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

const addProduct = async ({ code, name, brand, category, stock, profit_margin_mayor, profit_margin_menor, discount,cost, sale_mayor, sale_menor }: any) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO products (code, name, brand, category, stock, profit_margin_mayor, profit_margin_menor, discount,cost, sale_mayor, sale_menor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.run(query, [code, name, brand, category, stock, profit_margin_mayor, profit_margin_menor, discount, cost, sale_mayor, sale_menor], (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(console.log(`Product ${name} added successfully`));
      }
    });
  });
};

const updateProduct = async (id_product: string, { code, name, brand, category, stock, profit_margin_mayor, profit_margin_menor, discount,cost, sale_mayor, sale_menor }: any) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE products SET code = ?, name = ?, brand = ?, category = ?, stock = ?, profit_margin_mayor = ?, profit_margin_menor = ?, discount = ?,cost = ?, sale_mayor = ?, sale_menor = ? WHERE id_product = ?';
    db.run(query, [code, name, brand, category, stock, profit_margin_mayor, profit_margin_menor, discount,cost, sale_mayor, sale_menor], (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(console.log(`Product with id ${id_product} updated successfully`, code, name, brand, cost, sale_mayor, sale_menor));
      }
    });
  });
};

const deleteProduct = async (id_product: string) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM products WHERE id_product = ?';
    db.run(query, [id_product], (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(console.log(`Product with id ${id_product} deleted successfully`));
      }
    });
  });
};

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

  router.post('/api/products', async (req, res) => {
    try {
      await addProduct(req.body);
      res.sendStatus(201);
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      res.status(500).json({ error: 'Error al agregar el producto' });
    }
  });
  
  router.put('/api/products/:id_product', async (req, res) => {
    const { id_product } = req.params;
    const { code, name, brand, cost, sale_mayor, sale_menor } = req.body;
    try {
      await updateProduct(id_product, { code, name, brand, cost, sale_mayor, sale_menor });
      res.sendStatus(204);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  });
  
  router.delete('/api/products/:id_product', async (req, res) => {
    const { id_product } = req.params;
    try {
      deleteProduct(id_product);
      res.sendStatus(204);       
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  });
    
  export const product  = router