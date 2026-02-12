import React, { useMemo, useCallback } from 'react';
import { Character, Ability, abilities, SkillName, ProficiencyLevel } from '../types/character';
import SkillProficiency from './SkillProficiency';

const abilityLabels: Record<Ability, string> = { str: 'Сила', dex: 'Ловкость', con: 'Телосложение', int: 'Интеллект', wis: 'Мудрость', cha: 'Харизма' };

// Модификатор характеристики
const getMod = (score: number) => Math.floor((score - 10) / 2);

// Список навыков D&D 5e
const skillList: { name: SkillName; label: string; ability: Ability }[] = [
  { name: 'acrobatics', label: 'Акробатика', ability: 'dex' },
  { name: 'animalHandling', label: 'Уход за животными', ability: 'wis' },
  // ... (полный список здесь сокращён для краткости, в реальном проекте добавьте все 18 навыков)
];

interface Props {
  character: Character;
  setCharacter: (c: Character | ((prev: Character) => Character)) => void;
  editMode: boolean;
}

const MainSheet: React.FC<Props> = ({ character, setCharacter, editMode }) => {
  // Вычисление модификаторов характеристик
  const abilityMods = useMemo(() => {
    const mods: Record<Ability, number> = {} as Record<Ability, number>;
    abilities.forEach(ab => { mods[ab] = getMod(character.abilities[ab]); });
    return mods;
  }, [character.abilities]);

  // Бонус мастерства
  const proficiencyBonus = useMemo(() => Math.floor((character.level - 1) / 4) + 2, [character.level]);

  // Инициатива = мод Ловкости
  const initiative = abilityMods.dex;

  // Пассивная внимательность: 10 + мод Мудрости + бонус мастерства, если владение/экспертиза в Perception
  const passivePerception = useMemo(() => {
    let bonus = 0;
    const skill = character.skills?.perception;
    if (skill) {
      if (skill.proficiency === 1) bonus = proficiencyBonus;
      else if (skill.proficiency === 2) bonus = proficiencyBonus * 2;
    }
    return 10 + abilityMods.wis + bonus;
  }, [character.skills, abilityMods.wis, proficiencyBonus]);

  // Обработчики изменений
  const updateField = (field: keyof Character, value: any) => {
    setCharacter(prev => ({ ...prev, [field]: value }));
  };

  const updateAbility = (ability: Ability, value: number) => {
    setCharacter(prev => ({
      ...prev,
      abilities: { ...prev.abilities, [ability]: Math.min(20, Math.max(1, value || 0)) }
    }));
  };

  const updateSavingThrow = (ability: Ability, checked: boolean) => {
    setCharacter(prev => ({
      ...prev,
      savingThrows: { ...prev.savingThrows, [ability]: checked }
    }));
  };

  const updateSkillProficiency = (skillName: SkillName, level: ProficiencyLevel) => {
    setCharacter(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skillName]: { ...prev.skills[skillName], proficiency: level }
      }
    }));
  };

  return (
    <div className="main-sheet">
      {/* Аватар */}
      <div className="avatar-section">
        {character.avatarBase64 ? (
          <img src={character.avatarBase64} alt="Avatar" />
        ) : (
          <div className="avatar-placeholder">Нет аватарки</div>
        )}
        {!editMode && (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => updateField('avatarBase64', ev.target?.result);
                reader.readAsDataURL(file);
              }
            }}
          />
        )}
      </div>

      {/* Имя, раса, класс и т.д. */}
      <div className="row">
        <label>Имя</label>
        <input
          type="text"
          value={character.name}
          onChange={(e) => updateField('name', e.target.value)}
          disabled={editMode}
        />
      </div>
      {/* ... аналогично для других полей */}

      {/* Характеристики */}
      <div className="abilities">
        {abilities.map(ab => (
          <div key={ab} className="ability">
            <span>{abilityLabels[ab]}</span>
            <input
              type="number"
              value={character.abilities[ab]}
              onChange={(e) => updateAbility(ab, parseInt(e.target.value) || 0)}
              disabled={editMode}
            />
            <span className="mod">({abilityMods[ab] >= 0 ? '+' : ''}{abilityMods[ab]})</span>
            <label>
              <input
                type="checkbox"
                checked={character.savingThrows[ab]}
                onChange={(e) => updateSavingThrow(ab, e.target.checked)}
                disabled={editMode}
              /> Спасбросок
            </label>
          </div>
        ))}
      </div>

      {/* Навыки */}
      <div className="skills">
        {skillList.map(skill => (
          <SkillProficiency
            key={skill.name}
            label={skill.label}
            abilityMod={abilityMods[skill.ability]}
            proficiencyBonus={proficiencyBonus}
            level={character.skills[skill.name]?.proficiency || 0}
            onChange={(level) => updateSkillProficiency(skill.name, level)}
            disabled={editMode}
          />
        ))}
      </div>

      {/* Хиты, кости, инициатива и т.д. */}
      {/* ... (код опущен для краткости, но он аналогичен) */}
    </div>
  );
};

export default MainSheet;
