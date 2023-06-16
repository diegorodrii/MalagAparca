from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from selenium.webdriver.common.keys import Keys

# Ruta al controlador WebDriver (ejemplo para Chrome)
driver_path = r'C:\Users\Beep Informatica\Desktop\chromedriver.exe'

# Configurar opciones del navegador (opcional)
options = webdriver.ChromeOptions()

# Inicializar el controlador WebDriver
driver = webdriver.Chrome(options=options)
driver._executable_path = driver_path

driver.get("http://localhost:8100/login")
time.sleep(2)

# Rellenar el formulario de inicio de sesión
email_input = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.XPATH, '//ion-input[@formcontrolname="identifier"]/input'))
)
time.sleep(2)

password_input = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.XPATH, '//ion-input[@formcontrolname="password"]/input'))
)

email_input.send_keys("manuel@gmail.com")
password_input.send_keys("Diego1234")
time.sleep(2)

# Enviar el formulario de inicio de sesión
login_form = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.TAG_NAME, 'form'))
)
login_form.submit()

time.sleep(2)

my_places_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, 'ion-button[name="my-places-button"]'))
)
my_places_button.click()

time.sleep(2)

# Hacer clic en el botón "Create a Park" con el número 77
create_park_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, 'ion-icon[name="add"]'))
)
create_park_button.click()

time.sleep(2)


number_input = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.XPATH, '//ion-input[@formcontrolname="number"]/input'))
)
number_input.send_keys(77)

time.sleep(2)


# Hacer clic en el botón para crear la plaza
create_place_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, 'ion-button[name="add"]'))
)
create_place_button.click()

time.sleep(2)

# Hacer clic en el botón "volver atrás"

back_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, 'ion-back-button[name="back-button"]'))
)
back_button.click()
time.sleep(2)


# Hacer clic en el botón "parking-button"
parking_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, 'ion-button[name="parking-button"]'))
)
parking_button.click()
time.sleep(2)
# Esperar a que el botón sea visible y clicleable
assign_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, 'ion-button.assign-action'))
)

# Hacer clic en el botón
assign_button.click()
time.sleep(2)

# Esperar a que el elemento span sea clicleable
accept_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, '//span[contains(text(), "Aceptar")]'))
)

# Hacer clic en el elemento span
accept_button.click()

time.sleep(2)
# Hacer clic en el botón "volver atrás"

back_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, 'ion-back-button[name="back-button"]'))
)
back_button.click()
time.sleep(2)

# Esperar a que el botón sea visible y clicleable
my_profile_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, 'ion-button[name="my-profile-button"]'))
)

# Hacer clic en el botón
my_profile_button.click()
time.sleep(2)

time.sleep(2)
delete_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, 'ion-button[name="delete"]'))
)

# Hacer clic en el botón
delete_button.click()
time.sleep(2)
# Esperar a que el elemento span sea clicleable
accept_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, '//span[contains(text(), "Eliminar")]'))
)

# Hacer clic en el elemento span
accept_button.click()

time.sleep(2)

# Cerrar el navegador
driver.quit()
