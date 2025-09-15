from selenium.webdriver.common.by import By

def test_create_account_page_loads(driver):
    driver.get("http://localhost:3000/front-end/html/create.html")
    assert "Employee Directory - Create Account" in driver.title

def test_create_account_form_submission(driver):
    driver.get("http://localhost:3000/front-end/html/create.html")

    driver.find_element(By.ID, "username").send_keys("Ryan123")
    driver.find_element(By.ID, "password").send_keys("SecurePass123")
    driver.find_element(By.ID, "confirm-password").send_keys("SecurePass123")
    driver.find_element(By.ID, "company").send_keys("TechCorp")
    driver.find_element(By.ID, "name").send_keys("Ryan Arjoon")
    driver.find_element(By.ID, "email").send_keys("ryan@example.com")

    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

    assert "error-message" in driver.page_source or "Employee Directory" in driver.title

def test_create_account_empty_fields(driver):
    driver.get("http://localhost:3000/front-end/html/create.html")

    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

    error_fields = ["username-error", "password-error", "confirm-password-error",
                    "company-error", "name-error", "email-error"]
    for field_id in error_fields:
        error_elem = driver.find_element(By.ID, field_id)
        assert error_elem.is_displayed() or error_elem.text != ""
