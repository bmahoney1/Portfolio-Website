// main.js

// About Me tabs functionality

var tablinks = document.getElementsByClassName("tab-links"); // retrieves all the elements with this (which is all the links)
var tabcontents = document.getElementsByClassName("tab-contents");

// This function loops through each of the tabs and removes the active link/tab
function opentab(tabname) {
    for (var tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (var tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link"); // this adds this text to the class = "" to the link clicked on
    document.getElementById(tabname).classList.add("active-tab"); // this adds it to the corresponding tab
}

// Menu functionality when the browser is not full screen
var sidemenu = document.getElementById("sidemenu");

//you either leave the menu be
function openmenu() {
    sidemenu.style.right = "0";
}

// or you slide it over out of view
function closemenu() {
    sidemenu.style.right = "-200px";
}

// Form submission functionality

// API post request
const scriptURL = 'https://script.google.com/macros/s/AKfycbxLniCZOZU0oSrcf11ox9-ZKvTl4JqjTSj5EoOXShiuLY9AtxptJ4jyls95a5LNWA1h/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message sent successfully!";
            setTimeout(function () {
                msg.innerHTML = "";
            }, 3000);
            form.reset();
        })
        .catch(error => console.error('Error!', error.message));
});

//API get request
async function fetchWeather() {
    const apiKey = 'c7e8106723da04b847d6e25e6b44b0da';  // Replace with your actual API key
    const city = 'Boston';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const description = data.weather[0].main;
        const temperature = data.main.temp;

        let textColor;
        if (description == 'Clouds') {
            textColor = 'gray';
        } else if (description.includes('Clear')) {
            textColor = 'yellow';
        } else if (description.includes('Rain')){
            textColor = 'blue'; // Default color
        }

        let tempColor
        if (temperature > 70) {
            tempColor = 'red';
        } else if (temperature < 40) {
            tempColor = 'blue';
        } else if (description.includes('Rain')){
            tempColor = 'white'; // Default color
        }

        
        // Display weather information
        const weatherDiv = document.getElementById('weather');
        weatherDiv.innerHTML = `
            <h3 style = "font-size: 40px; color: "white"; ">Weather in ${data.name}:</h3>
            <p style = "font-size: 25px; padding-top:10px; color:${textColor} ; ">${data.weather[0].main}</p>
            <p style = "font-size: 25px; padding-top:10px; color: ${tempColor}; ">Temperature: ${data.main.temp} °F</p>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Call the fetchWeather function when the page loads
document.addEventListener('DOMContentLoaded', fetchWeather);
