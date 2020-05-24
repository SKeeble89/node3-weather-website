const request = require('request')


const forecast = (longitude, latitude, callback) => {
    pLongitude = encodeURIComponent(longitude);
    pLatitude = encodeURIComponent(latitude);
    const url = `http://api.weatherstack.com/current?access_key=0ae17313529276278716a3f8abf8d1f4&query=${longitude},${latitude}&units=m`
    request({url, json: true}, (error, {body}) => {
        
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        }  else {
            callback(undefined, `${body.current.weather_descriptions[0]} Temperature is currently: ${body.current.temperature} *C,'There is currently a ${body.current.wind_speed}% change of rain. 
            Feels like ${body.current.feelslike} *C. Humidity ${body.current.humidity} %rh`)
            
        }
    })}

    module.exports = forecast;