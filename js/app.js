/* Global Variables */
const apiKey = '5fce3a19bfe15beed4fcc55b9d25f811';
const btn = document.querySelector('.generate__btn');
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


btn.addEventListener('click', async () => {
    const cityName = document.querySelector('.cityName__input').value;

    // to be abel to animate again if user enters another city
    hideWeatherData();

    if (!cityName){
        alert('please, Enter any city name')
    }

    getAndShowWeatherData(cityName);
});


// to be abel to animate again if user enters another city
function hideWeatherData () {
    const dataCollected = document.querySelector('.dataCollected');
    dataCollected.classList.add('dataCollected--animate2');
}


async function getAndShowWeatherData (cityName) {
    // to show that the app is fetching data in the background
    if(cityName){
        showLoadingParagrapgh();
    }
    
    await getWeatherData(cityName)
    
    .then((WeatherDataForUi)=> {
        updateUI(WeatherDataForUi)
    })
    
    .catch (error => {
        console.log(error)
        alertError(cityName);
    })
    
    hideLoadingParagraph();
}


// to show that the app is fetching data in the background
function showLoadingParagrapgh () {
    const loadingParagrapgh = document.querySelector('.generate__loading--opacity0');
    loadingParagrapgh.classList.add ('generate__loading--opacity1')
}


// building async function to fetch temperature data via api.
async function getWeatherData(cityName) {

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

    document.querySelector('.dataCollected__dateValue').innerHTML =`${WeatherDataForUi.date}`;

    document.querySelector('.dataCollected__descriptionValue').innerHTML = `${WeatherDataForUi.description}`;

    document.querySelector('.dataCollected__feelsLikeValue').innerHTML = `${WeatherDataForUi.feelsLike}°C`;

    document.querySelector('.dataCollected__humidityValue').innerHTML = `${WeatherDataForUi.humidity}%`;
    
    showWeatherData();
}



function showWeatherData () {
    const dataCollected = document.querySelector('.dataCollected');
    dataCollected.classList.remove ('dataCollected--animate2');
}


function alertError (cityName) {
    if (cityName !== '') {
        alert('please, Enter a correct city name.');
    }
}


function hideLoadingParagraph () {
    const loadingParagrapgh = document.querySelector('.generate__loading--opacity0');
    loadingParagrapgh.classList.remove ('generate__loading--opacity1');
}