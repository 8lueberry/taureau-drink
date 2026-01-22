export const ingredients = [
  "Vodka",
  "Gin",
  "Rum",
  "Tequila",
  "Whiskey",
  "Bourbon",
  "Scotch",
  "Brandy",
  "Cognac",
  "Triple Sec",
  "Vermouth",
] as const;

export type Ingredient = (typeof ingredients)[number];
