/**
 * Created by stas on 20.09.2015.
 */
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

expires();