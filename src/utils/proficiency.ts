export function calculateProficiencyBonus(level: number): number {
  return Math.floor((level + 7) / 4);
}

export function calculateModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}
