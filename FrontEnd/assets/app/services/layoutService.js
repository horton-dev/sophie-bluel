/**
 * Charge le contenu du header et du footer à partir de fichiers HTML externes et les insère dans les conteneurs correspondants du document.
 * @async
 * @function
 * @throws {Error} - Une erreur est générée si le chargement du header ou du footer échoue.
 */
async function loadHeaderFooter() {
    const headerFetch = fetch('header.html')
        .then(response => response.text())
        .then(content => {
            document.getElementById('header-container').innerHTML = content;
        });
  
    const footerFetch = fetch('footer.html')
        .then(response => response.text())
        .then(content => {
            document.getElementById('footer-container').innerHTML = content;
        });
  
    await Promise.all([headerFetch, footerFetch]);
  }
  
  export { loadHeaderFooter };
  