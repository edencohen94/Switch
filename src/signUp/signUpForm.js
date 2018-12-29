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

function preferredCurrency() {
    preferred1 = $(this).val();
    $("#dropdownMenuOffset1").html(preferred1);
};

$("#currency-dropdown2").click(function () {
    preferred2 = (event.target).text;
    $("#dropdownMenuOffset2").html(preferred2);
});