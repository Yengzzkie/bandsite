const COMMENTS = [
  {
    id: 1,
    name: "Victor Pinto",
    comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    created_at: new Date("11/02/2023").toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  },
  {
    id: 2,
    name: "Christina Cabrera",
    comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
    created_at: new Date("10/28/2023").toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  },
  {
    id: 3,
    name: "Isaac Tadesse",
    comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    created_at: new Date("10/20/2023").toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  },
];


// click listener that will fire the addNewComment function
const submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addNewComment(e);
});

// add new comment to the comment array
function addNewComment(e) {
    e.preventDefault();

    const nameInput = document.getElementById('input-name');
    const commentInput = document.getElementById('input-comment');
    const commentDate = new Date().toLocaleDateString({ year: "numeric", date: "2-digit", month: "2-digit" })

    const newComment = { name: nameInput.value, comment: commentInput.value, created_at: commentDate }

    COMMENTS.unshift(newComment); // I could use push instead and sort the date to descending to
    // make sure the new comment appears on top, but unshift is simpler and lesser code to write :)
    
    // clear the input fields after submission of the input values
    nameInput.value = "";
    commentInput.value = "";
    
    renderComments();
}

// render the comments
function renderComments() {
    const commentListContainer = document.querySelector(".comments")
    commentListContainer.innerHTML = ""; // clear the content of 'ul' elements to prevent duplication
    // of submitted inputs

    COMMENTS.forEach((comment) => {
        const commentItem = document.createElement('li')
        const avatar = document.createElement('img')
        const nameEl = document.createElement('span')
        const dateEl = document.createElement('span')
        const commentEl = document.createElement('p')
        const content = document.createElement('div');
        const nameDateWrapper = document.createElement('div')
        const divider = document.createElement('hr')

        // add the predefined classes to add styling to the elements
        commentItem.classList.add('comments__item')
        avatar.classList.add('avatar')
        nameDateWrapper.classList.add('comments__item--header')
        nameEl.classList.add('comments__item-name')
        dateEl.classList.add('comments__item-date')
        commentEl.classList.add('comments__item-text')

        // I added random avatar generator to add some vibrancy :)
        avatar.src = `https://ui-avatars.com/api/?name=${comment.name}&background=random`;
        nameEl.textContent = comment.name;
        dateEl.textContent = comment.created_at;
        commentEl.textContent = comment.comment

        nameDateWrapper.append(nameEl, dateEl)
        content.append(nameDateWrapper, commentEl)
        commentItem.append(avatar, content)
        commentListContainer.append(commentItem, divider)
    })
}

// initialize the dummy comments
renderComments();