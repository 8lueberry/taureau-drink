export const cocktails = [
  {
    name: "Margarita",
    ingredients: ["Tequila", "Triple Sec"] as const,
  },
  {
    name: "Old Fashioned",
    ingredients: ["Bourbon", "Vermouth"] as const,
  },
  {
    name: "Martini",
    ingredients: ["Gin", "Vermouth"] as const,
  },
  {
    name: "Mojito",
    ingredients: ["Rum", "Triple Sec"] as const,
  },
  {
    name: "Whiskey Sour",
    ingredients: ["Whiskey", "Triple Sec"] as const,
  },
  {
    name: "Gimlet",
    ingredients: ["Gin", "Triple Sec"] as const,
  },
  {
    name: "Manhattan",
    ingredients: ["Whiskey", "Vermouth"] as const,
  },
  {
    name: "Cosmopolitan",
    ingredients: ["Vodka", "Triple Sec"] as const,
  },
] as const;

export type Cocktail = (typeof cocktails)[number];
