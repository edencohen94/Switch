// Select first tab
$('.nav-tabs a:first').tab('show')

var maxrows=3;
var page=0;
var len= allOffers.offers.length;
$("#btn_next").click();

function funAdd() {
    if(len-page>0) {
        page = page + maxrows;
        console.log(page);
        if (page >maxrows) {
            for (var j = page - (2*maxrows); j < page-maxrows; j++) {
                $("#results" + j).remove();
            }
        }
        for (var i = page-maxrows; i < page && i<len ; i++) {
            var offer = allOffers.offers[i]
            let check = $("<input type=\"checkbox\" id=\"chk4\" className=\"checkbox\"/>");
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
}

function funRem(){
    if(page>maxrows) {
        page = page - maxrows;
        console.log(page);
        for (var j = page; j < page+maxrows ; j++) {
           $("#results" + j).remove();
        }
        for (var i = page - maxrows; i < page ; i++) {
            var offer = allOffers.offers[i]
            let check = $("<input type=\"checkbox\" id=\"chk4\" className=\"checkbox\"/>");
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
}


