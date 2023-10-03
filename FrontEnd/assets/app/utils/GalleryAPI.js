import { apiFetch } from "./apiService.js";

// Récupérer les données de l'API (renvoie un Array)
export async function fetchGallery() {
  const gallery = await apiFetch('works');
  return gallery;
}

// Convertir le tableau en Set et le retourner
export async function galleryNewSet() {
  const gallery = await fetchGallery();
  const gallerySet = new Set(gallery);
  return gallerySet;
}
