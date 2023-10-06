import { apiFetch } from "./apiService.js";

/**
 * Récupère les données de la galerie à partir de l'API.
 * @async
 * @function
 * @returns {Promise<Array>} - Une promesse résolue avec un tableau d'objets représentant la galerie.
 */
export async function fetchGallery() {
  const gallery = await apiFetch('works');
  return gallery;
}

/**
 * Convertit un tableau en un ensemble (Set) et le retourne.
 * @async
 * @function
 * @returns {Promise<Set>} - Une promesse résolue avec un ensemble (Set) contenant les données de la galerie.
 */
export async function galleryNewSet() {
  const gallery = await fetchGallery();
  const gallerySet = new Set(gallery);
  return gallerySet;
}
