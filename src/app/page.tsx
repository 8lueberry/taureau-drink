"use client";

import { useState, useRef, useCallback } from "react";
import { ingredients, type Ingredient } from "../data/ingredients";
import { cocktails } from "../data/cocktails";

export default function Home() {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [draggedIngredient, setDraggedIngredient] = useState<Ingredient | null>(null);
  // Track if a drag operation is in progress to prevent click from firing after drag
  const isDraggingRef = useRef(false);
  // Track if we should use touch mode (detected on first interaction)
  const [isTouchDevice, setIsTouchDevice] = useState<boolean | null>(null);

  const availableIngredients = ingredients.filter(
    (ing) => !selectedIngredients.includes(ing)
  );

  const matchingCocktails = cocktails.filter((cocktail) =>
    cocktail.ingredients.some((ing) => selectedIngredients.includes(ing))
  );

  // Detect touch device on first touch event
  const handleTouchStart = useCallback(() => {
    if (isTouchDevice === null) {
      setIsTouchDevice(true);
    }
  }, [isTouchDevice]);

  // Detect pointer device on first mouse event
  const handleMouseDown = useCallback(() => {
    if (isTouchDevice === null) {
      setIsTouchDevice(false);
    }
  }, [isTouchDevice]);

  const handleDragStart = (ingredient: Ingredient) => {
    isDraggingRef.current = true;
    setDraggedIngredient(ingredient);
  };

  const handleDragEnd = () => {
    // Use setTimeout to allow the drag operation to complete before resetting
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 0);
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

  const handleTapIngredient = (ingredient: Ingredient) => {
    // Don't process click if we just finished dragging
    if (isDraggingRef.current) return;
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleTapSelectedIngredient = (ingredient: Ingredient) => {
    // Don't process click if we just finished dragging
    if (isDraggingRef.current) return;
    setSelectedIngredients(selectedIngredients.filter((ing) => ing !== ingredient));
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-4 font-sans dark:bg-black sm:p-6 md:p-8">
      <main className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-2xl font-semibold text-black dark:text-zinc-50 sm:mb-6 sm:text-3xl">
          Cocktail Ingredients
        </h1>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <div
            className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6"
            onDragOver={handleDragOver}
            onDrop={handleDropOnIngredients}
          >
            <h2 className="mb-3 text-lg font-semibold text-black dark:text-zinc-50 sm:mb-4 sm:text-xl">
              Ingredients
            </h2>
            <ul className="space-y-2 sm:space-y-3">
              {availableIngredients.map((ingredient) => (
                <li
                  key={ingredient}
                  draggable={!isTouchDevice}
                  onDragStart={() => handleDragStart(ingredient)}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleTapIngredient(ingredient)}
                  onTouchStart={handleTouchStart}
                  onMouseDown={handleMouseDown}
                  className={`min-h-[44px] truncate rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-base text-zinc-800 shadow-sm transition-all duration-150 select-none hover:border-zinc-300 hover:bg-zinc-100 hover:shadow active:scale-[0.98] active:border-zinc-400 active:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-700 dark:active:border-zinc-500 dark:active:bg-zinc-600 ${
                    isTouchDevice ? "cursor-pointer" : "cursor-move"
                  }`}
                >
                  {ingredient}
                </li>
              ))}
              {availableIngredients.length === 0 && (
                <li className="min-h-[44px] rounded-lg border border-dashed border-zinc-300 px-4 py-3 text-center text-base text-zinc-500 dark:border-zinc-600 dark:text-zinc-400">
                  No ingredients available
                </li>
              )}
            </ul>
          </div>

          <div
            className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6"
            onDragOver={handleDragOver}
            onDrop={handleDropOnSelected}
          >
            <h2 className="mb-3 text-lg font-semibold text-black dark:text-zinc-50 sm:mb-4 sm:text-xl">
              Selected ({selectedIngredients.length})
            </h2>
            <ul className="space-y-2 sm:space-y-3">
              {selectedIngredients.map((ingredient) => (
                <li
                  key={ingredient}
                  draggable={!isTouchDevice}
                  onDragStart={() => handleDragStart(ingredient)}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleTapSelectedIngredient(ingredient)}
                  onTouchStart={handleTouchStart}
                  onMouseDown={handleMouseDown}
                  className={`min-h-[44px] truncate rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-base text-zinc-800 shadow-sm transition-all duration-150 select-none hover:border-emerald-300 hover:bg-emerald-100 hover:shadow active:scale-[0.98] active:border-emerald-400 active:bg-emerald-200 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-zinc-200 dark:hover:border-emerald-700 dark:hover:bg-emerald-800/40 dark:active:border-emerald-600 dark:active:bg-emerald-700/50 ${
                    isTouchDevice ? "cursor-pointer" : "cursor-move"
                  }`}
                >
                  {ingredient}
                </li>
              ))}
              {selectedIngredients.length === 0 && (
                <li className="min-h-[44px] rounded-lg border border-dashed border-zinc-300 px-4 py-3 text-center text-base text-zinc-500 dark:border-zinc-600 dark:text-zinc-400">
                  Tap or drag ingredients here
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:mt-6 sm:p-6">
          <h2 className="mb-3 text-lg font-semibold text-black dark:text-zinc-50 sm:mb-4 sm:text-xl">
            Matching Cocktails ({matchingCocktails.length})
          </h2>
          <ul className="max-h-[50vh] space-y-2 overflow-y-auto sm:max-h-[60vh] sm:space-y-3">
            {matchingCocktails.map((cocktail) => (
              <li
                key={cocktail.name}
                className="min-h-[44px] rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 shadow-sm dark:border-amber-800 dark:bg-amber-900/30"
              >
                <div className="text-base font-medium text-zinc-800 dark:text-zinc-100">
                  {cocktail.name}
                </div>
                <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
                  {cocktail.ingredients.join(", ")}
                </div>
              </li>
            ))}
            {matchingCocktails.length === 0 && (
              <li className="min-h-[44px] rounded-lg border border-dashed border-zinc-300 px-4 py-3 text-center text-base text-zinc-500 dark:border-zinc-600 dark:text-zinc-400">
                No cocktails match your selected ingredients
              </li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}
