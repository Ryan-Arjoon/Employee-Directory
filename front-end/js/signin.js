document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signin-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const usernameError = document.getElementById("username-error");
    const passwordError = document.getElementById("password-error");

    form.addEventListener("submit", async function (event) {
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

        if (hasError) return;

        try {
            const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userName: username, password }),
            });

            const data = await response.json();

            if (!response.ok) {

                passwordError.textContent = data.message || "Login failed";
                return;
            }

            localStorage.setItem("token", data.token);

            window.location.href = "../html/home.html";
        } catch (err) {
            console.error("Error logging in:", err);
            passwordError.textContent = "Something went wrong. Try again.";
        }
    });
});
