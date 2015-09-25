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




left.value = 1;
height.value = 1;


var MIN_SIZE = 1;

var xx = 1200;
var yy = 1500;
var max_size = 1000;

var previewImaged = resizeForm.querySelector('.resize-image-preview');

height.onchange = function(evt) {

   height.min = MIN_SIZE;
   height.max = Math.max(previewImaged.naturalHeight - side.value, 0);

    console.log (max_size);


};

left.onchange = function(evt) {
    left.min = MIN_SIZE;
    left.max = Math.max(previewImaged.naturalHeight - side.value, 0);
};