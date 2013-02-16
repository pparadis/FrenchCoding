function dropbox() {
    var dropboxkey = '5sWGljVG8sA=|dJdos4dllw83yXaG7TWrBfMcL9AmG/Y+scVzTYOktQ=='
    var client = new Dropbox.Client({
        key: dropboxkey,
        sandbox: true
    });
    client.authDriver(simpleDriver);
    client.authenticate(function (error, data) {
        if (error) {
            return showError(error);
        }
        client.getUserInfo(function (error, userInfo) {
            if (error) {
                return showError(error);
            }

            alert("Hello, " + userInfo.name + "!");
        });

    });
}

var simpleDriver = {
    url: function () { return "https://www.google.com"; },
    doAuthorize: function (authUrl, token, tokenSecret, callback) {
        var startURI = new Windows.Foundation.Uri(authUrl);
        getAuth(startURI, new Windows.Foundation.Uri("https://www.google.com"));
        callback(token);
    }
};

function getAuth(startURI, endURI) {
    authzInProgress = true;
    Windows.Security.Authentication.Web.WebAuthenticationBroker.authenticateAsync(
        Windows.Security.Authentication.Web.WebAuthenticationOptions.none, startURI, endURI)
        .done(function (result) {
            var responseData = result.responseData;
            var webBrokerStatus = webBrokerStatus + "Status returned by WebAuth broker: " + result.responseStatus + "\r\n";

            if (result.responseStatus === Windows.Security.Authentication.Web.WebAuthenticationStatus.errorHttp) {
            }
            authzInProgress = false;
        }, function (err) {
            authzInProgress = false;
        });
}

//var showError = function (error) {
//    switch (error.status) {
//        case 401:
//            break;
//        case 404:
//            break;
//        case 507:
//            break;
//        case 503:
//            break;
//        case 400:  // Bad input parameter
//        case 403:  // Bad OAuth request.
//        case 405:  // Request method not expected
//        default:
//    }
//};