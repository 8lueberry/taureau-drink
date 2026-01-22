"use client";

import { useState } from "react";
import { ingredients, type Ingredient } from "../data/ingredients";
import { cocktails, type Cocktail } from "../data/cocktails";

export default function Home() {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [draggedIngredient, setDraggedIngredient] = useState<Ingredient | null>(null);

  const availableIngredients = ingredients.filter(
    (ing) => !selectedIngredients.includes(ing)
  );

  const matchingCocktails = cocktails.filter((cocktail) =>
    cocktail.ingredients.some((ing) => selectedIngredients.includes(ing))
  );

  const handleDragStart = (ingredient: Ingredient) => {
    setDraggedIngredient(ingredient);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnSelected = () => {
    if (draggedIngredient && !selectedIngredients.includes(draggedIngredient)) {
      setSelectedIngredients([...selectedIngredients, draggedIngredient]);
    }
    setDraggedIngredient(null);
  };

  const handleDropOnIngredients = () => {
    if (draggedIngredient && selectedIngredients.includes(draggedIngredient)) {
      setSelectedIngredients(selectedIngredients.filter((ing) => ing !== draggedIngredient));
    }
    setDraggedIngredient(null);
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans dark:bg-black">
      <main className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-semibold text-black dark:text-zinc-50">
          Cocktail Ingredients
        </h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div
            className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            onDragOver={handleDragOver}
            onDrop={handleDropOnIngredients}
          >
            <h2 className="mb-4 text-xl font-semibold text-black dark:text-zinc-50">
              Ingredients
            </h2>
            <ul className="space-y-2">
              {availableIngredients.map((ingredient) => (
                <li
                  key={ingredient}
                  draggable
                  onDragStart={() => handleDragStart(ingredient)}
                  className="cursor-move rounded-md px-4 py-2 text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  {ingredient}
                </li>
              ))}
              {availableIngredients.length === 0 && (
                <li className="px-4 py-2 text-zinc-500 dark:text-zinc-400">
                  No ingredients available
                </li>
              )}
            </ul>
          </div>

          <div
            className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            onDragOver={handleDragOver}
            onDrop={handleDropOnSelected}
          >
            <h2 className="mb-4 text-xl font-semibold text-black dark:text-zinc-50">
              Selected ({selectedIngredients.length})
            </h2>
            <ul className="space-y-2">
              {selectedIngredients.map((ingredient) => (
                <li
                  key={ingredient}
                  draggable
                  onDragStart={() => handleDragStart(ingredient)}
                  className="cursor-move rounded-md px-4 py-2 text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  {ingredient}
                </li>
              ))}
              {selectedIngredients.length === 0 && (
                <li className="px-4 py-2 text-zinc-500 dark:text-zinc-400">
                  Drag ingredients here
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-xl font-semibold text-black dark:text-zinc-50">
            Matching Cocktails ({matchingCocktails.length})
          </h2>
          <ul className="space-y-2">
            {matchingCocktails.map((cocktail) => (
              <li
                key={cocktail.name}
                className="rounded-md px-4 py-2 text-zinc-800 dark:text-zinc-200"
              >
                <div className="font-medium">{cocktail.name}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {cocktail.ingredients.join(", ")}
                </div>
              </li>
            ))}
            {matchingCocktails.length === 0 && (
              <li className="px-4 py-2 text-zinc-500 dark:text-zinc-400">
                No cocktails match your selected ingredients
              </li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}
