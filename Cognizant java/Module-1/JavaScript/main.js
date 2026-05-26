  // =====================================
// 1. JavaScript Basics & Setup
// =====================================

console.log("Welcome to the Community Portal");

window.onload = function () {
    alert("Page Fully Loaded");
};

// =====================================
// 2. Syntax, Data Types, Operators
// =====================================

const portalName = "Community Portal";

let availableSeats = 5;

console.log(`Available Seats: ${availableSeats}`);

availableSeats++;

console.log(`Updated Seats: ${availableSeats}`);

// =====================================
// 5. Objects and Prototypes
// =====================================

class Event {

    constructor(name, category, date, seats) {
        this.name = name;
        this.category = category;
        this.date = date;
        this.seats = seats;
    }
}

// Prototype Method

Event.prototype.checkAvailability = function () {

    return this.seats > 0
        ? "Seats Available"
        : "Full";
};

// =====================================
// 6. Arrays and Methods
// =====================================

const events = [

    new Event("Music Night", "Music", "2026-07-10", 5),

    new Event("Baking Workshop", "Workshop", "2026-07-15", 0),

    new Event("Football Match", "Sports", "2026-07-20", 10)

];

// push()

events.push(
    new Event("Dance Show", "Music", "2026-07-25", 8)
);

// filter()

const musicEvents = events.filter(
    event => event.category === "Music"
);

console.log(musicEvents);

// map()

const cards = events.map(
    event => `Workshop on ${event.name}`
);

console.log(cards);

// Object.entries()

events.forEach(event => {

    console.log(Object.entries(event));

});

// =====================================
// 4. Functions, Scope, Closures
// =====================================

function addEvent(event) {

    events.push(event);
}

function registerUser(eventName) {

    try {

        const event = events.find(
            e => e.name === eventName
        );

        if (!event) {
            throw new Error("Event Not Found");
        }

        if (event.seats <= 0) {
            throw new Error("No Seats Available");
        }

        event.seats--;

        displayEvents();

        return "Registration Successful";

    } catch (error) {

        console.log(error.message);
    }
}

// Closure

function registrationTracker() {

    let total = 0;

    return function () {

        total++;

        return total;
    };
}

const trackMusic = registrationTracker();

console.log(trackMusic());
console.log(trackMusic());

// Higher Order Function

function filterEventsByCategory(category, callback) {

    const filtered = events.filter(
        event => event.category === category
    );

    callback(filtered);
}

// =====================================
// 3. Conditionals, Loops, Error Handling
// =====================================

function displayEvents(eventList = events) {

    const container =
        document.querySelector("#eventContainer");

    container.innerHTML = "";

    eventList.forEach(event => {

        // if else

        if (event.seats > 0) {

            const card =
                document.createElement("div");

            card.className = "eventCard";

            card.innerHTML = `
                <h3>${event.name}</h3>
                <p>Category: ${event.category}</p>
                <p>Date: ${event.date}</p>
                <p>Seats: ${event.seats}</p>
                <button onclick="register('${event.name}')">
                    Register
                </button>
            `;

            container.appendChild(card);
        }
    });
}

// =====================================
// 7. DOM Manipulation
// =====================================

displayEvents();

// =====================================
// 8. Event Handling
// =====================================

function register(name) {

    const message =
        registerUser(name);

    document.querySelector("#message")
        .innerHTML = message;
}

// onchange

document.querySelector("#categoryFilter")
    .onchange = function () {

        const category = this.value;

        if (category === "All") {

            displayEvents();

        } else {

            filterEventsByCategory(
                category,
                displayEvents
            );
        }
    };

// keydown

document.querySelector("#searchBox")
    .addEventListener("keydown", function () {

        const search =
            this.value.toLowerCase();

        const filtered = events.filter(
            event =>
                event.name.toLowerCase()
                    .includes(search)
        );

        displayEvents(filtered);
    });

// =====================================
// 9. Async JS, Promises, Async Await
// =====================================

const apiURL =
    "https://jsonplaceholder.typicode.com/posts";

document.querySelector("#loading")
    .style.display = "block";

// then catch

fetch(apiURL)

    .then(response => response.json())

    .then(data => {

        console.log(data);

        document.querySelector("#loading")
            .style.display = "none";
    })

    .catch(error => {

        console.log(error);
    });

// async await

async function fetchEvents() {

    try {

        const response =
            await fetch(apiURL);

        const data =
            await response.json();

        console.log(data);

    } catch (error) {

        console.log(error);
    }
}

fetchEvents();

// =====================================
// 10. Modern JavaScript Features
// =====================================

function greetUser(name = "Guest") {

    console.log(`Welcome ${name}`);
}

greetUser();

const clonedEvents = [...events];

console.log(clonedEvents);

// destructuring

const [firstEvent] = events;

console.log(firstEvent.name);

// =====================================
// 11. Working with Forms
// =====================================

document.querySelector("#registerForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        const username =
            this.elements["username"].value;

        const email =
            this.elements["email"].value;

        const selectedEvent =
            this.elements["eventName"].value;

        if (username === "" || email === "") {

            document.querySelector("#message")
                .innerHTML =
                "Please fill all fields";

            return;
        }

        document.querySelector("#message")
            .innerHTML =
            `${username} registered for ${selectedEvent}`;

        sendRegistration({
            username,
            email,
            selectedEvent
        });
    });

// =====================================
// 12. AJAX & Fetch API
// =====================================

function sendRegistration(userData) {

    setTimeout(() => {

        fetch(apiURL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(userData)

        })

            .then(response => response.json())

            .then(data => {

                console.log(data);

                document.querySelector("#message")
                    .innerHTML +=
                    "<br>Registration Sent Successfully";
            })

            .catch(error => {

                document.querySelector("#message")
                    .innerHTML =
                    "Registration Failed";
            });

    }, 2000);
}

// =====================================
// 13. Debugging and Testing
// =====================================

console.log("Form Ready");

console.log("Events Loaded");

console.log("Fetch API Connected");

// =====================================
// 14. jQuery and Frameworks
// =====================================

$("#registerBtn").click(function () {

    $(".eventCard").fadeOut(1000);

    $(".eventCard").fadeIn(1000);
});

console.log(
    "Frameworks like React/Vue make UI reusable"
);