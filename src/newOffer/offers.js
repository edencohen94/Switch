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
