for (let offer of allOffers.offers) {

    let curr = $("<a></a>").text(offer.currency)
    $("#currency").append(curr);
    let city = $("<a></a>").text(offer.city)
    $("#city").append(city);
    let lastUpdate = $("<a></a>").text(offer.lastUpdate)
    $("#lastUpdate").append(lastUpdate);
    let amount = $("<a></a>").text(offer.amount)
    $("#amount").append(amount);
}