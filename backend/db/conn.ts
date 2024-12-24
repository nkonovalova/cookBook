import { MongoClient } from "mongodb";
import {DB_NAME} from "../shared/const";

const connectionString = process.env.DB_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
    conn = await client.connect();
} catch(e) {
    console.error(e);
}

let db = conn.db(DB_NAME);

export default db;