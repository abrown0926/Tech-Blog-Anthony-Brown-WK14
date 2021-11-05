const handleDeletePost = async (event) => {
  event.preventDefault();

  const id = document
    .querySelector("[data-postID]")
    .getAttribute("data-postID");

  const response = await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/");
    alert("Post deleted!");
  }
};

document
  .querySelector("#deletePost")
  .addEventListener("click", handleDeletePost);
