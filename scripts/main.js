(function () {
var urlBase = "http://127.0.0.1:5500/pages/";
$(document).ready(function () {

    $("#logout").on('click', function () {
        localStorage['token'] = null;
        document.cookie = null;
        window.location.href = urlBase + "Login.html";
    });

    var checkToken = isAuthenticated();
    if ((localStorage['token'] !== "" ||
        localStorage['token'] !== "undefined" ||
        localStorage['token'] !== null) &&
        checkToken == false) {
        window.location.href = urlBase + "Login.html";
    };
    setInterval(function () {
        var checkToken = isAuthenticated();
        if ((localStorage['token'] !== "" ||
            localStorage['token'] !== "undefined" ||
            localStorage['token'] !== null) &&
            checkToken == false) {
            window.location.href = urlBase + "Login.html";

        };
    }, 60000);

});



//Check IF JWT is expired and decode.
function isAuthenticated() {
    try {
        //Decode token JWT
        var current_time = Date.now() / 1000;
        const token = localStorage.getItem('token');
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        //Parse information in Json format
        data = JSON.parse(jsonPayload);
        //Compare actual date with JWT EXP            
        $("#user").html("Bem-vindo, " + JSON.parse(localStorage.getItem("user")).name)       
        if (current_time >= data.exp) {
            localStorage['token'] = null;
            document.cookie = null;
            return false;
        } else {
            return true;
        }
    } catch (e) {
        return false;
    }
}
})()