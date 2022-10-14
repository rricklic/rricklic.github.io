function intersectionObserverCallback(entries)
{
    // console.log(entries);
    for (const entry of entries) {
        entry.target.classList.toggle("show", entry.isIntersecting);
        if (entry.isIntersecting) {
            // observer.unobserve(entry.target); // No longer observe; will not trigger animation/event again
        }
    }
}
const observer = new IntersectionObserver(intersectionObserverCallback, {threshold: 1});
const cards = document.querySelectorAll(".card");
for (const card of cards) {
    observer.observe(card);
}

function lastCardIntersectingObserverCallback(entries)
{
    const lastCard = entries[0];
    if (!lastCard.isIntersecting) {
        return;
    }
    loadMoreCards();
    lastCardObserver.unobserve(lastCard.target); // Stop observing previous (now no longer) last card
    lastCardObserver.observe(document.querySelector(".card:last-child")); // Observer new last card
}
const lastCardObserver = new IntersectionObserver(lastCardIntersectingObserverCallback, {rootMargin: "100px"}); // Observer 100 pixel early to pre-load
const lastCard = document.querySelector(".card:last-child");
lastCardObserver.observe(lastCard);

const cardContainer = document.querySelector(".card-container");
function loadMoreCards()
{
    for (let i = 0; i < 10; i++) {
        const card = document.createElement("div");
        card.textContent = "New Card";
        card.classList.add("card");
        observer.observe(card);
        cardContainer.append(card);
    }
}