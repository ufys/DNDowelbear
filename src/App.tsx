import React, { useState, useMemo, useCallback } from 'react';
import { Character } from './types/character';
import { useEditMode } from './hooks/useEditMode';
import MainSheet from './components/MainSheet';
import AttacksTab from './components/AttacksTab';
import FeaturesTab from './components/FeaturesTab';
import EquipmentTab from './components/EquipmentTab';
import PersonalityTab from './components/PersonalityTab';
import GoalsTab from './components/GoalsTab';
import NotesTab from './components/NotesTab';
import SpellsTab from './components/SpellsTab';
import './styles/main.css';

interface AppProps {
  character: Character;
  setCharacter: (c: Character | ((prev: Character) => Character)) => void;
}

const App: React.FC<AppProps> = ({ character, setCharacter }) => {
  const { mode, toggleMode } = useEditMode('edit');
  const [activeTab, setActiveTab] = useState('main');
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    { id: 'main', label: 'Основное' },
    { id: 'attacks', label: 'Атаки' },
    { id: 'features', label: 'Способности' },
    { id: 'equipment', label: 'Снаряжение' },
    { id: 'personality', label: 'Личность' },
    { id: 'goals', label: 'Цели' },
    { id: 'notes', label: 'Заметки' },
    { id: 'spells', label: 'Заклинания' },
  ];

  const handleExport = useCallback(() => {
    const json = JSON.stringify(character, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `character-${character.name || 'export'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [character]);

  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          try {
            const imported = JSON.parse(ev.target?.result as string);
            setCharacter(imported);
          } catch (err) {
            alert('Ошибка импорта: неверный JSON');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [setCharacter]);

  return (
    <div className="sheet-container" data-mode={mode}>
      {/* Шапка с шестерёнкой */}
      <div className="sheet-header">
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="settings-menu">
          <button onClick={() => setMenuOpen(!menuOpen)}>⚙️</button>
          {menuOpen && (
            <div className="dropdown">
              <label>
                <input
                  type="radio"
                  name="mode"
                  value="edit"
                  checked={mode === 'edit'}
                  onChange={toggleMode}
                /> Режим редактирования
              </label>
              <label>
                <input
                  type="radio"
                  name="mode"
                  value="play"
                  checked={mode === 'play'}
                  onChange={toggleMode}
                /> Режим игры
              </label>
              <hr />
              <button onClick={handleExport}>Экспорт JSON</button>
              <button onClick={handleImport}>Импорт JSON</button>
            </div>
          )}
        </div>
      </div>

      {/* Контент вкладки */}
      <div className="sheet-content">
        {activeTab === 'main' && <MainSheet character={character} setCharacter={setCharacter} editMode={mode === 'play'} />}
        {activeTab === 'attacks' && <AttacksTab character={character} setCharacter={setCharacter} editMode={mode === 'play'} />}
        {activeTab === 'features' && <FeaturesTab character={character} setCharacter={setCharacter} editMode={mode === 'play'} />}
        {activeTab === 'equipment' && <EquipmentTab character={character} setCharacter={setCharacter} editMode={mode === 'play'} />}
        {activeTab === 'personality' && <PersonalityTab character={character} setCharacter={setCharacter} editMode={mode === 'play'} />}
        {activeTab === 'goals' && <GoalsTab character={character} setCharacter={setCharacter} editMode={mode === 'play'} />}
        {activeTab === 'notes' && <NotesTab character={character} setCharacter={setCharacter} editMode={mode === 'play'} />}
        {activeTab === 'spells' && <SpellsTab character={character} setCharacter={setCharacter} editMode={mode === 'play'} />}
      </div>
    </div>
  );
};

export default App;
