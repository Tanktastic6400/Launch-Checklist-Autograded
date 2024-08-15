require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {

    let missionDiv = document.getElementById("missionTarget");

    missionDiv.innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name} </li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance} </li>
                     <li>Number of Moons: ${moons} </li>
                 </ol>
                 <img src="${imageUrl}">
                 `

}

function validateInput(testInput) {
    let tmp;
    if (isNaN(testInput)) {
        tmp = "Not a Number";
    } else if (testInput === "") {
        tmp = "Empty";
    } else {
        tmp = "Is a Number";
    }

    return tmp;
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotName = validateInput(pilot);
    let copilotName = validateInput(copilot);
    let fuel = validateInput(fuelLevel);
    let cargoMass = validateInput(cargoLevel);
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");
    let errorString = "";

    list.style.visibility = "visible";
    if (pilotName === "Empty" || copilotName === "Empty" || fuel === "Empty" || cargoMass === "Empty") {
        return alert("All fields required");
    }

    errorString = checkWrongInput(pilotName, copilotName, fuel, cargoMass);
    if (errorString !== "") {
        return alert(errorString);
    }

    checkPilotStatus(document, pilotName, pilot);
    checkCopilotStatus(document, copilotName, copilot);
    checkCargoAndFuel(fuelStatus, fuelLevel, launchStatus, list, cargoLevel, cargoStatus)

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let selectedPlanet = planets[Math.floor(Math.random() * planets.length)];

    return selectedPlanet;
}

function checkCargoAndFuel(fuelStatus, fuelLevel, launchStatus, list, cargoLevel, cargoStatus) {
    let cargoReady = false;
    let fuelReady = false;

    if (cargoLevel > 10000) {
        cargoReady = false;
        cargoStatus.textContent = "Cargo mass too heavy for launch";
    } else {
        cargoReady = true;
        cargoStatus.textContent = "Cargo mass low enough for launch";
    }

    if (fuelLevel < 10000) {
        fuelReady = false;
        fuelStatus.textContent = "Fuel level too low for launch";
    } else {
        fuelReady = true;
        fuelStatus.textContent = "Fuel level high enough for launch";
    }

    if (fuelReady === false || cargoReady === false) {
        launchStatus.style.color = "red";
        launchStatus.textContent = "Shuttle Not Ready for Launch";
        list.style.visibility = "visible";

    } else if (fuelReady === true && cargoReady === true) {
        launchStatus.style.color = "green";
        launchStatus.textContent = "Shuttle is Ready for Launch";
    }

}




function checkPilotStatus(document, pilotName, pilot) {
    if (pilotName === "Not a Number") {
        document.getElementById("pilotStatus").textContent = `Pilot ${pilot} is ready for launch`;
    }
}


function checkCopilotStatus(document, copilotName, copilot) {
    if (copilotName === "Not a Number") {
        document.getElementById("copilotStatus").textContent = `Co-pilot ${copilot} is ready for launch`;
    }
}


function checkWrongInput(pilotName, copilotName, fuel, cargoMass) {
    let tmpString = "";
    if (pilotName === "Is a Number") {
        tmpString += "pilot Name Must Be a Name\n"
    }
    if (copilotName === "Is a Number") {
        tmpString += "Copilot Name Must Be a Name\n"
    }
    if (fuel === "Not a Number") {
        tmpString += "Fuel Level Must Be a Number\n"
    }
    if (cargoMass === "Not a Number") {
        tmpString += "Cargo Mass Must Be a Number"
    }
    return tmpString;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;