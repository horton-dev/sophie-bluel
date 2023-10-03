import { apiFetch } from "./apiService.js ";

// Récupérer les données de l'API (renvoie un Array)
export async function fetchCategories() {
  const categories = await apiFetch('categories');
  return categories;
}

// Convertir le tableau en Set et le retourner
export async function categoriesNewSet() {
  const categories = await fetchCategories();
  const categoriesSet = new Set(categories);
  return categoriesSet;
}