const loginFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  // Send the username and password to the server
  if (username && password) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      alert("Login Successful!");
      document.location.replace("/");
    } else {
      let res = await response.json();
      alert(JSON.stringify(res));
    }
  }
};

// add event listener to login button
document.querySelector("#loginBtn").addEventListener("click", loginFormHandler);
