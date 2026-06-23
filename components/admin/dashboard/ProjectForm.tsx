"use client";

import { useState, useEffect } from "react";
import { FiPlusCircle, FiX, FiUploadCloud } from "react-icons/fi";
import ProjectFormCredits from "@/components/admin/dashboard/ProjectFormCredits";
import ProjectFormMedia from "@/components/admin/dashboard/ProjectFormMedia";
import Select from "@/components/ui/Select";
import { CategoryOption, ProjectData } from "@/types/admin";
import { easeInUp } from "@/animations/easeInUp";
import { buildPayload, submitProject, uploadTrailer } from "@/lib/admin/projectService";
import { motion } from "motion/react";

interface ProjectFormProps {
  categories: CategoryOption[];
  editingProject: ProjectData | null;
  onSaved: () => void;
  onCancel: () => void;
}

const inputStyles = {
  label: "block text-[11px] font-bold tracking-[0.15em] uppercase text-secondary-dark mb-2",
  input: "w-full bg-transparent border-b border-secondary-dark/30 focus:border-accent py-3 text-secondary text-sm outline-none transition-colors duration-200 placeholder:text-secondary-dark/40",
  select: "w-full bg-transparent border-b border-secondary-dark/30 focus:border-accent py-3 text-secondary text-sm outline-none transition-colors duration-200 appearance-none cursor-pointer",
  textarea: "w-full bg-transparent border-b border-secondary-dark/30 focus:border-accent py-3 text-secondary text-sm outline-none transition-colors duration-200 placeholder:text-secondary-dark/40 resize-none min-h-[80px]",
  row: "grid grid-cols-2 gap-6",
};

const cardStyles = "bg-primary-light border border-secondary-dark/10 rounded-xl p-8";

