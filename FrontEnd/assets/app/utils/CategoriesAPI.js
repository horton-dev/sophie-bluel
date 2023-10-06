import { apiFetch } from "./apiService.js ";

/**
 * Récupère les données des catégories à partir de l'API.
 * @async
 * @function
 * @returns {Promise<Array>} - Une promesse résolue avec un tableau d'objets représentant les catégories.
 */
export async function fetchCategories() {
  const categories = await apiFetch('categories');
  return categories;
}

/**
 * Convertit un tableau en un ensemble (Set) et le retourne.
 * @async
 * @function
 * @returns {Promise<Set>} - Une promesse résolue avec un ensemble (Set) contenant les données des catégories.
 */
export async function categoriesNewSet() {
  const categories = await fetchCategories();
  const categoriesSet = new Set(categories);
  return categoriesSet;
}