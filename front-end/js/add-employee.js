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

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        
        let hasError = false;

        empIdError.textContent = "";
        empNameError.textContent = "";
        empCompanyError.textContent = "";
        empPositionError.textContent = "";
        empSalaryError.textContent = "";
        empStartError.textContent = "";

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

       
    });
});
