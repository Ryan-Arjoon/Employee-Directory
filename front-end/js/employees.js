document.addEventListener("DOMContentLoaded", async function () {
    const tableBody = document.querySelector("#employee-table tbody");


    const token = localStorage.getItem("token");

    if (!token) {
        alert("Not authenticated. Please log in first.");
        window.location.href = "../index.html"; 
        return;
    }

    try {

        const res = await fetch("http://localhost:5000/api/employees", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch employees");
        }

        const employees = await res.json();

        tableBody.innerHTML = "";

        employees.forEach(emp => {
            const row = `
                <tr>
                    <td>${emp.employeeId}</td>
                    <td>${emp.name}</td>
                    <td>${emp.company}</td>
                    <td>${emp.position}</td>
                    <td>${emp.salary}</td>
                    <td>${new Date(emp.startDate).toISOString().split("T")[0]}</td>
                </tr>
            `;
            tableBody.insertAdjacentHTML("beforeend", row);
        });

    } catch (err) {
        console.error(err);
        alert("Error loading employees.");
    }
});