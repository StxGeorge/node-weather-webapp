const request = require('request');

const forecast = (lat, long, callback) => {
    const latitude = encodeURIComponent(lat);
    const longitude = encodeURIComponent(long);
    const url = 'https://api.darksky.net/forecast/f0fa6273e70e621ec683c29aa485e086/' + latitude + ',' + longitude + '?units=si';
    //the arg body has been deestructured from the response object
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('unable to connect to weather server!', undefined);
        } else if(body.error) {
            callback('unable to find location', undefined);
        } else {
            callback(undefined, {
                tempNow: body.currently.temperature,
                rainChance: body.currently.precipProbability,
                summary: body.daily.data[0].summary,
                tempHigh: body.daily.data[0].temperatureHigh,
                tempLow: body.daily.data[0].temperatureLow
            });
        }
    })
};

module.exports = forecast;