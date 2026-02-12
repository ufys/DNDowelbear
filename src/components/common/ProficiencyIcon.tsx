import React from "react";

export function ProficiencyIcon({ level }: { level: 0 | 1 | 2 }) {
  if (level === 0) {
    return <span className="w-5 h-5 inline-block rounded-full border-2 border-gray-500"></span>;
  }
  if (level === 1) {
    return (
      <span className="w-5 h-5 inline-block bg-yellow-500 rounded-full flex items-center justify-center text-black text-xs">
        ✓
      </span>
    );
  }
  return (
    <span className="w-5 h-5 inline-block bg-yellow-500 rounded-full flex items-center justify-center text-black text-xs border-2 border-yellow-300">
      ✓✓
    </span>
  );
}
