// Display logged-in username
const loggedInUser = JSON.parse(localStorage.getItem("user")) || { username: "Guest" };
document.getElementById("username").textContent = loggedInUser.username;

// Load completed and cancelled rides from localStorage
const completedRides = JSON.parse(localStorage.getItem("completedRides")) || [];
const cancelledRides = JSON.parse(localStorage.getItem("canceledRides")) || [];

// Populate completed rides
const completedRidesContainer = document.getElementById("completedRidesContainer");
if (completedRides.length > 0) {
    completedRidesContainer.innerHTML = completedRides
        .map(
            (ride) => `
        <div class="ride-card">
            <h3>${ride.vehicleType} by ${ride.driverName}</h3>
            <p>Fare: ₹${ride.fare}</p>
            <p>Available Seats: ${ride.availableSeats}</p>
            <p>Completed On: ${new Date(ride.estimatedPickupAt).toLocaleString()}</p>
            <p>Rating: ${ride.rating ? `${ride.rating} / 5` : "Not Rated"}</p>
        </div>
    `
        )
        .join("");
} else {
    completedRidesContainer.innerHTML = "<p>No completed rides yet.</p>";
}

// Populate cancelled rides
const cancelledRidesContainer = document.getElementById("cancelledRidesContainer");
if (cancelledRides.length > 0) {
    cancelledRidesContainer.innerHTML = cancelledRides
        .map(
            (ride) => `
        <div class="ride-card">
            <h3>${ride.vehicleType} by ${ride.driverName}</h3>
            <p>Fare: ₹${ride.fare}</p>
            <p>Available Seats: ${ride.availableSeats}</p>
            <p>Cancelled On: ${new Date(ride.estimatedPickupAt).toLocaleString()}</p>
            <p>Status: Cancelled</p>
        </div>
    `
        )
        .join("");
} else {
    cancelledRidesContainer.innerHTML = "<p>No cancelled rides yet.</p>";
}
