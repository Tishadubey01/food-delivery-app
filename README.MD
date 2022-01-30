# Food-delivery-app

Web application based on MERN stack - MongoDB, Express.js, React.js, and Node.js.
 
 ## How to run
 In one terminal, run the backend
 ```less
cd backend
npm install
npm start
```

In another terminal, run the frontend

```less
cd frontend
npm install
npm start

## TECHNOLOGIES USED

For this assignment, you are required to make a web app with:

- Frontend in React.js
- Backend using Express.js which implements a REST API
- Database in MongoDB

## USE CASES

### 1. USER MANAGEMENT

There are two types of users - Vendors and Customers. Each of them have their own use-cases

### 1.1. LOGIN PAGE

It has an option to enter the username and password, and then login. There is also an option to register in case the user does not have an existing account.

#### 1.2. REGISTRATION PAGE

During registration, there would be the option to select between customer and vendor type. Here the user enters his full name, email address, phone number, address etc etc.

### 2. VENDOR USE CASES

#### 2.1. CREATE NEW PRODUCT

Create a new product specifying its Name, Price, and Quantity in the Bundle

#### 2.2. VIEW ALL PRODUCTS ISSUED BY HIM/HER

Should be able to view all the current product listing done by him/her

- There should be an option to take down a listing making sure that customers get their product status as canceled.
- Once the product is ready to dispatch (i.e. when it has been ordered bysufficient people), it is removed from this view and becomes ready todispatch.

### 3. CUSTOMER USE CASES

#### 3.1. SEARCH FOR PRODUCT

- Exact string matching would do
- All the vendors selling that product should be displayed along with their price and quantity remaining