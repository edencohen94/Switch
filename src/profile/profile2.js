// get user's name for greeting
$.ajax({
    type:"POST",
    url: 'http://77.126.1.218:3060/user',
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    },
    success: function(data) {
        details=data.result[0];
        $(".greetings").text(details.first_name +"'s profile");
        $("#firstname").append(details.first_name);
        $("#lastname").append(details.last_name);
        $("#email").append(details.email);
        $("#phone").append(details.phone);
        $("#address").append(details.address_1);
        $("#city").append(details.city_1);
        $("#address2").append(details.address_2);
        $("#city2").append(details.city_2);
        $("#pcurrency").append(details.main_currency);
        $("#scurrency").append(details.secondary_currency);
    },
    dataType: 'json'
});