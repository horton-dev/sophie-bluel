/**
 * Gère l'interaction avec l'API pour récupérer, supprimer et ajouter des données depuis et vers la base de données.
 * @module api
 */


/**
 * @typedef {Object} APIModule
 * @property {function} getAPIData - Récupère les informations depuis la base de données.
 */
import { token } from "./constants.js";

/**
 * @description Récupère les données depuis l'API en fonction du type de données spécifié.
 * Envoie une requête GET à l'URL spécifiée et retourne la réponse JSON si la requête réussit.
 *
 * @param {string} dataType - Le type de données à récupérer (par exemple, 'works', 'category', etc.).
 * @returns {Promise<Object>|undefined} Les données JSON récupérées, ou undefined si une erreur se produit.
 * @throws {Error} Si une erreur de réseau ou autre se produit.
 */
export async function getAPIData(dataType) {
  try {
    // Envoie une requête GET à l'API pour récupérer les données du type spécifié
    const response = await fetch(`http://localhost:5678/api/${dataType}`);

    // Vérification explicite du code de statut de la réponse (succès si dans la plage 200-299)
    if (response.status >= 200 && response.status < 300) {
      return response.json(); // Renvoie les données JSON de la réponse
    } else {
      // Si la réponse est une erreur, affiche et renvoie l'erreur
      const error = await response.json();
      console.error("Erreur lors de la récupération des données :", error);
    }
  } catch (error) {
    // Si une erreur de réseau ou autre se produit, affiche et renvoie l'erreur
    console.error("Une erreur est survenue :", error);
    throw error;
  }
}

/**
 * @description Supprime un travail spécifique en envoyant une requête DELETE à l'API.
 * @async
 * @function
 * @param {string} workId - L'ID du travail à supprimer.
 * @returns {Promise<number>} - Le code d'état de la réponse HTTP.
 */

export async function deleteWork(workId) {
  // Construction de l'URL de l'API pour supprimer le travail
  const apiUrl = `http://localhost:5678/api/works/${workId}`;

  // Configuration de la requête DELETE
  const requestOptions = {
    method: "DELETE",
    headers: {
      // Ajoute l'en-tête d'autorisation avec le jeton d'accès
      Authorization: `Bearer ${token}`,
    },
  };

  // Envoi de la requête DELETE à l'API
  const response = await fetch(apiUrl, requestOptions);

  // Affichage de la réponse dans la console (peut être retiré en production)
  console.log(response);

  // Renvoi du code d'état de la réponse
  return response.status;
}

/**
 * @description Ajoute un nouveau travail en envoyant une requête POST à l'API.
 * @async
 * @function
 * @param {FormData} formData - Les données du formulaire contenant les détails du travail.
 * @returns {Promise<Object>|undefined} - Les données du nouveau travail si la requête est réussie, sinon undefined.
 */

export async function addWork(formData) {
  // Configuration de l'URL et des options de la requête POST
  const apiUrl = "http://localhost:5678/api/works";
  const requestOptions = {
    method: "POST",
    headers: {
      // Ajoute l'en-tête d'autorisation avec le jeton d'accès
      Authorization: `Bearer ${token}`,
    },
    body: formData, // Ajoute les données du formulaire à la requête
  };

  // Envoie la requête POST à l'API
  const response = await fetch(apiUrl, requestOptions);

  // Si la réponse est OK, renvoie les données JSON de la réponse
  if (response.ok) {
    return response.json();
  }
}

/**
 * @description Met à jour un travail existant en envoyant une requête PUT à l'API.
 * @async
 * @function
 * @param {string} workId - L'ID du travail à mettre à jour.
 * @param {FormData} formData - Les données du formulaire contenant les détails du travail.
 * @returns {Promise<Object>|undefined} - Les données du travail mis à jour si la requête est réussie, sinon undefined.
 */
export async function updateWork(workId, formData) {
  // Configuration de l'URL et des options de la requête PUT
  const apiUrl = `http://localhost:5678/api/works/${workId}`;
  const requestOptions = {
    method: "PUT",
    headers: {
      // Ajoute l'en-tête d'autorisation avec le jeton d'accès
      Authorization: `Bearer ${token}`,
    },
    body: formData, // Ajoute les données du formulaire à la requête
  };

  // Envoie la requête PUT à l'API
  const response = await fetch(apiUrl, requestOptions);

  // Si la réponse est OK, renvoie les données JSON de la réponse
  if (response.ok) {
    return response.json();
  }
}
