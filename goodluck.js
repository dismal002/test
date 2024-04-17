//! --------- This section is for adding functionality to the webpage ---------
//* IMPORTANT elements
const operatorButtons = Array.from(document.querySelectorAll(".operatorButtons"));
const cards = Array.from(document.querySelectorAll(".numberButtons"));
const inputEl = document.querySelector("#userSolutionDiv");
const outputEl = document.getElementById("output");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");


let input = "";
let cardId = "";
let currentTime = 59;
let score = 0;
let pauseTimer = false;

/* PLEASE KEEP COMMENTED OUT TILL AFTER TUESDAY! Card Randomizer
for (let card of cards) {
    card.textContent = Math.floor(Math.random() * 8 + 1);
    card.clicked = false;
}
*/

//* Backspace
//test
//DO NOT touch this code. 
document.querySelector("#delete").addEventListener("click", () => {
    //Grab what gets deleted and store it.
    let finalValue = inputEl.textContent[(inputEl.textContent.length - 1)];
    console.log(finalValue);
    for (let card of cards) {
        //If the last thing to get deleted was a number that matches one of the cards
        if (card.textContent === String(finalValue)) {
            //Set clicked property to false
            card.clicked = false;
            //Make the card look like its available
            card.style.backgroundColor = "white";
            card.style.opacity = "100%";
            //Re-add the event listener
            card.addEventListener("click", function cardInput() {
                //See below version of this for documentation
                // The ternary turns the integers from String to Number
                input += Number(this.textContent) === NaN ? Number(this.textContent) : this.textContent;
                //debugging
                console.log(input);
                console.log(this);
                inputEl.textContent = input;
        
                if (card.classList[1] === "numberButtons") {
                    card.clicked = true;
                }
        
                for (let card of operatorButtons.concat(cards)) {
                    if (card.clicked === true) {
                        card.style.backgroundColor = "black";
                        card.style.opacity = "30%";
                        card.removeEventListener("click", cardInput);
                    }
                }
            });
        }
    } 
    input = input.slice(0, -1);
    inputEl.textContent = input;
});

//* Hamburger Menu
const hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", () => {
    const dropdown = document.querySelector("#dropdown").style;

    hamburger.classList.toggle("change");
    dropdown.display = dropdown.display == 'block' ? 'none' : 'block';
});

//* Mouse animations
const mouseEl = document.querySelector("#mouse");
document.addEventListener("mousemove", (mouse) => {

    // Position the cornbread image element to the mouse
    mouseEl.style.top = `${mouse.pageY - 15}px`;
    mouseEl.style.left = `${mouse.pageX - 15}px`;
});



//! --------------- This section is for handling input ---------------

//* Handle input from operatorButtons
for (let button of operatorButtons) {
    button.addEventListener("click", function () {
        input += button.textContent;
        inputEl.textContent = input;
    });
}

//* Handle input from operatorButtons
for (let card of cards) {

    card.addEventListener("click", function cardInput() {
        // The ternary turns the integers from String to Number
        input += Number(this.textContent) === NaN ? Number(this.textContent) : this.textContent;
        //debugging
        console.log(`Starter loop input is ${input}`);
        inputEl.textContent = input;
        //If the button pressed is a number
        if (card.classList[1] === "numberButtons") {
            //Set clicked property to true
            card.clicked = true;
        }

        for (let card of operatorButtons.concat(cards)) {
            if (card.clicked === true) {
                //If the card has been clicked(clicked property), make it look like it isn't avaiable and remove the event listener
                card.style.backgroundColor = "black";
                card.style.opacity = "30%";
                card.removeEventListener("click", cardInput);
            }
        }
    });
}

//* No Solution Button
document.querySelector("#noSolutionBtn").addEventListener('click', () => {
    //TODO: implement no solutions button
    //Hardocded stuff for proof of concept:
    alert("You are factually incorrect. This set of numbers has at least 1 output that equals 24.");
    score -= 5;
    scoreEl.textContent = `Score: ${score}`;

    //Add card randomization here once Proof of Concept is over
    //Also do non-hardcoded
});



