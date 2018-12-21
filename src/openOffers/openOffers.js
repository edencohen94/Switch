let state = {
    username: "Ilan",
    offers: [
        {
            amount: 300,
            currency: "USD",
            "preferred-currency": "Shekel",
            city: "Tel-Aviv",
            date: "21/12/2018"
        },
        {
            amount: 500,
            currency: "CAD",
            "preferred-currency": "Shekel",
            city: "Tel-Aviv",
            date: "13/12/2018"
        },
        {
            amount: 340,
            currency: "HUF",
            "preferred-currency": "Shekel",
            city: "Tel-Aviv",
            date: "04/12/2018"
        },
        {
            amount: 560,
            currency: "NZD",
            "preferred-currency": "Shekel",
            city: "Tel-Aviv",
            date: "21/12/2018"
        },
        {
            amount: 340,
            currency: "HUF",
            "preferred-currency": "Shekel",
            city: "Tel-Aviv",
            date: "04/12/2018"
        },
        {
            amount: 560,
            currency: "NZD",
            "preferred-currency": "Shekel",
            city: "Tel-Aviv",
            date: "21/12/2018"
        }
    ]
};

$(".greetings").text(state.username + "'s offers");

for (let offer of state.offers) {
    // let card = $("<div class=\"card\">\n" +
    //     "  <h5 class=\"card-header\">Featured</h5>\n" +
    //     "  <div class=\"card-body\">\n" +
    //     "    <h5 class=\"card-title\">Special title treatment</h5>\n" +
    //     "    <p class=\"card-text\">With supporting text below as a natural lead-in to additional content.</p>\n" +
    //     "    <a href=\"#\" class=\"btn btn-primary\">Go somewhere</a>\n" +
    //     "  </div>\n" +
    //     "</div>");

    let cardBody = $("<div></div>", {class: "card-body info-container"})
        .append($("<span></span>", {class: "offer-detail"}).text("Amount: " + offer.amount))
        .append($("<span></span>", {class: "offer-detail"}).text("Date: " + offer.date))
        .append($("<span></span>", {class: "offer-detail"}).text("City: " + offer.city));
    let card = $("<div></div>", {class: "card offer-card"})
        .append($("<h5></h5>", {class: "card-header"}).text(offer.currency))
        .append(cardBody);

    $(".offers-container").append(card);
}
