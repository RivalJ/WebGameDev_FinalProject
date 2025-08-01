const startButton = document.getElementById("startButton");


const geoLocation = new GeoLocation();
startButton.addEventListener("click", function(event) {
    event.preventDefault();
    geoLocation.getLocation();
});
