function loginButton() {
    $.ajax({
        type:"POST",
        url: 'http://192.168.43.91:3060/login',
        data: getDeatilsFromHtml(),
        crossDomain: true,
        dataType: 'jsonp',
        success: function (data) {
            console.log(data);
        }

    });
}

function getDeatilsFromHtml() {
    let data = {};
    data.email = $('#inputEmail').val();
    data.password = $('#inputPassword').val();
    return data

}