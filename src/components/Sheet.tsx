import React, { useState } from "react";
import { useCharacterData } from "../hooks/useCharacterData";
import { Tabs } from "./Tabs";
import { StatsTab } from "./StatsTab";
import { AttacksTab } from "./AttacksTab";
import { FeaturesTab } from "./FeaturesTab";
import { InventoryTab } from "./InventoryTab";
import { PersonalityTab } from "./PersonalityTab";
import { GoalsTab } from "./GoalsTab";
import { NotesTab } from "./NotesTab";
import { SpellsTab } from "./SpellsTab";
import { Header } from "./Header";

const tabs = [
  { id: "stats", label: "Характеристики" },
  { id: "attacks", label: "Атаки" },
  { id: "features", label: "Способности" },
  { id: "inventory", label: "Снаряжение" },
  { id: "personality", label: "Личность" },
  { id: "goals", label: "Цели" },
  { id: "notes", label: "Заметки" },
  { id: "spells", label: "Заклинания" },
];

export function Sheet({ itemId }: { itemId: string }) {
  const { character, updateCharacter } = useCharacterData(itemId);
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  if (!character) return <div>Загрузка...</div>;

  const toggleEditMode = () => {
    updateCharacter({ editMode: !character.editMode });
  };

  return (
    <div className="flex flex-col h-full">
      <Header character={character} updateCharacter={updateCharacter} onToggleEditMode={toggleEditMode} />
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 mt-4 overflow-y-auto">
        {activeTab === "stats" && <StatsTab character={character} updateCharacter={updateCharacter} />}
        {activeTab === "attacks" && <AttacksTab character={character} updateCharacter={updateCharacter} />}
        {activeTab === "features" && <FeaturesTab character={character} updateCharacter={updateCharacter} />}
        {activeTab === "inventory" && <InventoryTab character={character} updateCharacter={updateCharacter} />}
        {activeTab === "personality" && <PersonalityTab character={character} updateCharacter={updateCharacter} />}
        {activeTab === "goals" && <GoalsTab character={character} updateCharacter={updateCharacter} />}
        {activeTab === "notes" && <NotesTab character={character} updateCharacter={updateCharacter} />}
        {activeTab === "spells" && <SpellsTab character={character} updateCharacter={updateCharacter} />}
      </div>
    </div>
  );
}
