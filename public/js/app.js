
//fetch is a browser native API used to retrieve data from a server/address etc, but the
//then method is part of the promises APIs for asyncronous functionality.
//the json() method is there to parse the response so we can acces the part we want
//in this case the data property which we are logging to the console.
/* fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
        
    })
})
 */


const weatherForm = document.querySelector('.search-form');
const searchItem = document.querySelector('.search-item');
const errorMsg = document.querySelector('.error');
const locationMsg = document.querySelector('.data-location');
const tempMsg = document.querySelector('.data-temp');


weatherForm.addEventListener('submit', (e) => {
    //e for event
    e.preventDefault();
    const location = searchItem.value;
    
    errorMsg.textContent = 'Loading...';

    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            errorMsg.textContent = data.error;
        } else {

            errorMsg.textContent = '';
            const rain = Math.floor(data.forecast.rainChance * 100);
            locationMsg.textContent = `${data.location}`;
            tempMsg.textContent = `the temperature right now is ${data.forecast.tempNow} °C, the rain chance is %${rain}, ${data.forecast.summary}`;
            
            //console.log(data.location);
            //console.log(data.forecast.rainChance);
        }
    });
});
});