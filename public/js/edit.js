const postId = document.querySelector('input[name="post-id"]').value;
console.log("testing");
console.log(postId);

const editFormHandler = async (event) => {
  event.preventDefault();

  const postName = document.querySelector('input[name="post-name"]').value;
  const postContent = document.querySelector(
    'textarea[name="post-body"]'
  ).value;

  console.log(postName);
  console.log(postContent);

  const response = await fetch(`/api/postRoutes/${postId}`, {
    method: "PUT",
    body: JSON.stringify({
      postName,
      postContent,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response);
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Post not updated!");
  }
  document.location.replace("/dashboard");
};

const deleteClickHandler = async () => {
  await fetch(`/api/postRoutes/${postId}`, {
    method: "DELETE",
  });

  document.location.replace("/dashboard");
};

document
  .querySelector("#edit-post-form")
  .addEventListener("submit", editFormHandler);
document
  .querySelector("#delete-btn")
  .addEventListener("click", deleteClickHandler);
