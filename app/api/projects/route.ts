import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db/mongoose";
import Project from "@/lib/models/Project";
import { validateProject } from "@/lib/projectValidation";
import { InputError } from "@/lib/mediaServer";

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find()
      .populate("category")
      .sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const project = await Project.create(await validateProject(body));
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    if (error instanceof InputError) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
