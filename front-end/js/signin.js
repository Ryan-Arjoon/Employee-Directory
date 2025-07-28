document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signin-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const usernameError = document.getElementById("username-error");
    const passwordError = document.getElementById("password-error");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        let hasError = false;

        usernameError.textContent = "";
        passwordError.textContent = "";
        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (username === "") {
            usernameError.textContent = "Username must not be empty";
            hasError = true;
        }

        if (password === "") {
            passwordError.textContent = "Password must not be empty";
            hasError = true;
        }

        if (!hasError) {
            form.reset();
        }
    });
});
