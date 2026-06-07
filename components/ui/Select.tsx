"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
}

const selectStyles = {
  container: "relative w-full",
  trigger: "w-full bg-transparent border-b border-secondary-dark/30 hover:border-secondary-dark focus:border-accent py-3 text-secondary text-sm outline-none transition-colors duration-200 flex items-center justify-between cursor-pointer group text-left",
  triggerActive: "border-accent",
  arrow: "text-secondary-dark group-hover:text-secondary transition-transform duration-200",
  arrowOpen: "rotate-180 text-accent",
  dropdown: "absolute left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto bg-primary-light border border-secondary-dark/10 rounded-lg shadow-2xl py-1 outline-none animate-in fade-in-0 slide-in-from-top-1 duration-150",
  option: "px-4 py-3 text-sm text-secondary cursor-pointer transition-colors duration-150 outline-none flex items-center justify-between select-none",
  optionSelected: "bg-accent/10 text-accent font-bold",
  optionFocused: "bg-secondary-dark/10",
  placeholder: "text-secondary-dark/40",
};

export default function Select({
  value,
  onChange,
  options,
  placeholder = "Select an option",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation inside dropdown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(selectedOption ? options.findIndex((opt) => opt.value === value) : 0);
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < options.length) {
          onChange(options[focusedIndex].value);
          setIsOpen(false);
          triggerRef.current?.focus();
        }
        break;
      case "Tab":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleOptionClick = (val: string) => {
    onChange(val);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={selectStyles.container} onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen((prev) => !prev);
          if (!isOpen && selectedOption) {
            setFocusedIndex(options.findIndex((opt) => opt.value === value));
          }
        }}
        className={`${selectStyles.trigger} ${isOpen ? selectStyles.triggerActive : ""}`}
      >
        <span className={!selectedOption ? selectStyles.placeholder : ""}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FiChevronDown
          size={16}
          className={`${selectStyles.arrow} ${isOpen ? selectStyles.arrowOpen : ""}`}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          tabIndex={-1}
          className={selectStyles.dropdown}
        >
          {options.map((opt, index) => {
            const isSelected = opt.value === value;
            const isFocused = index === focusedIndex;

            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleOptionClick(opt.value)}
                onMouseEnter={() => setFocusedIndex(index)}
                className={`
                  ${selectStyles.option}
                  ${isSelected ? selectStyles.optionSelected : ""}
                  ${isFocused && !isSelected ? selectStyles.optionFocused : ""}
                `}
              >
                <span>{opt.label}</span>
                {isSelected && <FiCheck size={14} className="text-accent" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
