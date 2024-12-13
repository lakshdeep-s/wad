document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission from refreshing the page

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Retrieve user and driver credentials from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const drivers = JSON.parse(localStorage.getItem("drivers") || "[]");

    const user = users.find(user => user.username === username);
    const driver = drivers.find(driver => driver.username === username);

    // Check user and driver credentials
    if (user && user.password === password) {
        alert("Login Successful, redirecting to dashboard...");
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/dashboard";
    } else if (driver && driver.password === password) {
        alert("Login Successful, redirecting to admin dashboard...");
        localStorage.setItem("user", JSON.stringify(driver));
        window.location.href = "/admin-dashboard";
    } else {
        alert("Invalid username or password.");
    }
});
