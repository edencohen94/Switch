// Select first tab
$('.nav-tabs a:first').tab('show')

var i=1;
for (let offer of allOffers.offers) {
    let amount = $("<a></a>").text(offer.amount);
    let curr = $("<a></a>").text(offer.currency);
    let preferred = $("<a></a>").text(offer.preferredCurr);
    let city = $("<a></a>").text(offer.city);
    let lastUpdate = $("<a></a>").text(offer.lastUpdate);
    var el= $( "<div class = 'result container'></div>");
    var result= $( ".topResults" ).append(el);
    $('<div>', {id: 'amount'+i, class: 'amount'}).appendTo(el);
    $('<div>', {id: 'currency'+i,class: 'currency'}).appendTo(el);
    $('<div>', {id: 'preferred'+i, class: 'Pcurrency'}).appendTo(el);
    $('<div>', {id: 'city'+i, class:'city' }).appendTo(el);
    $('<div>', {id: 'lastUpdate'+i, class: 'lastUpdate'}).appendTo(el);
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
