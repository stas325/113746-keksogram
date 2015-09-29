/**
 * Created by stas on 25.09.2015.
 */
console.log('1246666');

(function() {
  var filtersHidden = document.querySelector('.filters'); //добавляем скрытый элемент

    // считать классы
   filtersHidden.classList.add('hidden');


  var REQUEST_FAILURE_TIMEOUT = 10000;



    var pictureContainer = document.querySelector('.pictures');

    var pictureTemplate = document.getElementById('picture-template');
    var pictureFragment = document.createDocumentFragment();
    pictures.forEach(function (picture, i) { // перебираем массив - изображение
      var newPictureElement = pictureTemplate.content.children[0].cloneNode(true);


      newPictureElement.querySelector('.picture-likes').textContent = pictures['likes']; // считываем лайки
      newPictureElement.querySelector('.picture-comments').textContent = pictures['comments']; // считываем коменты

      var pictureBackground = new Image(); // работаем с изображением
      pictureBackground.src = picture['url'];


      var imageLoadTimeout = setTimeout(function() {
        newPictureElement.classList.add('picture-load-failure');
      }, REQUEST_FAILURE_TIMEOUT);

      pictureBackground.onload = function() {// При нормальной загрузки изображения

         var imgOLD = document.getElementsByTagName('img')[i+2];
          var imgNEW = document.createElement('img');
          imgNEW.setAttribute("src", pictureBackground.src);
          imgNEW.setAttribute('width', '182');
          imgNEW.setAttribute('height', '182');

          var parentOLD = imgOLD.parentNode;
          parentOLD.replaceChild(imgNEW, imgOLD);

          clearTimeout(imageLoadTimeout);

      };

      pictureBackground.onerror = function(evt) { // при ошибки загрузки
        newPictureElement.classList.add('picture-load-failure');
      };

      pictureFragment.appendChild(newPictureElement); // записываем в фрагмент






    });

  pictureContainer.appendChild(pictureFragment); // выводим фрагмент

  filtersHidden.classList.remove('hidden'); // удаляем hidden

}())