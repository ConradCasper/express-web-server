const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/68db5af343b1a89c046ae07c8b1226a0/${latitude},${longitude}`
    
    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const daily = body.daily.data[0].summary
            const high = body.daily.data[0].temperatureHigh
            const low = body.daily.data[0].temperatureLow
            const { temperature:temp, precipProbability:prob } = body.currently

            const message = `${daily} It is currently ${temp} degrees out. There is a ${prob}% chance of rain. The high for today will be ${high} degrees and the low will be ${low} degrees.`
            callback(undefined, message)
            
        }
    })
}

module.exports = forecast









