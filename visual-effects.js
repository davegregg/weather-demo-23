"use strict"

function triggerCardAnimationsAfterDelay () {
    const cards = document.querySelectorAll("#forecastResults .card")
    const imageOfSixthCard = cards[5].querySelector(".card-img-top")
    imageOfSixthCard.onload = () => {
        let index = 0
        const intervalId = setInterval(animate, 150)
    
        function animate () {
            cards[index].classList.add("animate__animated", "animate__pulse")
            index += 1
    
            if (index >= cards.length) {
                clearInterval(intervalId)
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
