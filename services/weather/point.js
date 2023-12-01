function getPointData (coordinates) {
    console.info(`Requesting point data for coordinates (${coordinates}).`)
    fetch(`https://api.weather.gov/points/${coordinates}`)
        .then(response => response.json(), handleNetworkFailure)
        .then(validatePointPayload)
        .then(data => data.properties.forecastHourly)
        .then(getHourlyForecast)
}


function validatePointPayload (data) {
    console.info(`Point data received:`, data)
    if (typeof data?.properties?.forecastHourly !== "string") {
        renderResultsMessage("Forecast Unavailable:<br>No forecast periods found.")
        throw new Error("No forecast URL found.")
    }

    return data
}
