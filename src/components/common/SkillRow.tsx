import React from "react";
import { ProficiencyIcon } from "./ProficiencyIcon";
import { calculateModifier } from "../../utils/proficiency";

export function SkillRow({ skill, character, updateCharacter, profBonus, isEdit }) {
  const { name, stat } = skill;
  const statMod = calculateModifier(character.stats[stat]);
  const profLevel = character.skills[name] || 0; // 0,1,2
  const totalMod = statMod + (profLevel === 1 ? profBonus : profLevel === 2 ? profBonus * 2 : 0);

  const cycleProficiency = () => {
    const next = (profLevel + 1) % 3;
    updateCharacter({
      skills: { ...character.skills, [name]: next },
    });
  };

  return (
    <div className="flex items-center gap-2 bg-dark-card p-1 rounded">
      <span className="w-32">{name}</span>
      <span className="w-8 text-center text-gray-400">
        ({stat.toUpperCase()})
      </span>
      {isEdit ? (
        <button onClick={cycleProficiency} className="focus:outline-none">
          <ProficiencyIcon level={profLevel} />
        </button>
      ) : (
        <ProficiencyIcon level={profLevel} />
      )}
      <span className="ml-auto font-mono">
        {totalMod >= 0 ? `+${totalMod}` : totalMod}
      </span>
    </div>
  );
}
