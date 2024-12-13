document.querySelector(".logout-btn").addEventListener("click", ()=> {
    window.localStorage.removeItem("user")
    window.location.href= "/login" 
})
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission from refreshing the page

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Retrieve user credentials from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
        alert("User Credentials Not Found ! Create an account instead")
    }

    if (storedUser.isAdmin && storedUser.username ===username && storedUser.password === password) {
        alert("Login Successfull")
        window.location.href="/admin-dashboard"
    } else if (storedUser.username === username && storedUser.password === password){
        alert("Login successful!");
        window.location.href = "/dashboard";
    }
    else {
        alert("Invalid username or password. Please try again.")
    }
});
