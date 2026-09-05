import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  _id: { type: String, default: "home" },
  mode: { type: String, enum: ["random", "fixed"], default: "random" },
  projectId: { type: Schema.Types.ObjectId, ref: "Project", default: null },
}, { timestamps: true });

export default mongoose.models.SiteSettings || mongoose.model("SiteSettings", schema);
