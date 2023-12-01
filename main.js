"use strict"

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
    populateCitySelect(citySelect, cities)
    citySelect.onchange = handleCityChange
}
