const request = require('request');//npm module

/* 
//contacting the API through request. at the end of the url below we set
// the options after the ? as specified in the darkSky API docs.
const url = 'https://api.darksky.net/forecast/f0fa6273e70e621ec683c29aa485e086/37.8267,-122.4233?units=si';
//below, by setting json to true i automatically parse the response
request({ url: url, json: true }, (error, response) => {
    if(error) {
        console.log('Unable to connect to darksky server');
    } else if(response.body.error) {
        console.log('Unable to find location');
    } else {
        //const data = JSON.parse(response.body); //only if not parsed 
        const data = response.body;
        const tempNow = data.currently.temperature;
        const rainChance = data.currently.precipProbability;
        const summary = data.daily.data[0].summary;
        console.log(summary);
        console.log(`It is currently ${tempNow}C degrees outside.`);
        console.log(`the probability of rainfall is ${rainChance}% at the moment.`);
    }
    
});
 */

/* const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic3RnZW9yZ2UiLCJhIjoiY2p1andsdWdoMXB1bTQ0cHBqa3hpdG1ubSJ9.fXd8BEud22bFY71ixpK4OA&limit=1';

request({ url: geoUrl, json: true }, (error, response) => {
    if(error) {
        console.log('unable to connect to Mapbox server');
    } else if(response.body.features.length === 0) {
        console.log('Invalid location, try another search');
    } else {
        const geoCode = response.body.features[0];
        //console.log(geoCode);
        
        const latitude = geoCode.center[1];
        const longitude = geoCode.center[0];
        console.log(geoCode.place_name);
        console.log(latitude, longitude); 
    }
    
});
 */
const geocode = (address, callback) => {
    const encodedUrl = encodeURIComponent(address);
    const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodedUrl + '.json?access_token=pk.eyJ1Ijoic3RnZW9yZ2UiLCJhIjoiY2p1andsdWdoMXB1bTQ0cHBqa3hpdG1ubSJ9.fXd8BEud22bFY71ixpK4OA&limit=1';
    
    request({url: geourl, json: true}, (error, response) => {
        if(error) {
            callback('unable to connect to location server!', undefined);
        } else if(response.body.features.length === 0) {
            callback('Invalid location, try another search', undefined)
        } else {

            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
}

geocode('La Carlota', (error, data) => {
    console.log('Error:', error);
    console.log('Data:', data);
    
});