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

    .then (( weatherData) => {
        postData ( weatherData);
    })
    
    .then(()=> {
    updateUI()
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

// build async function to post all data to server.js
async function postData (weatherData) {
    await fetch ('/postData', {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         ...weatherData
      }),

    })
}



// build async function to display data to user
async function updateUI (){
    const req = await fetch('/getData');
    const weatherData = await req.json();

    document.querySelector('.dataCollected__temp').innerHTML =
    `<span class="dataCollected__value">${weatherData.temp}°C</span> 
     <img src="icons/${weatherData.icon}.svg" height="100px" width="100px">`

    document.querySelector('.dataCollected__date').innerHTML =
     `<span class="dataCollected_type">Date</span> 
      <span class="dataCollected__value"> ${weatherData.date} </span>`;

    document.querySelector('.dataCollected__description').innerHTML =
     `<span class="dataCollected_type">description</span> 
      <span class="dataCollected__value"> ${weatherData.description} </span>`;

      document.querySelector('.dataCollected__feelsLike').innerHTML =
     `<span class="dataCollected_type">feels like</span> 
      <span class="dataCollected__value"> ${weatherData.feelsLike}°C </span>`;

    document.querySelector('.dataCollected__humidity').innerHTML =
     `<span class="dataCollected_type">humidity</span> 
      <span class="dataCollected__value"> ${weatherData.humidity}% </span>`;
}