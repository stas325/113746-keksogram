/**
 * Created by stas on 25.09.2015.
 */
(function() {
    var uploadForm = document.forms['upload-select-image'];
    var resizeForm = document.forms['upload-resize'];
    var filterForm = document.forms['upload-filter'];

    var previewImage = resizeForm.querySelector('.resize-image-preview');
    var prevButton = resizeForm['resize-prev'];

    var displacementX = resizeForm['resize-x'];
    var displacementY = resizeForm['resize-y'];
    var side = resizeForm['resize-size'];

    // Ќачальные значени€ полей. —уществует веро€тность, что поле side будет
    // больше положеного. Ёто не страшно, потому что существует второй этап
    // валидации: по отправке формы.
    displacementX.value = 0;
    displacementY.value = 0;
    side.value = 100;

    // ћинимальные значени€: смещение не меньше 0, размер стороны квадрата
    // не меньше 1.
    displacementX.min = 0;
    displacementY.min = 0;
    side.min = 1;

    // ”становка максимального значени€ смещений и, одновременно, подгонка под
    // эти значени€. ≈сли размеры не совпадают с требуемыми, измен€ем значение
    // пол€
    function setDisplacement() {
        displacementX.max = Math.max(previewImage.naturalWidth - side.value, 0);
        displacementY.max = Math.max(previewImage.naturalHeight - side.value, 0);

        if (displacementX.value > displacementX.max) {
            displacementX.value = displacementX.max;
        }

        if (displacementY.value > displacementY.max) {
            displacementY.value = displacementY.max;
        }
    }

    // ѕроверка, валидны ли значени€ смешений.
    function displacementIsValid() {
        if (!displacementX.max || !displacementY.max) {
            setDisplacement();
        }

        return displacementX.value <= displacementX.max && displacementY.value <= displacementY.max;
    }

    // ”становка максимального значени€ стороны. –азмер картинки минус смещение.
    // ќдновременна€ подгонка размера стороны под максимальное значение.
    function setSide() {
        side.max = Math.min(
            previewImage.naturalWidth - displacementX.value,
            previewImage.naturalHeight - displacementY.value);

        if (side.value > side.max) {
            side.value = Math.max(side.max, side.min);
        }
    }

    // ѕроверка, валиден ли размер стороны
    function sideIsValid() {
        if (!side.max) {
            setSide();
        }

        return side.value <= side.max;
    }

    // ќбработчик изменени€ смещени€ по ’, устанавливает максимальное
    // значение стороны.
    displacementX.onchange = function() {
        if (!displacementX.max) {
            setDisplacement();
        }

        setSide();
    };

    // ќбработчик изменени€ смещени€ по Y, устанавливает максимальное
    // значение стороны.
    displacementY.onchange = function() {
        if (!displacementY.max) {
            setDisplacement();
        }

        setSide();
    };

    // ќбработчик изменени€ стороны, устанавливает максимумы дл€ смещений.
    side.onchange = function() {
        if (!side.max) {
            setSide();
        }

        setDisplacement();
    };

    prevButton.onclick = function(evt) {
        evt.preventDefault();

        resizeForm.reset();
        uploadForm.reset();
        resizeForm.classList.add('invisible');
        uploadForm.classList.remove('invisible');
    };

    resizeForm.onsubmit = function(evt) {
        evt.preventDefault();

        // ѕереход к следующей форме происходит только, если значени€ этой проход€т
        // валидацию (перестраховка)
        if (sideIsValid() && displacementIsValid()) {
            filterForm.elements['filter-image-src'] = previewImage.src;

            resizeForm.classList.add('invisible');
            filterForm.classList.remove('invisible');
        }
    };
})();