const updateBlogPost = async (event) => {
  /**
   * Handles updating blog post
   */

  event.preventDefault();

  //collects needed information from front end
  const id = document.querySelector("#disabled-text").value.trim();
  const title = document.querySelector("#title-entry").value.trim();
  const content = document.querySelector("#content-entry").value.trim();
  const username = document.querySelector("#username-entry").value.trim();

  // use username to get user_id from database
  if (id && title && content && username) {
    // send GET request for data about username
    const response = await fetch(`/api/user/${username}`);

    if (response.ok) {
      const userData = await response.json();
      // What we really need is the userData.id to later use in PUT request
      const user_id = userData.id;

      // make PUT request to update blog post
      const putResponse = await fetch(`/api/blogpost/${user_id}`, {
        method: "PUT",
        body: JSON.stringify({ id, title, content, user_id }),
        headers: { "Content-Type": "application/json" },
      });

      if (putResponse.ok) {
        //if successful, redirect browser to homepage
        document.location.replace(`/post/${user_id}`);
      }
    }
  } else {
    alert("Must enter all values plus valid username");
  }
};

// add event listener to submit button
document
  .querySelector("#editPostBtn")
  .addEventListener("click", updateBlogPost);
