let state = {
    username: "Ilan",
    offers: [
        {
            amount: 300,
            currency: "USD",
            preferredCurrency: "Shekel",
            city: "Tel-Aviv",
            date: "21/12/2018"
        },
        {
            amount: 500,
            currency: "CAD",
            preferredCurrency: "Shekel",
            city: "Tel-Aviv",
            date: "13/12/2018"
        },
        {
            amount: 340,
            currency: "HUF",
            preferredCurrency: "Shekel",
            city: "Tel-Aviv",
            date: "04/12/2018"
        },
        {
            amount: 560,
            currency: "NZD",
            preferredCurrency: "Shekel",
            city: "Tel-Aviv",
            date: "21/12/2018"
        },
        {
            amount: 340,
            currency: "HUF",
            preferredCurrency: "Shekel",
            city: "Tel-Aviv",
            date: "04/12/2018"
        },
        {
            amount: 560,
            currency: "NZD",
            preferredCurrency: "Shekel",
            city: "Tel-Aviv",
            date: "21/12/2018"
        }
    ]
};

$(".greetings").text(state.username + "'s offers");

for (let offer of state.offers) {
    let cardBody = $("<div></div>", {class: "card-body info-container"})
        .append($("<span></span>", {class: "offer-detail"}).text("Amount: " + offer.amount))
        .append($("<span></span>", {class: "offer-detail"}).text("Date: " + offer.date))
        .append($("<span></span>", {class: "offer-detail"}).text("City: " + offer.city));

    let cardButtons = $("<div></div>", {class: "ad-action-container"})
        .append($("<button></button>", {class: "btn btn-danger cancel-changes card-button"}).text("Delete"));

    let card = $("<div></div>", {class: "card offer-card"})
        .append($("<h5></h5>", {class: "card-header"}).text(offer.currency))
        .append(cardBody)
        .append(cardButtons);

    $(".offers-container").append(card);
}
