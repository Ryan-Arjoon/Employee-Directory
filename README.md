# Employee-Directory
Currently in Production <br>
Visit Active Site: https://employee-directory-dun.vercel.app

## Usage
Create an account or login
<br>
Create employees or view employees you have created

## Run Frontend Locally Through CLI
Run ```cd front-end``` <br>
Run ```python -m http.server 3000``` <br>
Go to http://localhost:3000

## Run Backend Locally Through CLI
Run ```cd back-end``` <br>
Run ```npm install``` <br>
Run ```nodemon server.js``` (backend running on local host 5000)

## Run Locally with Docker
Run  ```docker-compose up --build``` (Builds Images and Runs Containers) <br>
Or <br>
Run ```docker compose build``` (Builds Images) <br>
Use Docker Desktop or ```docker compose up``` to run the containers <br> 
Access the docker frontend through local  host 8080, connects to backedn local host 5000


## Local Selenium Testing
Run ```pip install -r requirements.txt``` <br>
Run ```pip install --upgrade webdriver-manager``` <br>
Run ```cd front-end``` <br>
Run ```python -m http.server 3000``` <br>
Run ```pytest tests```