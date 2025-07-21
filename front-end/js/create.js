document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-account");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");

  const usernameError = document.getElementById("username-error");
  const passwordError = document.getElementById("password-error");
  const confirmPasswordError = document.getElementById("confirm-password-error");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Clear previous error messages
    usernameError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    let hasError = false;

    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!username) {
      usernameError.textContent = "Username is required.";
      hasError = true;
    } else if (!/^[a-zA-Z0-9_]{4,20}$/.test(username)) {
      usernameError.textContent = "Username must be 4–20 characters and contain only letters, numbers, or underscores.";
      hasError = true;
    }

    if (!password) {
      passwordError.textContent = "Password is required.";
      hasError = true;
    } else if (password.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters long.";
      hasError = true;
    }

    if (!confirmPassword) {
      confirmPasswordError.textContent = "Please confirm your password.";
      hasError = true;
    } else if (password !== confirmPassword) {
      confirmPasswordError.textContent = "Passwords do not match.";
      hasError = true;
    }

    if (!hasError) {
      form.reset();
    }
  });
});
