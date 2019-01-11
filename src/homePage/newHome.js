    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    }

    $.ajax({
        type:"GET",
        url: config.host + '/offer/all-offers',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        success: function(data) {
            funAdd(data.result);
            //number of offers in the site
            var num= $("<h3 style='color:white'></h3>").text("Currently there are "+data.result.length+" relevent offers");
            $("#all").append(num);
        }
    });

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

/*An array containing all the country names in the world:*/
var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("inputdestinationCountry"), countries);


//currency dropdown
for (let currency of config.currencies) {
    let element = $("<a></a>").addClass("dropdown-item");
    element.text(currency.name + " - " + currency.code);
    $("#currency-dropdown").append(element);
}
$("#currency-dropdown").click(function () {
    var selText = (event.target).text;
    $("#dropdownMenuOffset").html(selText);
});



// previous- next : in results of search
var maxrows=5;
var page=0;
$("#btn_next").click();
var rank={};
function funAdd(offers) {
    var el;
    var len= offers.length;
    if(len-page>0) {
        page = page + maxrows;
        if (page >maxrows) {
            for (var j = page - (2*maxrows); j < page-maxrows; j++) {
                $("#results" + j).remove();
            }
        }
        for (var i = page-maxrows; i < page && i<len ; i++) {
            var offer = offers[i];
            let amount = $("<a></a>").text(offer.amount);
            let curr = $("<a></a>").text(offer.offered_currency);
            let city = $("<a></a>").text(offer.city_1);
            let lastUpdate = $("<a></a>").text(formatDate(offer.date));
            let rankUser;
            if(offer.rank<0){
                rankUser = $("<a style='color: red'></a>").text(offer.rank);
            }
            else{
                rankUser = $("<a style='color: green'></a>").text(offer.rank);
            }

            if(offer.isActive){
                el = $('<div>', {id: 'results' + i, class: 'result container', style: 'background-color: yellow;'});
            }
            else{
                el = $('<div>', {id: 'results' + i, class: 'result container'});
            }
            var result = $(".topResults").append(el);
            $('<div>', {id: 'rank' + i, class: 'rank'}).appendTo(el);
            $('<div>', {id: 'amount' + i, class: 'amount'}).appendTo(el);
            $('<div>', {id: 'currency' + i, class: 'currency'}).appendTo(el);
            $('<div>', {id: 'preferred' + i, class: 'Pcurrency'}).appendTo(el);
            $('<div>', {id: 'city' + i, class: 'city'}).appendTo(el);
            $('<div>', {id: 'lastUpdate' + i, class: 'lastUpdate'}).appendTo(el);
            $('<button>', {id: 'details' + i, class: 'details'}).appendTo(el);


            // create a button
            let askForDeatils = $("<button></button>", {class: "btn btn-danger cancel-changes card-button"}).text("Ask for deatils");
            // assign it some data (the relevant offer-id)
            askForDeatils.data('offer-id', offer.offer_id);


            // add a click listener
            askForDeatils.click(function () {
                // here, this stands for the button that was clicked
                // so we want to get that button's offer-id
                postToRequestedOffers($(this).data('offer-id'));
            });

            $("#rank"+i).append(rankUser);
            $("#amount" + i).append(amount);
            $("#currency" + i).append(curr);
            convertCurreny(offer.offered_currency,offer.main_currency,parseInt(offer.amount),i);
            if (offer.secondary_currency){
                convertCurreny(offer.offered_currency, offer.secondary_currency, parseInt(offer.amount), i);
            }
            $("#city" + i).append(city);
            $("#lastUpdate" + i).append(lastUpdate);
            $("#details"+i).append(askForDeatils);

        }
    }
}


