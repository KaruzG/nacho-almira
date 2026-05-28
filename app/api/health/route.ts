import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dns from "dns";
import { promisify } from "util";
import { v2 as cloudinary } from "cloudinary";

const resolveSrv = promisify(dns.resolveSrv);
const resolveTxt = promisify(dns.resolveTxt);

interface HealthCheckResults {
  timestamp: string;
  mongodb: {
    status: string;
    dnsSrv: string;
    dnsTxt: string;
    error: string | null;
    host?: string;
  };
  cloudinary: {
    status: string;
    error: string | null;
  };
}

export async function GET() {
  const results: HealthCheckResults = {
    timestamp: new Date().toISOString(),
    mongodb: {
      status: "pending",
      dnsSrv: "pending",
      dnsTxt: "pending",
      error: null,
    },
    cloudinary: {
      status: "pending",
      error: null,
    },
  };

  // 1. Test MongoDB DNS (SRV & TXT)
  const uri = process.env.MONGODB_URI || "";
  const srvMatch = uri.match(/mongodb\+srv:\/\/(?:[^:]+:[^@]+@)?([^/?]+)/);
  
  if (srvMatch && srvMatch[1]) {
    const host = srvMatch[1];
    results.mongodb.host = host;

    try {
      const srvRecords = await resolveSrv(`_mongodb._tcp.${host}`);
      results.mongodb.dnsSrv = `Success: Found ${srvRecords.length} records`;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      results.mongodb.dnsSrv = `Failed: ${errorMessage}`;
    }

    try {
      await resolveTxt(`${host}`);
      results.mongodb.dnsTxt = `Success: Found TXT records`;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      results.mongodb.dnsTxt = `Failed: ${errorMessage}`;
    }
  } else {
    results.mongodb.dnsSrv = "Skipped (Not an SRV connection string)";
    results.mongodb.dnsTxt = "Skipped";
  }

  // 2. Test Mongoose Connection
  try {
    if (mongoose.connection.readyState === 1) {
      results.mongodb.status = "Already connected";
    } else {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
      results.mongodb.status = "Connection successful";
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    results.mongodb.status = "Connection failed";
    results.mongodb.error = errorMessage;
  }

  // 3. Test Cloudinary Configuration
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    
    // Call the ping method using api object
    const pingResult = await cloudinary.api.ping();
    results.cloudinary.status = pingResult.status === "ok" ? "Connection successful" : "Ping returned non-ok status";
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    results.cloudinary.status = "Connection failed";
    results.cloudinary.error = errorMessage;
  }

  return NextResponse.json(results, { status: 200 });
}