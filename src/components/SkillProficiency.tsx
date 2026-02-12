import React from 'react';
import { ProficiencyLevel } from '../types/character';

interface Props {
  label: string;
  abilityMod: number;
  proficiencyBonus: number;
  level: ProficiencyLevel;
  onChange: (level: ProficiencyLevel) => void;
  disabled: boolean;
}

const SkillProficiency: React.FC<Props> = ({ label, abilityMod, proficiencyBonus, level, onChange, disabled }) => {
  const totalBonus = abilityMod + (level === 1 ? proficiencyBonus : level === 2 ? proficiencyBonus * 2 : 0);
  const sign = totalBonus >= 0 ? '+' : '';
  const icon = level === 0 ? '○' : level === 1 ? '●' : '★';

  const handleClick = () => {
    if (disabled) return;
    const nextLevel: ProficiencyLevel = level === 0 ? 1 : level === 1 ? 2 : 0;
    onChange(nextLevel);
  };

  return (
    <div className="skill-row">
      <span className="skill-icon" onClick={handleClick}>{icon}</span>
      <span className="skill-label">{label}</span>
      <span className="skill-bonus">{sign}{totalBonus}</span>
    </div>
  );
};

export default SkillProficiency;
