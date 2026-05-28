"use client";

import { FiPlus, FiX } from "react-icons/fi";

interface ProjectFormCreditsProps {
  credits: { role: string; name: string }[];
  setCredits: (credits: { role: string; name: string }[]) => void;
}

const inputStyles = {
  label: "block text-[11px] font-bold tracking-[0.15em] uppercase text-secondary-dark mb-2",
  input: "w-full bg-transparent border-b border-secondary-dark/30 focus:border-accent py-2 text-secondary text-sm outline-none transition-colors duration-200 placeholder:text-secondary-dark/40",
};

export default function ProjectFormCredits({ credits, setCredits }: ProjectFormCreditsProps) {
  const addCredit = () => {
    setCredits([...credits, { role: "", name: "" }]);
  };

  const updateCredit = (index: number, field: "role" | "name", value: string) => {
    const updated = credits.map((credit, i) =>
      i === index ? { ...credit, [field]: value } : credit
    );
    setCredits(updated);
  };

  const removeCredit = (index: number) => {
    setCredits(credits.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className={inputStyles.label}>Project Credits</label>
        <button
          type="button"
          onClick={addCredit}
          className="flex items-center gap-1.5 text-accent text-xs font-bold tracking-wider uppercase cursor-pointer hover:text-accent/80 transition-colors"
        >
          <FiPlus size={14} />
          Add
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {credits.map((credit, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="text"
              value={credit.role}
              onChange={(e) => updateCredit(index, "role", e.target.value)}
              placeholder="Role (e.g. Director)"
              className={`${inputStyles.input} flex-1`}
            />
            <span className="text-secondary-dark text-xs">—</span>
            <input
              type="text"
              value={credit.name}
              onChange={(e) => updateCredit(index, "name", e.target.value)}
              placeholder="Name"
              className={`${inputStyles.input} flex-1`}
            />
            <button
              type="button"
              onClick={() => removeCredit(index)}
              className="text-secondary-dark hover:text-red-400 transition-colors cursor-pointer p-1"
            >
              <FiX size={16} />
            </button>
          </div>
        ))}

        {credits.length === 0 && (
          <p className="text-secondary-dark/50 text-xs italic">
            No credits added yet
          </p>
        )}
      </div>
    </div>
  );
}
