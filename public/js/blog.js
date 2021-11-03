const postId = document.querySelector('input[name="post-id"]').value;

console.log("testing");
console.log(postId);

const blogFormHandler = async (event) => {
  event.preventDefault();

  const blogContent = document.querySelector(
    'textarea[name="blog-body"]'
  ).value;
  console.log(blogContent);

  if (blogContent) {
    const response = await fetch("/api/blogRoutes", {
      method: "POST",
      body: JSON.stringify({
        postId,
        blogContent,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#new-blog-form")
  .addEventListener("submit", blogFormHandler);
