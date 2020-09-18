const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=608988ed77a90aaaff9988bc0d820695&query="+latitude+","+longitude+"&units=f"
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find weather for location.', undefined)
        } else {
            
            const current_weather = body.current.weather_descriptions[0];
            const current_temp = body.current.temperature;
            const feels_like = body.current.feelslike;
            const weather_message = current_weather +". It is currently "+current_temp+" degrees out.  It feels like "+feels_like+" degrees.";
            
            callback(undefined, { weather_message } )

        }
    })
}

module.exports = forecast