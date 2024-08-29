import { router } from "./index";
import db from "../../database"

const fetchCustomers = async () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM customers';
    db.all(query, [], (err: any, rows: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const addCustomer = async ({ razon_social, cuit, condicion_iva, email, phone, address, city, saldo }: any) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO customers (razon_social, cuit, condicion_iva, email, phone, address, city, saldo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.run(query, [razon_social, cuit, condicion_iva, email, phone, address, city, saldo], (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(console.log(`Customer ${razon_social} added successfully`));
      }
    });
  });
};

const deleteCustomer = async (id: string) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM customers WHERE id = ?';
    db.run(query, [id], (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(console.log(`Customer with id ${id} deleted successfully`));
      }
    });
  });
};

const updateCustomer = async (id: string, { razon_social, cuit, condicion_iva, email, phone, address, city, saldo }: any) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE customers SET razon_social = ?, cuit = ?, condicion_iva = ?, email = ?, phone = ?, address = ?, city = ?, saldo = ? WHERE id = ?';
    db.run(query, [razon_social, cuit, condicion_iva, email, phone, address, city, saldo, id], (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(console.log(`Customer with id ${id} updated successfully`, razon_social, cuit, condicion_iva, email, phone, address, city, saldo));
      }
    });
  });
};

router.get('/api/customers', async (req, res) => {
  req.setTimeout(0);
  try {
    const customers = await fetchCustomers()
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Error fetching customers' });
  }
  });
  
  router.post('/api/customers', (req, res) => {
    const { razon_social, cuit, condicion_iva, email, phone, address, city, saldo } = req.body;
    try {
      addCustomer({ razon_social, cuit, condicion_iva, email, phone, address, city, saldo });
      res.sendStatus(201);
    } catch (error) {
      console.error('Error adding customer:', error);
      res.status(500).json({ error: 'Error adding customer' });
    }
  });
  
  router.put('/api/customers/:id', (req, res) => {
    const { id } = req.params;
    const { razon_social, cuit, condicion_iva, email, phone, address, city, saldo } = req.body;
    try {
      updateCustomer(id, { razon_social, cuit, condicion_iva, email, phone, address, city, saldo });
      res.sendStatus(204);
    } catch (error) {
      console.error('Error updating customer:', error);
      res.status(500).json({ error: 'Error updating customer' });
    }
  });
  
  router.delete('/api/customers/:id', (req, res) => {
    const { id } = req.params;
    try {
      deleteCustomer(id);
      res.sendStatus(204);
    } catch (error) {
      console.error('Error deleting customer:', error);
      res.status(500).json({ error: 'Error deleting customer' });
    }
  });

  export const customer  = router