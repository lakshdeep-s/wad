// Updated activeRides.js

// Display logged-in username
const loggedInUser = JSON.parse(localStorage.getItem("user")) || { username: "Guest" };
document.getElementById("username").textContent = loggedInUser.username;

document.querySelector(".logout-btn").addEventListener("click", () => {
    window.localStorage.removeItem("user");
    window.location.href = "/login";
});

// Load active rides from localStorage
const activeRides = JSON.parse(localStorage.getItem("activeRides")) || [];

const activeRideContainer = document.getElementById("activeRideContainer");
if (activeRides.length > 0) {
    activeRides.forEach((ride, index) => {
        const rideElement = document.createElement("div");
        rideElement.classList.add("ride-item");
        rideElement.innerHTML = `
            <h3>${ride.vehicleType} by ${ride.driverName}</h3>
            <p>Fare: ₹${ride.fare}</p>
            <p>Available Seats: ${ride.availableSeats}</p>
            <p>Estimated Pickup: ${new Date(ride.estimatedPickupAt).toLocaleString()}</p>
            <button class="cancel-ride-button" data-index="${index}">Cancel Ride</button>
        `;
        activeRideContainer.appendChild(rideElement);
    });

    document.querySelectorAll(".cancel-ride-button").forEach((button) => {
        button.addEventListener("click", (event) => {
            const rideIndex = event.target.getAttribute("data-index");
            const canceledRides = JSON.parse(localStorage.getItem("canceledRides")) || [];

            canceledRides.push(activeRides[rideIndex]);
            localStorage.setItem("canceledRides", JSON.stringify(canceledRides));

            activeRides.splice(rideIndex, 1);
            localStorage.setItem("activeRides", JSON.stringify(activeRides));

            alert("Ride canceled successfully!");
            window.location.reload();
        });
    });
} else {
    activeRideContainer.innerHTML = "<p>No active rides at the moment.</p>";
}
