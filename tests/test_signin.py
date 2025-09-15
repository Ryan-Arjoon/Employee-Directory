from selenium.webdriver.common.by import By

def test_signin_page_loads(driver):
    driver.get("http://localhost:3000/front-end/html/signin.html")
    assert "Employee Directory - Signin" in driver.title

def test_signin_form_submission(driver):
    driver.get("http://localhost:3000/front-end/html/signin.html")

    driver.find_element(By.ID, "username").send_keys("testuser")
    driver.find_element(By.ID, "password").send_keys("secret")

    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

    assert "Dashboard" in driver.page_source or "error-message" in driver.page_source