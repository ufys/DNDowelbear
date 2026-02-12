import { useState } from 'react';

export type EditMode = 'edit' | 'play';

export function useEditMode(initialMode: EditMode = 'edit') {
  const [mode, setMode] = useState<EditMode>(initialMode);
  const toggleMode = () => setMode(m => m === 'edit' ? 'play' : 'edit');
  return { mode, setMode, toggleMode };
}
