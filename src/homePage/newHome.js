// Select first tab
$('.nav-tabs a:first').tab('show')

var maxrows=1;
var pos=0;
var len= allOffers.offers.length;
$("#btn_next").click();

function funAdd() {
    if(len-pos>0) {
        pos = pos + maxrows;
        console.log(pos);
        if (pos >maxrows) {
            for (var j = pos - (2*maxrows); j < pos-maxrows; j++) {
                $("#results" + j).remove();
            }
        }
        for (var i = pos-maxrows; i < pos && i<len ; i++) {
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
    if(pos>maxrows) {
        pos = pos - maxrows;
        console.log(pos);
        for (var j = pos; j < pos+maxrows ; j++) {
           $("#results" + j).remove();
        }
        for (var i = pos - maxrows; i < pos ; i++) {
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


