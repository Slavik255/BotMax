// src/components/AccessibilityFilter.tsx
import React, { useState } from 'react';

const limitations = [
  { id: 'wheelchair', label: 'Колясочник', icon: '🪑' },
  { id: 'blind', label: 'Слабовидящий / незрячий', icon: '👁️' },
  { id: 'deaf', label: 'Глухой / слабослышащий', icon: '👂' },
  { id: 'autism', label: 'РАС / особенности восприятия', icon: '🧠' },
  { id: 'temporary', label: 'Временная травма', icon: '🦵' },
];

interface AccessibilityFilterProps {
  onSelect: (id: string) => void;
}

export function AccessibilityFilter({ onSelect }: AccessibilityFilterProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setSelected(id);
    onSelect(id);
  };

  return (
    <div className="filter-grid">
      {limitations.map(opt => (
        <button
          key={opt.id}
          className={`filter-btn ${selected === opt.id ? 'active' : ''}`}
          onClick={() => handleClick(opt.id)}
        >
          {opt.icon} {opt.label}
        </button>
      ))}
    </div>
  );
}