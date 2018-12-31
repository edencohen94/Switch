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
        url: 'http://192.168.43.91:3060/login',
        data: getDeatilsFromHtml(),
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        dataType: 'jsonp',
        success: function (data) {
            console.log(data);
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
    data.main_currency=$('#dropdownMenuOffset1').val();
    data.secondary_currency=$('#dropdownMenuOffset2').val();
    return data

}