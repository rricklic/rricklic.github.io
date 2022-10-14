const path = document.querySelector("path");
const pathLength = path.getTotalLength();
path.style.strokeDasharray = pathLength + ' ' + pathLength;
path.style.strokeDashoffset = pathLength;

/* This logic essentially does an operation based on the percentage of the way scrolled through page */
function handleOnScroll(event)
{
    let scrollPercentage = 
        (document.documentElement.scrollTop + document.body.scrollTop) / 
        (document.documentElement.scrollHeight - document.documentElement.clientHeight)
    let drawLength = pathLength * scrollPercentage;
    path.style.strokeDashoffset = pathLength - drawLength;
}

window.addEventListener('scroll', handleOnScroll);