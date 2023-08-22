/**
 * Gère l'interaction avec l'API pour récupérer, supprimer et ajouter des données depuis et vers la base de données.
 * @module api
 */


/**
 * @typedef {Object} APIModule
 * @property {function} getAPIData - Récupère les informations depuis la base de données.
 */


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
