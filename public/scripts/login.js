document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission from refreshing the page

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Retrieve user credentials from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
        // Successful login
        alert("Login successful!");
        window.location.href = "/dashboard";
    } else {
        // Invalid credentials
        alert("Invalid username or password. Please try again.");
    }
});
