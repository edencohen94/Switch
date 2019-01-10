
// get user's name for greeting
/*
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
*/

var details ={"user_id":"1", "requested":"dfsf","address_1":"fsf","city_1":"email","city_2":"gjdg"};
let offers =[{"offer_id":24,"user_id":1,"offered_currency":"ALL","amount":130,"date":"2019-01-06T21:18:56.000Z","main_currency":"ARS","secondary_currency":"AFN","description":"","requestedBy":[]},{"offer_id":22,"user_id":1,"offered_currency":"DZD","amount":1,"date":"2019-01-06T21:16:58.000Z","main_currency":"ALL","secondary_currency":"AFN","description":"","requestedBy":[]},{"offer_id":21,"user_id":1,"offered_currency":"ALL","amount":200,"date":"2019-01-06T21:16:12.000Z","main_currency":"ALL","secondary_currency":"ALL","description":"aa","requestedBy":[]},{"offer_id":16,"user_id":1,"offered_currency":"MXN","amount":1000,"date":"2019-01-04T12:25:18.000Z","main_currency":"DZD","secondary_currency":"ARS","description":"call me after 10","requestedBy":[{"user_id":1,"offer_id":16,"claimed_by_buyer":true,"claimed_by_seller":false,"date":"2019-01-03T22:00:00.000Z"}]},{"offer_id":15,"user_id":1,"offered_currency":"AFN","amount":12,"date":"2019-01-01T20:52:43.000Z","main_currency":"AFN","secondary_currency":"AFN","description":"sd","requestedBy":[{"user_id":1,"offer_id":15,"claimed_by_buyer":true,"claimed_by_seller":false,"date":"2019-01-01T22:00:00.000Z"}]}]


$('#myModal').modal('toggle');

addRequested(offers)
function addRequested(offers) {

    let Day = new Date().toLocaleDateString()
    let currDay = new Date(Day)
    let reminderOffers =  $("<div></div>", {class: "info-container"})
    for (let requestedoffer of offers) {
        //getOfferDetails(requestedoffer.offer_id);
        //let offerDay = requestedoffer.date.toLocaleDateString()
        let da= requestedoffer.date.split("T");
        let dd= da[0].split("-");
        let offerDay = new Date(dd[2]/dd[1]/dd[0])
        var timeDiff = Math.abs(currDay.getTime() - offerDay.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        console.log(diffDays)

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
            userStatus.append("You were interested in this offer with amount : " + requestedoffer.amount +" and currency : " +requestedoffer.offered_currency+ ", over a week ago. Was the exchange made?")
            userStatus.append(executeButtonB)
            userStatus.append(notExecutedButtonB)
            reminderOffers.append(userStatus)
        }
    }
    $(".modal-body").append(reminderOffers);
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

/*
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

*/
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


