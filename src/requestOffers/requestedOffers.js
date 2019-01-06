/*let state = {
    username: "Ilan",
    offers: [
        {
            amount: 300,
            currency: "USD",
            preferredCurrency: "Shekel",
            city: "Tel-Aviv",
            FreeText: '"can meet on afternoon hours, please call me every day except sunday"',
            date: "21/12/2018"
       },
       {
           amount: 500,
           currency: "CAD",
           preferredCurrency: "Shekel",
          city: "Tel-Aviv",
            FreeText: '"can meet on afternoon hours, please call me every day except sunday"',
            date: "13/12/2018"
        },
        {
            amount: 340,
            currency: "HUF",
            preferredCurrency: "Shekel",
            city: "Tel-Aviv",
            FreeText: '"can meet on afternoon hours, please call me every day except sunday"',
           date: "04/12/2018"
        },
        {
            amount: 560,
            currency: "NZD",
            preferredCurrency: "Shekel",
            city: "Tel-Aviv",
           FreeText: '"can meet on afternoon hours, please call me every day except sunday"',
           date: "21/12/2018"
      },
     {
       amount: 340,
     currency: "HUF",
            preferredCurrency: "Shekel",
            city: "Tel-Aviv",
            FreeText: '"can meet on afternoon hours, please call me every day except sunday"',
           date: "04/12/2018"
        },
        {
            amount: 560,
            currency: "NZD",
            preferredCurrency: "Shekel",
            city: "Tel-Aviv",
            FreeText: '"can meet on afternoon hours, please call me every day except sunday"',
            date: "21/12/2018"
        }
    ],
    detailsUsers:[
        {
            address: "Rabin 58, Tel Aviv",
            phone: "0554958374",
            Email: "blabla@gmail.com",

    }
    ]
};*/

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
}
var details=[];
var requestedOffers=[];
var allOffers=[];
var myrequested=[];
// get user's name for greeting
$.ajax({
    type:"POST",
    url: config.host +'/user',
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    },
    success: function(data) {
        details=data.result;
        $(".greetings").text(details.first_name + "'s requested offers");
    },
    dataType: 'json'
});
// get user's rquested offers from server
$.ajax({
    type:"GET",
    url: config.host + '/offer/requested',
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    },
    success: function(data) {
        requestedOffers=data.result;
        combine();
    },
    dataType: 'json'
});

// get my requested offers
$.ajax({
    type:"GET",
    url: config.host + '/offer/all-offers',
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    },
    success: function(data) {
        allOffers=data.result;
        combine();
    },
    dataType: 'json'
});

function combine() {
    var k = 0;
    var j = 0
    var i = 0
    if (requestedOffers != null && allOffers != null) {
        for (j = 0; j < requestedOffers.length; j++) {
            for (i = 0; i < allOffers.length; i++) {
                if (allOffers[i].offer_id == requestedOffers[j].offer_id) {
                    myrequested[k] = allOffers[i];
                    k++;
                }
            }
     }
    }
    addRequested();
}


function addRequested() {
    for (i=0; i<requestedOffers.length; i++) {
        var detailsOffer=myrequested[i];
        var offer=requestedOffers[i];
        let cardBody = $("<div></div>", {class: "card-body info-container"})
            .append($("<span></span>", {class: "offer-detail"}).text("Amount: " + String(detailsOffer.amount)))
            .append($("<span></span>", {class: "offer-detail"}).text("Currency: " + detailsOffer.offered_currency))
            .append($("<span></span>", {class: "offer-detail"}).text("preferred Currency: " + detailsOffer.main_currency))
            .append($("<span></span>", {class: "offer-detail"}).text("second Currency: " + detailsOffer.secondary_currency))
            .append($("<span></span>", {class: "offer-detail"}).text("Date: " + formatDate(offer.date)));
        let textBody = $("<div></div>", {class: "text info-container"})
            .append($("<span></span>", {class: "offer-detail"}).text(detailsOffer.description))
        let contectBody = $("<div></div>", {class: "card-body info-container"})
            .append($("<span></span>", {class: "offer-detail"}).text("Address: " + details.address_1))
            .append($("<span></span>", {class: "offer-detail"}).text("City: " + details.city_1))
            .append($("<span></span>", {class: "offer-detail"}).text("Address2: " + details.address_2))
            .append($("<span></span>", {class: "offer-detail"}).text("City2: " + details.city_2))
            .append($("<span></span>", {class: "offer-detail"}).text("Email: " + details.email))
            .append($("<span></span>", {class: "offer-detail"}).text("phone: " + details.phone));

        let cardButtons = $("<div></div>", {class: "ad-action-container"})
            .append($("<button></button>", {class: "btn btn-danger cancel-changes card-button"}).text("Not Executed"))
            .append($("<button></button>", {class: "btn btn-danger cancel-changes card-button"}).text("Executed"))
            .append($('<a/>', {href: ""}).append($('<img/>', {src: "../Images/like.png", width: '60', height: '60'})))
            .append($('<a/>', {href: ""}).append($('<img/>', {
                src: "../Images/dislike.png",
                width: '60',
                height: '60'
            })));

        let card = $("<div></div>", {class: "card offer-card"})
            .append($("<h5></h5>", {class: "card-header"}).text(detailsOffer.offered_currency))
            .append(cardBody)
            .append(textBody)
            .append(contectBody)
            .append(cardButtons);

        $(".offers-container").append(card);
    }
}


