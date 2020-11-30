// DOM elements
const btns = document.querySelectorAll('button');
var activity = "1516";

btns.forEach(btn => {
    btn.addEventListener("click", e => {
        //get activity
        activity = e.target.dataset.activity;
        

        // remove and add active class
        btns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        
        

    })
})