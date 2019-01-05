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
        $("#inputEmail").val(details.email);
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
            window.location.href = '../profile/profile2.html';
        },
        dataType: 'json'
    });
}
