function dropbox() {
    var dropboxkey = '5sWGljVG8sA=|dJdos4dllw83yXaG7TWrBfMcL9AmG/Y+scVzTYOktQ=='
    var client = new Dropbox.Client({
        key: dropboxkey,
        sandbox: true
    });
    //client.authDriver(new Dropbox.Drivers.Redirect());
    client.authDriver(simpleDriver);
    console.log("Auth driver called");
    client.authenticate(function (error, data) {
        //getAuth("","")
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
    url: function () { return ""; },
    doAuthorize: function (authUrl, token, tokenSecret, callback) {
        console.log("Driver : Get Auth");
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
                document.getElementById("AnyServiceDebugArea").value += "Error returned: " + result.responseErrorDetail + "\r\n";
            }
            authzInProgress = false;
        }, function (err) {
            WinJS.log("Error returned by WebAuth broker: " + err, "Web Authentication SDK Sample", "error");
            document.getElementById("AnyServiceDebugArea").value += " Error Message: " + err.message + "\r\n";
            authzInProgress = false;
        });




}


function getAuthSSO(startURI)
{
    var redirectURL = Windows.Security.Authentication.Web.WebAuthenticationBroker.getCurrentApplicationCallbackUri().absoluteUri;
    //var startURL = "https://<providerendpoint>?client_id=<clientid>&redirect_uri=" + encodeURIComponent(redirectURL) + "&scope=<scopes>&response_type=token";
    var startURL = "https://www.dropbox.com/1/oauth/authorize?"
    var startURI = new Windows.Foundation.Uri(startURL);

    Windows.Security.Authentication.Web.WebAuthenticationBroker.authenticateAsync(
        Windows.Security.Authentication.Web.WebAuthenticationOptions.none, startURI)
        .done(function (result) {
            if (result.responseStatus === Windows.Security.Authentication.Web.WebAuthenticationStatus.errorHttp) {
                document.getElementById("FacebookDebugArea").value += "Error returned: " + result.responseErrorDetail + "\r\n";
            }

            // Parse out the OAuth token from result.responseData 

        }, function (err) {
            WinJS.log("Error returned by WebAuth broker: " + err, "Web Authentication SDK Sample", "error");
        });

}


var showError = function (error) {
    switch (error.status) {
        case 401:
            // If you're using dropbox.js, the only cause behind this error is that
            // the user token expired.
            // Get the user through the authentication flow again.
            break;

        case 404:
            // The file or folder you tried to access is not in the user's Dropbox.
            // Handling this error is specific to your application.
            break;

        case 507:
            // The user is over their Dropbox quota.
            // Tell them their Dropbox is full. Refreshing the page won't help.
            break;

        case 503:
            // Too many API requests. Tell the user to try again later.
            // Long-term, optimize your code to use fewer API calls.
            break;

        case 400:  // Bad input parameter
        case 403:  // Bad OAuth request.
        case 405:  // Request method not expected
        default:
            // Caused by a bug in dropbox.js, in your application, or in Dropbox.
            // Tell the user an error occurred, ask them to refresh the page.
    }
};