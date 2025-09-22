document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("add-employee-form");
    const empIdInput = document.getElementById("emp-id");
    const empNameInput = document.getElementById("emp-name");
    const empCompanyInput = document.getElementById("emp-company");
    const empPositionInput = document.getElementById("emp-position");
    const empSalaryInput = document.getElementById("emp-salary");
    const empStartInput = document.getElementById("emp-start");
    const empIdError = document.getElementById("emp-id-error");
    const empNameError = document.getElementById("emp-name-error");
    const empCompanyError = document.getElementById("emp-company-error");
    const empPositionError = document.getElementById("emp-position-error");
    const empSalaryError = document.getElementById("emp-salary-error");
    const empStartError = document.getElementById("emp-start-error");

    const successMessage = document.createElement("div");
    successMessage.style.marginTop = "10px";
    successMessage.style.transition = "opacity 0.5s";
    form.appendChild(successMessage);

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        
        let hasError = false;

        empIdError.textContent = "";
        empNameError.textContent = "";
        empCompanyError.textContent = "";
        empPositionError.textContent = "";
        empSalaryError.textContent = "";
        empStartError.textContent = "";
        successMessage.style.opacity = 0;
        successMessage.textContent = "";

        const empId = empIdInput.value.trim();
        const empName = empNameInput.value;
        const empCompany = empCompanyInput.value;
        const empPosition = empPositionInput.value;
        const empSalary = empSalaryInput.value;
        const empStart = empStartInput.value;

        if (empId === "") {
            empIdError.textContent = "Employee ID must not be empty";
            hasError = true;
        }

        if (empName === "") {
            empNameError.textContent = "Employee name must not be empty";
            hasError = true;
        }

        if (empCompany === "") {
            empCompanyError.textContent = "Employee company must not be empty";
            hasError = true;
        }

        if (empPosition === "") {
            empPositionError.textContent = "Employee position must not be empty";
            hasError = true;
        }
        
        if (empSalary === "") {
            empSalaryError.textContent = "Employee salary must not be empty";
            hasError = true;
        }

        if (empStart === "") {
            empStartError.textContent = "Employee start date must not be empty";
            hasError = true;
        }

        if (hasError) return;

        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${window.CONFIG.API_URL}/api/employees`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    employeeId: empId,
                    name: empName,
                    position: empPosition,
                    salary: Number(empSalary),
                    startDate: empStart
                })
            });

            const data = await response.json();

            if (!response.ok) {
                successMessage.style.color = "red";
                successMessage.style.opacity = 1;
                successMessage.textContent = data.message || "Failed to add employee";
                return;
            }

            successMessage.style.color = "green";
            successMessage.style.opacity = 1;
            successMessage.textContent = "Employee added successfully!";
            form.reset();

            setTimeout(() => {
                successMessage.style.opacity = 0;
            }, 3000);
            form.reset();
        } catch (err) {
            console.error(err);
            alert("An error occurred while adding employee.");
        }
    });
});
