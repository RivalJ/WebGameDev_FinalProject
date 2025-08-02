class GeoLocation {

    static #latitude;
    static #longitude;

    
    
    async getLocation(){
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        navigator.geolocation.getCurrentPosition(this.success, this.error);

    
        const response = await fetch("https://geolocationapi-hrbbd5crgdc2g9hx.centralus-01.azurewebsites.net/ReverseGeo/GetGeoLocation?latitude=" + GeoLocation.#latitude + "&longitude=" + GeoLocation.#longitude, requestOptions).catch(this.APIError);
        
        response.text().then((promise) =>{
            console.log(promise)
        })
        .catch((error) => {
            console.log(error);
        });

        
        // const jsonResponse = await response.json();

        // const stateAbbreviation = jsonResponse['plus_code']['compound_code'].split(",")[1].trim()
        


        // console.log(stateAbbreviation);

        
    };

    success(position) {
        GeoLocation.#latitude = position.coords.latitude;
        GeoLocation.#longitude = position.coords.longitude;
    };

    error() {
        alert("No GeoLocation allowed.")

    };
    APIError() {
        alert("Something failed with the Azure API")
    };

}