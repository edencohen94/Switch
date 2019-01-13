function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
}

$.ajax({
    type: "GET",
    url: config.host + '/offer/all-offers',
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    },
    dataType: 'json',
    success: function (data) {
        convertCurrenyAdd(data.result);
        pageState.offers = data.result;
        pageState.offerIndex = 0;
        //number of offers in the site
        let num = $("<h3 style='color:white'></h3>").text("Currently there are " + data.result.length + " relevent offers");
        $("#all").append(num);
    }
});

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    let currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        let a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
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
                b.addEventListener("click", function (e) {
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
    inp.addEventListener("keydown", function (e) {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus letiable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus letiable:*/
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
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        let x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
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
let countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("inputdestinationCountry"), countries);


//currency dropdown
for (let currency of config.currencies) {
    let element = $("<a></a>").addClass("dropdown-item");
    element.text(currency.name + " - " + currency.code);
    $("#currency-dropdown").append(element);
}


$("#currency-dropdown").click(function () {
    preferred1 = (event.target).text;
    $("#dropdownMenuOffset1").val(preferred1);
});

// previous- next : in results of search

let pageState = {
    offers: [],
    offerIndex: 0,
    itemsPerPage: 3
};

let maxrows = 5;
let page = 0;
let searchResult;
$("#btn_next").click();
let rank = {};
let searchB = false;
let transOffers;

function searchbutton() {
    $.ajax({
        type: "POST",
        url: config.host + '/offer/search',
        data: getDeatilsFromHtml(),
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        "content-Type": 'application/json',
        success: function (data) {
            searchB = true;
            page = 0;
            for (let j = page; j < page + maxrows; j++) {
                $("#results" + j).remove();
            }
            searchResult = data.result.regularResults;
            transOffers = data.result.transitiveResults;
            convertCurrenyAdd(data.result.regularResults);
            funAddTrans(data.result.transitiveResults);
        }

    });
}

function getDeatilsFromHtml() {
    let data = {};
    data.city = $('#inputRigion-City').val();
    data.country = $('#inputdestinationCountry').val();
    currLength = data.requstedCurrency = ($('#dropdownMenuOffset1').val().split(" ")).length;
    data.requestedCurrency = ($('#dropdownMenuOffset1').val().split(" "))[currLength - 1];
    data.amount = $('#inputEstimated').val();
    return data

}

function funAdd(offers, converstionRates) {
    let el;
    let len = offers.length;
    if (len - page > 0) {
        page = page + maxrows;
        if (page > maxrows) {
            for (let j = page - (2 * maxrows); j < page - maxrows; j++) {
                $("#results" + j).remove();
            }
        }
        for (let i = page - maxrows; i < page && i < len; i++) {
            let offer = offers[i];
            let amount = $("<a></a>").text(offer.amount);
            let curr = $("<a></a>").text(offer.offered_currency);
            let city = $("<a></a>").text(offer.city_1);
            let lastUpdate = $("<a></a>").text(formatDate(offer.date));
            let rankUser;
            if (offer.rank < 0) {
                rankUser = $("<a style='color: red'></a>").text(offer.rank);
            }
            else {
                rankUser = $("<a style='color: green'></a>").text(offer.rank);
            }

            if (offer.isActive) {
                el = $('<div>', {id: 'results' + i, class: 'result container', style: 'background-color: yellow;'});
            }
            else {
                el = $('<div>', {id: 'results' + i, class: 'result container'});
            }
            let result = $(".results-container").append(el);
            $('<div>', {id: 'amount' + i, class: 'amount'}).appendTo(el);
            $('<div>', {id: 'currency' + i, class: 'currency'}).appendTo(el);
            $('<div>', {id: 'preferred' + i, class: 'Pcurrency'}).appendTo(el);
            $('<div>', {id: 'city' + i, class: 'city'}).appendTo(el);
            $('<div>', {id: 'rank' + i, class: 'rank'}).appendTo(el);
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
                postToRequestedOffers($(this).data('offer-id'));
            });

            $("#amount" + i).append(amount);
            $("#currency" + i).append(curr);
            commitConversion(converstionRates, offer.offered_currency, offer.main_currency, parseInt(offer.amount), i);
            if (offer.secondary_currency) {
                commitConversion(converstionRates, offer.offered_currency, offer.secondary_currency, parseInt(offer.amount), i);
            }
            $("#city" + i).append(city);
            $("#rank" + i).append(rankUser);
            $("#lastUpdate" + i).append(lastUpdate);
            $("#details" + i).append(askForDeatils);

        }
    }
    if (len === 0) {
        for (let j = page - maxrows; j < page + maxrows; j++) {
            $("#results" + j).remove();
        }
    }
}

function showNextOffers() {
    if (pageState.offerIndex <= pageState.offers.length - pageState.itemsPerPage - 1) {
        pageState.offerIndex = pageState.offerIndex + pageState.itemsPerPage;
        let currentOffersToShow = pageState.offers.slice(pageState.offerIndex, pageState.offerIndex + pageState.itemsPerPage);
        emptyList();
        addOffersToResultsList(currentOffersToShow);
    }
}

function showPreviousOffers() {
    if (pageState.offerIndex >= pageState.itemsPerPage) {
        pageState.offerIndex = pageState.offerIndex - pageState.itemsPerPage;
        let currentOffersToShow = pageState.offers.slice(pageState.offerIndex, pageState.offerIndex + pageState.itemsPerPage);
        emptyList();
        addOffersToResultsList(currentOffersToShow);
    }
}

function emptyList() {
    $(".results-container").empty();
}

function addOffersToResultsList(offers) {
    let el;
    for (let i = 0; i < offers.length; i++) {
        let offer = offers[i];
        let amount = $("<a></a>").text(offer.amount);
        let curr = $("<a></a>").text(offer.offered_currency);
        let city = $("<a></a>").text(offer.city_1);
        let lastUpdate = $("<a></a>").text(formatDate(offer.date));
        let rankUser;
        if (offer.rank < 0) {
            rankUser = $("<a style='color: red'></a>").text(offer.rank);
        }
        else {
            rankUser = $("<a style='color: green'></a>").text(offer.rank);
        }

        if (offer.isActive) {
            el = $('<div>', {id: 'results' + i, class: 'result container', style: 'background-color: yellow;'});
        }
        else {
            el = $('<div>', {id: 'results' + i, class: 'result container'});
        }
        $('<div>', {id: 'amount' + i, class: 'amount'}).appendTo(el);
        $('<div>', {id: 'currency' + i, class: 'currency'}).appendTo(el);
        $('<div>', {id: 'preferred' + i, class: 'Pcurrency'}).appendTo(el);
        $('<div>', {id: 'city' + i, class: 'city'}).appendTo(el);
        $('<div>', {id: 'rank' + i, class: 'rank'}).appendTo(el);
        $('<div>', {id: 'lastUpdate' + i, class: 'lastUpdate'}).appendTo(el);
        $('<div>', {id: 'details' + i, class: 'details'}).appendTo(el);
        $(".results-container").append(el);


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

        $("#amount" + i).append(amount);
        $("#currency" + i).append(curr);

        commitConversion(converstionRates, offer.offered_currency, offer.main_currency, parseInt(offer.amount), i);
        if (offer.secondary_currency) {
            commitConversion(converstionRates, offer.offered_currency, offer.secondary_currency, parseInt(offer.amount), i);
        }
        $("#city" + i).append(city);
        $("#rank" + i).append(rankUser);
        $("#lastUpdate" + i).append(lastUpdate);
        $("#details" + i).append(askForDeatils);
    }
}

function funRem(offers, converstionRates) {
    if (page > maxrows) {
        page = page - maxrows;
        for (let j = page; j < page + maxrows; j++) {
            $("#results" + j).remove();
        }

    }
    if (len == 0) {
        {
            for (let j = page - maxrows; j < page; j++) {
                $("#results" + j).remove();
            }
        }

    }
}

function convertCurrenyRem(offers) {
    // set endpoint and access key
    let endpoint = 'latest';
    let access_key = '2d5b00bc20182a068df161c1239f8f48';
    // get the most recent exchange rates via the "latest" endpoint:
    $.ajax({
        type: "GET",
        url: 'http://data.fixer.io/api/' + endpoint + '?access_key=' + access_key,
        dataType: 'jsonp',
        success: function (data) {
            funRem(offers, data.rates);

        }
    });
}

function convertCurrenyAdd(offers) {
    let endpoint = 'latest';
    let access_key = '2d5b00bc20182a068df161c1239f8f48';
    // get the most recent exchange rates via the "latest" endpoint:
    $.ajax({
        type: "GET",
        url: 'http://data.fixer.io/api/' + endpoint + '?access_key=' + access_key,
        dataType: 'jsonp',
        success: function (data) {
            funAdd(offers, data.rates);
        }
    });
}

function commitConversion(data, fromCurr, toCurr, amount, i) {
    let exchangeRateTocurr = data[toCurr];
    let exchangeRateFromcurr = data[fromCurr];
    let finalRateExchange = (exchangeRateTocurr / exchangeRateFromcurr) * amount;
    finalRateExchange = finalRateExchange.toFixed(2);
    let preferred = $("<a></a>");
    preferred.text(toCurr + '=' + finalRateExchange + ' ');
    $("#preferred" + i).append(preferred);
}

function getNextOffers() {
    let prefix = '/offer/all-offers';
    if (searchB) {
        convertCurrenyAdd(searchResult);
        funAddTrans(transOffers);
    }
    $.ajax({
        type: "GET",
        url: config.host + prefix,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        success: function (data) {
            convertCurrenyAdd(data.result);
        }
    });
}

function getPreviousOffers() {
    let prefix = '/offer/all-offers';
    if (searchB) {
        convertCurrenyRem(searchResult);
        funrem
    }
    $.ajax({
        type: "GET",
        url: config.host + prefix,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        success: function (data) {
            convertCurrenyRem(data.result);
        }

    });
}

function postToRequestedOffers(offer_id) {
    $.ajax({
        type: "POST",
        url: config.host + '/offer/request-details',
        data: {offer_id},
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            console.log("successed to post requested offer")
            window.location.href = '../requestOffers/requestedOffers.html';
        },
        dataType: 'json'
    });
}

