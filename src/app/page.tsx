import { ingredients } from "../data/ingredients";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans dark:bg-black">
      <main className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-semibold text-black dark:text-zinc-50">
          Cocktail Ingredients
        </h1>
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <ul className="space-y-2">
            {ingredients.map((ingredient) => (
              <li
                key={ingredient}
                className="rounded-md px-4 py-2 text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
