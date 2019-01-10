function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
}
/*var details ={"user_id":"1", "requested":"dfsf","address_1":"fsf","city_1":"email","city_2":"gjdg"};
let offers =[{"offer_id":24,"user_id":1,"offered_currency":"ALL","amount":130,"date":"2019-01-06T21:18:56.000Z","main_currency":"ARS","secondary_currency":"AFN","description":"","requestedBy":[]},{"offer_id":22,"user_id":1,"offered_currency":"DZD","amount":1,"date":"2019-01-06T21:16:58.000Z","main_currency":"ALL","secondary_currency":"AFN","description":"","requestedBy":[]},{"offer_id":21,"user_id":1,"offered_currency":"ALL","amount":200,"date":"2019-01-06T21:16:12.000Z","main_currency":"ALL","secondary_currency":"ALL","description":"aa","requestedBy":[]},{"offer_id":16,"user_id":1,"offered_currency":"MXN","amount":1000,"date":"2019-01-04T12:25:18.000Z","main_currency":"DZD","secondary_currency":"ARS","description":"call me after 10","requestedBy":[{"user_id":1,"offer_id":16,"claimed_by_buyer":true,"claimed_by_seller":false,"date":"2019-01-03T22:00:00.000Z"}]},{"offer_id":15,"user_id":1,"offered_currency":"AFN","amount":12,"date":"2019-01-01T20:52:43.000Z","main_currency":"AFN","secondary_currency":"AFN","description":"sd","requestedBy":[{"user_id":1,"offer_id":15,"claimed_by_buyer":true,"claimed_by_seller":false,"date":"2019-01-03T22:00:00.000Z"}]}]
/*
var details ={"user_id":"1", "requested":"dfsf","address_1":"fsf","city_1":"email","city_2":"gjdg"};

let offers =[{"offer_id":24,"user_id":1,"offered_currency":"ALL","amount":130,"date":"2019-01-06T21:18:56.000Z","main_currency":"ARS","secondary_currency":"AFN","description":"","requestedBy":[]},{"offer_id":22,"user_id":1,"offered_currency":"DZD","amount":1,"date":"2019-01-06T21:16:58.000Z","main_currency":"ALL","secondary_currency":"AFN","description":"","requestedBy":[]},{"offer_id":21,"user_id":1,"offered_currency":"ALL","amount":200,"date":"2019-01-06T21:16:12.000Z","main_currency":"ALL","secondary_currency":"ALL","description":"aa","requestedBy":[]},{"offer_id":16,"user_id":1,"offered_currency":"MXN","amount":1000,"date":"2019-01-04T12:25:18.000Z","main_currency":"DZD","secondary_currency":"ARS","description":"call me after 10","requestedBy":[{"user_id":1,"offer_id":16,"claimed_by_buyer":true,"claimed_by_seller":false,"date":"2019-01-03T22:00:00.000Z"}]},{"offer_id":15,"user_id":1,"offered_currency":"AFN","amount":12,"date":"2019-01-01T20:52:43.000Z","main_currency":"AFN","secondary_currency":"AFN","description":"sd","requestedBy":[{"user_id":1,"offer_id":15,"claimed_by_buyer":true,"claimed_by_seller":false,"date":"2019-01-03T22:00:00.000Z"}]}];
*/


var details=[];
var userRes=0;
var numOfAnswers=0;
var totalClaims=0;
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
        details=data.result;
        $(".greetings").text(data.result.first_name + "'s offers");
    }
});

function getUserDetails(user_id){
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
            userRes++;
           // addDeatilsToModal(data.result.first_name);

        }
    });

}



// get user's offers from server
$.ajax({
    type: "GET",
    url: config.host + '/offer',
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    },
    dataType: 'json',
    success: function (data) {
        addOpenOffers(data.result,details);
        addpopUp(data.result);

    }
});

$('#myModal').modal({
    backdrop: 'static',
    keyboard: false
});



/*$("#myModal").on("hide", function () {
    if(numOfAnswers==totalClaims){
        return true;
    }

});*/


