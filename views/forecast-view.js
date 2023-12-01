function renderHourlyForecasts(forecasts) {
    const cards = forecasts.map(createForecastCard)
    
    document
        .querySelector("#forecastResults")
        .replaceChildren(...cards)

    // triggerCardAnimationsAfterDelay()
    triggerCurrentHourGlow()
}


function createForecastCard (forecast) {
    const hourText = new Date(forecast.startTime)
        .toLocaleTimeString(undefined, { hour: "numeric" })

    const card = document.createElement("div")
    card.classList.add("card")
    card.dataset.hour = hourText
    
    card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${hourText} today</h5>
            <h6 class="card-subtitle">${forecast.temperature}°${forecast.temperatureUnit}</h6>
            <p class="card-text">${forecast.shortForecast}</p>
        </div>
    `

    prependImageAfterDecoding(card, {imgsrc: forecast.icon, alt: forecast.shortForecast})
    return card
}


function prependImageAfterDecoding (card, {imgsrc, alt}) {
    const img = document.createElement("img")
    img.classList.add("card-img-top")
    img.setAttribute("alt", alt)
    
    const correctedIcon = imgsrc
        .replace("small", "large")  // get larger icon size
        .replace(",0", ",1")        // 0% icons don't seem to exist, so workaround displaying 1%
    img.setAttribute("src", correctedIcon)
    
    // img.onerror = replaceImageOnError(img)
    img.decode().then(() => {
        card.prepend(img)
        card.classList.add("animate__animated", "animate__pulse")
    })
}


// function replaceImageOnError (img) {
//     const width = 300
//     const height = width
//     const bgColorHex = "FFDACB"
//     const textColorHex = "000000"
//     const text = new URLSearchParams({ text: "Image unavailable." }).toString()

//     const placeholderURL = `https://dummyimage.com/${width}x${height}/${bgColorHex}/${textColorHex}.gif&${text}`

//     img.onerror = null  // unset onerror to avoid edge case loops in some browsers
//     img.setAttribute("src", placeholderURL)
// }


function renderResultsMessage (message="Forecast Unavailable") {
    console.warn(message)

    document
        .querySelector("#forecastResults")
        .innerHTML = `
            <h2 class="error animate__animated animate__flash">
                ${message}
            </h2>
        `
}
