import { NextResponse } from "next/server";
import { getConnection } from "@/lib/database";

export async function GET() {
  try {
    const connection = await getConnection();

    try {
      // Test the connection
      const [result] = await connection.execute("SELECT 1 as test");

      return NextResponse.json({
        success: true,
        message: "Database connection successful",
        config: {
          host: process.env.DB_HOST || "localhost",
          user: process.env.DB_USER || "root",
          database: process.env.DB_NAME || "drivefitt",
          port: parseInt(process.env.DB_PORT || "3306"),
        },
        result,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: "Database connection failed",
          error: {
            code: error.code,
            message: error.message,
            errno: error.errno,
          },
          config: {
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            database: process.env.DB_NAME || "drivefitt",
            port: parseInt(process.env.DB_PORT || "3306"),
          },
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create database connection",
        error: {
          code: error.code,
          message: error.message,
          errno: error.errno,
        },
        config: {
          host: process.env.DB_HOST || "localhost",
          user: process.env.DB_USER || "root",
          database: process.env.DB_NAME || "drivefitt",
          port: parseInt(process.env.DB_PORT || "3306"),
        },
      },
      { status: 500 }
    );
  }
}
