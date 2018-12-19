// Select first tab
$('.nav-tabs a:first').tab('show')

var i=1;
for (let offer of allOffers.offers) {
    let amount = $("<a></a>").text(offer.amount);
    let curr = $("<a></a>").text(offer.currency);
    let preferred = $("<a></a>").text(offer.preferredCurr);
    let city = $("<a></a>").text(offer.city);
    let lastUpdate = $("<a></a>").text(offer.lastUpdate);
    $("#amount"+i).append(amount);
    $("#currency"+i).append(curr);
    $("#preferred"+i).append(preferred);
    $("#city"+i).append(city);
    $("#lastUpdate"+i).append(lastUpdate);
    i=i+1;
}
