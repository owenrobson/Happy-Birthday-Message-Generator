// Message Generation


const generateButton = document.getElementById("generateButton");
const messageElement = document.getElementById("message");
const name1Element = document.getElementById("name1");
const name2Element = document.getElementById("name2");
const ageElement = document.getElementById("age");
const addJokeRadios = document.getElementsByName("addJoke");




const messages = [
    "Wishing you a day filled with joy, laughter and lots of birthday cake!",
    "May your special day be filled with love, happiness, and all your favorite things.",
    "Have an amazing day!",
    "May all your dreams and wishes come true today and always.",
    "Sending you lots of love and hugs on your special day!",
    "Wishing you a year filled with love, laughter, and prosperity.",
    "On this special day, may all your dreams and wishes come true!",
    "Wishing you a birthday as bright as your smile and as sweet as your heart!",
    "May this day bring you as much joy and happiness as you bring to others.",
    "Wishing you a year filled with love, laughter, and all your heart desires."
];

const jokes = {
    over40: [
        "Looks like it's time to start using reading glasses and planning trips to Florida!",
        "Congratulations on making it this far! You're officially middle-aged!",
        "You're not getting older, you're just becoming a classic! ",
        "You're closer to your pension and the senior discount!",
        "Just think, in no time you'll be able to retire and enjoy your golden years.",
        "You know you’re old when the candles cost more than the cake.",
        "They say age is just a number. For you, it’s a really, really big number."
    ],
    under30: [
        "You're still young, so enjoy your birthday while you can! Things only get worse from here.",
        "Don't worry, you still have plenty of time to figure everything out.",
        "As lazy and care free as you are, you still have plenty of time for responsibilities later.",
        "You have your entire future ahead of you. Its not a race, you have plenty of time to make the mistakes you want.",
        "A year older, and hopefully a little more wiser."
    ]
};

function generateMessage() {
    const name1 = name1Element.value;
    const name2 = name2Element.value;
    const age = ageElement.value;

    let message = messages[Math.floor(Math.random() * messages.length)];
    message = message.replace(`${name1}`, name1);

    let addJoke = false;
    for (const radio of addJokeRadios) {
        if (radio.checked) {
            addJoke = radio.value;
            break;
        }
    }

    if (addJoke === "yes") {
        const ageJokes = age >= 40 ? jokes.over40 : jokes.under30;
        const joke = ageJokes[Math.floor(Math.random() * ageJokes.length)];
        message += " " + joke;
    }

    function getOrdinal(n) {
        let s = ["th", "st", "nd", "rd"],
            v = n % 100;
        const ordinalAge = n + (s[(v - 20) % 10] || s[v] || s[0]);
        return ordinalAge;
    }

    let updatedAge = getOrdinal(age);


    message = `Dear ${name1}, Happy ${updatedAge} Birthday! ${message} From ${name2}`;
    messageElement.innerHTML = message;
}

generateButton.addEventListener("click", generateMessage);


// validate input fields

function checkInputs() {
    // Get all input elements with the "required" attribute
    const requiredInputs = document.querySelectorAll('input[required]');

    // Loop through each required input and check if it is empty
    let incompleteFields = false;
    requiredInputs.forEach((input) => {
        if (!input.value) {
            // If the input is empty, set the error message and mark it as incomplete
            input.parentElement.querySelector('.error').textContent = '*Field incomplete';
            incompleteFields = true;

            // no birthday greeting displayed if any of the inputs are incomplete
            message = ` `;
            messageElement.innerHTML = message;

        } else {
            // Otherwise, clear any existing error messages
            input.parentElement.querySelector('.error').textContent = '';
        }
    });

    // Return true if all required inputs are complete, false otherwise
    return !incompleteFields;
}

generateButton.addEventListener('click', (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Check all input fields for completeness
    const inputsComplete = checkInputs();

});




