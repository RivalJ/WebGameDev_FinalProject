//I think the main deal is to update the game background with the new background image based on the location name.
/*
    Questions: 
        1. How does the GeoLocation api work?

*/


class GeoLocation {

    static #latitude;
    static #longitude;

    
    
    static async getLocation(){
        // TODO: store as a Github Secret... If I can ?
        navigator.geolocation.getCurrentPosition((position) =>{
            GeoLocation.#latitude = position.coords.latitude;
            GeoLocation.#longitude = position.coords.longitude;
        });
        const response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + GeoLocation.#latitude + "," + GeoLocation.#longitude + "&key=" + process.env.API_KEY);
        const jsonResponse = await response.json();
        
        console.log(jsonResponse);
        
        
    }

}