// $('#btn-next').click(getNextOffers);
// $('#btn-prev').click(getPreviousOffers);


$('#btn-next').click(showNextOffers);
$('#btn-prev').click(showPreviousOffers);

getNextOffers();


transOffers = {
    "offers": [
        {
            "rank": "0",
            "amount": "10",
            "offered_currency": "USD",
            "main_currency": "USD",
            "secondary_currency": "EUR",
            "city_1": "Tel-Aviv",
            "date": "19/12/2018",
            "rank2": "0",
            "amount2": "20",
            "offered_currency2": "USD",
            "main_currency2": "USD",
            "secondary_currency2": "EUR",
            "city_1_2": "Tel-Aviv",
            "date2": "19/12/2018"

        },
        {
            "rank": "0",
            "amount": "30",
            "offered_currency": "USD",
            "main_currency": "USD",
            "secondary_currency": "EUR",
            "city_1": "Tel-Aviv",
            "date": "19/12/2018",
            "rank2": "0",
            "amount2": "40",
            "offered_currency2": "USD",
            "main_currency2": "USD",
            "secondary_currency2": "EUR",
            "city_1_2": "Tel-Aviv",
            "date2": "19/12/2018"
        }

    ]
};
funAddTrans(transOffers);

////////////////////transitivity/////////////////////////////////////////
function funAddTrans(transOffers) {
    let flag = 0; // 1-first user, 2 second user
    let offers = transOffers.offers;
    let el;
    let len = offers.length;
    for (let i = 0; i < len; i++) {
        let offer = offers[i];
        flag = 1;
        let amount = $("<a></a>").text(offer.amount);
        let curr = $("<a></a>").text(offer.offered_currency);
        let city = $("<a></a>").text(offer.city_1);
        let lastUpdate = $("<a></a>").text(offer.date);
        let rankUser;
        if (offer.rank < 0) {
            rankUser = $("<a style='color: red'></a>").text(offer.rank);
        }
        else {
            rankUser = $("<a style='color: green'></a>").text(offer.rank);
        }

        el = $('<div>', {id: 'results' + i, class: 'resultTrans container'});
        let result = $(".transitive").append(el);
        let el_first = $('<div>', {id: 'results1' + i, class: 'result1 container'});
        el_first.appendTo(el);
        $('<div>', {id: 'amount' + i, class: 'amount'}).appendTo(el_first);
        $('<div>', {id: 'currency' + i, class: 'currency'}).appendTo(el_first);
        $('<div>', {id: 'preferred1' + i, class: 'Pcurrency'}).appendTo(el_first);
        $('<div>', {id: 'city' + i, class: 'city'}).appendTo(el_first);
        $('<div>', {id: 'rank' + i, class: 'rank'}).appendTo(el_first);
        $('<div>', {id: 'lastUpdate' + i, class: 'lastUpdate'}).appendTo(el_first);
        $('<div>', {id: 'details' + i, class: 'details'}).appendTo(el_first);


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

        $("#amount" + i).append(amount);
        $("#currency" + i).append(curr);
        convertCurrenyTrans(offer.offered_currency, offer.main_currency, parseInt(offer.amount), i, flag);
        if (offer.secondary_currency) {
            convertCurrenyTrans(offer.offered_currency, offer.secondary_currency, parseInt(offer.amount), i, flag);
        }

        $("#city" + i).append(city);
        $("#rank" + i).append(rankUser);
        $("#lastUpdate" + i).append(lastUpdate);
        $("#details" + i).append(askForDeatils);


        // second offer
        flag = 2;
        let amount2 = $("<a></a>").text(offer.amount2);
        let curr2 = $("<a></a>").text(offer.offered_currency2);
        let city2 = $("<a></a>").text(offer.city_1_2);
        let lastUpdate2 = $("<a></a>").text(offer.date2);
        let rankUser2;
        if (offer.rank < 0) {
            rankUser2 = $("<a style='color: red'></a>").text(offer.rank);
        }
        else {
            rankUser2 = $("<a style='color: green'></a>").text(offer.rank);
        }
        let el_second = $('<div>', {id: 'results2' + i, class: 'result2 container'});
        el_second.appendTo(el);
        $('<div>', {id: 'amount2' + i, class: 'amount'}).appendTo(el_second);
        $('<div>', {id: 'currency2' + i, class: 'currency'}).appendTo(el_second);
        $('<div>', {id: 'preferred2' + i, class: 'Pcurrency'}).appendTo(el_second);
        $('<div>', {id: 'city2' + i, class: 'city'}).appendTo(el_second);
        $('<div>', {id: 'rank2' + i, class: 'rank'}).appendTo(el_second);
        $('<div>', {id: 'lastUpdate2' + i, class: 'lastUpdate'}).appendTo(el_second);
        $('<div>', {id: 'details2' + i, class: 'details'}).appendTo(el_second);


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

        $("#amount2" + i).append(amount2);
        $("#currency2" + i).append(curr2);
        convertCurrenyTrans(offer.offered_currency2, offer.main_currency2, parseInt(offer.amount2), i, flag);
        if (offer.secondary_currency2) {
            convertCurrenyTrans(offer.offered_currency2, offer.secondary_currency2, parseInt(offer.amount2), i, flag);
        }
        $("#city2" + i).append(city2);
        $("#rank2" + i).append(rankUser2);
        $("#lastUpdate2" + i).append(lastUpdate2);
        $("#details2" + i).append(askForDeatils2);

    }
}


function convertCurrenyTrans(fromCurr, toCurr, amount, i, flag) {
    // set endpoint and access key
    let endpoint = 'latest';
    let access_key = '2d5b00bc20182a068df161c1239f8f48';
    // get the most recent exchange rates via the "latest" endpoint:
    let preferred = $("<a></a>");
    $.ajax({
        type: "GET",
        url: 'http://data.fixer.io/api/' + endpoint + '?access_key=' + access_key,
        dataType: 'jsonp',
        success: function (data) {
            let finalRateExchange = commitConversionTrans(data.rates, fromCurr, toCurr, amount)
            finalRateExchange = finalRateExchange.toFixed(2);
            preferred.text(toCurr + '=' + finalRateExchange + ' ');
            if (flag == 1) {
                $("#preferred1" + i).append(preferred);
            }
            if (flag == 2) {
                $("#preferred2" + i).append(preferred);
            }
        }
    });
}

function commitConversionTrans(data, fromCurr, toCurr, amount) {
    let exchangeRateTocurr = data[toCurr];
    let exchangeRateFromcurr = data[fromCurr];
    let finalRateExchange = (exchangeRateTocurr / exchangeRateFromcurr) * amount;
    return finalRateExchange;
}
