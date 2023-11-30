"use strict"

const cities = [
    {
        name: "Indianapolis, IN",
        latitude: 39.79303691145844,
        longitude: -86.15616806469983,
    },
    {
        name: "Anchorage, AK",
        latitude: 61.21793482390542,
        longitude: -149.9001050732621,
    },
    {
        name: "Renton, WA",
        latitude: 47.48002580027486,
        longitude: -122.20512725433403,
    },
    {
        name: "Washington, PA",
        latitude: 40.17412934199111,
        longitude: -80.24893021016534,
    },
    {
        name: "Dexter, MO",
        latitude: 36.795516838474775,
        longitude: -89.95833599547308,
    },
    {
        name: "Duluth, MN",
        latitude: 46.78603170717839,
        longitude: -92.09856041348712,
    },
    {
        name: "Memphis, TN",
        latitude: 35.150076933079276,
        longitude: -90.04782180432672,
    },
    {
        name: "Cave City, AR",
        latitude: 35.9419586832384,
        longitude: -91.54875159317395,
    }
]


// 1. Populate city select element with city names from the city array above.
// 2. onchange event handler which finds the latitude & longitude for selected city 
// 3. fetch(`https://api.weather.gov/points/${latitude},${longitude}`)
// 4. Then get the forecast URL using "data.properties.forecast"
//                                 or "data.properties.forecastHourly"
// 5. fetch(data.properties.forecastHourly)
// 6. Loop through the array of forecast periods (data.properties.periods)
// 7. Display a forecast for each forecast period.



window.onload = function () {
    const citySelect = document.querySelector("select#city")
    populateCities(citySelect, cities)

    citySelect.onchange = handleCityChange
}


function populateCities(selectElement, cities) {
    let html = ""
    for (const city of cities) {
        html += `
            <option value="${city.latitude},${city.longitude}">${city.name}</option>
        `
    }

    selectElement.innerHTML += html
    selectElement.removeAttribute("disabled")
}


function handleCityChange(event) {
    const chosenCoordinates = event.target.value

    console.info(`Requesting point data for coordinates (${chosenCoordinates}).`)
    fetch(`https://api.weather.gov/points/${chosenCoordinates}`)
        .then(response => response.json())
        .then(data => {
            console.info(`Point data received:`, data)
            return data.properties.forecastHourly
        })
        .then(getHourlyForecast)
}


function getHourlyForecast(forecastURL) {
    if (forecastURL === null) {
        const resultsDiv = document.querySelector("#forecastResults")
        resultsDiv.innerHTML = `<h2 class="animate__animated animate__flash">Forecast Unavailable</h2>`
        return
    }

    console.info(`Requesting hourly forecast via "${forecastURL}".`)
    fetch(forecastURL)
        .then(response => response.json())
        .then(data => {
            console.info(`Forecast data received"`, data)
            return data.properties.periods.filter(toTodayOnly)
        })
        .then(renderHourlyForecasts)
}


function toTodayOnly (forecastPeriod) {
    const date = new Date(forecastPeriod.startTime)
    const today = new Date()

    return date.getDate() === today.getDate()
}


function renderHourlyForecasts(forecasts) {
    let html = ""
    for (const forecast of forecasts) {
        html += createForecastCard(forecast)
    }

    const resultsDiv = document.querySelector("#forecastResults")
    resultsDiv.innerHTML = html
    triggerCardAnimations()
    triggerCurrentHourGlow()
}


function createForecastCard (forecast) {
    const hourText = new Date(forecast.startTime)
            .toLocaleTimeString(undefined, { hour: "numeric" })
    const correctedIcon = forecast.icon
        .replace("small", "large")  // get larger icon size
        .replace(",0", ",1")        // 0% icons don't seem to exist, so workaround displaying 1%

    return `
            <div data-hour="${hourText}" class="card animate__animated">
                <img src="${correctedIcon}" class="card-img-top" alt="${forecast.shortForecast}">
                <div class="card-body">
                    <h5 class="card-title">${hourText} today</h5>
                    <h6 class="card-subtitle">${forecast.temperature}°${forecast.temperatureUnit}</h6>
                    <p class="card-text">${forecast.shortForecast}</p>
                </div>
            </div>
    `
}


function triggerCardAnimations () {
    const cards = document.querySelectorAll(".card")
    
    let index = 0
    const intervalId = setInterval(animate, 150)

    function animate () {
        cards[index].classList.add("animate__pulse")
        index += 1

        if (index >= cards.length) {
            clearInterval(intervalId)
            return
        }
    }
}


function triggerCurrentHourGlow () {
    const oneMinute = 60000
    setInterval(updateCurrentHourGlow, oneMinute)

    function updateCurrentHourGlow () {
        const currentHour = new Date()
            .toLocaleTimeString(undefined, { hour: "numeric" })
        
        const prevCurrentHourCard = document.querySelector(".card.current-hour")
        if (prevCurrentHourCard !== null) {
            prevCurrentHourCard.classList.remove("current-hour")
        }

        const currentHourCard = document.querySelector(`.card[data-hour="${currentHour}"]`)
        currentHourCard.classList.add("current-hour")
    }
}