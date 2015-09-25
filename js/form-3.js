/**
 * Created by stas on 22.09.2015.
 */
//console.log("123");

function expires() {
    var now = new Date(); // Получим количество милисекунд от 01.01.1970 до сегодняшнего дня
    var today_milisek = now.getTime();
//console.log(today_milisek);

    var birtday = new Date(1987, 11, 31); //дата рождения
    var birtday_milisek = birtday.getTime();
//console.log(birtday_milisek); // количество секунд от 01.01.1970 до даты рождения
    var proverka = new Date(birtday_milisek);
//console.log(proverka);

    var diferent = today_milisek - birtday_milisek; // количество милисекунд от дня рождения до сегодня;
    var date_expires_cookie = new Date(today_milisek + diferent);
//console.log(date_expires_cookie);

    document.cookie = "expires=" + date_expires_cookie.toUTCString(); // устанавливаем дату окончания cookie
}

var formElement = document.forms['upload-filter']; // подгружаем форму
var expire = expires();
console.log(expire);
var none = formElement['upload-filter-none']; // подгружаем элементы
var chrome = formElement['upload-filter-chrome'];
var sepia = formElement['upload-filter-sepia'];

function getCookie(name) { // функция считывания cookie
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

var filter_u =  getCookie('cookie_filter'); // переменная со значение cookie_filter

if (filter_u == "none") {
    document.forms['upload-filter']['upload-filter'].value = 'none'; // если в куки none, то ставим none по умолчанию
}
if (filter_u == "chrome") {
    document.forms['upload-filter']['upload-filter'].value = 'chrome';
}
if (filter_u == "sepia") {
    document.forms['upload-filter']['upload-filter'].value = 'sepia';
}




function setCookie(name, value, options) { // работаем с куки
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

none.onchange = function(evt) { // если изменился none - записываем cookie
    evt.preventDefault();

   setCookie('cookie_filter', 'none', expire)

}

chrome.onchange = function(evt) {
    evt.preventDefault();

    setCookie('cookie_filter', 'chrome', expire)

}

sepia.onchange = function(evt) {
    evt.preventDefault();

    setCookie('cookie_filter', 'sepia', expire)

}














