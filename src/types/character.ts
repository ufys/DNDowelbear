export type Ability = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
export const abilities: Ability[] = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

export type SkillName = 
  | 'acrobatics' | 'animalHandling' | 'arcana' | 'athletics' | 'deception'
  | 'history' | 'insight' | 'intimidation' | 'investigation' | 'medicine'
  | 'nature' | 'perception' | 'performance' | 'persuasion' | 'religion'
  | 'sleightOfHand' | 'stealth' | 'survival';

export type ProficiencyLevel = 0 | 1 | 2; // 0 = none, 1 = proficient, 2 = expertise

export interface Skill {
  ability: Ability;
  proficiency: ProficiencyLevel;
}

export interface Attack {
  id: string;
  name: string;
  attackBonus: number;
  damage: string;
  damageType: string;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  source: string;
}

export interface Equipment {
  id: string;
  name: string;
  quantity: number;
  weightPerUnit: number;
}

export interface Coin {
  pp: number;
  gp: number;
  ep: number;
  sp: number;
  cp: number;
}

export interface Spell {
  id: string;
  name: string;
  level: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  ritual: boolean;
  concentration: boolean;
  classes: string[];
}

export interface SpellSlots {
  level1: { max: number; current: number };
  level2: { max: number; current: number };
  level3: { max: number; current: number };
  level4: { max: number; current: number };
  level5: { max: number; current: number };
  level6: { max: number; current: number };
  level7: { max: number; current: number };
  level8: { max: number; current: number };
  level9: { max: number; current: number };
}

export interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

export interface Character {
  // Основное
  avatarBase64?: string;
  name: string;
  race: string;
  subrace: string;
  class: string;
  subclass: string;
  level: number;
  speed: number;
  armorClass: number;
  inspiration: boolean;
  // Хиты
  hpMax: number;
  hpCurrent: number;
  hpTemp: number;
  // Кости хитов
  hitDice: string;   // например "2d10"
  hitDiceSpent: number;
  // Характеристики
  abilities: Record<Ability, number>;
  savingThrows: Record<Ability, boolean>; // владение спасброском
  // Навыки
  skills: Record<SkillName, Skill>;
  // Атаки
  attacks: Attack[];
  // Способности и черты
  features: Feature[];
  // Снаряжение
  equipment: Equipment[];
  coins: Coin;
  carryWeight: number; // общий вес
  // Личность
  alignment: string;
  background: string;
  traits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  appearance: string;
  backstory: string;
  // Цели
  goals: Goal[];
  // Заметки (HTML)
  notes: string;
  // Заклинания
  spellSlots: SpellSlots;
  spells: Spell[];
}

export const defaultCharacter: Character = {
  avatarBase64: '',
  name: '',
  race: '',
  subrace: '',
  class: '',
  subclass: '',
  level: 1,
  speed: 30,
  armorClass: 10,
  inspiration: false,
  hpMax: 10,
  hpCurrent: 10,
  hpTemp: 0,
  hitDice: '1d10',
  hitDiceSpent: 0,
  abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
  savingThrows: { str: false, dex: false, con: false, int: false, wis: false, cha: false },
  skills: {} as Record<SkillName, Skill>, // будет заполнено позже
  attacks: [],
  features: [],
  equipment: [],
  coins: { pp: 0, gp: 0, ep: 0, sp: 0, cp: 0 },
  carryWeight: 0,
  alignment: 'True Neutral',
  background: '',
  traits: '',
  ideals: '',
  bonds: '',
  flaws: '',
  appearance: '',
  backstory: '',
  goals: [],
  notes: '',
  spellSlots: {
    level1: { max: 0, current: 0 },
    level2: { max: 0, current: 0 },
    level3: { max: 0, current: 0 },
    level4: { max: 0, current: 0 },
    level5: { max: 0, current: 0 },
    level6: { max: 0, current: 0 },
    level7: { max: 0, current: 0 },
    level8: { max: 0, current: 0 },
    level9: { max: 0, current: 0 },
  },
  spells: [],
};
