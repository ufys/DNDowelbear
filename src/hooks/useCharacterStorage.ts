import { useEffect, useState, useCallback, useRef } from 'react';
import OBR from '@owlbear-rodeo/sdk';
import { Character, defaultCharacter } from '../types/character';

export function useCharacterStorage() {
  const [character, setCharacter] = useState<Character>(defaultCharacter);
  const [loading, setLoading] = useState(true);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [sceneId, setSceneId] = useState<string | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Получить playerId и sceneId
  useEffect(() => {
    const init = async () => {
      const pid = await OBR.player.getId();
      const sid = await OBR.scene.getId();
      setPlayerId(pid);
      setSceneId(sid);
    };
    init();
  }, []);

  // Загрузить данные при изменении player/scene
  useEffect(() => {
    if (!playerId || !sceneId) return;
    const key = `dnd-sheet-${playerId}-${sceneId}`;
    setLoading(true);
    OBR.storage.getItem(key).then((data) => {
      if (data && typeof data === 'object') {
        setCharacter(data as Character);
      } else {
        setCharacter(defaultCharacter);
      }
      setLoading(false);
    });
  }, [playerId, sceneId]);

  // Автосохранение с debounce
  const save = useCallback((newChar: Character) => {
    if (!playerId || !sceneId) return;
    const key = `dnd-sheet-${playerId}-${sceneId}`;
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      OBR.storage.setItem(key, newChar);
    }, 500);
  }, [playerId, sceneId]);

  // Обработчик обновления
  const updateCharacter = useCallback((newChar: Character | ((prev: Character) => Character)) => {
    setCharacter(prev => {
      const updated = typeof newChar === 'function' ? newChar(prev) : newChar;
      save(updated);
      return updated;
    });
  }, [save]);

  return { character, setCharacter: updateCharacter, loading, playerId, sceneId };
}
