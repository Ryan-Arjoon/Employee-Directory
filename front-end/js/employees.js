document.addEventListener("DOMContentLoaded", async function () {
    const tableBody = document.querySelector("#employee-table tbody");
    const searchInput = document.querySelector("#search");
    const searchButton = document.querySelector(".btn");

    let employees = [];
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Not authenticated. Please log in first.");
        window.location.href = "../index.html"; 
        return;
    }

    try {
        const res = await fetch(`${window.CONFIG.API_URL}/api/employees`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch employees");
        }

        employees = await res.json();
        renderEmployees(employees);

    } catch (err) {
        console.error(err);
        alert("Error loading employees.");
    }

    function renderEmployees(data) {
        tableBody.innerHTML = "";
        data.forEach(emp => {
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
    }

    function handleSearch() {
        const query = searchInput.value.toLowerCase().trim();
        if (query === "") {
            renderEmployees(employees);
            return;
        }

        const filtered = employees.filter(emp => 
            emp.name.toLowerCase().includes(query) || 
            emp.employeeId.toString().includes(query)
        );
        renderEmployees(filtered);
    }

    searchButton.addEventListener("click", handleSearch);
    searchInput.addEventListener("keyup", handleSearch); 
});
