# Uptime-monitoring-RESTful-API-server
Bosta | Backend | Assessment

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
3. after the previous step, change the variables to be suitable with your machine.


## Useful scripts
1. run `npm run start` : to run in the dev mode
2. run `npm run test` to run the unit tests

## Useful tips:
1. you can test the app using the provided postman document.
2. you can enable authorization button in the headers to test the api.


### NOTES and Assumptions
1. NOT all test cases are covered in the unit tests
2. .env must be in the .ignore file, however I added some of my variables in the ".envExample", since It's an assesment and for easier testing.
3. I assumed that NOSQL database would be suitable to this project since we are going to handle large data like Logs and reports, and there are a lot of operations in real-time.
