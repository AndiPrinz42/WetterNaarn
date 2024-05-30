import mariadb from "mariadb";

export class Database {
  pool = mariadb.createPool({
    host: "192.168.178.26",
    user: "username",
    password: "password",
    database: "weewx",
    connectionLimit: 5,
  });

  async query(query: string, params: any[] = []) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const rows = await conn.query(query, params);
      return rows;
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }

  async close() {
    await this.pool.end();
  }
}