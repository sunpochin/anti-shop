import { Database } from 'bun:sqlite';
const db = new Database('./data/sqlite.db');
try {
  const query = db.query("SELECT count(*) as count FROM categories;");
  console.log(query.get());
} catch (e) {
  console.log("Error querying categories:", e);
}
