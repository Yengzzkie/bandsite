const bandSiteApi = new BandSiteApi("4429303f-1a46-570e-be9e-afa17c941d8");

async function fetchComments() {
  try {
    const response = await bandSiteApi.getComments();
    return response?.data.sort((a, b) => b.timestamp - a.timestamp); // sort comments from newest to latest
  } catch (error) {
    console.error("Failed fetching comments:", error);
    throw error;
  }
}

//////////////////// ERROR AND SUCCESS MODAL //////////////////////////
function fireModal(message, error) {
  const modal = document.querySelector(".modal");
  const modalText = document.querySelector(".modal__text");
  const closeModalBtn = document.querySelector(".modal__btn-close");
  modalText.textContent = message;

  if (!error) {
    modal.classList.add("success");
  }

  modal.showModal();
  setTimeout(() => {
    modal.close();
    modal.classList.remove("success");
  }, 2500);

  const closeHandler = () => {
    modal.close();
    modal.classList.remove("success");
    closeModalBtn.removeEventListener("click", closeHandler);
  };
  closeModalBtn.addEventListener("click", closeHandler);
}

// submit listener that will call the addNewComment function
const form = document.getElementById("comment-form");
form.addEventListener("submit", addNewComment);

//////////////////// ADD NEW COMMENT FUNCTION //////////////////////////
// add new comment to the comment array
async function addNewComment(e) {
  e.preventDefault();

  const nameInput = document.getElementById("input-name");
  const commentInput = document.getElementById("input-comment");

  if (nameInput.value.trim() === "" || commentInput.value.trim() === "") {
    return fireModal("Missing input field. Fields cannot be empty", true);
  }

  try {
      await bandSiteApi.postComment(
      nameInput.value,
      commentInput.value
    ); // send the data to the backend

    fireModal("Comment submitted!", false); // call the success modal
    form.reset(); // clear the form after submission

    // rerender the comments array to reflect the newly added comment
    renderComments();
  } catch (error) {
    console.error("Failed sending post data:", error);
    throw error;
  }
}

//////////////////// DELETE COMMENTS //////////////////////////
async function deleteComment(commentId, commentName) {
  try {
    const response = await bandSiteApi.deleteComment(commentId);
    return response;
  } catch (error) {
    console.error("Failed to delete post:", error);
    throw error;
  } finally {
    renderComments(); // rerender comments after successfull deletion of comment
    fireModal(`Comment from ${commentName} successfully deleted`, false)
  }
}

//////////////////// COMMENTS GETTER //////////////////////////
async function renderComments() {
  const commentListContainer = document.querySelector(".comments");
  commentListContainer.innerHTML = ""; // clear the content of 'ul' elements to prevent duplication
  // of submitted inputs

  const COMMENTS = await fetchComments(); // fetch the comments

  //function to get the difference between posted dates and current date, this is just for 'Diving Deeper' section
  function getDayDifference(date1, date2) {
    const timestamp1 = new Date(date1).getTime();
    const timestamp2 = new Date(date2).getTime();
    const diffInMilliseconds = Math.abs(timestamp1 - timestamp2);

    return Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  }

  COMMENTS.forEach((comment) => {
    const commentItem = document.createElement("li");
    const avatar = document.createElement("img");
    const nameEl = document.createElement("p");
    const dateEl = document.createElement("p");
    const commentEl = document.createElement("p");
    const content = document.createElement("div");
    const nameDateWrapper = document.createElement("div");
    const divider = document.createElement("hr");
    const post_date_range = document.createElement("p");
    const deleteBtn = document.createElement("img");

    // event listener for delete button
    deleteBtn.addEventListener("click", () => {
      deleteComment(comment.id, comment.name)
    });

    const dateDifference = getDayDifference(
      new Date(),
      new Date(comment.timestamp)
    );
    //setting multiple conditions to display the date difference in days or years,
    //if the date difference is 0, display "just now"
    //if the date difference is greater than 365 days, display the year difference
    //if the date difference is less than 365 days, it will display the day difference
    const postedDaysAgo =
      dateDifference === 0
        ? "just now"
        : dateDifference > 365
        ? `${Math.round(dateDifference / 365)} years ago`
        : `${dateDifference} days ago`;

    // add the predefined classes to add styling to the elements
    commentItem.classList.add("comments__item");
    avatar.classList.add("avatar");
    content.classList.add("comments__data-wrapper");
    nameDateWrapper.classList.add("comments__item--header");
    nameEl.classList.add("comments__item-name");
    dateEl.classList.add("comments__item-date");
    post_date_range.classList.add("comments__item-date-range");
    commentEl.classList.add("comments__item-text");
    deleteBtn.classList.add("comments__deleteBtn");

    // I added random avatar generator to add some vibrancy :)
    avatar.src = `https://api.dicebear.com/9.x/avataaars/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=${comment.name}`;
    nameEl.textContent = comment.name;
    dateEl.textContent = new Date(comment.timestamp).toLocaleDateString();
    commentEl.textContent = comment.comment;
    post_date_range.textContent = `posted ${postedDaysAgo}`;
    deleteBtn.src = "../assets/icons/bin.png"

    // append elements
    nameDateWrapper.append(nameEl, dateEl);
    content.append(nameDateWrapper, commentEl, post_date_range, deleteBtn);
    commentItem.append(avatar, content);
    commentListContainer.append(commentItem, divider);
  });
}

// initialize the dummy comments
renderComments();
