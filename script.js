window.addEventListener("load", function () {
    let listedPlanets;

    let button = this.document.getElementById("formSubmit");
    let faultyItems = this.document.getElementById("faultyItems");

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

    let listedPlanetsResponse = myFetch();

    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
    }).then(function () {
        let planetInfo = pickPlanet(listedPlanets);
        addDestinationInfo(document, planetInfo.name, planetInfo.diameter, planetInfo.star, planetInfo.distance, planetInfo.moons, planetInfo.image);

    });
});