# Uptime-monitoring-RESTful-API-server

## Used technologies
* Nodejs
* Express
* MongoDB (ORM : mongoose)
* JWT
* Mocha chai
* Postman

## setup
1. run `npm install`
2. change the name of ".envExample" to ".env"
3. after the previous step, change the variables to be suitable with your machine and add your credentials.
(It's recommended to keep the JWT_KEY = "KEY", this will help while testing)


## Useful scripts
1. run `npm run start` : to run in the dev mode
2. run `npm run test` : to run the unit tests.

## Useful tips:
1. you can test the app using the provided postman document.
2. you can enable the authorization button in the headers to test the api.


### NOTES and Assumptions
1. Some of the test cases and functionalities are NOT covered in the unit tests.
2. I used NOSQL database to this project since we are going to handle large data like Logs and reports, and there are a lot of operations in real-time.
