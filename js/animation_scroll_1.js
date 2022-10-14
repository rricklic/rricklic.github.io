function intersectionObserverCallback(entries)
{
    for (let entry of entries) {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    }
}

const observer = new IntersectionObserver(intersectionObserverCallback);


/*
const observer = new IntersectionObserver((entries) => {
    for (let entry of entries) {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    } 
});
*/


const hiddenElements = document.querySelectorAll(".hidden");
for (let hiddenElement of hiddenElements) {
    observer.observe(hiddenElement);
}