export default function ProjectForm({ categories, editingProject, onSaved, onCancel }: ProjectFormProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"Personal" | "Ad-Film">("Personal");
  const [categoryId, setCategoryId] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [videoLink, setVideoLink] = useState("");
  const [description, setDescription] = useState("");
  const [mediaLink, setMediaLink] = useState("");
  const [visibility, setVisibility] = useState<"draft" | "published">("draft");
  const [credits, setCredits] = useState<{ role: string; name: string }[]>([]);
  const [media, setMedia] = useState<{ src: string; alt: string; publicId?: string }[]>([]);
  const [saving, setSaving] = useState(false);
  const [trailerLink, setTrailerLink] = useState("");
  const [uploadingTrailer, setUploadingTrailer] = useState(false);

  useEffect(() => {
    if (editingProject) {
      setTitle(editingProject.title);
      setType(editingProject.type || "Personal");
      setCategoryId(editingProject.category?._id || "");
      setYear(editingProject.year);
      setVideoLink(editingProject.videoLink);
      setTrailerLink(editingProject.trailerLink || "");
      setDescription(editingProject.description || "");
      setMediaLink(editingProject.mediaLink || "");
      setVisibility(editingProject.visibility);
      setCredits(editingProject.credits || []);
      setMedia(editingProject.media || []);
    } else {
      resetForm();
    }
  }, [editingProject]);

  const resetForm = () => {
    setTitle("");
    setType("Personal");
    setCategoryId("");
    setYear(new Date().getFullYear());
    setVideoLink("");
    setTrailerLink("");
    setDescription("");
    setMediaLink("");
    setVisibility("draft");
    setCredits([]);
    setMedia([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = buildPayload({
        title,
        type,
        category: categoryId,
        year,
        videoLink,
        trailerLink: trailerLink || undefined,
        description: description || undefined,
        media,
        credits,
        mediaLink: mediaLink || undefined,
        visibility,
      });

      const res = await submitProject(payload, editingProject?._id);
      if (res && (res as Response).ok) {
        resetForm();
        onSaved();
      }
    } catch (error) {
      console.error("Failed to save project:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleTrailerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingTrailer(true);
    try {
      const file = files[0];
      const result = await uploadTrailer(file);
      setTrailerLink(result.url);
    } catch (error) {
      console.error("Failed to upload trailer video:", error);
    } finally {
      setUploadingTrailer(false);
    }
  };

  return (
    <motion.div {...easeInUp} className={cardStyles}>
      <div className="flex items-center gap-3 mb-8">
        <FiPlusCircle size={20} className="text-accent" />
        <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-secondary">
          {editingProject ? "Edit Project" : "New Project Entry"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className={inputStyles.label}>Project Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title of the film or campaign..."
            className={inputStyles.input}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={inputStyles.label}>Type</label>
            <Select
              value={type}
              onChange={(val) => setType(val as "Personal" | "Ad-Film")}
              options={[
                { value: "Personal", label: "Personal" },
                { value: "Ad-Film", label: "Ad-Film" },
              ]}
              placeholder="Select type"
              required
            />
          </div>
          <div>
            <label className={inputStyles.label}>Category / Tag</label>
            <Select
              value={categoryId}
              onChange={setCategoryId}
              options={categories.map((cat) => ({
                value: cat._id,
                label: cat.name,
              }))}
              placeholder="Select tag"
              required
            />
          </div>
          <div>
            <label className={inputStyles.label}>Year</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className={inputStyles.input}
              required
            />
          </div>
        </div>

        <div>
          <label className={inputStyles.label}>Video Link (YouTube)</label>
          <input
            type="url"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            placeholder="https://youtube.com/..."
            className={inputStyles.input}
            required
          />
        </div>

        <div>
          <label className={inputStyles.label}>Trailer Video (Optional - Cloudinary)</label>
          <div className="flex flex-col gap-3">
            {trailerLink ? (
              <div className="relative aspect-video w-full max-w-md rounded-lg overflow-hidden bg-secondary-dark/10 group border border-secondary-dark/15">
                <video src={trailerLink} controls className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setTrailerLink("")}
                  className="absolute top-2 right-2 bg-primary/80 hover:bg-primary rounded-full p-2 transition-colors cursor-pointer"
                >
                  <FiX size={16} className="text-secondary" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-3 bg-secondary-dark/10 hover:bg-secondary-dark/20 text-secondary border border-secondary-dark/30 rounded-lg cursor-pointer transition-colors duration-200 text-xs font-bold tracking-wider uppercase">
                  {uploadingTrailer ? (
                    <FiUploadCloud size={16} className="text-accent animate-pulse" />
                  ) : (
                    "Upload Trailer Video"
                  )}
                  <span className="ml-1">{uploadingTrailer ? "Uploading..." : "Browse file"}</span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleTrailerUpload}
                    disabled={uploadingTrailer}
                    className="hidden"
                  />
                </label>
                {uploadingTrailer && <span className="text-xs text-secondary-dark animate-pulse">Uploading to Cloudinary...</span>}
              </div>
            )}
            <p className="text-[11px] text-secondary-dark/60 mt-1">
              Upload a short video clip to be used as a hover preview on the projects grid. Max 10MB recommended.
            </p>
          </div>
        </div>

        <div>
          <label className={inputStyles.label}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Cinematography details, narrative brief..."
            className={inputStyles.textarea}
          />
        </div>

        <div>
          <label className={inputStyles.label}>Link to Media (optional)</label>
          <input
            type="url"
            value={mediaLink}
            onChange={(e) => setMediaLink(e.target.value)}
            placeholder="https://..."
            className={inputStyles.input}
          />
        </div>

        <ProjectFormCredits credits={credits} setCredits={setCredits} />
        <ProjectFormMedia media={media} setMedia={setMedia} />

        <div>
          <label className={inputStyles.label}>Visibility</label>
          <div className="flex gap-4 mt-2">
            <button
              type="button"
              onClick={() => setVisibility("draft")}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase border transition-colors duration-200 cursor-pointer ${
                visibility === "draft"
                  ? "border-accent text-accent"
                  : "border-secondary-dark/30 text-secondary-dark hover:border-secondary-dark"
              }`}
            >
              Draft
            </button>
            <button
              type="button"
              onClick={() => setVisibility("published")}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase border transition-colors duration-200 cursor-pointer ${
                visibility === "published"
                  ? "border-accent text-accent"
                  : "border-secondary-dark/30 text-secondary-dark hover:border-secondary-dark"
              }`}
            >
              Published
            </button>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-4 bg-accent text-accent-dark font-bold text-sm tracking-wider uppercase cursor-pointer hover:bg-accent/90 transition-colors duration-200 disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : editingProject
                ? "Update Project"
                : "Publish Project"}
          </button>
          {editingProject && (
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-4 border border-secondary-dark/30 text-secondary-dark font-bold text-sm tracking-wider uppercase cursor-pointer hover:border-secondary-dark transition-colors duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
}
