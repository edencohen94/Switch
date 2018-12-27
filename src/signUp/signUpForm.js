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
    console.log(event.target);
    var selText = (event.target).text;
    $("#dropdownMenuOffset1").html(selText);
});
$("#currency-dropdown2").click(function () {
    console.log(event.target);
    var selText = (event.target).text;
    $("#dropdownMenuOffset2").html(selText);
});