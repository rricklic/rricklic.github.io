let rating = "";

function handleMouseDown(event)
{
    if (event.target.localName == "button" && event.target.className == "round") {
        rating = event.target.textContent;
        const rounds = document.querySelectorAll(".round");
        for (let round of rounds) {
            round.classList.remove("round-click");
        }
        event.target.classList.add("round-click");
    } else if (rating !== "" && event.target.localName == "button" && event.target.className == "submit-button") {
        const hidden = document.querySelector(".hidden");
        const shown = document.querySelector(".rating-container");
        hidden.classList.toggle("hidden");
        shown.classList.toggle("hidden");
        const pill = document.querySelector(".pill");
        pill.textContent = "You selected " + rating + " out of 5";
    }
}

document.addEventListener("mousedown", handleMouseDown);