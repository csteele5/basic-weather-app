const request = require('postman-request')

const airvisual = (longitude, latitude, callback) => {
    const url = 'http://api.airvisual.com/v2/nearest_city?lat='+latitude+'&lon='+longitude+'&key=7c99018f-9ed3-4fbd-bfb4-dfa6dd1dab6b'

    request({url, json:true}, (error, { body }) => {
        if (!body.status) {
            callback('Unable to connect to air quality service.', undefined)
        } else if (!body.status == 'success') {
            callback('Unable to find air quality for location.', undefined)
        } else {
            //const air_quality_message = 'Air Quality (AQI): '+body.data.current.pollution.aqius
            const air_quality_message = body.data.current.pollution.aqius + ' AQI'
            callback(undefined, { air_quality_message } )
        }
    })

}

module.exports = airvisual