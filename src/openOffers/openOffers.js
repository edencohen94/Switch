
var details =[];
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

function getName(user_id){
    $.ajax({
        type:"POST",
        url: config.host + '/user',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            $.text(data.result.first_name);
        }
    });
}


// get user's rquested offers from server
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
        //addPopUp(data.result,details);
    }
});

let temp ={
    "executed_lst": [{"user_id":1,"offer_id":15,"claimed_by_buyer":true,"claimed_by_seller":false,"date":"2019-01-03T22:00:00.000Z"},
    {"user_id":1,"offer_id":16,"claimed_by_buyer":true,"claimed_by_seller":false,"date":"2019-01-03T22:00:00.000Z"},
    {"user_id":1,"offer_id":10,"claimed_by_buyer":true,"claimed_by_seller":true,"date":"2018-12-27T22:00:00.000Z"}
]
}



// function addPopUp(offers,details) {
//     //for (let offer of offers) {
//     //if(offer.executed_lst.size !=0 ) {
//     //for (let user of temp.executed_lst){
//     varName = getName.data(user.user_id);
//     let popBody = $("<div></div>", {class: "main-container"})
//         .append("<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n" +
//             "  <div class=\"modal-dialog\" role=\"document\">\n" +
//             "    <div class=\"modal-content\">\n" +
//             "      <div class=\"modal-header\">\n" +
//             "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">" +
//             "        <span aria-hidden=\"true\">&times;</span></button>\n" +
//     "        <h4 class=\"modal-title\">Exchange Confirmation</h4>\n" +
//     "      </div>\n" +
//     "      <div class=\"modal-body\">\n" +
//     "          <p> .text(varName + \"says an exchange was made for this offer. Do you confirm?\") </p>\n" +
//     "      </div>\n" +
//     "      <div class=\"modal-footer\">\n" +
//     "      </div>\n" +
//     "    </div><!-- /.modal-content -->\n" +
//     "  </div><!-- /.modal-dialog -->\n" +
//     "</div><!-- /.modal -->")
//     //}
//     //}
//     // create a button
//     let confirmButton = $("<button></button>", {class: "btn btn-primary"}).text("YES");
//     // assign it some data (the relevant offer-id)
//     confirmButton.data('offer-id', offer.offer_id);
//     // add a click listener
//     confirmButton.click(function () {
//         // here, this stands for the button that was clicked
//         // so we want to get that button's offer-id
//         postStatus($(this).data('offer-id'));
//     });
//
//     $(".modal-footer").append($("<button></button>", {class: "btn btn-default"}).text("NO"));
//     $(".modal-footer").append(confirmButton)
//
//     $(".main-container").append(popBody);
//     //}
// }

function addOpenOffers(offers,details) {
    for (let offer of offers) {
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
    }
}


$('#modal-fade').modal('toggle');



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



