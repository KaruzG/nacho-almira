import mongoose, { Schema, Document } from "mongoose";

export interface IProjectCredit {
  role: string;
  name: string;
}

export interface IProjectMedia {
  src: string;
  alt: string;
  publicId?: string;
}

export interface IProject extends Document {
  type: "Personal" | "Ad-Film";
  title: string;
  category: mongoose.Types.ObjectId;
  year: number;
  videoLink: string;
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
    trailerLink: { type: String },
    description: { type: String },
    media: [{ src: String, alt: String, publicId: String }],
    credits: [{ role: String, name: String }],
    mediaLink: { type: String },
    visibility: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
