"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { FiImage, FiX, FiUploadCloud } from "react-icons/fi";
import { MEDIA_ACCEPT, validateFile, isAnimatedImage, type MediaItem } from "@/lib/media";

interface ProjectFormMediaProps {
  media: MediaItem[];
  setMedia: (media: MediaItem[]) => void;
  onBusy?: (busy: boolean) => void;
}

const styles = {
  label: "block text-[11px] font-bold tracking-[0.15em] uppercase text-secondary-dark mb-2",
  dropzone: "border-2 border-dashed border-secondary-dark/30 rounded-lg p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-accent/50 transition-colors duration-200",
  dropzoneActive: "border-accent bg-accent/5",
  grid: "grid grid-cols-3 gap-3 mt-4",
  thumbnail: "relative group aspect-square rounded-md overflow-hidden bg-secondary-dark/10",
  removeButton: "absolute top-1 right-1 bg-primary/80 rounded-full p-2 cursor-pointer focus-visible:outline-accent",
};

export default function ProjectFormMedia({ media, setMedia, onBusy }: ProjectFormMediaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const busy = useRef(false);

  const uploadFile = async (file: File) => {
    validateFile(file);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error((await res.json()).error || "Upload failed");
    return res.json();
  };

  const handleFiles = async (files: FileList | File[]) => {
    if (busy.current) return;
    busy.current = true;
    onBusy?.(true);
    setUploading(true);
    setErrors([]);
    const failures: string[] = [];
    const newMedia: MediaItem[] = [];

    for (const file of Array.from(files)) {
      try {
        const result = await uploadFile(file);
        newMedia.push({
          ...result,
          src: result.url,
          alt: file.name.replace(/\.[^/.]+$/, ""),
          publicId: result.publicId,
        });
      } catch (error) {
        failures.push(`${file.name}: ${(error as Error).message}`);
      }
    }

    setMedia([...media, ...newMedia]);
    setUploading(false);
    setErrors(failures);
    busy.current = false;
    onBusy?.(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
      <label className={styles.label}>Gallery media</label>
      <p className="text-xs text-secondary-dark mb-3">JPEG, PNG, WebP, animated GIF or MP4 (H.264/AAC). Maximum 4,000,000 bytes per file.</p>

      <div
        className={`${styles.dropzone} ${dragActive ? styles.dropzoneActive : ""}`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        role="button"
        tabIndex={uploading ? -1 : 0}
        aria-label="Upload gallery media"
        aria-disabled={uploading}
        onKeyDown={e => { if (!uploading && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); fileInputRef.current?.click(); } }}
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
        accept={MEDIA_ACCEPT}
        disabled={uploading}
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
        className="hidden"
      />
      {errors.length > 0 && <ul role="alert" className="mt-3 text-sm">{errors.map(error => <li key={error}>{error}</li>)}</ul>}

      {media.length > 0 && (
        <div className={styles.grid}>
          {media.map((item, index) => (
            <div key={index} className={styles.thumbnail}>
              {item.kind === "video" ? <video src={item.src} controls playsInline preload="metadata" aria-label={item.alt || "Gallery video"} className="w-full h-full object-contain" /> : <Image
                src={item.src}
                alt={item.alt}
                fill
                className="w-full h-full object-contain"
                unoptimized={isAnimatedImage(item)}
              />}
              <button
                type="button"
                onClick={() => removeMedia(index)}
                disabled={uploading}
                aria-label={`Remove ${item.alt || "media"}`}
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
