export interface Character {
  name: string;
  race: string;
  subrace: string;
  class: string;
  subclass: string;
  level: number;
  speed: number;
  initiative: number;
  image: string | null;
  stats: Record<string, number>;
  savingThrows: Record<string, boolean>;
  skills: Record<string, 0 | 1 | 2>; // 0=нет,1=владение,2=экспертиза
  attacks: Attack[];
  features: Feature[];
  inventory: Item[];
  personality: Personality;
  goals: Goal[];
  notes: string;
  spells: Spell[];
  editMode: boolean;
}

export interface Attack {
  name: string;
  bonus: number;
  damage: string;
  type: string;
  properties: string;
  range: number;
}

export interface Spell {
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  duration: string;
  components: string;
  concentration: boolean;
  ritual: boolean;
  description: string;
  higherLevels?: string;
}
