var main;
var preferred1;
var preferred2;
for (let currency of config.currencies) {
    let element1 = $("<a></a>").addClass("dropdown-item");
    let element2 = $("<a></a>").addClass("dropdown-item");
    let element3 = $("<a></a>").addClass("dropdown-item");
    element1.text(currency.name + " - " + currency.code);
    element2.text(currency.name + " - " + currency.code);
    element3.text(currency.name + " - " + currency.code);
    $("#dropdownCurrency").append(element1);
    $("#dropdown1").append(element2);
    $("#dropdown2").append(element3);
}

    $("#dropdownCurrency").click(function () {
        main = (event.target).text;
        $("#dropdownMainCurrency").html(main);
    });

    $("#dropdown1").click(function () {
       preferred1 = (event.target).text;
       $("#dropdownPreffered1").html(preferred1);
    });

    $("#dropdown2").click(function () {
        preferred2 = (event.target).text;
        $("#dropdownPreffered2").html(preferred2);
    });



function uploadOffer(){
    $.ajax({
           type: "POST",
            url: 'http://77.126.1.218:3060/offer',
            data: {offered_currency: main,
                amount: $("#inputAmount").val(),
                main_currency: preferred1,
                secondary_currency: preferred2,
                description: $("#inputFreeText").val()
            },
            success: null,
            dataType: 'json'
    });
}