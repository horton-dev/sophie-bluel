function loadHeaderFooter() {
  fetch('header.html')
      .then(response => response.text())
      .then(content => {
          document.getElementById('header-container').innerHTML = content;
      });

  fetch('footer.html')
      .then(response => response.text())
      .then(content => {
          document.getElementById('footer-container').innerHTML = content;
      });
}



function loadSecondModal(){
    fetch('addPicture.html')
        .then(response => response.text())
        .then(content => {
            document.getElementById('modal-container').innerHTML = content;
        });
}

export { loadHeaderFooter, loadSecondModal};