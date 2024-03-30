
const currentLocation = document.querySelector(".currentLocation-btn");
currentLocation.addEventListener('click', getCurrentLocation);


const searchLoaction = document.querySelector(".searchLocation");
searchLoaction.addEventListener("submit", getCoordFromAddress);


const shareLocation = document.querySelector(".shareLocation button");
shareLocation.addEventListener("click", sharePlaceAddrress);

function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(sucess => {
        const coordinates = {
            lat: Number(sucess.coords.latitude),
            lon: Number(sucess.coords.longitude)
        }
        console.log(coordinates);
        renderMapForCurrentLocation(coordinates);
    }, error => {
        alert("unable to fetch location", error);
    })
}


export function renderMapForCurrentLocation(coords) {
    if (!google.maps) {
        alert("Could'nt load map")
        return;
    }
    let coordinates = new google.maps.LatLng(coords.lat, coords.lon); //core functionality where you create a new instance of the LatLng object from the Google Maps JavaScript API

    const maps = new google.maps.Map(document.querySelector(".map"), { center: coordinates, zoom: 16 });

    new google.maps.Marker({
        position: coordinates,
        map: maps
    })
}

export async function getCoordAddress(address) {
    try {
        const urlAddress = encodeURI(address);
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=AIzaSyAkwPFImiKBn47DYXqrnZvhdJIeMwlmmYk`);

        if (!response) alert("Failed to fetch get response from the address");

        const data = await response.json();
        if (!data) alert("invalid")
        const coordinates = data.results[0].geometry.location;
        if (!coordinates) alert("Invalid Address :(")
        return coordinates;
    } catch (error) {
        console.log(error?.message);
    }
}

export function searchRenderMap(coords) {
    if (!coords) {
        alert("Invalid address")
    }

    if (typeof !coords.lat === "number" || typeof !coords.lng === "number" || isNaN(coords.lat) || isNaN(coords.lng)) {
        console.error("Invalid Input/Coordinates" + coords);
    }

    let coordinates = new google.maps.LatLng(Number(coords.lat), Number(coords.lng));

    const maps = new google.maps.Map(document.querySelector(".map"), { center: coordinates, zoom: 16 });

    new google.maps.Marker({
        position: coordinates,
        map: maps,
        animation: google.maps.Animation.DROP
    })
}

async function getCoordFromAddress(event) {
    event.preventDefault();
    const searchValue = document.querySelector("#search").value;
    if (!searchValue) throw new Error("Field is empty");

    const coordinates = await getCoordAddress(searchValue);
    searchRenderMap(coordinates);

    shareLocation.disabled = false;
}

async function sharePlaceAddrress() {
    const searchValue = document.querySelector("#search").value;
    const coordinates = await getCoordAddress(searchValue);

    let url = `${location.origin}/sharePlace/sharePlace.html?address=${encodeURI(searchValue)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;

    navigator.clipboard.writeText(url)
        .then(alert("data copied "))
} 
