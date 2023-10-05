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
  