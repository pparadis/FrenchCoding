function authenticateIfRequired() {
    var oAuthHelper = new OAuthHelper();
    //RT.OAuthHelper.clearCache();
    if (oAuthHelper.isTokenExist()) {
        oauthToken = oAuthHelper.getToken();
        writeLog("CACHED TOKEN found: token = " + oauthToken);
        return;
    }

    var startUri = new Windows.Foundation.Uri(oAuthHelper.getAuthUrl());
    var endUri = new Windows.Foundation.Uri(oAuthHelper.getRedirectUrl());

    authWeb.WebAuthenticationBroker.authenticateAsync(
        authWeb.WebAuthenticationOptions.none,
        startUri,
        endUri)
    .done(function (result) {
        oAuthHelper.saveToken(result.responseData);
        oauthToken = oAuthHelper.getToken();
        writeLog("SUCCESS: token = " + oauthToken);
    }, function (error) {
        writeLog("ERROR: " + error);
    });
}

function getRequestToken() {
    WinJS.xhr({
        url: "https://api.dropbox.com/1/oauth/request_token",
        type: "POST",
        headers: {
            "Authorization": 'OAuth oauth_version="1.0", oauth_signature_method="PLAINTEXT", oauth_consumer_key="nfl5hfiv3e4vobl", oauth_signature="34kt0id1u0xqoao&"'
        }
    }).done(
        function completed(request) {
            var oAuthHelper = new OAuthHelper();
            console.log(request.response);
            oAuthHelper.saveAccessToken(request.response);
        },
        function error(request) {
            console.log(request);
        },
        function progress(request) {
            console.log(request);
        });
}


function OAuthHelper() {
    this.APP_AUTH_URL = "APP_AUTH_URL";
    this.REDIRECT_URL = "https://localhost";
    this.KEY_TOKENEXIST = "TOKEN_DOES_EXIST";
    this.KEY_TOKENVALUE = "TOKEN_VALUE";
}

OAuthHelper.prototype.getAuthUrl = function () {
    return this.APP_AUTH_URL;
}

OAuthHelper.prototype.getRedirectUrl = function () {
    return this.REDIRECT_URL;
}

OAuthHelper.prototype.isTokenExists = function () {
    var tokenThere = false;
    var localSettings = Windows.Storage.ApplicationData.Current.LocalSettings;

    if (localSettings.Values.ContainsKey(KEY_TOKENEXIST)){
        tokenThere = localSettings.Values[KEY_TOKENEXIST];
    }
 
    return tokenThere;
}

OAuthHelper.prototype.saveAccessToken = function (responseData) {
    var oauthTokenSecret = responseData.substring(19, responseData.indexOf("&"))
    var oauthToken = responseData.substring(responseData.indexOf("&")+13);
    //oauth_token=<request-token>&oauth_token_secret=<request-token-secret>
    console.log(oauthToken);
    console.log(oauthTokenSecret);

    var applicationData = Windows.Storage.ApplicationData.current;
    var localSettings = applicationData.localSettings;
    
    localSettings.values["OAUTH_TOKEN_SECRET"] = oauthTokenSecret;
    localSettings.values["OAUTH_TOKEN"] = oauthToken;
}

OAuthHelper.prototype.saveOAuthToken = function (responseData) {
    var url = responseData;
    var indexTokenWord = url.indexOf("access_token=") + 13;
    var token = url.substring(indexTokenWord);

    var localSettings = Windows.Storage.ApplicationData.Current.LocalSettings;
    localSettings.Values[this.KEY_TOKENEXIST] = true;
    localSettings.Values[this.KEY_TOKENVALUE] = token;
}

OAuthHelper.prototype.getToken = function () {
    var token = string.Empty;
 
    var localSettings = Windows.Storage.ApplicationData.Current.LocalSettings;
    if (localSettings.Values.ContainsKey(this.KEY_TOKENVALUE))
    {
        token = localSettings.Values[this.KEY_TOKENVALUE];
    }
 
    return token;
}

OAuthHelper.prototype.clearCache = function () {
    var localSettings = Windows.Storage.ApplicationData.Current.LocalSettings;
    localSettings.Values.Remove(this.KEY_TOKENEXIST);
    localSettings.Values.Remove(this.KEY_TOKENVALUE);
}


/*
function MyClass () { // constructor function
  var privateVariable = "foo";

  this.publicVariable = "bar";

  this.privilegedMethod = function () {
    alert(privateVariable);
  };
}

MyClass.prototype.publicMethod = function () {
  alert(this.publicVariable);
};

MyClass.staticProperty = "baz";

*/