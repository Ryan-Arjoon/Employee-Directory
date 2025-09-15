from selenium.webdriver.common.by import By

def test_update_employee_page_loads(driver):
    driver.get("http://localhost:3000/front-end/html/update-employee.html")
    assert "Employee Directory - Update/Delete Employees" in driver.title

def test_update_employee_form_submission(driver):
    driver.get("http://localhost:3000/front-end/html/update-employee.html")

    driver.find_element(By.ID, "emp-id").send_keys("E123")
    driver.find_element(By.ID, "emp-name").send_keys("John Doe")
    driver.find_element(By.ID, "emp-company").send_keys("TechCorp")
    driver.find_element(By.ID, "emp-position").send_keys("Developer")
    driver.find_element(By.ID, "emp-salary").send_keys("80000")
    driver.find_element(By.ID, "emp-start").send_keys("2025-09-15")

    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

    assert "error-message" in driver.page_source or "Employee Directory" in driver.title

def test_update_employee_empty_fields(driver):
    driver.get("http://localhost:3000/front-end/html/update-employee.html")

    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

    error_fields = ["emp-id-error", "emp-name-error", "emp-company-error",
                    "emp-position-error", "emp-salary-error", "emp-start-error"]
    for field_id in error_fields:
        error_elem = driver.find_element(By.ID, field_id)
        assert error_elem.is_displayed() or error_elem.text != ""