function funRem(offers){
    var el;
    if(page>maxrows) {
        page = page - maxrows;
        for (var j = page; j < page+maxrows ; j++) {
           $("#results" + j).remove();
        }
        for (var i = page - maxrows; i < page ; i++) {
            var offer = offers[i]
            let amount = $("<a></a>").text(offer.amount);
            let curr = $("<a></a>").text(offer.offered_currency);
            let city = $("<a></a>").text(offer.city_1);
            let lastUpdate = $("<a></a>").text(formatDate(offer.date));
            let rankUser;
            if(offer.rank<0){
                rankUser = $("<a style='color: red'></a>").text(offer.rank);
            }
            else{
                rankUser = $("<a style='color: green'></a>").text(offer.rank);
            }

            if(offer.isActive){
                el = $('<div>', {id: 'results' + i, class: 'result container', style: 'background-color: yellow;'});
            }
            else{
                el = $('<div>', {id: 'results' + i, class: 'result container'});
            }
            var result = $(".topResults").append(el);
            $('<div>', {id: 'rank' + i, class: 'rank'}).appendTo(el);
            $('<div>', {id: 'amount' + i, class: 'amount'}).appendTo(el);
            $('<div>', {id: 'currency' + i, class: 'currency'}).appendTo(el);
            $('<div>', {id: 'preferred' + i, class: 'Pcurrency'}).appendTo(el);
            $('<div>', {id: 'city' + i, class: 'city'}).appendTo(el);
            $('<div>', {id: 'lastUpdate' + i, class: 'lastUpdate'}).appendTo(el);
            $('<div>', {id: 'details' + i, class: 'details'}).appendTo(el);


            // create a button
            let askForDeatils = $("<button></button>", {class: "btn btn-danger cancel-changes card-button"}).text("Ask for deatils");
            // assign it some data (the relevant offer-id)
            askForDeatils.data('offer-id', offer.offer_id);


            // add a click listener
            askForDeatils.click(function () {
                // here, this stands for the button that was clicked
                // so we want to get that button's offer-id
                //if(offer.user_id!=)
                postToRequestedOffers($(this).data('offer-id'));
            });

            $("#rank"+i).append(rankUser);
            $("#amount" + i).append(amount);
            $("#currency" + i).append(curr);
            convertCurreny(offer.offered_currency, offer.main_currency, parseInt(offer.amount), i);
            if (offer.secondary_currency){
                convertCurreny(offer.offered_currency, offer.secondary_currency, parseInt(offer.amount), i);
            }
            $("#city" + i).append(city);
            $("#lastUpdate" + i).append(lastUpdate);
            $("#details"+i).append(askForDeatils);

        }
    }
}

function convertCurreny (fromCurr, toCurr, amount,i){
    // set endpoint and access key
    let endpoint = 'latest';
    let access_key = 'e3201b8ebf57138b968f3c9692754b28';
    // get the most recent exchange rates via the "latest" endpoint:
    let preferred = $("<a></a>");
   $.ajax({
        type:"GET",
        url: 'http://data.fixer.io/api/' + endpoint + '?access_key=' + access_key,
        dataType: 'jsonp',
        success: function(data) {
            var finalRateExchange =  commitConversion(data,fromCurr,toCurr,amount)
            finalRateExchange = finalRateExchange.toFixed(2);
            preferred.text(toCurr+'=' +finalRateExchange+ ' ');
            $("#preferred" + i).append(preferred);
        }
    });
}

function commitConversion(data,fromCurr, toCurr, amount){
    var exchangeRateTocurr=data.rates[toCurr];
    var exchangeRateFromcurr= data.rates[fromCurr];
    var finalRateExchange = (exchangeRateTocurr/exchangeRateFromcurr)*amount;
    return finalRateExchange
}

function getNextOffers() {
    $.ajax({
        type:"GET",
        url: config.host + '/offer/all-offers',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        success: function(data) {
            funAdd(data.result);
        }
    });
}

function getPreviousOffers() {
    $.ajax({
        type:"GET",
        url: config.host + '/offer/all-offers',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        success: function(data) {
            funRem(data.result)
        }

    });
}

function postToRequestedOffers(offer_id){
    $.ajax({
        type:"POST",
        url: config.host+ '/offer/request-details',
        data: createNew(offer_id),
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            console.log("successed to post requested offer")
            window.location.herf= "../requestOffers/requestedOffers.html"
        },
        dataType: 'json'
    });
}

function createNew(offer_id){
    let data={}
    data.offer_id=offer_id
    return data
}

$('#btn-next').click(getNextOffers);
$('#btn-prev').click(getPreviousOffers);

getNextOffers();


transOffers ={
        "offers":[
            {
                "rank": "0",
                "amount": "10",
                "offered_currency": "USD",
                "city_1":"Tel-Aviv",
                "date": "19/12/2018",
                "rank2": "0",
                "amount2": "20",
                "offered_currency2": "USD",
                "city_1_2":"Tel-Aviv",
                "date2": "19/12/2018"

            },
            {
                "rank": "0",
                "amount": "30",
                "offered_currency": "USD",
                "city_1":"Tel-Aviv",
                "date": "19/12/2018",
                "rank2": "0",
                "amount2": "40",
                "offered_currency2": "USD",
                "city_1_2":"Tel-Aviv",
                "date2": "19/12/2018"
            }

        ]
    };
