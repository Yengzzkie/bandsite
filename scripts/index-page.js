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

// error and success modal
function fireModal(message, error) {
  const modal = document.querySelector('.modal')
  const modalText = document.querySelector('.modal__text')
  const closeModalBtn = document.querySelector('.modal__btn-close')
  modalText.textContent = message;

  if (!error) {
    modal.classList.add('success')
  }

  modal.showModal();
  setTimeout(() => {
    modal.close();
    modal.classList.remove('success')
  }, 2500)

  const closeHandler = () => {
    modal.close()
    modal.classList.remove('success');
    closeModalBtn.removeEventListener('click', closeHandler)
  }
  closeModalBtn.addEventListener('click', closeHandler);
}

// click listener that will fire the addNewComment function
const submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addNewComment(e);
});

// object constructor for new comment
function Comment(name, comment, date) {
  this.name = name,
  this.comment = comment,
  this.created_at = date
}

// add new comment to the comment array
function addNewComment(e) {
    e.preventDefault();

    const nameInput = document.getElementById('input-name');
    const commentInput = document.getElementById('input-comment');
    const commentDate = new Date().toLocaleDateString({ year: "numeric", date: "2-digit", month: "2-digit" })
    const newComment = new Comment(nameInput.value, commentInput.value, commentDate)
  // console.log(newComment)
    if (nameInput.value.trim() === "" || commentInput.value.trim() === "") {
      return fireModal("Missing input field. Fields cannot be empty", true)
    }

    COMMENTS.unshift(newComment); // I could use push instead and sort the date to descending to
    fireModal("Comment submitted!", false)
    // make sure the new comment appears on top, but unshift is simpler and lesser code to write :)
    
    // clear the input fields after submission of the input values
    nameInput.value = "";
    commentInput.value = "";
    
    // rerender the comments array to reflect the newly added comment
    renderComments();
}

// render the comments
function renderComments() {
    const commentListContainer = document.querySelector(".comments")
    commentListContainer.innerHTML = ""; // clear the content of 'ul' elements to prevent duplication
    // of submitted inputs

    //function to get the difference between posted dates and current date
    function getDayDifference(date1, date2) {
      const timestamp1 = new Date(date1).getTime();
      const timestamp2 = new Date(date2).getTime();
    
      const diffInMilliseconds = Math.abs(timestamp1 - timestamp2);

      return Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    }
    

    COMMENTS.forEach((comment) => {
        const commentItem = document.createElement('li')
        const avatar = document.createElement('img')
        const nameEl = document.createElement('p')
        const dateEl = document.createElement('p')
        const commentEl = document.createElement('p')
        const content = document.createElement('div');
        const nameDateWrapper = document.createElement('div')
        const divider = document.createElement('hr')
        const post_date_range =  document.createElement('p')
        const dateDifference = getDayDifference(new Date(), new Date(comment.created_at));
        //setting multiple conditions to display the date difference in days or years,
        //if the date difference is 0, it will display "just now"
        //if the date difference is greater than 365 days, it will display the year difference
        //if the date difference is less than 365 days, it will display the day difference
        const postedDaysAgo = dateDifference === 0 ? "just now" : dateDifference > 365 ? `${Math.round(dateDifference / 365)} year ago` : `${dateDifference} days ago`;

        console.log(postedDaysAgo)

        // add the predefined classes to add styling to the elements
        commentItem.classList.add('comments__item')
        avatar.classList.add('avatar')
        content.classList.add('comments__data-wrapper')
        nameDateWrapper.classList.add('comments__item--header')
        nameEl.classList.add('comments__item-name')
        dateEl.classList.add('comments__item-date')
        post_date_range.classList.add('comments__item-date-range')
        commentEl.classList.add('comments__item-text')
        
        // I added random avatar generator to add some vibrancy :)
        avatar.src = `https://ui-avatars.com/api/?name=${comment.name}&background=random`;
        nameEl.textContent = comment.name;
        dateEl.textContent = comment.created_at;
        commentEl.textContent = comment.comment;
        post_date_range.textContent = `posted ${postedDaysAgo}`;

        nameDateWrapper.append(nameEl, dateEl)
        content.append(nameDateWrapper, commentEl, post_date_range)
        commentItem.append(avatar, content)
        commentListContainer.append(commentItem, divider)
    })
}

// initialize the dummy comments
renderComments();