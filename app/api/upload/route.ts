import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import type { UploadApiResponse } from "cloudinary";
import { validateFile, MAX_MEDIA_BYTES } from "@/lib/media";
import { providerMedia, InputError } from "@/lib/mediaServer";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (Number(req.headers.get("content-length")) > MAX_MEDIA_BYTES + 100_000) {
      return NextResponse.json({ error: "File exceeds 4,000,000 bytes." }, { status: 413 });
    }
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    try { validateFile(file); } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: file.size > MAX_MEDIA_BYTES ? 413 : 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "nacho-almira/projects",
              resource_type: "auto",
              allowed_formats: ["jpg", "jpeg", "png", "webp", "gif", "mp4"],
              media_metadata: true,
            },
            (error, result) => {
              if (error || !result) reject(new InputError("Cloudinary could not read this file. Check its format and try again."));
              else resolve(result);
            }
          )
          .end(buffer);
      }
    );

    try {
      const media = providerMedia(result);
      if ((file.type === "video/mp4") !== (media.kind === "video") ||
        (file.type !== "video/mp4" && file.type.split("/")[1].replace("jpeg", "jpg") !== media.format?.replace("jpeg", "jpg"))) {
        throw new InputError("File contents do not match the selected format.");
      }
      return NextResponse.json({ ...media, url: media.src });
    } catch (error) {
      await cloudinary.uploader.destroy(result.public_id, { resource_type: result.resource_type }).catch(() => {});
      throw error;
    }
  } catch (error) {
    if (error instanceof InputError) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
