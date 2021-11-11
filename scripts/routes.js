function routes(){
    let url = "https://localhost:5001/";
    return {
        _url: url,
        login: url +"user/login",
        getTruck: url + "api/TruckInfo",
        ports: url + "harbor",
        users: url + "user",
        geoPositions: url + "api/geoPosition",
        vessels: url + "api/VesselInfo",
        vesselPositions: url +"",
        truckPosition: url + "api/TruckGeoPosition"
    }
}