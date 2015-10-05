/**
 * Created by stas on 25.09.2015.
 */

var ReadyState = {
  'UNSENT': 0,
  'OPENED': 1,
  'HEADERS_RECEIVED': 2,
  'LOADING': 3,
  'DONE': 4
};

(function() {
  var filtersHidden = document.querySelector('.filters'); //��������� ������� �������


   filtersHidden.classList.add('hidden');


  var REQUEST_FAILURE_TIMEOUT = 10000; // ������� ����� 10 ������
    var pictures;
    var pictureContainer = document.querySelector('.pictures');

    function renderPictures(pictures)     { // ���������� ������ - �����������

        pictureContainer.classList.remove('pictures-failure');
        pictureContainer.innerHTML = ''; // �������� ���������

    var pictureTemplate = document.getElementById('picture-template'); // ��������� ������
    var pictureFragment = document.createDocumentFragment();

        pictures.forEach(function(picture) {

      var newPictureElement = pictureTemplate.content.children[0].cloneNode(true);


      newPictureElement.querySelector('.picture-likes').textContent = picture['likes']; // ��������� �����
      newPictureElement.querySelector('.picture-comments').textContent = picture['comments']; // ��������� �������

      var pictureBackground = new Image(); // �������� � ������������
      pictureBackground.src = picture['url']; // url ����

      var imageLoadTimeout = setTimeout(function() {
        newPictureElement.classList.add('picture-load-failure');
      }, REQUEST_FAILURE_TIMEOUT);

      pictureBackground.onload = function() {// ��� ���������� �������� �����������

         var imgOLD = newPictureElement.querySelector('img');

        pictureBackground.setAttribute('width', '182');
        pictureBackground.setAttribute('height', '182');

          var parentOLD = imgOLD.parentNode;
          parentOLD.replaceChild(pictureBackground, imgOLD);

          clearTimeout(imageLoadTimeout);

      };

      pictureBackground.onerror = function(evt) { // ��� ������ ��������
        newPictureElement.classList.add('picture-load-failure');
      };
            pictureFragment.appendChild(newPictureElement); // ���������� � ��������
        });
        pictureContainer.appendChild(pictureFragment); // ������� ��������

    };

    function loadPictures(callback) { // �������� ������ �� XMLHttpRequest
        var xhr = new XMLHttpRequest();
        xhr.timeout = REQUEST_FAILURE_TIMEOUT;
        xhr.open('get', 'data/pictures.json');
        xhr.send();

        xhr.onreadystatechange = function(evt) {
            var loadedXhr = evt.target;

            switch (loadedXhr.readyState) {
                case ReadyState.OPENED:
                case ReadyState.HEADERS_RECEIVED:
                case ReadyState.LOADING:
                    pictureContainer.classList.add('pictures-loading');
                    break;

                case ReadyState.DONE:
                default:
                    if (loadedXhr.status == 200) {
                        var data = loadedXhr.response;
                        pictureContainer.classList.remove('pictures-loading');
                        callback(JSON.parse(data));
                    }

                    if (loadedXhr.status > 400) {
                        pictureContainer.classList.remove('pictures-loading');
                        pictureContainer.classList.add('pictures-failure');
                    }
                    break;
            }
        };

        xhr.ontimeout = function() {
            pictureContainer.classList.add('pictures-failure');
        }
    }

    function filterPictures(pictures, filterID) { // ��������� � ��������� ����������
        var filteredPictures = pictures.slice(0);
        switch (filterID) {
            case 'discussed': // �������� �����������
                filteredPictures = filteredPictures.sort(function(a, b) {
                    if (a.comments < b.comments || (b.comments && a.comments === 0)) {
                        return 1;
                    }

                    if (a.comments > b.comments || (a.comments && b.comments === 0)) {
                        return -1;
                    }

                    if (a.comments === b.comments) {
                        return 0;
                    }
                });

                break;

            case 'new': // ���� �� ��������� �����
                filteredPictures = filteredPictures.filter(function(a) {
                    pictures.forEach(function(picture) {

                    var now = new Date(); // ������� ���������� ���������� �� 01.01.1970 �� ������������ ���
                    var today_milisek = now.getTime();

                    var date = new Date(picture['date']);
                        var datailisek = date.getTime();
                        var MiliMesyaz = 1000 * 60 * 60 * 24 * 30;
                        var razniza = (today_milisek - datailisek) / MiliMesyaz;
                    a = razniza;

                    });
                    return a<1;
                });
                break;

            default: // �� ���������
                filteredPictures = pictures.slice(0);
                break;
        }

        return filteredPictures;
    }


    function initFilters() {
        var filterElements = document.getElementsByName('filter');
        for (var i = 0, l = filterElements.length; i < l; i++) {
            filterElements[i].onclick = function(evt) { // ��������� ������� ������
                var clickedFilter = evt.currentTarget;
                setActiveFilter(clickedFilter.value);

            }
        }
    }

    function setActiveFilter(filterID) {
        var filteredPictures = filterPictures(pictures, filterID);
        renderPictures(filteredPictures);
    }

    initFilters();

  filtersHidden.classList.remove('hidden'); // ������� hidden

    loadPictures(function(loadedpicture) {
        pictures = loadedpicture;
        setActiveFilter('popular');// �� ��������� ������ ����������
    });

}())