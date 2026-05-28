"use client";

import { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import ProjectFormCredits from "@/components/admin/dashboard/ProjectFormCredits";
import ProjectFormMedia from "@/components/admin/dashboard/ProjectFormMedia";
import Select from "@/components/ui/Select";
import { CategoryOption, ProjectData } from "@/types/admin";

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
  const [categoryId, setCategoryId] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [videoLink, setVideoLink] = useState("");
  const [description, setDescription] = useState("");
  const [mediaLink, setMediaLink] = useState("");
  const [visibility, setVisibility] = useState<"draft" | "published">("draft");
  const [credits, setCredits] = useState<{ role: string; name: string }[]>([]);
  const [media, setMedia] = useState<{ src: string; alt: string; publicId?: string }[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingProject) {
      setTitle(editingProject.title);
      setCategoryId(editingProject.category?._id || "");
      setYear(editingProject.year);
      setVideoLink(editingProject.videoLink);
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
    setCategoryId("");
    setYear(new Date().getFullYear());
    setVideoLink("");
    setDescription("");
    setMediaLink("");
    setVisibility("draft");
    setCredits([]);
    setMedia([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const body = {
      title,
      category: categoryId,
      year,
      videoLink,
      description: description || undefined,
      media,
      credits,
      mediaLink: mediaLink || undefined,
      visibility,
    };

    try {
      const url = editingProject
        ? `/api/projects/${editingProject._id}`
        : "/api/projects";
      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        resetForm();
        onSaved();
      }
    } catch (error) {
      console.error("Failed to save project:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={cardStyles}>
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

        <div className={inputStyles.row}>
          <div>
            <label className={inputStyles.label}>Category</label>
            <Select
              value={categoryId}
              onChange={setCategoryId}
              options={categories.map((cat) => ({
                value: cat._id,
                label: cat.name,
              }))}
              placeholder="Select category"
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
    </div>
  );
}
