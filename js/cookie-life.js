/**
 * Created by stas on 20.09.2015.
 */
function expires() {
    var now = new Date(); // ������� ���������� ���������� �� 01.01.1970 �� ������������ ���
    var today_milisek = now.getTime();
//console.log(today_milisek);

    var birtday = new Date(1987, 11, 31); //���� ��������
    var birtday_milisek = birtday.getTime();
//console.log(birtday_milisek); // ���������� ������ �� 01.01.1970 �� ���� ��������
    var proverka = new Date(birtday_milisek);
//console.log(proverka);

    var diferent = today_milisek - birtday_milisek; // ���������� ���������� �� ��� �������� �� �������;
    var date_expires_cookie = new Date(today_milisek + diferent);
//console.log(date_expires_cookie);

    document.cookie = "expires=" + date_expires_cookie.toUTCString(); // ������������� ���� ��������� cookie
}

expires();