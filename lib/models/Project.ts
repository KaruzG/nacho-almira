import mongoose, { Schema, Document } from "mongoose";
import type { MediaItem, VideoPresentation } from "@/lib/media";

export interface IProjectCredit {
  role: string;
  name: string;
}

export type IProjectMedia = MediaItem;

export interface IProject extends Document {
  type: "Personal" | "Ad-Film";
  title: string;
  category: mongoose.Types.ObjectId;
  year: number;
  videoLink: string;
  videoPresentation?: VideoPresentation;
  trailerLink?: string;
  description?: string;
  media: IProjectMedia[];
  credits: IProjectCredit[];
  mediaLink?: string;
  visibility: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    type: { type: String, enum: ["Personal", "Ad-Film"], required: true, default: "Personal" },
    title: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    year: { type: Number, required: true },
    videoLink: { type: String, required: true },
    videoPresentation: {
      type: new Schema({
        width: { type: Number, min: 1, required: true },
        height: { type: Number, min: 1, required: true },
        source: { type: String, enum: ["admin"], required: true },
        videoLink: { type: String, required: true },
      }, { _id: false }),
      default: undefined,
    },
    trailerLink: { type: String },
    description: { type: String },
    media: [{
      src: { type: String, required: true }, alt: String, publicId: String,
      kind: { type: String, enum: ["image", "video"] },
      format: { type: String, enum: ["jpg", "jpeg", "png", "webp", "gif", "mp4"] },
      width: { type: Number, min: 1 }, height: { type: Number, min: 1 },
      bytes: { type: Number, min: 1, max: 4_000_000 },
      duration: { type: Number, min: 0 }, codec: String,
    }],
    credits: [{ role: String, name: String }],
    mediaLink: { type: String },
    visibility: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
