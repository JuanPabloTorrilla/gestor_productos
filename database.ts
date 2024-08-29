const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('products.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id_product INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE,
    name TEXT,
    brand TEXT,
    discount REAL,
    cost REAL,
    sale_menor REAL,
    updated_at DATETIME
    )`
  );

  db.run(`CREATE TABLE IF NOT EXISTS customers (
    id_customer INTEGER PRIMARY KEY AUTOINCREMENT,
    razon_social TEXT UNIQUE,
    cuit TEXT UNIQUE,
    condicion_iva TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    saldo REAL,
    key TEXT UNIQUE
    )`
  );

  db.run(`CREATE TABLE IF NOT EXISTS pedidos (
    id_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
    id_customer INTEGER NOT NULL,
    total REAL NOT NULL,
    updated_at DATETIME,
    FOREIGN KEY (id_customer) REFERENCES customers (id_customer)
    )`
  );

  db.run(`CREATE TABLE IF NOT EXISTS detalle_pedido (
    id_detalle INTEGER PRIMARY KEY AUTOINCREMENT,
    id_pedido INTEGER NOT NULL,
    id_product INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_product) REFERENCES products(id_product)
    )`
  );


});

export default db
