import mysql from "mysql2/promise";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Log environment variables (masking sensitive data)
console.log("Database Configuration:", {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER ? "✓ Set" : "✗ Not Set",
  password: process.env.DB_PASSWORD ? "✓ Set" : "✗ Not Set",
  database: process.env.DB_NAME || "drivefitt",
  port: process.env.DB_PORT || "3306",
  NODE_ENV: process.env.NODE_ENV,
});

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "drivefitt",
  port: parseInt(process.env.DB_PORT || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000, // 10 seconds
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

let pool: mysql.Pool | null = null;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const createPool = async (retries = MAX_RETRIES): Promise<mysql.Pool> => {
  try {
    console.log("Attempting to create database pool...");
    console.log("Using database host:", dbConfig.host);
    console.log("Using database name:", dbConfig.database);
    console.log("Using database port:", dbConfig.port);

    const newPool = mysql.createPool(dbConfig);
    // Test the connection
    const connection = await newPool.getConnection();
    console.log("✓ Database connection successful!");
    connection.release();
    return newPool;
  } catch (error: any) {
    console.error("Database connection error details:", {
      code: error.code,
      errno: error.errno,
      syscall: error.syscall,
      hostname: error.hostname,
      message: error.message,
    });

    if (retries > 0) {
      console.log(
        `Database connection failed, retrying... (${retries} attempts left)`
      );
      await sleep(RETRY_DELAY);
      return createPool(retries - 1);
    }
    throw error;
  }
};

export const getConnection = async (): Promise<mysql.Pool> => {
  if (!pool) {
    console.log("No existing pool, creating new connection pool...");
    pool = await createPool();
  }
  return pool;
};

export const closeConnection = async (): Promise<void> => {
  if (pool) {
    console.log("Closing database connection pool...");
    await pool.end();
    pool = null;
    console.log("Database connection pool closed successfully");
  }
};

export const executeQuery = async <T = unknown>(
  query: string,
  params?: unknown[],
  retries = MAX_RETRIES
): Promise<T> => {
  try {
    console.log("Executing query:", query.substring(0, 100) + "...");
    console.log("Query parameters:", params);

    const connection = await getConnection();
    const [rows] = await connection.execute(query, params);
    console.log("Query executed successfully");
    return rows as T;
  } catch (error: any) {
    console.error("Database query error:", {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      sqlMessage: error.sqlMessage,
    });

    // If it's a connection error and we have retries left
    if (
      retries > 0 &&
      (error.code === "ECONNREFUSED" ||
        error.code === "ENOTFOUND" ||
        error.code === "PROTOCOL_CONNECTION_LOST")
    ) {
      console.log(`Query failed, retrying... (${retries} attempts left)`);
      await sleep(RETRY_DELAY);

      // Close the existing pool if there's an error
      await closeConnection();

      // Retry the query
      return executeQuery(query, params, retries - 1);
    }

    throw error;
  }
};
