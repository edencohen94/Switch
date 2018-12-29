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


// get user's name for greeting
$.ajax({
    type:"POST",
    url: 'http://77.126.1.218:3060/user',
    data: null,
    success: function(data) {
        $(".greetings").text(data.first_name + "'s requested offers");
    },
    dataType: 'json'
});


function addRequested(offers) {
    for (i=0; i<offers.length; i++) {
        var offer=offers[i];
        let cardBody = $("<div></div>", {class: "card-body info-container"})
            .append($("<span></span>", {class: "offer-detail"}).text("Amount: " + offer.amount))
            .append($("<span></span>", {class: "offer-detail"}).text("Currency: " + offer.currency))
            .append($("<span></span>", {class: "offer-detail"}).text("preferred Currency: " + offer.preferredCurrency))
            .append($("<span></span>", {class: "offer-detail"}).text("Date: " + offer.date));
        let textBody = $("<div></div>", {class: "text info-container"})
            .append($("<span></span>", {class: "offer-detail"}).text(offer.FreeText))
        let contectBody = $("<div></div>", {class: "card-body info-container"})
            .append($("<span></span>", {class: "offer-detail"}).text("Address: " + state.detailsUsers[0].address))
            .append($("<span></span>", {class: "offer-detail"}).text("Email: " + state.detailsUsers[0].Email))
            .append($("<span></span>", {class: "offer-detail"}).text("phone: " + state.detailsUsers[0].phone));

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
            .append($("<h5></h5>", {class: "card-header"}).text(offer.currency))
            .append(cardBody)
            .append(textBody)
            .append(contectBody)
            .append(cardButtons);

        $(".offers-container").append(card);
    }
}

// get user's rquested offers from server
$.ajax({
    type:"GET",
    url: 'http://77.126.1.218:3060/requested',
    success: function(data) {
        addRequested(data)
    },
    dataType: 'json'
});

