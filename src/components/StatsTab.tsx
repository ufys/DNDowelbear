import React from "react";
import { Character } from "../types/character";
import { calculateModifier, calculateProficiencyBonus } from "../utils/proficiency";
import { SkillRow } from "./common/SkillRow";

const stats = ["str", "dex", "con", "int", "wis", "cha"] as const;
const statLabels: Record<string, string> = {
  str: "Сила",
  dex: "Ловкость",
  con: "Телосложение",
  int: "Интеллект",
  wis: "Мудрость",
  cha: "Харизма",
};

const skills = [
  { name: "Акробатика", stat: "dex" },
  { name: "Анализ", stat: "int" },
  // ... все навыки
];

export function StatsTab({
  character,
  updateCharacter,
}: {
  character: Character;
  updateCharacter: (data: Partial<Character>) => void;
}) {
  const profBonus = calculateProficiencyBonus(character.level);
  const isEdit = character.editMode;

  const handleStatChange = (stat: string, value: number) => {
    updateCharacter({
      stats: { ...character.stats, [stat]: value },
    });
  };

  const handleSavingThrowProficiency = (stat: string, value: boolean) => {
    updateCharacter({
      savingThrows: { ...character.savingThrows, [stat]: value },
    });
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Характеристики */}
      <div className="space-y-4">
        {stats.map((stat) => {
          const score = character.stats[stat];
          const mod = calculateModifier(score);
          const saveMod = mod + (character.savingThrows[stat] ? profBonus : 0);
          return (
            <div key={stat} className="flex items-center gap-2 bg-dark-card p-2 rounded">
              <span className="w-24 font-semibold">{statLabels[stat]}</span>
              {isEdit ? (
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={score}
                  onChange={(e) => handleStatChange(stat, parseInt(e.target.value) || 10)}
                  className="w-16 bg-dark-bg border border-dark-border rounded px-2 py-1 text-center"
                />
              ) : (
                <span className="w-16 text-center">{score}</span>
              )}
              <span className="w-8 text-center text-orange-400">({mod >= 0 ? `+${mod}` : mod})</span>
              <span className="ml-2 text-sm">Спасбросок: {saveMod >= 0 ? `+${saveMod}` : saveMod}</span>
              {isEdit && (
                <input
                  type="checkbox"
                  checked={character.savingThrows[stat]}
                  onChange={(e) => handleSavingThrowProficiency(stat, e.target.checked)}
                  className="ml-2"
                />
              )}
            </div>
          );
        })}
        <div className="mt-4 p-2 bg-dark-card rounded">
          <span>Бонус владения: +{profBonus}</span>
        </div>
      </div>

      {/* Навыки */}
      <div className="space-y-2">
        {skills.map((skill) => (
          <SkillRow
            key={skill.name}
            skill={skill}
            character={character}
            updateCharacter={updateCharacter}
            profBonus={profBonus}
            isEdit={isEdit}
          />
        ))}
      </div>
    </div>
  );
}
