const updatePost = async (event) => {
  // Stop the browser from submitting the form so can be done with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const id = document.querySelector("#disabled-text").value.trim();
  const title = document.querySelector("#title-entry").value.trim();
  const content = document.querySelector("#content-entry").value.trim();
  const username = document.querySelector("#username-entry").value.trim();

  if (id && title && content && username) {
    // Send the id, title, content, and username to the server
    // // const response = await fetch(`/api/user/${username}`, {
    //   method: "POST",
    //   body: JSON.stringify({ id, title, content, username }),
    //   headers: { "Content-Type": "application/json" },
    // });

    // if (response.ok) {
    //   const userData = await response.json();

    //   const user_id = userData.id;

    // Update post
    const putResponse = await fetch(`/api/post/${id}`, {
      method: "PUT",
      body: JSON.stringify({ id, title, content, user_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (putResponse.ok) {
      document.location.replace(`/post/${id}`);
    }
  } else {
    alert("Failed to enter correct username.");
  }
};

document.querySelector("#editPostBtn").addEventListener("click", updatePost);
