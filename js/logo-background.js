(function() {
  var server="http://localhost/keksogram/113746-keksogram/";
  var images = [
    server+'img/logo-background-1.jpg',
    server+'img/logo-background-2.jpg',
    server+'img/logo-background-3.jpg'
  ];

  var backgroundElement = document.querySelector('.upload');
  var randomImageNumber = Math.round(Math.random() * (images.length - 1));
  backgroundElement.style.backgroundImage = 'url(' + images[randomImageNumber] + ')';
})();
