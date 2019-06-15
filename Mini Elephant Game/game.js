document.addEventListener("DOMContentLoaded", ready);
let i = 0
let myp
let person

function ready() {
    person = prompt("Please enter your name", "Andrei Pitis(Poli's God)");
    myp = document.querySelector('p')
    myp.textContent = 0;
    i = 0;

    let x = document.querySelector('.start')
    x.addEventListener('click', click);

    document.addEventListener('keypress', space)
}

function click() {
    myp.textContent = 0;
    i = 0;
}

function score() {
    myp.textContent = ++i;
}


setInterval(score, 1000);

function addClassplayer() {
    let player = document.querySelector('.player')
    player.classList.add('jump');
}
function removeClassplayer() {
    let player = document.querySelector('.player')
    player.classList.remove('jump');
}

function space(e) {
    if (e.key === ' ') {

        addClassplayer()
        setTimeout(removeClassplayer, 800);
    }
}

function addClassobs() {
    let obs = document.querySelector('.obstacle')
    obs.style.transition = 'all 2s linear'
    obs.classList.add('left');
}

setInterval(addClassobs, 2000)

function removeClassobs() {
    let obs = document.querySelector('.obstacle')
    obs.style.transition = 'none';
    obs.classList.remove('left');
}

setInterval(removeClassobs, 4000);
let alertShown = false

function collision() {
    let player = document.querySelector('.player')
    let obs = document.querySelector('.obstacle')
    let r = player.getBoundingClientRect()
    let l = obs.getBoundingClientRect()
    if (r.right > l.left && r.bottom > l.top) {
        if (alertShown === false) {
            alert("Mouse scared Mister Big\nYour score is: " + i);
            fetch(
                "http://ccna.ro/webapi/scores/",
                {
                    method: "post",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            jucator: person,
                            scor: i
                        }
                    )
                }
            )
            window.location.reload();
            alertShown = true
        }
        i = 0;
    }
}

setInterval(collision, 100);





