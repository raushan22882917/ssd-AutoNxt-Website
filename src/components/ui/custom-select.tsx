import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
  onOpenChange?: (open: boolean) => void;
}

export function CustomSelect({ value, onChange, options, className = "", onOpenChange }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (onOpenChange) {
      onOpenChange(isOpen);
    }
  }, [isOpen, onOpenChange]);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-3.5 bg-background border-2 border-red-600/20 hover:border-red-600/40 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 rounded-full outline-none transition-all text-sm text-foreground font-semibold shadow-md cursor-pointer select-none text-left"
      >
        <span className="truncate">{selectedOption?.label}</span>
        <ChevronDown className={`w-4 h-4 text-red-600 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Options List */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-full min-w-[200px] bg-background border border-border shadow-xl rounded-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-[280px] overflow-y-auto hide-scrollbar">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-5 py-2.5 text-sm transition-colors duration-150 select-none block truncate
                    ${isSelected 
                      ? "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 font-bold" 
                      : "text-foreground hover:bg-red-500/5 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400 font-medium"
                    }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
