"use client";

import { easeInUp } from "@/animations/easeInUp";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { FiTrash2, FiPlusCircle } from "react-icons/fi";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

const styles = {
  card: "bg-primary-light border border-secondary-dark/10 rounded-xl p-8 max-w-2xl",
  input: "flex-1 bg-transparent border-b border-secondary-dark/30 focus:border-accent py-3 text-secondary text-sm outline-none transition-colors duration-200",
  button: "px-6 py-3 bg-accent text-accent-dark font-bold text-sm tracking-wider uppercase rounded-sm hover:bg-accent/90 transition-colors disabled:opacity-50",
  list: "mt-8 flex flex-col gap-3",
  listItem: "flex items-center justify-between p-4 border border-secondary-dark/10 rounded-lg hover:border-secondary-dark/30 transition-colors",
};

export default function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      setName("");
      fetchCategories();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? Projects using this category might break.")) return;

    try {
      await fetch(`/api/categories/${id}`, { method: "DELETE" });
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div {...easeInUp} className={styles.card}>
      <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-secondary mb-6 flex items-center gap-2">
        <FiPlusCircle className="text-accent" /> Add Category
      </h2>

      <form onSubmit={handleAdd} className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-[11px] font-bold tracking-widest uppercase text-secondary-dark mb-2">
            Category Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Ad-Film, Personal, Music Video..."
            className={styles.input}
            required
          />
        </div>
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      <div className={styles.list}>
        {categories.map((cat) => (
          <div key={cat._id} className={styles.listItem}>
            <div>
              <p className="text-secondary font-bold text-sm">{cat.name}</p>
              <p className="text-secondary-dark text-[11px] mt-1 font-mono">{cat.slug}</p>
            </div>
            <button
              onClick={() => handleDelete(cat._id)}
              className="text-secondary-dark hover:text-red-400 p-2 transition-colors"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        ))}
        {categories.length === 0 && (
          <p className="text-secondary-dark text-sm text-center py-4">No categories created yet.</p>
        )}
      </div>
    </motion.div>
  );
}
