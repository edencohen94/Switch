// Select first tab
$('.nav-tabs a:first').tab('show')

var maxrows=4;
var pos=0;
var len= allOffers.offers.length;

function fun1(){
    for (var i = pos; i < maxrows; i++) {
        var offer = allOffers.offers[i]
        let check = $("<input type=\"checkbox\" id=\"chk4\" className=\"checkbox\"/>").addClass("checkbox");
        let amount = $("<a></a>").text(offer.amount);
        let curr = $("<a></a>").text(offer.currency);
        let preferred = $("<a></a>").text(offer.preferredCurr);
        let city = $("<a></a>").text(offer.city);
        let lastUpdate = $("<a></a>").text(offer.lastUpdate);
        var el = $('<div>', {id: 'results' + i, class: 'result container'});
        var result = $(".topResults").append(el);
        $('<div>', {id: 'check' + i}).appendTo(el);
        $('<div>', {id: 'amount' + i, class: 'amount'}).appendTo(el);
        $('<div>', {id: 'currency' + i, class: 'currency'}).appendTo(el);
        $('<div>', {id: 'preferred' + i, class: 'Pcurrency'}).appendTo(el);
        $('<div>', {id: 'city' + i, class: 'city'}).appendTo(el);
        $('<div>', {id: 'lastUpdate' + i, class: 'lastUpdate'}).appendTo(el);
        $("#check" + i).append(check);
        $("#amount" + i).append(amount);
        $("#currency" + i).append(curr);
        $("#preferred" + i).append(preferred);
        $("#city" + i).append(city);
        $("#lastUpdate" + i).append(lastUpdate);

    }
}

$("btn_next").onclick = function fun() {
    fun1();
}



