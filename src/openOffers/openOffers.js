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

var details=[];
var openedOffers=[];
var allOffers=[];
var myOpen=[];

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
        $(".greetings").text(details.first_name + "'s offers");
    },
    dataType: 'json'
});

// get user's opened offers from server
$.ajax({
    type:"GET",
    url: 'http://77.126.1.218:3060/offer',
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    },
    success: function(data) {
        openedOffers=data.result;
        addOpenOffers();
        /*combine();*/
    },
    dataType: 'json'
});



function addOpenOffers() {
    for (i=0; i<openedOffers.length; i++) {
        var offer=openedOffers[i];
        let cardBody = $("<div></div>", {class: "card-body info-container"})
            .append($("<span></span>", {class: "offer-detail"}).text("Amount: " + offer.amount))
            .append($("<span></span>", {class: "offer-detail"}).text("Currency: " + offer.offered_currency))
            .append($("<span></span>", {class: "offer-detail"}).text("preferred Currency: " + offer.main_currency))
            .append($("<span></span>", {class: "offer-detail"}).text("second Currency: " + offer.secondary_currency))
            .append($("<span></span>", {class: "offer-detail"}).text("offerId" + offer.offer_id))
        let textBody = $("<div></div>", {class: "card-body info-container"})
            .append($("<span></span>", {class: "offer-detail"}).text(offer.description))
            .append($("<span></span>", {class: "offer-detail"}).text("Address: " + details.address_1))
            .append($("<span></span>", {class: "offer-detail"}).text("City: " + details.city_1))
            .append($("<span></span>", {class: "offer-detail"}).text("Address2: " + details.address_2))
            .append($("<span></span>", {class: "offer-detail"}).text("City2: " + details.city_2))
        let contactBody = $("<div></div>", {class: "card-body info-container"})
            .append($("<span></span>", {class: "offer-detail"}).text("phone: " + details.phone))
            .append($("<span></span>", {class: "offer-detail"}).text("Email: " + details.email))
            .append($("<span></span>", {class: "offer-detail"}).text("Date: " + offer.date));

        let cardButtons = $("<div></div>", {class: "ad-action-container"})
            .append($("<button></button>", {class: "btn btn-danger cancel-changes card-button"}).text("Edit"))
            .append($("<button></button>", {class: "btn btn-danger cancel-changes card-button"}).text("Delete"))
            .append($("<button></button>", {class: "btn btn-danger cancel-changes card-button"}).text("Executed").click(function (){
                    $.ajax({
                        type:"POST",
                        url: 'http://77.126.1.218:3060/offer/claim-seller',
                        data: getOfferId(),
                        crossDomain: true,
                        xhrFields: {
                            withCredentials: true
                        },
                        success: function(data) {
                            console.log("dffd")        },
                        dataType: 'json'
                    })
            })

            );

        let card = $("<div></div>", {class: "card offer-card"})
            .append($("<h5></h5>", {class: "card-header"}).text(offer.offered_currency))
            .append(cardBody)
            .append(textBody)
            .append(contactBody)
            .append(cardButtons);


        $(".offers-container").append(card);
    }
}


function postStatus(){
    $.ajax({
        type:"POST",
        url: 'http://77.126.1.218:3060/offer/claim-seller',
        data: getOfferId(),
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
console.log("dffd")        },
        dataType: 'json'
    })
}

function getOfferId(){
    data={}
    data.offer_id = $('#offerId').val();
    return data
}
