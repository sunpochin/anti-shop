import { Database } from 'bun:sqlite';
const db = new Database('./data/sqlite.db');
const query = db.query("SELECT name FROM sqlite_master WHERE type='table';");
console.log(query.all());
