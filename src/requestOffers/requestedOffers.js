
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
            getUserDetails(data.result[0],data.result[0].user_id)
        }
    });
}

function getUserDetails(offer_data, user_id){
    $.ajax({
        type: "POST",
        url: config.host + '/user/specific',
        data: createUser(user_id),
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        success: function (data) {
            addSingleRequest(offer_data, data.result)
            $(".greetings").text(data.result.first_name + "'s offers");
        }
    });

}


function addRequested(offers) {
    currTime = + new Date();
    let reminderOffers =  $("<div></div>", {class: "info-container"})
    for (let requestedoffer of offers) {
        getOfferDetails(requestedoffer.offer_id);
        //find out how to check the time gap correctly
        if(requestedoffer - currTime > 7){

            let executeButtonB = $("<button></button>", {class: "btn btn-primary"}).text("YES");

            executeButtonB.data('offer-id', requestedoffer.offer_id);
            // add a click listener
            executeButtonB.click(function () {
                // here, this stands for the button that was clicked
                // so we want to get that button's offer-id
                postStatusB($(this).data('offer-id'));
            });
            let notExecutedButtonB = $("<button></button>", {class: "btn btn-default"}).text("NO");

            notExecutedButtonB.data('offer-id', requestedoffer.offer_id);
            // add a click listener
            notExecutedButtonB.click(function () {
                //ask tamir which route should i put
                postStatusB($(this).data('offer-id'));
            });
            reminderOffers.append("You were interested in this offer a week ago. Was the exchange made?")
            reminderOffers.append(executeButtonB)
            reminderOffers.append(notExecutedButtonB)

        }
    }
    $(".modal-body").append(reminderOffers);
}


function postStatusB(offer_id){
    $.ajax({
        type:"POST",
        url: config.host+ '/offer/claim-buyer',
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


function addSingleRequest(offer,details) {
    let cardBody = $("<div></div>", {class: "card-body info-container"})
        .append($("<span></span>", {class: "offer-detail"}).text("Amount: " + offer.amount))
        .append($("<span></span>", {class: "offer-detail"}).text("Currency: " + offer.offered_currency))
        .append($("<span></span>", {class: "offer-detail"}).text("preferred Currency: " + offer.main_currency))
        .append($("<span></span>", {class: "offer-detail"}).text("second Currency: " + offer.secondary_currency))
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

    let da= offer.date.split("T");
    let dd= da[0].split("-");

    // create a button
    let executeButton = $("<button></button>", {class: "btn btn-danger cancel-changes card-button"}).text("Executed");

    // assign it some data (the relevant offer-id)
    executeButton.data('offer-id', offer.offer_id);

    // add a click listener
    executeButton.click(function () {
        // here, this stands for the button that was clicked
        // so we want to get that button's offer-id
            postStatus($(this).data('offer-id'));
    });

    // create a button
    let likebutton = $("<button></button>", {class: "btn btn-danger cancel-changes card-button"});

    // assign it some data (the relevant offer-id)
    likebutton.data('user-id',details.user_id);
    likebutton.data('rank',1);

    // add a click listener
    likebutton.click(function () {
        // here, this stands for the button that was clicked
        // so we want to get that button's offer-id
        postRank($(this).data('user-id'),$(this).data('rank'));
    });

    // create a button
    let unlikebutton = $("<button></button>", {class: "btn btn-danger cancel-changes card-button"});

    // assign it some data (the relevant offer-id)
    unlikebutton.data('user-id',details.user_id);
    unlikebutton.data('rank',-1);

    // add a click listener
    unlikebutton.click(function () {
        // here, this stands for the button that was clicked
        // so we want to get that button's offer-id
        postRank($(this).data('user-id'),$(this).data('rank'));
    });

    let cardButtons = $("<div></div>", {class: "ad-action-container"})
        .append($("<button></button>", {class: "btn btn-danger cancel-changes card-button"}).text("Not Executed"))
        .append(executeButton)
        .append(likebutton)
        .append(unlikebutton)

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
        url: config.host+ '/offer/claim-buyer',
        data: createNew(offer_id),
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            console.log("success to update claim by the buyer")
        },
        dataType: 'json'
    });
}

function postRank(user_id, rank){
    $.ajax({
        type:"POST",
        url: config.host+ '/user/rank',
        data: createRank(user_id,rank),
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


function createRank(user_id, rank){
    let data={};
    data.user_id=user_id;
    data.rank=rank;
    return data
}

function createNew(offer_id){
    let data={};
    data.offer_id=offer_id;
    return data
}

function createUser(user_id){
    let data={};
    data.user_id=user_id;
    return data
}


