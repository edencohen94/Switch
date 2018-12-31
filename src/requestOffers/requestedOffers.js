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

var details=[];
var allOffers=[];
// get user's name for greeting
$.ajax({
    type:"POST",
    url: 'http://77.126.1.218:3060/user',
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    },
    success: function(data) {
        details=data.result[0];
        $(".greetings").text(details.first_name + "'s requested offers");
    },
    dataType: 'json'
});
// get all offers
$.ajax({
    type:"GET",
    url: 'http://77.126.1.218:3060/offer/all-offers',
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    },
    success: function(data) {
        allOffers=data.result;
    },
    dataType: 'json'
});
// get user's rquested offers from server
$.ajax({
    type:"GET",
    url: 'http://77.126.1.218:3060/offer/requested',
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    },
    success: function(data) {
        addRequested(data.result)
    },
    dataType: 'json'
});

function addRequested(offers) {
    for (i=0; i<offers.length; i++) {
        var offer=offers[i];
        let cardBody = $("<div></div>", {class: "card-body info-container"})
            .append($("<span></span>", {class: "offer-detail"}).text("Amount: " + allOffers[offer.offer_id].amount))
            .append($("<span></span>", {class: "offer-detail"}).text("Currency: " + allOffers[offer.offer_id].offered_currency))
            .append($("<span></span>", {class: "offer-detail"}).text("preferred Currency: " + allOffers[offer.offer_id].main_currency))
            .append($("<span></span>", {class: "offer-detail"}).text("second Currency: " + allOffers[offer.offer_id].secondary_currency))
            .append($("<span></span>", {class: "offer-detail"}).text("Date: " + offer.date));
        let textBody = $("<div></div>", {class: "text info-container"})
            .append($("<span></span>", {class: "offer-detail"}).text(allOffers[offer.offer_id].description))
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
            .append($("<h5></h5>", {class: "card-header"}).text(allOffers[offer.offer_id].amount))
            .append(cardBody)
            .append(textBody)
            .append(contectBody)
            .append(cardButtons);

        $(".offers-container").append(card);
    }
}


