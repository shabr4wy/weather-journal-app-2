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

    .then ((temp) => {
        postData (temp);
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
    const weatherData = await fetch (url);
    console.log(weatherData)
    const res = await weatherData.json();
    console.log(res)
    const temp = res.main.temp
    return temp;
}

// build async function to post all data to server.js
async function postData (temp) {
    await fetch ('/postData', {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          date: newDate,
          temp: temp,
      }),

    })
}



// build async function to display data to user
async function updateUI (){
    const req = await fetch('/getData');
    const data = await req.json();

    document.querySelector('.dataCollected__temp').innerHTML =
    `<span class="dataCollected__value">${data.temp}°C</span> 
    <img src="cloudy-day-1.svg" height="100px" width="100px">`

    document.querySelector('.dataCollected__date').innerHTML =
     `<span class="dataCollected_type">Date</span> 
      <span class="dataCollected__value"> ${data.date} </span>`;
}