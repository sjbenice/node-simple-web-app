## TASK
Create a simple webApp using Node.js (Express, JavaScript), PostgresQL (Sequelize ORM).
When running, the application must create a “users” table in the database using migration and add one user account to it, which will have only one “balance” field with a value of 10000. The “Umzug” library can be used to perform application-driven migrations.
Write a route to update the user’s balance, both up and down, accepting the userId and amount parameters.
An important condition is that the user’s balance cannot be negative.
The balance must be changed in real time, without using queues and deferred tasks.

This task will be tested by sending 10,000 requests at one time to try to withdraw 2 units from the user’s balance. 5000 requests should be processed successfully, the second half of them should receive an adequate error that there are insufficient funds on the balance.

## SETUP
npm init -y
npm install express sequelize pg pg-hstore umzug
npm install --save-dev supertest
npm install --save-dev jest

mkdir src
mkdir src/models
mkdir src/migrations
mkdir src/config
mkdir test

# DB setup
create databases and setup ./src/config/database.js

# TEST
npm test

# RUN
npm start