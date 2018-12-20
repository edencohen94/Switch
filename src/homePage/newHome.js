// Select first tab
$('.nav-tabs a:first').tab('show')

var i=1;
for (let offer of allOffers.offers) {
    let amount = $("<a></a>").text(offer.amount);
    let curr = $("<a></a>").text(offer.currency);
    let preferred = $("<a></a>").text(offer.preferredCurr);
    let city = $("<a></a>").text(offer.city);
    let lastUpdate = $("<a></a>").text(offer.lastUpdate);
    var result= $( ".topResults" ).append( "<div class = 'result container'></div>");
    $('<div>', {id: 'amount'+i, class: 'amount'}).appendTo(result);
    $('<div>', {id: 'currency'+i,class: 'currency'}).appendTo(result);
    $('<div>', {id: 'preferred'+i, class: 'Pcurrency'}).appendTo(result);
    $('<div>', {id: 'city'+i, class:'city' }).appendTo(result);
    $('<div>', {id: 'lastUpdate'+i, class: 'lastUpdate'}).appendTo(result);
    $("#amount"+i).append(amount);
    $("#currency"+i).append(curr);
    $("#preferred"+i).append(preferred);
    $("#city"+i).append(city);
    $("#lastUpdate"+i).append(lastUpdate);
    //$('<div class="amount"></div>')
    //    .attr("id", "amount" + i)
      //  .appendTo(".result container");
    //$('<div class="currency"></div>')
     //   .attr("id", "currency" + i)
       // .appendTo(".result container");
    //$('<div class="Pcurrency"></div>')
      //  .attr("id", "preferred" + i)
        //.appendTo(".result container");
    //$('<div class="city"></div>')
      //  .attr("id", "city" + i)
        //.appendTo(".result container");
    //$('<div class="lastUpdate"></div>')
      //  .attr("id", "lastUpdate" + i)


}
