import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/db/mongoose";

export const testMongoDB = async () => {
  try {
    const conn = await dbConnect();
    console.log("Conectado a MongoDB");
    return true;
  } catch (error) {
    console.log("Error al conectar a MongoDB");
    return false;
  }
}; 

export const testCloudinary = async () => {
  try {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    
    const res = await cloudinary.api.ping();

    if (res.status === "ok") {
      console.log("Conectado a Cloudinary");
      return true;
    }

    return false;
  } catch (error) {
    console.log("Error al conectar a Cloudinary");
    return false;
  }
}; 
