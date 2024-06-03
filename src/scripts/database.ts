import mariadb from "mariadb";
const env = import.meta.env;

export class Database {
  weewxPool = mariadb.createPool({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: "weewx",
    connectionLimit: 1,
  });

  forecastPool = mariadb.createPool({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: "openweatherapi",
    connectionLimit: 1,
  });

  async query(db: "weewx" | "forecast", query: string, params: any[] = []) {
    let conn;
    try {
      conn = await this.getConnection(db);
      const rows = await conn.query(query, params);
      return rows;
    } finally {
      if (conn) conn.destroy();
    }
  }

  async getConnection(db: "weewx" | "forecast"): Promise<mariadb.PoolConnection> {
    if (db === "weewx") {
      return await this.weewxPool.getConnection();
    } else {
      return await this.forecastPool.getConnection();
    }
  }

  async close(db: "weewx" | "forecast") {
    if (db === "weewx") {
      await this.weewxPool.end();
    } else {
      await this.forecastPool.end();
    }
  }
}
