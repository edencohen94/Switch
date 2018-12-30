function loginButton() {
    $.ajax({
        type:"POST",
        url: 'http://172.16.71.96:3060/login',
        data: getDeatilsFromHtml(),
        crossDomain: true,
        dataType: 'json',
        "content-Type": 'application/json',
        success: function (data) {
            console.log(data);
        },
        error: function(err) {
            console.error(err);
        }

    });
}

function getDeatilsFromHtml() {
    let data = {};
    data.email = $('#inputEmail').val();
    data.password = $('#inputPassword').val();
    return data

}