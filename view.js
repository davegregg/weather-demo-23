function renderResultsMessage (message, parentElement=document.querySelector("#forecastResults")) {
    parentElement.innerHTML = `
        <h2 class="animate__animated animate__flash">
            ${message}
        </h2>
    `
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
