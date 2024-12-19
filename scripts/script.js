console.log("Hello, world");

const DUMMY_COMMENTS = [
  {
    id: 1,
    firstName: "Victor",
    lastName: "Pinto",
    comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    created_at: new Date("11/02/2023").toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  },
  {
    id: 2,
    firstName: "Christina",
    lastName: "Cabrera",
    comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
    created_at: new Date("10/28/2023").toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  },
  {
    id: 3,
    firstName: "Isaac",
    lastName: "Tadesse",
    comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    created_at: new Date("10/20/2023").toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  },
];




const comments = DUMMY_COMMENTS.map((comment) => {
  console.log(comment);
});
