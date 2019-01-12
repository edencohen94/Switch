function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
}
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
        $(".greetings").text(data.result.first_name + "'s requested offers");
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
            getUserDetails(data.result[0],data.result[0].user_id);
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
            addSingleRequest(offer_data, data.result);
            addPop(offer_data, data.result);
        }
    });

}


$('#myModal').modal('toggle');

let reminderOffers =  $("<div></div>", {class: "info-container"})

function addRequested(offers) {
    let Day = new Date()
    let currDay = new Date(Day)
    //let reminderOffers =  $("<div></div>", {class: "info-container"})
    for (let requestedoffer of offers) {
        getOfferDetails(requestedoffer.offer_id);

        /*
        let offerDay = new Date(requestedoffer.date)
        var timeDiff = Math.abs(currDay.getTime() - offerDay.getTime());
        var diffDays = Math.round(timeDiff / (1000 * 3600 * 24));
        if(diffDays >= 7){

            let userStatus = $("<div></div>", {class: "card-body info-container"})

            let executeButtonB = $("<button></button>", {class: "btn btn-primary"}).text("YES");

            executeButtonB.data('offer-id', requestedoffer.offer_id);
            // add a click listener
            executeButtonB.click(function () {
                // here, this stands for the button that was clicked
                // so we want to get that button's offer-id
                postStatus($(this).data('offer-id'));
            });
            let notExecutedButtonB = $("<button></button>", {class: "btn btn-default"}).text("NO");

            notExecutedButtonB.data('offer-id', requestedoffer.offer_id);
            // add a click listener
            notExecutedButtonB.click(function () {
                //ask tamir which route should i put
                postStatus($(this).data('offer-id'));
            });
            userStatus.append("You were interested in this offer that was posted by with amount : " + requestedoffer.amount +" and currency : " +requestedoffer.offered_currency+ ", over a week ago. Was the exchange made?")
            userStatus.append(executeButtonB)
            userStatus.append(notExecutedButtonB)
            reminderOffers.append(userStatus)

        }*/
    }
        $(".modal-body").append(reminderOffers);
}



function addPop(ruquestedoffer,details){
    //let reminderOffers =  $("<div></div>", {class: "info-container"})
    let offerDay = new Date(requestedoffer.date)
    var timeDiff = Math.abs(currDay.getTime() - offerDay.getTime());
    var diffDays = Math.round(timeDiff / (1000 * 3600 * 24));
    if(diffDays >= 7) {

        let userStatus = $("<div></div>", {class: "card-body info-container"})

        let executeButtonB = $("<button></button>", {class: "btn btn-primary"}).text("YES");

        executeButtonB.data('offer-id', requestedoffer.offer_id);
        // add a click listener
        executeButtonB.click(function () {
            // here, this stands for the button that was clicked
            // so we want to get that button's offer-id
            postStatus($(this).data('offer-id'));
        });
        let notExecutedButtonB = $("<button></button>", {class: "btn btn-default"}).text("NO");

        notExecutedButtonB.data('offer-id', requestedoffer.offer_id);
        // add a click listener
        notExecutedButtonB.click(function () {
            //ask tamir which route should i put
            postStatus($(this).data('offer-id'));
        });
        userStatus.append("You were interested in this offer that was posted by" + details.username + "with amount : " + requestedoffer.amount + " and currency : " + requestedoffer.offered_currency + ", over a week ago. Was the exchange made?")
        userStatus.append(executeButtonB)
        userStatus.append(notExecutedButtonB)
        reminderOffers.append(userStatus)


    }
}


function addSingleRequest(offer,details) {
    let cardBody = $("<div></div>", {class: "card-body info-container"})
        .append($("<span></span>", {class: "offer-detail"}).text("Amount: " + offer.amount))
        .append($("<span></span>", {class: "offer-detail"}).text("Currency: " + offer.offered_currency))
        .append($("<span></span>", {class: "offer-detail"}).text("preferred Currency: " + offer.main_currency))
        .append($("<span></span>", {class: "offer-detail"}).text("second Currency: " + offer.secondary_currency))
    let textBody = $("<div></div>", {class: "card-body info-container"})
        if(offer.description){
            textBody.append($("<span></span>", {class: "offer-detail"}).text("'"+offer.description+"'"))
        }
        textBody.append($("<span></span>", {class: "offer-detail"}).text("Address: " + details.address_1))
        textBody.append($("<span></span>", {class: "offer-detail"}).text("City: " + details.city_1))
    if (details.address_2) {
        textBody.append($("<span></span>", {class: "offer-detail"}).text("Address2: " + details.address_2))
    }
    if(details.city_2) {
        textBody.append($("<span></span>", {class: "offer-detail"}).text("City2: " + details.city_2))
    }
    let contactBody = $("<div></div>", {class: "card-body info-container"})
        if(details.phone){
            contactBody.append($("<span></span>", {class: "offer-detail"}).text("phone: " + details.phone))
        }
        contactBody.append($("<span></span>", {class: "offer-detail"}).text("Email: " + details.email))
        contactBody.append($("<span></span>", {class: "offer-detail"}).text("Date: " + formatDate(offer.date)));

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
    let likebutton = $("<button></button>");

    // assign it some data (the relevant offer-id)
    likebutton.data('user-id',details.user_id);
    likebutton.data('rank',1);
    likebutton.append($('<img/>', {src: "../Images/like.png", width: '60', height: '60'}))

    // add a click listener
    likebutton.click(function () {
        // here, this stands for the button that was clicked
        // so we want to get that button's offer-id
        postRank($(this).data('user-id'),$(this).data('rank'));
    });

    // create a button
    let unlikebutton = $("<button></button>");

    // assign it some data (the relevant offer-id)
    unlikebutton.data('user-id',details.user_id);
    unlikebutton.data('rank',-1);
    unlikebutton.append($('<img/>', {src: "../Images/dislike.png", width: '60', height: '60'}));


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


