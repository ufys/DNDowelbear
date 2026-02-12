import React, { useState } from 'react';
import { Character, Attack } from '../types/character';
import { v4 as uuidv4 } from 'uuid'; // для генерации id

interface Props {
  character: Character;
  setCharacter: (c: Character | ((prev: Character) => Character)) => void;
  editMode: boolean;
}

const AttacksTab: React.FC<Props> = ({ character, setCharacter, editMode }) => {
  const addAttack = () => {
    const newAttack: Attack = {
      id: uuidv4(),
      name: 'Новая атака',
      attackBonus: 0,
      damage: '1к8',
      damageType: 'дробящий',
    };
    setCharacter(prev => ({ ...prev, attacks: [...prev.attacks, newAttack] }));
  };

  const updateAttack = (id: string, field: keyof Attack, value: any) => {
    setCharacter(prev => ({
      ...prev,
      attacks: prev.attacks.map(a => a.id === id ? { ...a, [field]: value } : a)
    }));
  };

  const deleteAttack = (id: string) => {
    setCharacter(prev => ({ ...prev, attacks: prev.attacks.filter(a => a.id !== id) }));
  };

  return (
    <div className="attacks-tab">
      {!editMode && <button onClick={addAttack}>+ Добавить атаку</button>}
      <table>
        <thead>
          <tr><th>Название</th><th>Бонус атаки</th><th>Урон</th><th>Тип урона</th>{!editMode && <th></th>}</tr>
        </thead>
        <tbody>
          {character.attacks.map(attack => (
            <tr key={attack.id}>
              <td>
                <input
                  type="text"
                  value={attack.name}
                  onChange={e => updateAttack(attack.id, 'name', e.target.value)}
                  disabled={editMode}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={attack.attackBonus}
                  onChange={e => updateAttack(attack.id, 'attackBonus', parseInt(e.target.value) || 0)}
                  disabled={editMode}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={attack.damage}
                  onChange={e => updateAttack(attack.id, 'damage', e.target.value)}
                  disabled={editMode}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={attack.damageType}
                  onChange={e => updateAttack(attack.id, 'damageType', e.target.value)}
                  disabled={editMode}
                />
              </td>
              {!editMode && (
                <td><button onClick={() => deleteAttack(attack.id)}>Удалить</button></td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttacksTab;
