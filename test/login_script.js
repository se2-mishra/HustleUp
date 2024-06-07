const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      console.log('Login successful!');
      window.location.href = 'authorized_page.html';
      
    } else {
      const errorData = await response.json();
      alert(errorData.message || 'Invalid username or password.'); 
    }
  } catch (error) {
    console.error('Error logging in:', error);
    alert('An unexpected error occurred. Please try again later.');
  }
});