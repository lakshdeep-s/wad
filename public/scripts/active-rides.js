// Display logged-in username
const loggedInUser = JSON.parse(localStorage.getItem("user")) || { username: "Guest" };
document.getElementById("username").textContent = loggedInUser.username;

// Load active ride from localStorage
const activeRide = JSON.parse(localStorage.getItem("activeRide"));

const activeRideContainer = document.getElementById("activeRideContainer");
const completeRideButton = document.getElementById("completeRideButton");
const cancelRideButton = document.getElementById("cancelRideButton");

if (activeRide) {
    activeRideContainer.innerHTML = `
        <h3>${activeRide.vehicleType} by ${activeRide.driverName}</h3>
        <p>Fare: ₹${activeRide.fare}</p>
        <p>Available Seats: ${activeRide.availableSeats}</p>
        <p>Estimated Pickup: ${new Date(activeRide.estimatedPickupAt).toLocaleString()}</p>
    `;
    completeRideButton.style.display = "block";
    cancelRideButton.style.display = "block";
} else {
    activeRideContainer.innerHTML = "<p>No active ride at the moment.</p>";
    completeRideButton.style.display = "none";
    cancelRideButton.style.display = "none";
}

// Handle ride cancellation
cancelRideButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to cancel this ride?")) {
        const canceledRides = JSON.parse(localStorage.getItem("canceledRides")) || [];
        canceledRides.push(activeRide);
        localStorage.setItem("canceledRides", JSON.stringify(canceledRides));
        localStorage.removeItem("activeRide");
        alert("Your ride has been canceled.");
        window.location.reload();
    }
});

// Handle ride completion
completeRideButton.addEventListener("click", () => {
    if (confirm("Have you completed this ride?")) {
        const rating = prompt("Rate this ride (1-5):", "5");
        const completedRides = JSON.parse(localStorage.getItem("completedRides")) || [];
        completedRides.push({ ...activeRide, rating: parseInt(rating, 10) || null });
        localStorage.setItem("completedRides", JSON.stringify(completedRides));
        localStorage.removeItem("activeRide");
        alert("Thank you for completing your ride.");
        window.location.reload();
    }
});
