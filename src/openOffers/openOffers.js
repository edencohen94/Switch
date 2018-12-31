/*let state = {
    username: "Ilan",
    offers: [
        {
            amount: 300,
            currency: "USD",
            address: "Rabin 89, Tel Aviv",
            alternativeAdd: "shalom 11, Netanya",
            preferredCurrency: "Shekel",
            FreeText: '"..............................................."',
            phone: "0555484575",
            Email: "blabla@gmail.com",
            Date: "21/12/18"
        },
        {
            amount: 500,
            currency: "CAD",
            address: "Rabin 89, Tel Aviv",
            alternativeAdd: "shalom 11, Netanya",
            preferredCurrency: "Shekel",
            FreeText: '"..............................................."',
            phone: "0555484575",
            Email: "blabla@gmail.com",
            Date: "21/12/18"
        },
        {
            amount: 340,
            currency: "HUF",
            address: "Rabin 89, Tel Aviv",
            alternativeAdd: "shalom 11, Netanya",
            preferredCurrency: "Shekel",
            FreeText: '"..............................................."',
            phone: "0555484575",
            Email: "blabla@gmail.com",
            Date: "21/12/18"
        },
        {
            amount: 560,
            currency: "NZD",
            address: "Rabin 89, Tel Aviv",
            alternativeAdd: "shalom 11, Netanya",
            preferredCurrency: "Shekel",
            FreeText: '"..............................................."',
            phone: "0555484575",
            Email: "blabla@gmail.com",
            Date: "21/12/18"
        },
        {
            amount: 340,
            currency: "HUF",
            address: "Rabin 89, Tel Aviv",
            alternativeAdd: "shalom 11, Netanya",
            preferredCurrency: "Shekel",
            FreeText: '"..............................................."',
            phone: "0555484575",
            Email: "blabla@gmail.com",
            Date: "21/12/18"
        },
        {
            amount: 560,
            currency: "NZD",
            address: "Rabin 89, Tel Aviv",
            alternativeAdd: "shalom 11, Netanya",
            preferredCurrency: "Shekel",
            FreeText: '"..............................................."',
            phone: "0555484575",
            Email: "blabla@gmail.com",
            Date: "21/12/18"
        }
    ]
};*/

// get user's name for greeting
$.ajax({
    type:"POST",
    url: 'http://77.126.1.218:3060/user',
    data: null,
    success: function(data) {
        $(".greetings").text(data.first_name + "'s offers");
    },
    dataType: 'json'
});

function addOpenOffers(offers) {
    for (let offer of state.offers) {
        let cardBody = $("<div></div>", {class: "card-body info-container"})
            .append($("<span></span>", {class: "offer-detail"}).text("Amount: " + offer.amount))
            .append($("<span></span>", {class: "offer-detail"}).text("Currency: " + offer.offered_currency))
            .append($("<span></span>", {class: "offer-detail"}).text("preferred Currency: " + offer.main_currency))
        let textBody = $("<div></div>", {class: "card-body info-container"})
            .append($("<span></span>", {class: "offer-detail"}).text(offer.description))
            .append($("<span></span>", {class: "offer-detail"}).text("Address: " + offer.address))
            .append($("<span></span>", {class: "offer-detail"}).text("Alternative Address: " + offer.alternativeAdd))
        let contactBody = $("<div></div>", {class: "card-body info-container"})
            .append($("<span></span>", {class: "offer-detail"}).text("phone: " + offer.phone))
            .append($("<span></span>", {class: "offer-detail"}).text("Email: " + offer.Email))
            .append($("<span></span>", {class: "offer-detail"}).text("Date: " + offer.Date));

        let cardButtons = $("<div></div>", {class: "ad-action-container"})
            .append($("<button></button>", {class: "btn btn-danger cancel-changes card-button"}).text("Edit"))
            .append($("<button></button>", {class: "btn btn-danger cancel-changes card-button"}).text("Delete"))
            .append($("<button></button>", {class: "btn btn-danger cancel-changes card-button"}).text("Executed"));

        let card = $("<div></div>", {class: "card offer-card"})
            .append($("<h5></h5>", {class: "card-header"}).text(offer.currency))
            .append(cardBody)
            .append(textBody)
            .append(contactBody)
            .append(cardButtons);

        $(".offers-container").append(card);
    }
}


// get user's rquested offers from server
$.ajax({
    type:"GET",
    url: config.host+ '/offer',
    success: function(data) {
        addOpenOffers(data)
    },
    dataType: 'json'
});
