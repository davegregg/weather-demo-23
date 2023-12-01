function populateCitySelect(selectElement, cities) {
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
    getPointData(chosenCoordinates)
}
