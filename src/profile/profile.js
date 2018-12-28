let state = {
    name: "Ilan",
    email: "ilan@gmail.com",
    phone: "050-0000000",
    address: "israel 123,tel aviv, israel",
    zip: "123456",
    pcurrency: "U.S Dollar",
    scurrency: "Euro",
    imgProfile: "https://bootdey.com/img/Content/avatar/avatar7.png"
};

$("#name").text(state.name);
$("#email").text(state.email);
$("#phone").text(state.phone);
$("#address").text(state.address);
$("#zip").text(state.zip);
$("#pcurrency").text(state.pcurrency);
$("#scurrency").text(state.scurrency);


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

///$('.nav-tabs a:first').tab('show');