"use client";

import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { ProjectData } from "@/types/admin";
import Image from "next/image";

interface ProjectListItemProps {
  project: ProjectData;
  onEdit: () => void;
  onDelete: () => void;
}

const styles = {
  card: "flex items-center gap-4 bg-primary-light border border-secondary-dark/10 rounded-lg p-4 hover:border-secondary-dark/20 transition-colors duration-200",
  thumbnail: "w-24 h-16 rounded-md overflow-hidden bg-secondary-dark/10 flex-shrink-0",
  info: "flex-1 min-w-0",
  badge: "inline-block px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-sm",
  title: "text-secondary font-bold text-sm mt-1 truncate",
  meta: "text-secondary-dark text-[11px] mt-0.5",
  actions: "flex items-center gap-2 flex-shrink-0",
  actionButton: "p-2 text-secondary-dark hover:text-secondary transition-colors cursor-pointer",
};

export default function ProjectListItem({ project, onEdit, onDelete }: ProjectListItemProps) {
  const categoryName = project.category?.name || "Uncategorized";
  const badgeColor =
    categoryName === "Personal"
      ? "bg-accent/20 text-accent"
      : "bg-green-500/20 text-green-400";

  const thumbnailSrc = project.media?.[0]?.src || null;

  return (
    <div className={styles.card}>
      <div className={styles.thumbnail}>
        {thumbnailSrc ? (
          <Image
            src={thumbnailSrc}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-secondary-dark/30 text-xs">
            No img
          </div>
        )}
      </div>

      <div className={styles.info}>
        <div className="flex items-center gap-2">
          <span className={`${styles.badge} ${badgeColor}`}>
            {categoryName}
          </span>
          <span className="text-secondary-dark text-[11px]">{project.year}</span>
        </div>
        <p className={styles.title}>{project.title}</p>
        <p className={styles.meta}>
          {project.visibility === "draft" ? "Draft" : "Published"}
        </p>
      </div>

      <div className={styles.actions}>
        <button onClick={onEdit} className={styles.actionButton} aria-label="Edit project">
          <FiEdit2 size={16} />
        </button>
        <button onClick={onDelete} className={styles.actionButton} aria-label="Delete project">
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  );
}
