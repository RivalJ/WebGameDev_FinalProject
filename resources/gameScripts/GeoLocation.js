class GeoLocation {

    static #latitude;
    static #longitude;

    
    
    async getLocation(){
        // TODO: store as a Github Secret... If I can ?
        navigator.geolocation.getCurrentPosition(this.success, this.error);

        const response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + GeoLocation.#latitude + "," + GeoLocation.#longitude + "&key=" + "AIzaSyA42eitwkkKFo9MxoWbV0U11fsIczGvaII");
        const jsonResponse = await response.json();

        
        console.log(jsonResponse);
        console.log("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + GeoLocation.#latitude + "," + GeoLocation.#longitude + "&key=" + "AIzaSyA42eitwkkKFo9MxoWbV0U11fsIczGvaII");
        console.log(GeoLocation.#latitude);
        
        
    };

    success(position) {
        GeoLocation.#latitude = position.coords.latitude;
        GeoLocation.#longitude = position.coords.longitude;
    };

    error() {
        alert("No GeoLocation allowed.")

    };

}