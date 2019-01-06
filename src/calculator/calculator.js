for (let currency of config.currencies) {
    let element1 = $("<a></a>").addClass("dropdown-item");
    let element2 = $("<a></a>").addClass("dropdown-item");
    element1.text(currency.name + " - " + currency.code);
    element2.text(currency.name + " - " + currency.code);
    $("#dropdownCurrency").append(element1);
    $("#dropdownCurrency2").append(element2);
}

$("#dropdownCurrency").click(function () {
    main = (event.target).text;
    $("#dropdownMainCurrency").val(main);
});

$("#dropdownCurrency2").click(function () {
    preferred1 = (event.target).text;
    $("#dropdownMainCurrency2").val(preferred1);
});

var dataCurr;
function convertCurreny (){
    // set endpoint and access key
    let endpoint = 'latest';
    let access_key = 'e3201b8ebf57138b968f3c9692754b28';
    // get the most recent exchange rates via the "latest" endpoint:
    $.ajax({
        type:"GET",
        url: 'http://data.fixer.io/api/' + endpoint + '?access_key=' + access_key,
        dataType: 'jsonp',
        success: function(data) {
            dataCurr=data;
            commitConversion(dataCurr,$("#dropdownMainCurrency").val(),$("#dropdownMainCurrency2").val(),$("#inputAmount").val());
        }
    });
}

function commitConversion(data,fromCurr, toCurr, amount){
        toCurr=toCurr.substr(toCurr.length - 3);
        fromCurr=fromCurr.substr(fromCurr.length - 3)
        var exchangeRateTocurr = data.rates[toCurr];
        var exchangeRateFromcurr = data.rates[fromCurr];
        var finalRateExchange = (exchangeRateTocurr / exchangeRateFromcurr) * amount;
    finalRateExchange = finalRateExchange.toFixed(3);
        let el = $("<a></a>").text(amount+" "+fromCurr+" = "+finalRateExchange+" "+toCurr);
        $("#result").append(el);
}