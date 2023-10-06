import { BASE_URL } from '../core/constants.js';

/**
 * Effectue une requête à l'API en utilisant l'endpoint spécifié.
 * @async
 * @function
 * @param {string} endpoint - L'endpoint de l'API à interroger.
 * @param {Object} [options={}] - Les options de la requête (par défaut, un objet vide).
 * @returns {Promise<any>} - Une promesse résolue avec les données de la réponse de l'API.
 * @throws {Error} - Une erreur est générée si la réponse de l'API n'est pas OK (statut en dehors de la plage 200-299).
 * @throws {Error} - Une erreur est générée si la réponse de l'API ne contient pas de message d'erreur, en utilisant le message de statut par défaut.
 * @throws {Error} - Une erreur est générée si la réponse de l'API a un statut "204 No Content".
 */
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
