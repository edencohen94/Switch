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
        console.log(event.target);
        var selText = (event.target).text;
        $("#dropdownMainCurrency").html(selText);
    });

    $("#dropdown1").click(function () {
        console.log(event.target);
        var selText = (event.target).text;
       $("#dropdownPreffered1").html(selText);
    });

    $("#dropdown2").click(function () {
        console.log(event.target);
        var selText = (event.target).text;
        $("#dropdownPreffered2").html(selText);
    });
