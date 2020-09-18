const request = require('postman-request');

const geocode = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2llZ2N3IiwiYSI6ImNrZXZ6N3E1cDA5dHQyc3A5dnIybTVoaDEifQ.6D8V-OO8esb1D9NU3kqagA&limit=1"

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to reach geocoding service.', undefined)
        } else if (body.message || (body.features && body.features.length === 0)) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            // address_long = response.body.features[0].center[0];
            // address_lat = response.body.features[0].center[1];
            // place_name = response.body.features[0].place_name;
            address_long = body.features[0].center[0];
            address_lat = body.features[0].center[1];
            place_name = body.features[0].place_name;
            
            callback(undefined, { longitude: address_long, latitude: address_lat, location: place_name })

        }

    })

}

module.exports = { geocode: geocode }  // this is the format for multiple functions in this module