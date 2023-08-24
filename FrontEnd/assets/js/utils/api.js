/**
 * Le module API gère les interactions avec l'API backend, y compris la récupération, la suppression, et l'ajout de données. 
 * Il exporte des fonctions qui encapsulent des appels HTTP spécifiques pour effectuer ces actions sur les ressources, 
 * telles que les projets, en utilisant des méthodes standard telles que GET, POST et DELETE.
 * @module api
 */

/**
 * @typedef {Object} APIModule
 * @property {function} getAPIData - Récupère les informations depuis la base de données selon le type de données spécifié.
 * @property {function} deleteWork - Supprime un projet spécifique en envoyant une requête DELETE à l'API.
 * @property {function} addWork - Ajoute un nouveau projet en envoyant une requête POST à l'API.
 */

// Importe le token utilisé pour l'autorisation dans les requêtes à l'API
import { token } from "./constants.js";

/**
 * @description Récupère les données depuis l'API en fonction du type de données spécifié. 
 * Cette fonction envoie une requête GET à l'URL construite avec le paramètre `dataType` 
 * et retourne les données JSON si la requête réussit. Si la requête échoue, la fonction affiche l'erreur 
 * dans la console et renvoie undefined.
 * 
 * @async
 * @function getAPIData
 * @param {string} dataType - Le type de données à récupérer. Cela correspond à l'endpoint de l'API et doit être une chaîne valide (par exemple, 'works', 'category', etc.).
 * @returns {Promise<Object>|undefined} Les données JSON récupérées, ou undefined si une erreur se produit ou si la réponse est dans une plage de codes d'état d'erreur (non 200-299).
 * @throws {Error} Si une erreur de réseau ou autre se produit, une erreur sera levée. Cela peut inclure des problèmes comme une URL incorrecte ou des problèmes de connexion réseau.
 */
export async function getAPIData(dataType) {
  try {
    // Construction de l'URL et envoi d'une requête GET à l'API pour récupérer les données du type spécifié
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
 * @description Envoyez une requête DELETE à l'API pour supprimer un travail spécifique.
 * Cette fonction utilise l'authentification via un en-tête d'autorisation et nécessite un ID de travail pour identifier le travail à supprimer.
 * Elle renvoie le code d'état de la réponse HTTP, qui peut être utilisé pour déterminer si l'opération a réussi.
 * 
 * @async
 * @function deleteWork
 * @param {string} workId - L'ID unique du travail à supprimer. Il doit s'agir d'une chaîne valide qui représente l'ID unique du travail.
 * @returns {Promise<number>} - Renvoie une promesse qui résout en un nombre représentant le code d'état de la réponse HTTP. Par exemple, 204 pour un succès sans contenu.
 * @throws {Error} Si la requête échoue (réponse non réussie), une erreur sera levée avec un message approprié.
 * @example
 * deleteWork("1234")
 *  .then(status => console.log(`Suppression réussie avec le code d'état : ${status}`))
 *  .catch(error => console.error(error));
 */
export async function deleteWork(workId) {
  // Construction de l'URL de l'API avec l'ID du travail spécifique à supprimer
  const apiUrl = `http://localhost:5678/api/works/${workId}`;

  // Configuration des options de la requête DELETE, y compris la méthode et les en-têtes
  const requestOptions = {
    method: "DELETE",
    headers: {
      // Ajoute l'en-tête d'autorisation avec le jeton d'accès
      Authorization: `Bearer ${token}`,
    },
  };

  // Envoi de la requête DELETE à l'API et attente de la réponse
  const response = await fetch(apiUrl, requestOptions);

  // Vérifie si la réponse est réussie, sinon lève une erreur
  if (!response.ok) {
    throw new Error(`Échec de la suppression du travail avec le code d'état : ${response.status}`);
  }

  // Renvoi du code d'état de la réponse pour indiquer le résultat de l'opération
  return response.status;
}



/**
 * @description Envoyez une requête POST à l'API pour créer un nouveau projet avec les détails fournis.
 * Cette fonction prend en charge l'authentification via un en-tête d'autorisation et attend un objet FormData pour les détails.
 * Si la création est réussie, les données du nouveau projet sont renvoyées.
 * 
 * @async
 * @function addWork
 * @param {FormData} formData - Les données du formulaire contenant les détails du projet. Cela doit inclure tous les champs nécessaires pour la création.
 * @returns {Promise<Object>|undefined} - Renvoie une promesse qui résout en un objet contenant les données du nouveau projet si la requête est réussie, sinon undefined.
 * @throws {Error} Si la requête échoue, une erreur sera levée.
  */
export async function addWork(formData) {
  // Configuration de l'URL de l'API pour la création d'un nouveau projet
  const apiUrl = "http://localhost:5678/api/works";

  // Configuration des options de la requête, y compris la méthode, les en-têtes et le corps
  const requestOptions = {
    method: "POST",
    headers: {
      // Ajoute l'en-tête d'autorisation avec le jeton d'accès
      Authorization: `Bearer ${token}`,
    },
    body: formData, // Ajoute les données du formulaire à la requête
  };

  // Envoie la requête POST à l'API et attend une réponse
  const response = await fetch(apiUrl, requestOptions);

  // Si la réponse est OK, renvoie les données JSON de la réponse
  if (response.ok) {
    return response.json();
  }

  // Si la réponse n'est pas OK, vous pouvez lever une erreur ou gérer l'erreur comme vous le souhaitez
  throw new Error('La création du travail a échoué.');
}
