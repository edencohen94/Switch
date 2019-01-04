/*const state = {
    "details": [
        {
            firstname: "Ilan",
            lastname: "israeli",
            email: "ilan@gmail.com",
            phone: "050-0000000",
            address: "israel 123,tel aviv, israel",
            pcurrency: "U.S Dollar",
            scurrency: "Euro",
            imgProfile: "https://bootdey.com/img/Content/avatar/avatar7.png"
        }
    ]
};

console.log(state.details.name);
    let element1 = $("<a></a>").text(state.details.firstname);
    let element2 = $("<a></a>").text(state.details.firstname);
    let element2 = $("<a></a>").text(state.details.email);
    let element3 = $("<a></a>").text(state.details.phone);
    let element4 = $("<a></a>").text(state.details.address);
    let element6 = $("<a></a>").text(state.details.pcurrency);
    let element7 = $("<a></a>").text(state.details.scurrency);
    let element7 = $("<a></a>").text(state.details.lastname);


    $("#name").append(element1);
    $("#email").append(element2);
    $("#phone").append(element3);
    $("#address").append(element4);
    $("#zip").append(element5);
    $("#pcurrency").append(element6);
    $("#scurrency").append(element7);

*/


$(document).ready(function () {
    $imgSrc = $('#imgProfile').imageURL(state.imgProfile);
    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#imgProfile').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
    $('#btnChangePicture').on('click', function () {
        // document.getElementById('profilePicture').click();
        if (!$('#btnChangePicture').hasClass('changing')) {
            $('#profilePicture').click();
        }
        else {
            // change
        }
    });
    $('#profilePicture').on('change', function () {
        readURL(this);
        $('#btnChangePicture').addClass('changing');
        $('#btnChangePicture').attr('value', 'Confirm');
        $('#btnDiscard').removeClass('d-none');
        // $('#imgProfile').attr('src', '');
    });
    $('#btnDiscard').on('click', function () {
        // if ($('#btnDiscard').hasClass('d-none')) {
        $('#btnChangePicture').removeClass('changing');
        $('#btnChangePicture').attr('value', 'Change');
        $('#btnDiscard').addClass('d-none');
        $('#imgProfile').attr('src', $imgSrc);
        $('#profilePicture').val('');
        // }
    });
});

$.ajax({
    type:"POST",
    url: config.host + '/user',
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    },
    dataType: 'jsonp',
    success: function (data) {
        $("#firstname").append(data.result.first_name);
        $("#lastname").append(data.result.last_name);
        $("#email").append(data.result.email);
        $("#phone").append(data.result.phone);
        $("#address").append(data.result.address_1);
        $("#city").append(data.result.city_1);
        $("#address2").append(data.result.address_2);
        $("#city2").append(data.result.city_2);
        $("#pcurrency").append(data.result.main_currency);
        $("#scurrency").append(data.result.secondary_currency);
    }
});
