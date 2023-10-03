import { BASE_URL } from '../core/constants.js';

async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  

  // Si la réponse n'est pas OK (status en dehors de la plage 200-299), générer une erreur.
  if (!response.ok) {
      const responseData = await response.json();
      const errorMessage = responseData.message || response.statusText;
      throw new Error(errorMessage);
  }

  // Si la réponse est "204 No Content", renvoyer null.
  if (response.status === 204) return null;

  // Sinon, renvoyer la réponse convertie en objet JSON.
  return await response.json();
}

export { apiFetch };
