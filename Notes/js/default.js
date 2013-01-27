﻿// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                var outputValue = WinJS.Application.sessionState.greetingOutput;
                if (outputValue) {
                    var greetingOutput = document.getElementById("greetingOutput");
                    greetingOutput.innerText = outputValue;
                }
            }

            args.setPromise(WinJS.UI.processAll().then(function completed(){
                // Retrieve the div that hosts the Rating control.
                var ratingControlDiv = document.getElementById("ratingControlDiv");

                // Retrieve the actual Rating control.
                var ratingControl = ratingControlDiv.winControl;

                // Register the event handler. 
                ratingControl.addEventListener("change", ratingChanged, false);

                var helloButton = document.getElementById("helloButton");
                helloButton.addEventListener("click", buttonClickHandler, false);

                var nameInput = document.getElementById("nameInput");
                nameInput.addEventListener("change", nameInputChanged);

                var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;

                var userName = Windows.Storage.ApplicationData.current.roamingSettings.values["userName"];
                if (userName) {
                    nameInput.value = userName;
                }

                // Restore the rating. 
                var greetingRating = roamingSettings.values["greetingRating"];
                if (greetingRating) {
                    ratingControl.userRating = greetingRating;
                    var ratingOutput = document.getElementById("ratingOutput");
                    ratingOutput.innerText = greetingRating;
                }

            }));
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    function buttonClickHandler(eventInfo) {
        var userName = document.getElementById("nameInput").value;
        var greetingString = "Hello , " + userName + "!";
        document.getElementById("greetingOutput").innerText = greetingString;

        WinJS.Application.sessionState.greetingOutput = greetingString;
    }

    function nameInputChanged(eventInfo) {
        var nameInput = eventInfo.srcElement;

        var appData = Windows.Storage.ApplicationData.current;
        var roamingSettings = appData.roamingSettings;
        roamingSettings.values["userName"] = nameInput.value;
    }

    function ratingChanged(eventInfo){
        var ratingOutput = document.getElementById("ratingOutput");
        ratingOutput.innerText = eventInfo.detail.tentativeRating;

        var appData = Windows.Storage.ApplicationData.current;
        var roamingSettings = appData.roamingSettings;
        roamingSettings.values["greetingRating"] = eventInfo.detail.tentativeRating;
    }


    app.start();
})();
