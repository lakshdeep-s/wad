// Sample user credentials for demonstration
const loggedInUser = JSON.parse(localStorage.getItem("user")) || { username: "Guest" };

// Ride data (mimicking the JSON file content)
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
            source: "Hyderabad",
            destination: "Visakhapatnam",
            vehicleType: "Hatchback",
            driverName: "Laxman Choudhary",
            fare: 1200,
            availableSeats: 2,
            filledSeats: 3,
            estimatedPickupAt: "2024-11-21T08:00:00"
        }
    ]
};

// Display username in the sidebar
document.getElementById("username").textContent = loggedInUser.username;

// Event listener for ride search form
document.getElementById("rideSearchForm").addEventListener("submit", (event) => {
    event.preventDefault();

    // Collect user inputs
    const source = document.getElementById("source").value;
    const destination = document.getElementById("destination").value;
    const vehicleType = document.getElementById("vehicleType").value;

    // Filter rides based on user inputs
    const filteredRides = rideData.rides.filter((ride) => {
        return (
            ride.source === source &&
            ride.destination === destination &&
            (vehicleType === "Any" || ride.vehicleType === vehicleType)
        );
    });

    // Display results
    const ridesContainer = document.getElementById("ridesContainer");
    ridesContainer.innerHTML = ""; // Clear previous results

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

        // Add event listeners to "Select" buttons
        document.querySelectorAll(".select-ride-button").forEach((button) => {
            button.addEventListener("click", (event) => {
                const rideIndex = event.target.getAttribute("data-index");
                const selectedRide = filteredRides[rideIndex];
                localStorage.setItem("activeRide", JSON.stringify(selectedRide));
                alert("Ride confirmed successfully!");
                window.location.href = "/dashboard/activeRides";
            });
        });
    } else {
        ridesContainer.innerHTML = "<p>No rides available for the selected criteria.</p>";
    }
});
