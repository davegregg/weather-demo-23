"use strict"

// Requires the Animate.css library:
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">

function triggerCardAnimationsAfterDelay () {
    const cards = document.querySelectorAll("#forecastResults .card")
    const sixthCardImage = cards[5].querySelector("img.card-img-top")

    // Wait until the sixth image has loaded...
    sixthCardImage.onload = () => {
        let index = 0
        const timerId = setInterval(animate, 150)

        function animate () {
            cards[index].classList.add("animate__animated", "animate__pulse")
            index += 1

            if (index >= cards.length) {
                clearInterval(timerId)
                return
            }
        }
    }
}


function triggerCurrentHourGlow () {
    const oneMinute = 60000
    setInterval(updateCurrentHourGlow, oneMinute)
    updateCurrentHourGlow()  // initial run

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
