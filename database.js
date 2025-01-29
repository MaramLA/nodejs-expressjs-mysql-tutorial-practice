import dotenv from "dotenv";
import mysql from "mysql2";

// loading environment variables
dotenv.config();

// connecting MySQL Database
const pool = mysql
  .createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    database: process.env.DB_DATABASE || "notes_app",
    password: process.env.DB_PASSWORD,
  })
  .promise();

// getting all notes
export async function getNotes() {
  try {
    const [rows] = await pool.query("SELECT * FROM notes");
    return rows;
  } catch (error) {
    console.log(error);
  }
}

// getting notes by id query
export async function getNote(id) {
  try {
    const [rows] = await pool.query(`SELECT * FROM notes where id = ?`, [id]);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

export async function createNote(title, contents) {
  try {
    const [result] = await pool.query(
      `INSERT INTO notes (title, contents) values (?, ?)`,
      [title, contents]
    );
    const id = result.insertId;
    return getNote(id);
  } catch (error) {
    console.log(error);
  }
}
