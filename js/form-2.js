/**
 * Created by stas on 24.09.2015.
 */


    var uploadForm = document.forms['upload-select-image'];
    var resizeForm= document.forms['upload-resize'];

    var filterForm = document.forms['upload-filter'];

    var previewImaged = resizeForm.querySelector('.resize-image-preview');
var width;



// Работаем со 2 шагом

var formElement = document.forms['upload-resize']; // соеденились с формой

var left = formElement['resize-x']; // подключили элементы
var height = formElement['resize-y'];
var side = formElement['resize-size'];

var MIN_SIZE = 1;

var previewImaged = resizeForm.querySelector('.resize-image-preview');

height.onchange = function(evt) {

   height.min = MIN_SIZE;
   height.max = Math.max(previewImaged.naturalHeight - side.value, 0);

};

left.onchange = function(evt) {
    left.min = MIN_SIZE;
    left.max = Math.max(previewImaged.naturalWidth - side.value, 0);
};

function setSide() {
    side.max = Math.min(
        previewImaged.naturalWidth - left.value,
        previewImaged.naturalHeight - height.value);

    if (side.value > side.max) {
        side.value = Math.max(side.max, side.min);
    }
}

// Проверка, валиден ли размер стороны
function sideIsValid() {
    if (!side.max) {
        setSide();
    }

    return side.value <= side.max;
}