var preferred1;
var preferred2;
for (let currency of config.currencies) {
    let element = $("<a></a>").addClass("dropdown-item");
    element.text(currency.name + " - " + currency.code);
    $("#currency-dropdown").append(element);
}

for (let currency of config.currencies) {
    let element = $("<a></a>").addClass("dropdown-item");
    element.text(currency.name + " - " + currency.code);
    $("#currency-dropdown2").append(element);
}

$("#currency-dropdown").click(function () {
    preferred1 = (event.target).text;
    $("#dropdownMenuOffset1").val(preferred1);
});
$("#currency-dropdown2").click(function () {
    preferred2 = (event.target).text;
    $("#dropdownMenuOffset2").val(preferred2);
});


function signUpButton() {
    $.ajax({
        type:"POST",
        url: config.host +'/signup',
        data: getDeatilsFromHtml(),
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        "content-Type": 'application/json',
        success: function (data) {
            window.location.href = '../homePage/newHome.html';
        }

    });
}

function getDeatilsFromHtml() {
    let data = {};
    data.first_name = $('#inputFirstName').val();
    data.last_name = $('#inputLastName').val();
    data.email = $('#inputEmail').val();
    data.password = $('#inputPassword').val();
    data.phone = $('#inputPhone').val();
    data.address_1 = $('#inputAddress').val();
    data.address_2 = $('#inputAddress2').val();
    data.city_1 = $('#inputCity').val();
    data.city_2 = $('#inputCity2').val();
    data.main_currency=($('#dropdownMenuOffset1').val().split(" "))[3];
    data.secondary_currency=($('#dropdownMenuOffset2').val().split(" "))[3];
    return data

}