(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            WinJS.Utilities.query("a").listen("click", this.linkClickEventHandler, false);

            var ratingControlDiv = document.getElementById("ratingControlDiv");
            var ratingControl = ratingControlDiv.winControl;
            ratingControl.addEventListener("change", this.ratingChanged, false);

            var helloButton = document.getElementById("helloButton");
            helloButton.addEventListener("click", this.buttonClickHandler, false);

            var nameInput = document.getElementById("nameInput");
            nameInput.addEventListener("change", this.nameInputChanged);

            var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
            var userName = Windows.Storage.ApplicationData.current.roamingSettings.values["userName"];
            if (userName) {
                nameInput.value = userName;
            }

            var greetingRating = roamingSettings.values["greetingRating"];
            if (greetingRating) {
                ratingControl.userRating = greetingRating;
                var ratingOutput = document.getElementById("ratingOutput");
                ratingOutput.innerText = greetingRating;
            }

            if (WinJS.Application.sessionState.previousExecutionState === Windows.ApplicationModel.Activation.ApplicationExecutionState.terminated) {
                var outputValue = WinJS.Application.sessionState.greetingOutput;
                if (outputValue) {
                    var greetingOutput = document.getElementById("greetingOutput");
                    greetingOutput.innerText = outputValue;
                }
            }
        },
        buttonClickHandler: function (eventInfo) {

            var userName = document.getElementById("nameInput").value;
            var greetingString = "Hello, " + userName + "!";
            document.getElementById("greetingOutput").innerText = greetingString;
            // Save the session data. 
            WinJS.Application.sessionState.greetingOutput = greetingString;

            var applicationData = Windows.Storage.ApplicationData.current;
            var localSettings = applicationData.localSettings;

            console.log(localSettings.values["OAUTH_TOKEN_SECRET"]);
            console.log(localSettings.values["OAUTH_TOKEN"]);
        },

        ratingChanged: function (eventInfo) {

            var ratingOutput = document.getElementById("ratingOutput");
            ratingOutput.innerText = eventInfo.detail.tentativeRating;

            // Store the rating for multiple sessions.
            var appData = Windows.Storage.ApplicationData.current;
            var roamingSettings = appData.roamingSettings;
            roamingSettings.values["greetingRating"] = eventInfo.detail.tentativeRating;
        },

        nameInputChanged: function (eventInfo) {
            var nameInput = eventInfo.srcElement;
            var appData = Windows.Storage.ApplicationData.current;
            var roamingSettings = appData.roamingSettings;
            roamingSettings.values["userName"] = nameInput.value;
        },
        linkClickEventHandler: function (eventInfo) {
            eventInfo.preventDefault();
            var link = eventInfo.target;
            WinJS.Navigation.navigate(link.href);
        }

    });
})();
