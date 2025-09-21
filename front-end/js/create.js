document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-account");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const companyInput = document.getElementById("company");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");

  const usernameError = document.getElementById("username-error");
  const passwordError = document.getElementById("password-error");
  const confirmPasswordError = document.getElementById("confirm-password-error");
  const companyError = document.getElementById("company-error");
  const nameError = document.getElementById("name-error");
  const emailErorr = document.getElementById("email-error");

  const formMessage = document.createElement("div");
  formMessage.style.marginTop = "10px";
  formMessage.style.transition = "opacity 0.5s";
  form.appendChild(formMessage);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    usernameError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    companyError.textContent = "";
    nameError.textContent = "";
    emailErorr.textContent = "";

    let hasError = false;

    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const company = companyInput.value;
    const name = nameInput.value;
    const email = emailInput.value;

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

    if (!company){
      companyError.textContent = "Company is required.";
      hasError = true;
    }

    if(!name){
      nameError.textContent = "Name is required.";
      hasError = true;
    }

    if(!email){
      emailErorr.textContent = "Email is required.";
      hasError = true;
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      emailErorr.textContent = "Email format is incorrect."
      hasError = true;
    }

    if (!hasError) {
      const userData = { 
        name,
        userName: username,
        email,
        password,
        company
      };

      fetch(`${window.CONFIG.API_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          formMessage.style.color = "red";
          formMessage.style.opacity = 1;
          formMessage.textContent = data.message || "Error creating account";
          setTimeout(() => {
            formMessage.style.opacity = 0;
          }, 3000);
          return;
        } 
        formMessage.style.color = "green";
        formMessage.style.opacity = 1;
        formMessage.textContent = "Account created successfully!";
        form.reset();

        setTimeout(() => {
          formMessage.style.opacity = 0;
        }, 3000);
      })
      .catch((err) => {
        formMessage.style.opacity = 1;
        formMessage.textContent = "Server error. Please try again later.";
        setTimeout(() => {
          formMessage.style.opacity = 0;
        }, 3000);
      });
    }
  });
});
