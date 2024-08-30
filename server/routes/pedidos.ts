import { router } from "./index";
import db from "../../database"

const fetchPedidos = (async() => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM pedidos';
    const pedidos = db.all(query, [], (err: any, rows: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    }); 
    console.log(pedidos);
  }); 
});

const addPedidos = async ({ id_product, quantity, date, total }: any) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO pedidos (id_product, quantity, date, total) VALUES (?, ?, ?, ?)';
    db.run(query, [id_product, quantity, date, total], (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(console.log(`Product ${id_product} added successfully`));
      }
    });
  });
};

router.get('/api/pedidos', async (req, res) => {
  req.setTimeout(0);
  try {
    
  } catch (error) {
    
  }
});

  router.post('/api/pedidos', async (req, res) => {
    console.log(req.body);
    try {
      await addPedidos(req.body);
      console.log('Pedido realizado correctamente');
      res.sendStatus(201);
    } catch (error) {
      console.error('Error al realizar el movimiento:', error);
      res.status(500).json({ error: 'Error al realizar el movimiento' });
    }
  });
    
  export const pedidos  = router