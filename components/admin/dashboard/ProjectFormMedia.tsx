"use client";

import { useRef, useState } from "react";
import { FiImage, FiX, FiUploadCloud } from "react-icons/fi";

interface MediaItem {
  src: string;
  alt: string;
  publicId?: string;
}

interface ProjectFormMediaProps {
  media: MediaItem[];
  setMedia: (media: MediaItem[]) => void;
}

const styles = {
  label: "block text-[11px] font-bold tracking-[0.15em] uppercase text-secondary-dark mb-2",
  dropzone: "border-2 border-dashed border-secondary-dark/30 rounded-lg p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-accent/50 transition-colors duration-200",
  dropzoneActive: "border-accent bg-accent/5",
  grid: "grid grid-cols-3 gap-3 mt-4",
  thumbnail: "relative group aspect-square rounded-md overflow-hidden bg-secondary-dark/10",
  removeButton: "absolute top-1 right-1 bg-primary/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer",
};

export default function ProjectFormMedia({ media, setMedia }: ProjectFormMediaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  };

  const handleFiles = async (files: FileList | File[]) => {
    setUploading(true);
    const newMedia: MediaItem[] = [];

    for (const file of Array.from(files)) {
      try {
        const result = await uploadFile(file);
        newMedia.push({
          src: result.url,
          alt: file.name.replace(/\.[^/.]+$/, ""),
          publicId: result.publicId,
        });
      } catch (error) {
        console.error("Failed to upload:", file.name, error);
      }
    }

    setMedia([...media, ...newMedia]);
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeMedia = (index: number) => {
    setMedia(media.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className={styles.label}>Gallery Images</label>

      <div
        className={`${styles.dropzone} ${dragActive ? styles.dropzoneActive : ""}`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        {uploading ? (
          <FiUploadCloud size={24} className="text-accent animate-pulse" />
        ) : (
          <FiImage size={24} className="text-secondary-dark" />
        )}
        <p className="text-secondary-dark text-xs font-bold tracking-wider uppercase">
          {uploading ? "Uploading..." : "Drag frames here or click to browse"}
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.gif"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
        className="hidden"
      />

      {media.length > 0 && (
        <div className={styles.grid}>
          {media.map((item, index) => (
            <div key={index} className={styles.thumbnail}>
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeMedia(index)}
                className={styles.removeButton}
              >
                <FiX size={14} className="text-secondary" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
