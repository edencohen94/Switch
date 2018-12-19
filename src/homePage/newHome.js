for (let offer of allOffers.offers) {

    var i=1;
    let curr = $("<a></a>").text(offer.currency);
    let city = $("<a></a>").text(offer.city);
    let lastUpdate = $("<a></a>").text(offer.lastUpdate);
    let amount = $("<a></a>").text(offer.amount);
    $("#currency"+i).append(curr);
    $("#city"+i).append(city);
    $("#lastUpdate"+i).append(lastUpdate);
    $("#amount"+1).append(amount);
    i=i+1;
}