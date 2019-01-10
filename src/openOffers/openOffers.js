function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
}



var details=[];
var userRes=0;
var numOfAnswers=0;
var totalClaims=0;

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
        details=data.result;
        $(".greetings").text(data.result.first_name + "'s offers");
    }
});

function getUserDetails(user_id,offer){
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
            addsingleAlert(offer,data.result.first_name);
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
        checkNum();

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

function checkNum(){
   if(numOfAnswers==totalClaims){
        $('#myModal').modal('hide');

    }

}

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
            if(offer.requestedBy.length>0){
                contactBody.append($("<span></span>", {class: "offer-detail"}).text("Num of users that was intrested in your offer: " + offer.requestedBy.length));


            }

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
let requestedOffers =  $("<div></div>", {class: "info-container"});

function addpopUp(offers){
    for (let offer of offers) {
        if (offer.requestedBy.length > 0) {
            //need to add all users
            for (i = 0; i < offer.requestedBy.length; i++) {
                if (offer.requestedBy[i].claimed_by_buyer) {
                    requestedOffers.append(getUserDetails(offer.requestedBy[i].user_id,offer));
       /*             totalClaims++;
                    let userStatus = $("<div></div>", {class: "card-body info-container"})

                    const user_name =  getUserDetails(offer.requestedBy[i].user_id).done;
                    requestedOffers.append(userStatus);

                   // let user_name = "dkfls";
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
                     requestedOffers.append(userStatus)*/
                }
            }
        }

    }
    $(".modal-body").append(requestedOffers);


}

function addsingleAlert(offer,user_name){
    if (offer.requestedBy.length > 0) {
        //need to add all users
                let userStatus = $("<div></div>", {class: "card-body info-container"})
                //const user_name =  getUserDetails(offer.requestedBy[i].user_id).done;

                // let user_name = "dkfls";
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
                   // postNotclaimByBuyer($(this).data('offer-id'));
                });
                userStatus.append(user_name + " says an exchange was made for offer with amount : " + offer.amount + " and currency : " + offer.offered_currency + " .Do you confirm?")
                userStatus.append(executeButton)
                userStatus.append(NotexecuteButton);
                requestedOffers.append(userStatus);
            }



}


$('#myModal').modal('toggle');


 /* /!*  $('#myModal').on('data-dismiss='modal', function(e){
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



