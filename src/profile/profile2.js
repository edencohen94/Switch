
$.ajax({
    type:"POST",
    url: config.host+'/user',
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    },
    success: function(data) {
        details=data.result;
        $(".greetings").text(data.result.first_name +"'s profile");
        $("#firstname").append(data.result.first_name);
        $("#lastname").append(data.result.last_name);
        $("#email").append(data.result.email);
        $("#phone").append(data.result.phone);
        $("#address").append(data.result.address_1);
        $("#city").append(data.result.city_1);
        $("#address2").append(data.result.address_2);
        $("#city2").append(data.result.city_2);
        $("#pcurrency").append(data.result.main_currency);
        $("#scurrency").append(data.result.secondary_currency);
    },
    dataType: 'json'
});