/** 
 * @constant
 * @description Fichier de constantes.
 */

/**
 * L'URL de base de l'API.
 * @type {string}
 */
const BASE_URL = 'http://localhost:5678/api/';

/**
 * Le jeton d'accès (token) de l'utilisateur stocké en session.
 * @type {string|null}
 */
const ACCESS_TOKEN = sessionStorage.accessToken;

export {BASE_URL, ACCESS_TOKEN}