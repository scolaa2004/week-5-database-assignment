//establishing connection
const mysql = require("mysql2");
const dotenv = require("dotenv").config();

//create connection to db
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL Successfully");
});

//creating database named track_my_expenses
db.query(`CREATE DATABASE IF NOT EXISTS track_my_expenses`, (err, result) => {
  if (err) {
    console.error("Error creating database track_my_expenses:", err);
    return;
  }
  console.log("DB track_my_expenses created successfully");
});

// Use database
db.changeUser({ database: "track_my_expenses" }, (err) => {
  if (err) {
    console.error("Error changing to track_my_expenses database:", err);
    return;
  }
  console.log("track_my_expenses database is now in use");

  //creating users table
  const usersTable = `CREATE TABLE IF NOT EXISTS Users(
 user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;

  //creating categories table
  const categoriesTable = `CREATE TABLE IF NOT EXISTS Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
)`;

  //creating expenses table
  const expensesTable = `CREATE TABLE IF NOT EXISTS Expenses (
    expense_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
)`;

  //create payments method
  const paymentsMethod = `CREATE TABLE IF NOT EXISTS Payment_Methods (
    payment_method_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    payment_method_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
)`;

  //create budgets table
  const budgetsTable = `CREATE TABLE IF NOT EXISTS Budgets (
    budget_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
)`;
  // Execute table creation queries
  db.query(usersTable, (err, result) => {
    if (err) {
      console.error("Error creating Users table:", err);
    } else {
      console.log("Users table created successfully.");
    }
  });

  db.query(categoriesTable, (err, result) => {
    if (err) {
      console.error("Error creating Categories table:", err);
    } else {
      console.log("Categories table created successfully.");
    }
  });

  db.query(expensesTable, (err, result) => {
    if (err) {
      console.error("Error creating Expenses table:", err);
    } else {
      console.log("Expenses table created successfully.");
    }
  });

  db.query(paymentsMethod, (err, result) => {
    if (err) {
      console.error("Error creating Payment_Methods table:", err);
    } else {
      console.log("Payment_Methods table created successfully.");
    }
  });

  db.query(budgetsTable, (err, result) => {
    if (err) {
      console.error("Error creating Budgets table:", err);
    } else {
      console.log("Budgets table created successfully.");
    }
  });
});
