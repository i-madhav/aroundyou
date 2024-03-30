function initMap() {
    // Your code here
    function shareLocationRender(address, coordinates) {
        renderMapForCurrentLocation(coordinates);
        const header = document.querySelector(".header h1");
        header.textContent = address;
    }

    function renderMapForCurrentLocation(coords) {
        if (!google.maps) {
            alert("Could'nt load map")
            return;
        }
        console.log("render is working");
        let coordinates = new google.maps.LatLng(coords.lat, coords.lon);

        const maps = new google.maps.Map(document.querySelector(".map"), { center: coordinates, zoom: 16 });

        new google.maps.Marker({
            position: coordinates,
            map: maps
        })
    }

    const url = new URL(location.href);
    console.log(url);
    const queryParameter = url.searchParams;

    const addresss = queryParameter.get('address');
    console.log(addresss);
    const coords = {
        lat: +queryParameter.get('lat'), // Fix typo here (use 'lat' instead of 'lan')
        lon: +queryParameter.get('lng')
    }

    console.log(coords);
    shareLocationRender(addresss, coords);

    console.log("I am madhav sharma");
}