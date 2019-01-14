# Shopify-Backend-Challenge-2019
Production engineering challenge for Shopify summer 2019 internship position

Version:
--------

Program was tested on:
- Linux Ubuntu 16.04 with node v6.12.3
- Windows 10 with node v8.9.4

Install:
--------

Ensure you have npm and Node.js installed from here https://www.npmjs.com/get-npm
Mongodb is also required from here https://www.mongodb.com/download-center/community

Open the 'backend challenge' directory in the console/terminal and type 'npm install' to install all the
dependancies for this program to work.

Launch:
--------

Make sure you are running mongod.exe before testing.

After you downloaded the zip, extract the contents of the file into a
folder and open up your console/terminal within that directory and
run the 'populate-for-startup.js' file inside the seed directory to populate the mongodb database.
You can basically run the file with below command (after locating in the terminal)

Execute mongod.exe through console or navigating to directory of C:\Program Files\MongoDB\Server\3.6\bin

Type node populate-for-startup.js into a seperate instance of console/terminal

Then open a 3rd instance of console/terminal and follow the instructions below under 'Testing'

So in total you should have 3 instances of your console/terminal running (in this order), first one for the mongod.exe, second one for populating the database, third one for the app.js (server).


Testing:
--------

- Run the application
In the application folder execute:

npm start 

then you can access from localhost at http://localhost:3000

- Login to the app using the dummy user for project:
username : admin@admin.com
password : admin

- Important
Before starting application please make sure your mongo database runs and you populate the server with the populate-for-startup.js script located in the /seeds directory.

-  Features
Add product
Delete product
Update product
Buy item
Shopping cart
Order history
Multiple search with comma => itemName,ItemName2
Filters

Purchase with PayPal
add to order history