function addOpenOffers(offers,details) {
    //let requestedOffers =  $("<div></div>", {class: "info-container"});
    for (let offer of offers) {
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
            .append($("<span></span>", {class: "offer-detail"}).text("phone: " + details.phone))
            .append($("<span></span>", {class: "offer-detail"}).text("Email: " + details.email))
            .append($("<span></span>", {class: "offer-detail"}).text("Date: " + offer.date))
            .append($("<span></span>", {class: "offer-detail"}).text("Num of users that was intrested in your offer: " + offer.requestedBy.length));

        // create a button
        let deleteButton = $("<button></button>", {class: "btn btn-danger cancel-changes card-button"}).text("Delete");

        // assign it some data (the relevant offer-id)
        deleteButton.data('offer-id', offer.offer_id);

        // add a click listener
        deleteButton.click(function () {
            // here, this stands for the button that was clicked
            // so we want to get that button's offer-id
            deleteOffer($(this).data('offer-id'));
        });
        //deleteOffer will be a function that gets an id as a parameter
        //and deletes that offer.

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

        let cardButtons = $("<div></div>", {class: "ad-action-container"})
            .append($("<button></button>", {class: "btn btn-danger cancel-changes card-button"}).text("Edit"))
            .append(deleteButton)
            .append(executeButton);

        let card = $("<div></div>", {class: "card offer-card"})
            .append($("<h5></h5>", {class: "card-header"}).text(offer.offered_currency))
            .append(cardBody)
            .append(textBody)
            .append(contactBody)
            .append(cardButtons);


        $(".offers-container").append(card);
        //request claimed to happen by some users

    }

//    $(".modal-body").append(requestedOffers);

}

function addpopUp(offers){
    let requestedOffers =  $("<div></div>", {class: "info-container"});
    for (let offer of offers) {
        if (offer.requestedBy.length > 0) {
            //need to add all users
            for (i = 0; i < offer.requestedBy.length; i++) {
                if (offer.requestedBy[i].claimed_by_buyer) {
                    totalClaims++;
                    let userStatus = $("<div></div>", {class: "card-body info-container"})

                   // let user_name = getUserDetails(offer.requestedBy[i].user_id);
                    requestedOffers.append(userStatus);

                    let user_name = "dkfls";
                     let executeButton = $("<button></button>", {class: "btn btn-primary"}).text("YES");

                     executeButton.data('offer-id', offer.offer_id);
                     // add a click listener
                     executeButton.click(function () {
                         // here, this stands for the button that was clicked
                         // so we want to get that button's offer-id
                         numOfAnswers++;
                         postStatus($(this).data('offer-id'));
                     });

                     let NotexecuteButton = $("<button></button>", {class: "btn btn-default"}).text("NO");

                     NotexecuteButton.data('offer-id', offer.offer_id);
                     // add a click listener
                     NotexecuteButton.click(function () {
                         //ask tamir which route should i put
                         numOfAnswers++;
                         postNotclaimByBuyer($(this).data('offer-id'));
                     });
                     userStatus.append(user_name + " says an exchange was made for offer with amount : " + offer.amount + " and currency : " + offer.offered_currency + " .Do you confirm?")
                     userStatus.append(executeButton)
                     userStatus.append(NotexecuteButton)
                     requestedOffers.append(userStatus)
                }
            }
        }
    }
    $(".modal-body").append(requestedOffers);


}


$('#myModal').modal('toggle');


  /*  $('#myModal').on('data-dismiss='modal', function(e){
        if( numOfAnswers==totalClaims ) {
            $('#myModal').('hide');
            //e.preventDefault();
            //e.stopImmediatePropagation();
            //return false;
        }
    });
*/




function postNotclaimByBuyer(offer_id){
    $.ajax({
        type:"POST",
        url: config.host+ '/offer/not-claim-buyer',
        data: createNew(offer_id),
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            numOfAnswers++;
            console.log("success to update claim by the buyer");
            if(totalClaims==numOfAnswers){
                $('#myModal').modal('hide');
            }
        },
        dataType: 'json'
    });
}

/*
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
            console.log("dffd");
            if(totalClaims==numOfAnswers){
                $('#myModal').modal('hide');
            }
        },
        dataType: 'json'
    });
}

function deleteOffer(offer_id){
    $.ajax({
        type:"DELETE",
        url: config.host+ '/offer',
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
function createUser(user_id){
    let data={};
    data.user_id=user_id;
    return data
}



