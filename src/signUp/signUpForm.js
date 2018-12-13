import currencies from "../../config/currency.json"


for (let currency in currencies) {
    let element = document.createElement("a");
    element.innerHTML = currency.name + " - " + currency.cone;
    document.getElementById("currency-dropdown").appendChild(element);

}