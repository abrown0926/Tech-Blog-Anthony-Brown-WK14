const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-entry").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-entry").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/user/registerUser", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      let res = await response.json();
      alert("Failed to register!");
      // alert(JSON.stringify(res));
    }
  }
};

document
  .querySelector("#registerBtn")
  .addEventListener("click", signupFormHandler);
