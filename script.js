// Write your JavaScript code here!



window.addEventListener("load", function () {

    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let button = this.document.getElementById("formSubmit");
    let faultyItems = this.document.getElementById("faultyItems");
    console.log(faultyItems.firstElementChild);
    
    let pilot;
    let copilot;
    let fuelLevel;
    let cargoMass;

    button.addEventListener("click", function (event) {
        pilot = document.querySelector("input[name=pilotName]");
        copilot = document.querySelector("input[name=copilotName]");
        fuelLevel = document.querySelector("input[name=fuelLevel]");
        cargoMass = document.querySelector("input[name=cargoMass]");
        event.preventDefault();
        
        formSubmission(document, faultyItems, pilot.value, copilot.value, fuelLevel.value, cargoMass.value);
    });
    
    let listedPlanetsResponse;
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
    });
});