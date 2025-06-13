import React, { useState, useRef, useEffect } from "react";
import './App.css';

interface CustomSelectProps {
  value: string;
  options: string[];
  placeholder?: string;
  onChange: (value: string) => void; 
  name: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  options,
  placeholder = "Pilih salah satu",
  onChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = value || null;

  return (
    <div className="custom-select-container" ref={ref}>
      <div
        className="input select"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selected || placeholder}
        <span className="arrow">{isOpen ? (
          <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 5L5 0L0 5L10 5Z" fill="#919191"/>
          </svg>
        ) : (
          <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L5 5L10 0H0Z" fill="#919191"/>
          </svg>
        )}</span>
      </div>
        <div className={`options ${isOpen ? '' : 'closed'}`} role="listbox">
          {options.map((opt, idx) => (
            <div
              key={idx}
              className={`option ${selected === opt ? "selected" : ""}`}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              role="option"
              aria-selected={selected === opt}
              tabIndex={0}
            >
              <div>
                {opt}
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default CustomSelect;