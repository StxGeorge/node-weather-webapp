const request = require('request');

const geocode = (address, callback) => {
    const encodedUrl = encodeURIComponent(address);
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodedUrl + '.json?access_token=pk.eyJ1Ijoic3RnZW9yZ2UiLCJhIjoiY2p1andsdWdoMXB1bTQ0cHBqa3hpdG1ubSJ9.fXd8BEud22bFY71ixpK4OA&limit=1';
    //the arg body has been deestructured from the response object
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('unable to connect to location server!', undefined);
        } else if(body.features.length === 0) {
            callback('Invalid location, try another search', undefined)
        } else {

            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;