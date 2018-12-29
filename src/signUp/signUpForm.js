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