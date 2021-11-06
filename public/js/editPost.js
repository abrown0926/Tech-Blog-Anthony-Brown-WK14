const updatePost = async (event) => {
  // Stop the browser from submitting the form so can be done with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const id = document.querySelector("#disabled-text").value.trim();
  const title = document.querySelector("#title-entry").value.trim();
  const content = document.querySelector("#content-entry").value.trim();
  const username = document.querySelector("#username-entry").value.trim();
  const user_id = document.querySelector("#userID").value.trim();

  if (id && title && content && username) {
    // Update post
    const putResponse = await fetch(`/api/post/${id}`, {
      method: "PUT",
      body: JSON.stringify({ id, title, content, user_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (putResponse.ok) {
      console.log(putResponse);
      document.location.replace(`/post/${id}`);
    }
  } else {
    alert("Failed to enter correct username.");
  }
};

document.querySelector("#editPostBtn").addEventListener("click", updatePost);