funAddTrans(transOffers);
////////////////////transitivity/////////////////////////////////////////
    function funAddTrans(transOffers) {
        let offers= transOffers.offers;
        var el;
        var len= offers.length;
        for (var i = 0; i <len ; i++) {
                var offer = offers[i];
                let amount = $("<a></a>").text(offer.amount);
                let curr = $("<a></a>").text(offer.offered_currency);
                let city = $("<a></a>").text(offer.city_1);
                let lastUpdate = $("<a></a>").text(offer.date);
                let rankUser;
                if(offer.rank<0){
                    rankUser = $("<a style='color: red'></a>").text(offer.rank);
                }
                else{
                    rankUser = $("<a style='color: green'></a>").text(offer.rank);
                }

                el = $('<div>', {id: 'results' + i, class: 'resultTrans container'});
                var result = $(".transitive").append(el);
                var el_first= $('<div>', {id: 'results1' + i, class: 'result1 container'});
                el_first.appendTo(el);
                $('<div>', {id: 'rank' + i, class: 'rank'}).appendTo(el_first);
                $('<div>', {id: 'amount' + i, class: 'amount'}).appendTo(el_first);
                $('<div>', {id: 'currency' + i, class: 'currency'}).appendTo(el_first);
                $('<div>', {id: 'preferred' + i, class: 'Pcurrency'}).appendTo(el_first);
                $('<div>', {id: 'city' + i, class: 'city'}).appendTo(el_first);
                $('<div>', {id: 'lastUpdate' + i, class: 'lastUpdate'}).appendTo(el_first);
                $('<button>', {id: 'details' + i, class: 'details'}).appendTo(el_first);


                // create a button
                let askForDeatils = $("<button></button>", {class: "btn btn-danger cancel-changes card-button"}).text("Ask for deatils");
                // assign it some data (the relevant offer-id)
                askForDeatils.data('offer-id', offer.offer_id);


                // add a click listener
                askForDeatils.click(function () {
                    // here, this stands for the button that was clicked
                    // so we want to get that button's offer-id
                    postToRequestedOffers($(this).data('offer-id'));
                });

                $("#rank"+i).append(rankUser);
                $("#amount" + i).append(amount);
                $("#currency" + i).append(curr);
                convertCurreny(offer.offered_currency,offer.main_currency,parseInt(offer.amount),i);
                if (offer.secondary_currency){
                    convertCurreny(offer.offered_currency, offer.secondary_currency, parseInt(offer.amount), i);
                }
                $("#city" + i).append(city);
                $("#lastUpdate" + i).append(lastUpdate);
                $("#details"+i).append(askForDeatils);


                // second offer
            let amount2 = $("<a></a>").text(offer.amount2);
            let curr2 = $("<a></a>").text(offer.offered_currency2);
            let city2 = $("<a></a>").text(offer.city_1_2);
            let lastUpdate2 = $("<a></a>").text(offer.date2);
            let rankUser2;
            if(offer.rank<0){
                rankUser2 = $("<a style='color: red'></a>").text(offer.rank);
            }
            else{
                rankUser2 = $("<a style='color: green'></a>").text(offer.rank);
            }
            var el_second= $('<div>', {id: 'results2' + i, class: 'result2 container'});
            el_second.appendTo(el);
            $('<div>', {id: 'rank2' + i, class: 'rank'}).appendTo(el_second);
            $('<div>', {id: 'amount2' + i, class: 'amount'}).appendTo(el_second);
            $('<div>', {id: 'currency2' + i, class: 'currency'}).appendTo(el_second);
            $('<div>', {id: 'preferred2' + i, class: 'Pcurrency'}).appendTo(el_second);
            $('<div>', {id: 'city2' + i, class: 'city'}).appendTo(el_second);
            $('<div>', {id: 'lastUpdate2' + i, class: 'lastUpdate'}).appendTo(el_second);
            $('<button>', {id: 'details2' + i, class: 'details'}).appendTo(el_second);


            // create a button
            let askForDeatils2 = $("<button></button>", {class: "btn btn-danger cancel-changes card-button"}).text("Ask for deatils");
            // assign it some data (the relevant offer-id)
            askForDeatils2.data('offer-id', offer.offer_id);


            // add a click listener
            askForDeatils2.click(function () {
                // here, this stands for the button that was clicked
                // so we want to get that button's offer-id
                postToRequestedOffers($(this).data('offer-id'));
            });

            $("#rank2"+i).append(rankUser2);
            $("#amount2" + i).append(amount2);
            $("#currency2" + i).append(curr2);
            convertCurreny(offer.offered_currency,offer.main_currency,parseInt(offer.amount),i);
            if (offer.secondary_currency){
                convertCurreny(offer.offered_currency, offer.secondary_currency, parseInt(offer.amount), i);
            }
            $("#city2" + i).append(city2);
            $("#lastUpdate2" + i).append(lastUpdate2);
            $("#details2"+i).append(askForDeatils2);

            }
    }
