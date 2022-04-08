/* Global Variables */
const apiKey = '5fce3a19bfe15beed4fcc55b9d25f811';
const btn = document.querySelector('.generate__btn');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

btn.addEventListener('click', async () => {

    // to be abel to animate again if user enters another city
    document.querySelector('.dataCollected').classList.add('dataCollected--animate2');

    const cityName = document.querySelector('.cityName__input').value;

    if (!cityName){
        alert('please, Enter any city name')
    }

    await getTemp(cityName)

    .then((WeatherDataForUi)=> {
    updateUI(WeatherDataForUi)
    })

    .catch (error => {
        console.log(error)
        alertError(cityName);
    })
});

// building async function to fetch temperature data via api.
async function getTemp(cityName) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    let weatherDataFromServer = await fetch (url);
    const res = await weatherDataFromServer.json();

    WeatherDataForUi = {
        temp: res.main.temp.toFixed(0),
        icon: res.weather[0].icon,
        date: newDate,
        description: res.weather[0].description,
        feelsLike: res.main.feels_like.toFixed(0),
        humidity: res.main.humidity,
    }

    return  WeatherDataForUi;
}

// build async function to display data to user
async function updateUI (WeatherDataForUi){

    document.querySelector('.dataCollected__tempValue').innerHTML =`${WeatherDataForUi.temp}°C`;

    document.querySelector('.dataCollected__weatherIcon').setAttribute('src',`icons/${WeatherDataForUi.icon}.svg`);
    document.querySelector('.dataCollected__weatherIcon').setAttribute('alt',`weather icon that shows ${WeatherDataForUi.description}`);

    document.querySelector('.dataCollected__dateValue').innerHTML =`${WeatherDataForUi.date}`;

    document.querySelector('.dataCollected__descriptionValue').innerHTML = `${WeatherDataForUi.description}`;

    document.querySelector('.dataCollected__feelsLikeValue').innerHTML = `${WeatherDataForUi.feelsLike}°C`;

    document.querySelector('.dataCollected__humidityValue').innerHTML = `${WeatherDataForUi.humidity}%`;

    // to animate data when it shows up
    document.querySelector('.dataCollected').classList.remove ('dataCollected--animate2');
}


function alertError (cityName) {
    if (cityName !== '') {
        alert('please, Enter a correct city name.');
    }
}