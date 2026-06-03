import { testCloudinary, testMongoDB } from "@/hooks/adminSettings/useTestServices";
import { NextResponse } from "next/server";

interface testServersResults {
    mongodb: boolean;
    cloudinary: boolean;
    timestamp: string;
}

export async function GET() {
    const results: testServersResults = {
        mongodb: false,
        cloudinary: false,
        timestamp: new Date().toISOString(),
    }

    if (await testMongoDB()) {
        results.mongodb = true;
    }

    if (await testCloudinary()) {
        results.cloudinary = true;
    }

    return NextResponse.json(results);
}
