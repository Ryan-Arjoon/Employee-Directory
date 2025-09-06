document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("update-employee-form");
    const searchBtn = document.querySelector(".search-bar button");
    const deleteBtn = document.querySelector(".btn-create");

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

    searchBtn.addEventListener("click", async () => {
        const searchId = document.getElementById("search-employee").value.trim();
        if (!searchId) {
            successMessage.textContent = "Enter an Employee ID to search";
            successMessage.style.color = "red";
            successMessage.style.opacity = 1;
            setTimeout(() => { successMessage.style.opacity = 0; }, 4000);
            return;
        }

        try {
            const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/employees`, {
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
            });
            const employees = await res.json();

            const employee = employees.find(e => e.employeeId === searchId);
            if (!employee) {
                successMessage.textContent = "Employee not found";
                successMessage.style.color = "red";
                successMessage.style.opacity = 1;
                setTimeout(() => { successMessage.style.opacity = 0; }, 4000);
                return;
            }

            empIdInput.value = employee.employeeId;
            empNameInput.value = employee.name;
            empCompanyInput.value = employee.company;
            empPositionInput.value = employee.position;
            empSalaryInput.value = employee.salary;
            empStartInput.value = employee.startDate.split("T")[0];
        } catch (err) {
            console.error(err);
            successMessage.textContent = "Error fetching employee";
            successMessage.style.color = "red";
            successMessage.style.opacity = 1;
            setTimeout(() => { successMessage.style.opacity = 0; }, 4000);
        }
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        empIdError.textContent = "";
        empNameError.textContent = "";
        empCompanyError.textContent = "";
        empPositionError.textContent = "";
        empSalaryError.textContent = "";
        empStartError.textContent = "";
        successMessage.textContent = "";
        successMessage.style.opacity = 0;

        let hasError = false;

        if (empIdInput.value.trim() === "") { empIdError.textContent = "Employee ID is required"; hasError = true; }
        if (empNameInput.value.trim() === "") { empNameError.textContent = "Name is required"; hasError = true; }
        if (empCompanyInput.value.trim() === "") { empCompanyError.textContent = "Company is required"; hasError = true; }
        if (empPositionInput.value.trim() === "") { empPositionError.textContent = "Position is required"; hasError = true; }
        if (empSalaryInput.value.trim() === "") { empSalaryError.textContent = "Salary is required"; hasError = true; }
        if (empStartInput.value.trim() === "") { empStartError.textContent = "Start Date is required"; hasError = true; }

        if (hasError) return;

        try {
            const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/employees/${empIdInput.value}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    employeeId: empIdInput.value,
                    name: empNameInput.value,
                    company: empCompanyInput.value,
                    position: empPositionInput.value,
                    salary: empSalaryInput.value,
                    startDate: empStartInput.value
                })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Update failed");

            successMessage.textContent = "Employee updated successfully!";
            successMessage.style.color = "green";
            successMessage.style.opacity = 1;

            setTimeout(() => {
            successMessage.style.opacity = 0;
            }, 3000);
        } catch (err) {
            successMessage.textContent = err.message;
            successMessage.style.color = "red";
            successMessage.style.opacity = 1;

            setTimeout(() => {
                successMessage.style.opacity = 0;
            }, 4000);
        }
    });

    deleteBtn.addEventListener("click", async () => {
        const formId = empIdInput.value.trim();
        const searchId = document.getElementById("search-employee").value.trim();

        if (!formId && !searchId) {
            successMessage.textContent = "Enter an Employee ID to delete";
            successMessage.style.color = "red";
            successMessage.style.opacity = 1;
            setTimeout(() => { successMessage.style.opacity = 0; }, 4000);
            return;
        }

        if (!formId && searchId) {
            successMessage.textContent = "Please search first, then select the employee before deleting";
            successMessage.style.color = "red";
            successMessage.style.opacity = 1;
            setTimeout(() => { successMessage.style.opacity = 0; }, 4000);
            return;
        }

        try {
            const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/employees/${formId}`, {
                method: "DELETE",
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Delete failed");

            successMessage.textContent = "Employee deleted successfully!";
            successMessage.style.color = "green";
            successMessage.style.opacity = 1;

            setTimeout(() => {
                successMessage.style.opacity = 0;
            }, 3000);

            form.reset();
        } catch (err) {
            successMessage.textContent = err.message;
            successMessage.style.color = "red";
            successMessage.style.opacity = 1;

            setTimeout(() => {
                successMessage.style.opacity = 0;
            }, 4000);
        }
    });
});