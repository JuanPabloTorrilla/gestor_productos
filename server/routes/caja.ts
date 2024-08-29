import { router } from "./index";
import db from "../../database"

const fetchCaja = (async() => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM caja';
    db.all(query, [], (err: any, rows: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    }); 
  }); 
});

const movimientoCaja = async ({tipo, importe, motivo, equipo, id_customer, saldo }: any) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO caja (tipo, importe, motivo, equipo, id_customer, saldo) VALUES (?, ?, ?, ?, ?, ?)';
    db.run(query, [tipo, importe, motivo, equipo, id_customer, saldo], (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(console.log(`Movimiento de ${tipo} realizado correctamente`));
      }
    });
  });
};

router.get('/api/caja', async (req, res) => {
  req.setTimeout(0);
  try {
    const movements = await fetchCaja()
    res.json(movements);
    console.log('Movements fetched:', movements);
  } catch (error) {
    console.error('Error fetching movements:', error);
    res.status(500).json({ error: 'Error fetching movements' });
  }
});

  router.post('/api/caja', async (req, res) => {
    console.log(req.body);
    try {
      await movimientoCaja(req.body);
      console.log('Movimiento de caja realizado correctamente');
      res.sendStatus(201);
    } catch (error) {
      console.error('Error al realizar el movimiento:', error);
      res.status(500).json({ error: 'Error al realizar el movimiento' });
    }
  });
    
  export const caja  = router