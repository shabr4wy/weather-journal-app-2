/* Global Variables */
const apiKey = '5fce3a19bfe15beed4fcc55b9d25f811';
const btn = document.querySelector('#generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

btn.addEventListener('click', async () => {
    const zip = document.querySelector('#zip').value;
    const feeling = document.querySelector('#feelings').value;

    await getTemp(zip)
    .then ((temp) => {
        postData (temp, feeling);
    })
});

// building async function to fetch temperature data via api.
async function getTemp(zip) {
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=metric`;
    const weatherData = await fetch (url);
    const res = await weatherData.json();
    const temp = res.main.temp
    return temp;
}

// build async function to post all data to server.js
async function postData (temp, feeling) {
    await fetch ('/postData', {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          date: newDate,
          temp: temp,
          feeling: feeling,
      }),

    })
}