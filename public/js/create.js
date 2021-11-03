const createFormHandler = async function (event) {
  event.preventDefault();

  const postName = document.querySelector('input[name="post-title"]').value;
  const postContent = document.querySelector(
    'textarea[name="post-body"]'
  ).value;

  console.log(postName);
  console.log(postContent);

  await fetch(`/api/postRoutes`, {
    method: "POST",
    body: JSON.stringify({
      postName,
      postContent,
    }),
    headers: { "Content-Type": "application/json" },
  });
};

document
  .querySelector("#new-post-form")
  .addEventListener("submit", createFormHandler);
