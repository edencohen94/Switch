// get user's name for greeting
$.ajax({
    type:"POST",
    url: config.host+ '/user',
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    },
    success: function(data) {
        details=data.result;
        $(".greetings").text(details.first_name +"'s profile");
        $("#inputFirstName").val(details.first_name);
        $("#inputLastName").val(details.last_name);
        $("#inputPhone").val(details.phone);
        $("#inputMainAddress").val(details.address_1);
        $("#inputCity").val(details.city_1);
        $("#inputSecondAddress").val(details.address_2);
        $("#inputCity2").val(details.city_2);
        $("#inputPcurrency").val(details.main_currency);
        $("#inputScurrency").val(details.secondary_currency);
    },
    dataType: 'json'
});

function submitChanges(){
    $.ajax({
        type:"POST",
        url: config.host+ '/user',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            window.location.href = '../profile/profile.html';
        },
        dataType: 'json'
    });
}

for (let currency of config.currencies) {
    let element2 = $("<a></a>").addClass("dropdown-item");
    let element3 = $("<a></a>").addClass("dropdown-item");
    element2.text(currency.name + " - " + currency.code);
    element3.text(currency.name + " - " + currency.code);
    $("#dropdown1").append(element2);
    $("#dropdown2").append(element3);
}


$("#dropdown1").click(function () {
    preferred1 = (event.target).text;
    $("#dropdownPreffered1").val(preferred1);
});

$("#dropdown2").click(function () {
    preferred2 = (event.target).text;
    $("#dropdownPreffered2").val(preferred2);
});