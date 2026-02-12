import { useEffect, useState } from "react";
import OBR from "@owlbear-rodeo/sdk";
import { Character } from "../types/character";

const METADATA_KEY = "com.example.character-sheet";

export function useCharacterData(itemId: string) {
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const load = async () => {
      const items = await OBR.scene.items.getItems([itemId]);
      if (items.length > 0) {
        const data = items[0].metadata[METADATA_KEY] as Character;
        setCharacter(data);
      }
    };
    load();

    // Подписка на изменения
    return OBR.scene.items.onChange((items) => {
      const item = items.find((i) => i.id === itemId);
      if (item) {
        setCharacter(item.metadata[METADATA_KEY] as Character);
      }
    });
  }, [itemId]);

  const updateCharacter = async (newData: Partial<Character>) => {
    if (!character) return;
    const updated = { ...character, ...newData };
    await OBR.scene.items.updateMetadata([itemId], {
      [METADATA_KEY]: updated,
    });
  };

  return { character, updateCharacter };
}
