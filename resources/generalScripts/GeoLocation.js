



class GeoLocation{
    // async init() {
    //     return await this.apiRequest();
    // }
    async #getCoords() {
        return new Promise(function(resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }
    async apiRequest() {
        const coords = await this.#getCoords();
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        const response = await fetch("https://geolocationapi-hrbbd5crgdc2g9hx.centralus-01.azurewebsites.net/ReverseGeo/GetGeoLocation?latitude=" + coords.coords.latitude + "&longitude=" + coords.coords.longitude, requestOptions).catch(this.APIError);
        
        if(response == undefined){

        }   
        else{
            const stateAbbreviation_response = await response.text();
            return stateAbbreviation_response;
            
        }
    }
    error(){
        console.log("Error Occured with the GeoLocation API.")
    }
}

