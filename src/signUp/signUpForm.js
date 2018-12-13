for (let currency of config.currencies) {
    let element = $("<a></a>").addClass("dropdown-item");
    element.text(currency.name + " - " + currency.code);
    $("#currency-dropdown").append(element);
}