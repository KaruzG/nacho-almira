import { describe, it, expect, afterAll } from "vitest";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "../lib/db/mongoose";


// Cerramos la conexión después de los tests para que el proceso no se quede colgado
afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
});

describe("External Connections Integration Tests", () => {
  
  it("debería conectar exitosamente a MongoDB", async () => {
    const uri = process.env.MONGODB_URI;
    
    // Verificamos que la variable de entorno existe
    expect(uri, "Falta MONGODB_URI en .env.local").toBeDefined();
    expect(uri?.length, "MONGODB_URI está vacía").toBeGreaterThan(0);

    try {
      // dbConnect usa la misma lógica que tu aplicación
      const conn = await dbConnect();
      
      // readyState 1 significa que la conexión está abierta y activa
      expect(conn.connection.readyState).toBe(1);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`\n❌ Error de conexión a MongoDB: ${errorMessage}\n(Revisa si es 'bad auth' u otro problema de credenciales)`);
    }
  });

  it("debería autenticar y hacer ping a Cloudinary", async () => {
    // Verificamos las variables necesarias
    expect(process.env.CLOUDINARY_CLOUD_NAME, "Falta CLOUDINARY_CLOUD_NAME").toBeDefined();
    expect(process.env.CLOUDINARY_API_KEY, "Falta CLOUDINARY_API_KEY").toBeDefined();
    expect(process.env.CLOUDINARY_API_SECRET, "Falta CLOUDINARY_API_SECRET").toBeDefined();

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try {
      const result = await cloudinary.api.ping();
      expect(result.status).toBe("ok");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`\n❌ Error de autenticación en Cloudinary: ${errorMessage}`);
    }
  });

});