//! ------------------- This section is for game logic -------------------

//* Function used to solve a group that don't include parenthesis
function solveGroup(group) {

    // Check what the operator is, then add the first operand to the second using that operator
    switch (group[1]) {
        case "*":
            return Number(group[0]) * Number(group[2]);
        case "/":
            return Number(group[0]) / Number(group[2]);
        case "+":
            return Number(group[0]) + Number(group[2]);
        case "-":
            return Number(group[0]) - Number(group[2]);
    }
}

function calculate(expression) {
    let operand = 0;
    let sum = 0;
    let operator = "";
    sum += parseInt(expression[0]);
    for (let i = 0; i < expression.length; i++) {
        switch (expression[i]) {
            case "+":
                sum += parseInt(expression[i+1]);
                break;
            case "-":
                sum -= parseInt(expression[i+1]);
                break;
            case "*":
                sum *= parseInt(expression[i+1]);
                break;
            case "/":
                sum /= parseInt(expression[i+1]);
                break;
            default:
                break;
        }
    }
    if (sum.toString() === "NaN") {
        outputEl.textContent = "Something failed. Please try again";
    }
    else {
        outputEl.textContent = sum;
    }
    
    //---------------- Testing
    //Grab what gets deleted and store it.
    for(item of expression) {
            let finalValue = inputEl.textContent[(inputEl.textContent.length - 1)];
        console.log(finalValue);
        for (let card of cards) {
            //If the last thing to get deleted was a number that matches one of the cards
            if (card.textContent === String(finalValue)) {
                //Set clicked property to false
                card.clicked = false;
                //Make the card look like its available
                card.style.backgroundColor = "white";
                card.style.opacity = "100%";
                //Re-add the event listener
                card.addEventListener("click", function cardInput() {
                    //See below version of this for documentation
                    // The ternary turns the integers from String to Number
                    input += Number(this.textContent) === NaN ? Number(this.textContent) : this.textContent;
                    //debugging
                    console.log(input);
                    console.log(this);
                    inputEl.textContent = input;
            
                    if (card.classList[1] === "numberButtons") {
                        card.clicked = true;
                    }
            
                    for (let card of operatorButtons.concat(cards)) {
                        if (card.clicked === true) {
                            card.style.backgroundColor = "black";
                            card.style.opacity = "30%";
                            card.removeEventListener("click", cardInput);
                        }
                    }
                });
            }
        } 
        input = input.slice(0, -1);
        inputEl.textContent = input;
    }
    
}

//* Listen for the user clicking the submit button
document.querySelector("#enter").addEventListener("click", ()=>{
    calculate(inputEl.textContent);
    // Replace all parenthesis' with spaces then split the string by spaces, I do this to ensure the string is split by both opening and closing parenthesis
    /*
    let groups = inputEl.textContent.replaceAll("(", " ").replaceAll(")", " ").split(" ");
    // If there are no parenthesis, turn the string into the 0th index of a list so the proceeding for loop works correctly
    if (typeof groups === "string") groups = Array.from(groups);

    // For every group, solve it
    for (i in groups) {
        switch (groups[i].length) {
            // If it's a valid group (ie: 1 + 2) solve it
            case 3:
                groups[i] = solveGroup(groups[i]);
                break;
            // If the group has nothing in it, remove it from groups[]
            case 0:
                groups.splice(i, 1);
                break;
            //TODO: after the valid groups are solved, merge the items in groups[] to make more valid groups with PEMDAS in mind
            default:
                continue;
        }
    }

    console.log(groups);
    //Convert to string pls :)
    outputEl.textContent = groups; */
    if (Number(outputEl.textContent) === 24) {
        score++;
        currentTime += 10;
        //When proof of concept stuff is done, add the randomize function here
    }
    else {
        score--;
    }

    scoreEl.textContent = `Score: ${score}`;
});

function reduceTime() {
    if (pauseTimer === false) {
            currentTime--;
        timerEl.textContent = `Time Remaining: ${currentTime}s`;
        if (currentTime <= 0) {
            document.write("You have failed \n");
        }
    }
    
}

setInterval(reduceTime, 1000);