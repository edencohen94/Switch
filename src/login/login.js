function loginButton() {
    $.ajax({
        type:"POST",
        url: config.host + '/login',
        data: getDeatilsFromHtml(),
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        dataType: 'json',
        "content-Type": 'application/json',
        success: function (data) {
            console.log(data);
            // $.ajax({
            //     type:"GET",
            //     url: config.host + '/offer/all-offers',
            //     crossDomain: true,
            //     xhrFields: {
            //         withCredentials: true
            //     },
            //     dataType: 'json',
            //     success: function(data) {
            //         console.log(data);
            //     }
            //
            // });

            window.location.href = '../homePage/newHome.html';
        },
        error: function(err) {
            console.error(err);
        }

    });
}

function getDeatilsFromHtml() {
    let data = {};
    data.email = $('#inputEmail').val();
    data.password = $('#inputPassword').val();
    return data

}