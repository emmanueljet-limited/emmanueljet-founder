"use client";

import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";

const languages = [
  { code: "EN", label: "English" },
  { code: "FR", label: "French" },
  { code: "ES", label: "Spanish" },
];

export default function LanguageSwitcher() {
  const [selected, setSelected] = useState(languages[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Choose language"
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm"
      >
        <Globe size={18} />
        <span>{selected.code}</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul className="absolute right-0 top-full z-50 mt-2 min-w-36 rounded-lg border bg-white p-1 text-gray-900 shadow-lg">
          {languages.map((language) => (
            <li key={language.code}>
              <button
                type="button"
                onClick={() => {
                  setSelected(language);
                  setIsOpen(false);
                }}
                className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
              >
                {language.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}