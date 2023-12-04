function renderResultsMessage (message, parentElement=document.querySelector("#forecastResults")) {
    parentElement.innerHTML = `
        <h2 class="animate__animated animate__flash">
            ${message}
        </h2>
    `
}
