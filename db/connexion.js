import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const options = {
  user: "alimissoum",
  host: "db.3wa.io",
  password: process.env.DB_PASS,
  database: "alimissoum_net",
};

export function createClassicConnexion() {
  return mysql.createConnection(options).promise();
}

let pool = null;
export function poolConnexion() {
  if (pool) return pool;
  pool = mysql.createPool(options).promise();
  return pool;
}
