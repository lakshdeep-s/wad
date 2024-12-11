function redirectToLogin(){
    window.location.href = "/signup";
}

function redirectToServices(){
    window.location.href = "/services";
}

document.querySelector(".cta").addEventListener("click", redirectToLogin)
document.querySelector(".cta-1").addEventListener("click", redirectToServices)