const request = require('request')
const geocode = (address, callback) => {
    pAddress = encodeURIComponent(address)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${pAddress}.json?access_token=pk.eyJ1Ijoia2VlYnM4OSIsImEiOiJja2E4MjBidzEwNWR4MnpsNThsYXR3dnhuIn0.ftzipWVhOAquR86WnDATrQ&limit=1`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
