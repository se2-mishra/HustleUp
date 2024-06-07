<?php

// Check if the form is submitted using POST method
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  // Get username and password from the form
  $username = $_POST['username'];
  $password = $_POST['password'];

  // Validate and sanitize user input (important for security)

  // Connect to your database (replace with your connection details)
  $conn = new mysqli("localhost", "your_username", "your_password", "your_database");

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  // Create a prepared statement to prevent SQL injection (important for security)
  $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
  $stmt->bind_param("ss", $username, $hashed_password); // Hash password before storing in database

  // Execute the prepared statement
  $stmt->execute();

  $result = $stmt->get_result();

  if ($result->num_rows > 0) {
    // Login successful (redirect to a welcome page or dashboard)
  } else {
    // Login failed (display an error message)
  }

  $conn->close();
} else {
  // The form is not submitted yet (display the login form)
}

?>
