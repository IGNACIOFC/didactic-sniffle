/* ORDER DROP INPUT 

document.querySelectorAll(".drop-zone__input").forEach(inputElement => {
    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("dragover", e => {
        dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].foreach(type => {
        dropZoneElement.addEventListener(type, e => {
            dropZoneElement.classList.remove("drop-zone--over");
        });
    });
});

*/
const progressBar = document.querySelector(".progress");
const signIn = document.getElementById("signIn");
const checkout = document.getElementById("checkout");
const dropInput = document.querySelectorAll(".drop-zone__input");
const checkoutBtn = document.getElementById("checkoutBtn");
const payBtn = document.getElementById("payBtn");
const price = document.getElementById("price");
const videoDuration = document.getElementById("videoDuration");
const orderContainer = document.getElementById("orderContainer");
const myForm = document.getElementById("myForm");
const signInForm = document.getElementById("signInForm");

document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("click", (e) => {
        inputElement.click();
    });

    inputElement.addEventListener("change", (e) => {
        if (inputElement.files.length) {
            updateThumbnail(dropZoneElement, inputElement.files[0]);
            updateProgressBar(progressBar, 33);
            signIn.classList.remove("h-hide");
            /*setInterval(function() { signIn.classList.remove("none"); }, 1000);*/
        }
    });

    dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("drop-zone--over");
        });
    });

    dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault();

        if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files;
            updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
            updateProgressBar(progressBar, 33);
            signIn.classList.remove("h-hide");
        }
        
        dropZoneElement.classList.remove("drop-zone--over");
    });
    
    
});






/**
   * Updates the thumbnail on a drop zone element.
   *
   * @param {HTMLElement} dropZoneElement
   * @param {File} file
   */
function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        };
    } else {
        thumbnailElement.style.backgroundImage = null;
    }
}


/* Progress Bar */

function updateProgressBar(progressBar, value) {
    value = Math.round(value);
    progressBar.querySelector(".progress__fill").style.width = `${value}%`;
    progressBar.querySelector(".progress__text").textContent = `${value}%`;
}

/* Order */

signInForm.addEventListener("submit", function(e) {
    event.preventDefault()
    signIn.classList.add("h-hide");
    checkout.classList.remove("h-hide");
    updateProgressBar(progressBar, 66);
});

myForm.addEventListener("submit", function(e){
        event.preventDefault()
        const orderReceived = document.createElement("h3");
        orderReceived.append("Order Received 🎉");
        orderReceived.classList.add("align-text");
        orderReceived.style.marginTop = "3rem";

        signIn.classList.add("h-hide");
        checkout.classList.add("h-hide");
        updateProgressBar(progressBar, 100)
        orderContainer.append(orderReceived);
});





videoDuration.addEventListener("input", function (e) {
    price.innerHTML = e.target.value * 1.5 + "$";
})






/* Burguer Menu */

const navSlide = () => {
    const burguer = document.querySelector(".burguer");
    const nav = document.querySelector("nav ul");
    const navLinks = document.querySelectorAll(".li-nav");
    
    burguer.addEventListener("click", function () {

        // Toggle Nav
        nav.classList.toggle("nav-active");

        //animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = "";
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
            }
        });

        //Burguer Animation
        burguer.classList.toggle("toggle");
    });
    
    
    
}

navSlide();


/* FORM VALIDATION */








/* Start animate the text rotator. */

var words = document.getElementsByClassName('word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
    splitLetters(words[i]);
}
  
function changeWord() {
    var cw = wordArray[currentWord];
    var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
    for (var i = 0; i < cw.length; i++) {
        animateLetterOut(cw, i);
    }
    
    for (var i = 0; i < nw.length; i++) {
        nw[i].className = 'letter behind';
        nw[0].parentElement.style.opacity = 1;
        animateLetterIn(nw, i);
    }
    
    currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}

function animateLetterOut(cw, i) {
    setTimeout(function() {
        cw[i].className = 'letter out';
    }, i*80);
}

function animateLetterIn(nw, i) {
    setTimeout(function() {
        nw[i].className = 'letter in';
    }, 340+(i*80));
}

function splitLetters(word) {
    var content = word.innerHTML;
    word.innerHTML = '';
    var letters = [];
    for (var i = 0; i < content.length; i++) {
        var letter = document.createElement('span');
        letter.className = 'letter';
        letter.innerHTML = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
    }
    
    wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);