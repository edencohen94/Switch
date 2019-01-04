
// get user's name for greeting
$.ajax({
    type: "POST",
    url: config.host + '/user',
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    },
    dataType: 'json',
    success: function (data) {
        $(".greetings").text(data.result.first_name + "'s offers");
    }
});

// get user's rquested offers from server
$.ajax({
    type:"GET",
    url: config.host+ '/offer/requested',
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    },
    success: function(data) {
        addRequested(data.result);
    },
    dataType: 'json'
});


// get offer
function getOfferDetails(offer_id){
    $.ajax({
        type:"POST",
        url: config.host+'/offer/specific',
        data: createNew(offer_id),
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        success: function(data) {
            addSingleRequest(data.result)
        }
    });
}


function addRequested(offers) {
    for (let requestedoffer of offers) {
        getOfferDetails(requestedoffer.offer_id);
    }

}

    function addSingleRequest(offer) {
        let cardBody = $("<div></div>", {class: "card-body info-container"})
            .append($("<span></span>", {class: "offer-detail"}).text("Amount: " + offer.amount))
            .append($("<span></span>", {class: "offer-detail"}).text("Currency: " + offer.offered_currency))
            .append($("<span></span>", {class: "offer-detail"}).text("preferred Currency: " + offer.main_currency))
            .append($("<span></span>", {class: "offer-detail"}).text("second Currency: " + offer.secondary_currency))
        let textBody = $("<div></div>", {class: "card-body info-container"})
            .append($("<span></span>", {class: "offer-detail"}).text(offer.description))
            .append($("<span></span>", {class: "offer-detail"}).text("Address: " + offer.address_1))
            .append($("<span></span>", {class: "offer-detail"}).text("City: " + offer.city_1))
            .append($("<span></span>", {class: "offer-detail"}).text("Address2: " + offer.address_2))
            .append($("<span></span>", {class: "offer-detail"}).text("City2: " + offer.city_2))
        let contactBody = $("<div></div>", {class: "card-body info-container"})
            .append($("<span></span>", {class: "offer-detail"}).text("phone: " + offer.phone))
            .append($("<span></span>", {class: "offer-detail"}).text("Email: " + offer.email))
            .append($("<span></span>", {class: "offer-detail"}).text("Date: " + offer.date));

        // create a button
        let executeButton = $("<button></button>", {class: "btn btn-danger cancel-changes card-button"}).text("Executed");

        // assign it some data (the relevant offer-id)
        executeButton.data('offer-id', offer.offer_id);

        // add a click listener
        executeButton.click(function () {
            // here, this stands for the button that was clicked
            // so we want to get that button's offer-id
            postStatus(this.data('offer-id'));
        });

        let cardButtons = $("<div></div>", {class: "ad-action-container"})
            .append($("<button></button>", {class: "btn btn-danger cancel-changes card-button"}).text("Not Executed"))
            .append(executeButton)
            .append($('<a/>', {href: ""}).append($('<img/>', {src: "../Images/like.png", width: '60', height: '60'})))
            .append($('<a/>', {href: ""}).append($('<img/>', {
                src: "../Images/dislike.png",
                width: '60',
                height: '60'
            })));

        let card = $("<div></div>", {class: "card offer-card"})
            .append($("<h5></h5>", {class: "card-header"}).text(offer.offered_currency))
            .append(cardBody)
            .append(textBody)
            .append(contactBody)
            .append(cardButtons);

        $(".offers-container").append(card);
    }


function postStatus(offer_id){
    $.ajax({
        type:"POST",
        url: config.host+ '/offer/claim-seller',
        data: createNew(offer_id),
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            console.log("dffd")
        },
        dataType: 'json'
    });
}


function createNew(offer_id){
    let data={}
    data.offer_id=offer_id
    return data
}


