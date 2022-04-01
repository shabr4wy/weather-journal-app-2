/* Global Variables */
const apiKey = '5fce3a19bfe15beed4fcc55b9d25f811';
const btn = document.querySelector('.generate__btn');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

btn.addEventListener('click', async () => {


    const cityName = document.querySelector('.cityName__input').value;

    if (!cityName){
        alert('please, Enter city name')
    }

    await getTemp(cityName)

    .then((weatherData)=> {
    updateUI(weatherData)
    })

    .catch (error => {
        console.log(error)
    })
});

// building async function to fetch temperature data via api.
async function getTemp(cityName) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    let weatherData = await fetch (url);
    const res = await weatherData.json();
    const icon = await res.weather[0].icon;
    console.log(res)
     weatherData = {
        temp: res.main.temp.toFixed(0),
        icon: icon,
        date: newDate,
        description: res.weather[0].description,
        feelsLike: res.main.feels_like.toFixed(0),
        humidity: res.main.humidity,
    }
    return  weatherData;
}

// build async function to display data to user
async function updateUI (weatherData){

    document.querySelector('.dataCollected__tempValue').innerHTML =`${weatherData.temp}°C`;

    document.querySelector('.dataCollected__weatherIcon').setAttribute('src',`icons/${weatherData.icon}.svg`);

    document.querySelector('.dataCollected__dateValue').innerHTML =`${weatherData.date}`;

    document.querySelector('.dataCollected__descriptionValue').innerHTML = `${weatherData.description}`;

    document.querySelector('.dataCollected__feelsLikeValue').innerHTML = `${weatherData.feelsLike}°C`;

    document.querySelector('.dataCollected__humidityValue').innerHTML = `${weatherData.humidity}%`;

    // to animate data when it shows up
     document.querySelector('.dataCollected').classList.remove ('dataCollected--animate2')
}