import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getHomeConfiguration } from "@/lib/home";
import SiteSettings from "@/lib/models/SiteSettings";

export async function GET() {
  if (!await auth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { settings, projects, invalidFixed } = await getHomeConfiguration();
    return NextResponse.json({ settings, projects: projects.map(p => ({ id: p.id, title: p.title })), invalidFixed },
      { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ error: "Unable to load home settings." }, { status: 503 }); }
}

export async function PUT(req: NextRequest) {
  if (!await auth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const { projects } = await getHomeConfiguration();
    if (!["random", "fixed"].includes(body.mode) ||
      (body.mode === "fixed" && !projects.some(p => String(p.id) === body.projectId))) {
      return NextResponse.json({ error: "Choose a published project with a YouTube video and original dimensions." }, { status: 400 });
    }
    await SiteSettings.findByIdAndUpdate("home", { $set: {
      mode: body.mode, projectId: body.mode === "fixed" ? body.projectId : null,
    } }, { upsert: true, runValidators: true });
    return NextResponse.json({ saved: true });
  } catch { return NextResponse.json({ error: "Unable to save home settings." }, { status: 503 }); }
}
