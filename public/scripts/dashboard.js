// Updated dashboard.js

// Ride data (mimicking the JSON file content)
const loggedInUser = window.localStorage.getItem("user") || "John Doe";

document.querySelector(".logout-btn").addEventListener("click", () => {
    alert("Loggin Out Of Account...");

    window.localStorage.removeItem("user")
    window.location.href = "/login"
});

const rideData = {
    rides: [
        {
            source: "Hyderabad",
            destination: "Visakhapatnam",
            vehicleType: "Sedan",
            driverName: "Rakesh Rai",
            fare: 1500,
            availableSeats: 3,
            filledSeats: 2,
            estimatedPickupAt: "2024-11-21T10:30:00"
        },
        {
            source: "Hyderabad",
            destination: "Visakhapatnam",
            vehicleType: "SUV",
            driverName: "Jessica Francis",
            fare: 1800,
            availableSeats: 4,
            filledSeats: 1,
            estimatedPickupAt: "2024-11-21T12:00:00"
        },
        {
            source: "Mumbai",
            destination: "Pune",
            vehicleType: "Sedan",
            driverName: "Anita Desai",
            fare: 700,
            availableSeats: 2,
            filledSeats: 1,
            estimatedPickupAt: "2024-11-22T14:00:00"
        },
        {
            source: "Bangalore",
            destination: "Mysore",
            vehicleType: "Hatchback",
            driverName: "Priya Sharma",
            fare: 800,
            availableSeats: 3,
            filledSeats: 2,
            estimatedPickupAt: "2024-11-21T07:30:00"
        },
        {
            source: "Chennai",
            destination: "Coimbatore",
            vehicleType: "Sedan",
            driverName: "Lakshdeep Singh",
            fare: 2000,
            availableSeats: 4,
            filledSeats: 0,
            estimatedPickupAt: "2024-11-21T10:00:00"
        }
    ]
};

// Populate source and destination options dynamically
function populateSelectOptions(rideData) {
    const sourceSelect = document.getElementById("source");
    const destinationSelect = document.getElementById("destination");

    const sources = [...new Set(rideData.rides.map((ride) => ride.source))];
    const destinations = [...new Set(rideData.rides.map((ride) => ride.destination))];

    sources.forEach((source) => {
        const option = document.createElement("option");
        option.value = source;
        option.textContent = source;
        sourceSelect.appendChild(option);
    });

    destinations.forEach((destination) => {
        const option = document.createElement("option");
        option.value = destination;
        option.textContent = destination;
        destinationSelect.appendChild(option);
    });
}

// Display username in the sidebar
document.getElementById("username").textContent = loggedInUser.username; 

// Event listener for ride search form
document.getElementById("rideSearchForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const source = document.getElementById("source").value;
    const destination = document.getElementById("destination").value;
    const vehicleType = document.getElementById("vehicleType").value;

    const filteredRides = rideData.rides.filter((ride) => {
        return (
            ride.source === source &&
            ride.destination === destination &&
            (vehicleType === "Any" || ride.vehicleType === vehicleType)
        );
    });

    const ridesContainer = document.getElementById("ridesContainer");
    ridesContainer.innerHTML = "";

    if (filteredRides.length > 0) {
        filteredRides.forEach((ride, index) => {
            const rideElement = document.createElement("div");
            rideElement.classList.add("ride-item");
            rideElement.innerHTML = `
                <h3>${ride.vehicleType} by ${ride.driverName}</h3>
                <p>Fare: ₹${ride.fare}</p>
                <p>Available Seats: ${ride.availableSeats}</p>
                <p>Estimated Pickup: ${new Date(ride.estimatedPickupAt).toLocaleString()}</p>
                <button class="select-ride-button" data-index="${index}">Select</button>
            `;
            ridesContainer.appendChild(rideElement);
        });

        document.querySelectorAll(".select-ride-button").forEach((button) => {
            button.addEventListener("click", (event) => {
                const rideIndex = event.target.getAttribute("data-index");
                const selectedRide = filteredRides[rideIndex];

                const activeRides = JSON.parse(localStorage.getItem("activeRides")) || [];
                activeRides.push(selectedRide);
                localStorage.setItem("activeRides", JSON.stringify(activeRides));

                alert("Ride confirmed successfully!");
                window.location.href = "/dashboard/activeRides";
            });
        });
    } else {
        ridesContainer.innerHTML = "<p>No rides available for the selected criteria.</p>";
    }
});

// Initialize dropdowns on page load
populateSelectOptions(rideData);
