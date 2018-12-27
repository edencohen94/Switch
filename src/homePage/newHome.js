//number of offers in the site
var num= $("<div></div>").text("Currently there are "+(fill.numofOffers[0]).num+" relevent offers");
$("#all").append(num);


// previous- next : in results of search
var maxrows=5;
var page=0;
var len= allOffers.offers.length;
$("#btn_next").click();

function funAdd() {
    if(len-page>0) {
        page = page + maxrows;
        if (page >maxrows) {
            for (var j = page - (2*maxrows); j < page-maxrows; j++) {
                $("#results" + j).remove();
            }
        }
        for (var i = page-maxrows; i < page && i<len ; i++) {
            var offer = allOffers.offers[i]
            let amount = $("<a></a>").text(offer.amount);
            let curr = $("<a></a>").text(offer.currency);
            let preferred = $("<a></a>").text(offer.preferredCurr);
            let city = $("<a></a>").text(offer.city);
            let lastUpdate = $("<a></a>").text(offer.lastUpdate);
            var el = $('<div>', {id: 'results' + i, class: 'result container'});
            var result = $(".topResults").append(el);
            $('<div>', {id: 'amount' + i, class: 'amount'}).appendTo(el);
            $('<div>', {id: 'currency' + i, class: 'currency'}).appendTo(el);
            $('<div>', {id: 'preferred' + i, class: 'Pcurrency'}).appendTo(el);
            $('<div>', {id: 'city' + i, class: 'city'}).appendTo(el);
            $('<div>', {id: 'lastUpdate' + i, class: 'lastUpdate'}).appendTo(el);
            $('<div>', {id: 'details' + i, class: 'details'}).appendTo(el);

            $("#amount" + i).append(amount);
            $("#currency" + i).append(curr);
            $("#preferred" + i).append(preferred);
            $("#city" + i).append(city);
            $("#lastUpdate" + i).append(lastUpdate);
            $('<img/>' ,{src:"../Images/ad_detailspage_icon.gif", width:'9', height:'9'}).appendTo($('<a/>', {href:""}).appendTo($("#details"+i)));
        }

    }
}

function funRem(){
    if(page>maxrows) {
        page = page - maxrows;
        for (var j = page; j < page+maxrows ; j++) {
           $("#results" + j).remove();
        }
        for (var i = page - maxrows; i < page ; i++) {
            var offer = allOffers.offers[i]
            let amount = $("<a></a>").text(offer.amount);
            let curr = $("<a></a>").text(offer.currency);
            let preferred = $("<a></a>").text(offer.preferredCurr);
            let city = $("<a></a>").text(offer.city);
            let lastUpdate = $("<a></a>").text(offer.lastUpdate);
            var el = $('<div>', {id: 'results' + i, class: 'result container'});
            var result = $(".topResults").append(el);
            $('<div>', {id: 'amount' + i, class: 'amount'}).appendTo(el);
            $('<div>', {id: 'currency' + i, class: 'currency'}).appendTo(el);
            $('<div>', {id: 'preferred' + i, class: 'Pcurrency'}).appendTo(el);
            $('<div>', {id: 'city' + i, class: 'city'}).appendTo(el);
            $('<div>', {id: 'lastUpdate' + i, class: 'lastUpdate'}).appendTo(el);
            $('<div>', {id: 'details' + i, class: 'details'}).appendTo(el);

            $("#amount" + i).append(amount);
            $("#currency" + i).append(curr);
            $("#preferred" + i).append(preferred);
            $("#city" + i).append(city);
            $("#lastUpdate" + i).append(lastUpdate);
            $('<img/>' ,{src:"../Images/ad_detailspage_icon.gif", width:'9', height:'9'}).appendTo($('<a/>', {href:""}).appendTo($("#details"+i)));
        }
    }
}


