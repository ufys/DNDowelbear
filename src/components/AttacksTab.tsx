import React from "react";
import { useRoll } from "../hooks/useRoll";

export function AttacksTab({ character, updateCharacter }) {
  const isEdit = character.editMode;
  const { rollD20 } = useRoll();

  const addAttack = () => {
    updateCharacter({
      attacks: [
        ...character.attacks,
        { name: "New Attack", bonus: 0, damage: "1d8", type: "slashing", properties: "", range: 5 },
      ],
    });
  };

  return (
    <div className="space-y-2">
      {character.attacks.map((attack, idx) => (
        <div key={idx} className="bg-dark-card p-2 rounded flex items-center gap-4">
          {isEdit ? (
            <input
              value={attack.name}
              onChange={(e) => {
                const newAttacks = [...character.attacks];
                newAttacks[idx].name = e.target.value;
                updateCharacter({ attacks: newAttacks });
              }}
              className="bg-dark-bg border border-dark-border rounded px-2 py-1"
            />
          ) : (
            <span className="font-semibold">{attack.name}</span>
          )}
          <span>Бонус: {attack.bonus}</span>
          <span>Урон: {attack.damage} {attack.type}</span>
          <button
            onClick={() => rollD20(attack.bonus)}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Бросок
          </button>
          {isEdit && (
            <button
              onClick={() => {
                const newAttacks = character.attacks.filter((_, i) => i !== idx);
                updateCharacter({ attacks: newAttacks });
              }}
              className="text-red-400"
            >
              Удалить
            </button>
          )}
        </div>
      ))}
      {isEdit && (
        <button onClick={addAttack} className="px-4 py-2 bg-green-600 rounded">
          + Добавить атаку
        </button>
      )}
    </div>
  );
}
