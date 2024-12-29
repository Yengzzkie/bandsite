const TICKETS = [
  {
    date: new Date("09/09/2024").toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      weekday: "short",
    }),
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: new Date("09/17/2024").toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      weekday: "short",
    }),
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: new Date("10/12/2024").toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      weekday: "short",
    }),
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: new Date("11/16/2024").toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      weekday: "short",
    }),
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: new Date("11/29/2024").toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      weekday: "short",
    }),
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: new Date("12/18/2024").toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      weekday: "short",
    }),
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];

console.log(TICKETS);

function renderTickets() {
  const ticketContainer = document.querySelector(".tickets__container");

  TICKETS.forEach((ticket) => {
    // create elements
    const ticketWrapper = document.createElement("div");
    const date = document.createElement("p");
    const dateLabel = document.createElement("p");
    const dateObj = document.createElement("div");
    const venue = document.createElement("p");
    const venueLabel = document.createElement("p");
    const venueObj = document.createElement("div");
    const location = document.createElement("p");
    const locationLabel = document.createElement("p");
    const locationObj = document.createElement("div");
    const buyBtn = document.createElement("button");
    const divider = document.createElement("hr");

    // add text contents
    dateLabel.textContent = "DATE";
    date.textContent = ticket.date;

    venueLabel.textContent = "VENUE";
    venue.textContent = ticket.venue;
    console.log(ticket.venue);

    locationLabel.textContent = "LOCATION";
    location.textContent = ticket.location;

    buyBtn.textContent = "BUY TICKETS";

    // add classes
    ticketWrapper.classList.add("ticket__wrapper");
    dateLabel.classList.add("label");
    venueLabel.classList.add("label");
    locationLabel.classList.add("label");
    date.classList.add("ticket__date");
    venue.classList.add("ticket__venue");
    location.classList.add("ticket__location");
    buyBtn.classList.add("buy-btn");

    // append children
    dateObj.append(dateLabel, date);
    venueObj.append(venueLabel, venue);
    locationObj.append(locationLabel, location);
    ticketWrapper.append(dateObj, venueObj, locationObj, buyBtn);
    ticketContainer.append(ticketWrapper, divider);
  });
}

renderTickets();
