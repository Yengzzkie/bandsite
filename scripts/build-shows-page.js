// initialize Bandsite API
const bandSiteApi = new BandSiteApi("4429303f-1a46-570e-be9e-afa17c941d8");

// fetch the shows data
async function fetchShowsData() {
  try {
    const response = await bandSiteApi.getShows();
    return response?.data;
  } catch (error) {
    console.error("Failed fetching Shows data:", error);
    throw error;
  }
}

async function renderTickets() {
  const ticketContainer = document.querySelector(".tickets__container");
  // assign it to TICKETS variable
  const TICKETS = await fetchShowsData();

  TICKETS.forEach((ticket) => {
    // CREATE ELEMENTS
    const ticketWrapper = document.createElement("div");
    //date object
    const date = document.createElement("p");
    const dateLabel = document.createElement("p");
    const dateObj = document.createElement("div");
    //venue object
    const venue = document.createElement("p");
    const venueLabel = document.createElement("p");
    const venueObj = document.createElement("div");
    //location object
    const location = document.createElement("p");
    const locationLabel = document.createElement("p");
    const locationObj = document.createElement("div");
    //buy button
    const buyBtn = document.createElement("button");
    //line divider
    const divider = document.createElement("hr");

    // ADD TEXT CONTENTS
    dateLabel.textContent = "DATE";
    date.textContent = new Date(ticket.date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      weekday: "short",
    });

    venueLabel.textContent = "VENUE";
    venue.textContent = ticket.place;

    locationLabel.textContent = "LOCATION";
    location.textContent = ticket.location;

    buyBtn.textContent = "BUY TICKETS";

    // ADD CLASSES
    ticketWrapper.classList.add("ticket__wrapper");
    dateLabel.classList.add("label");
    venueLabel.classList.add("label");
    locationLabel.classList.add("label");
    date.classList.add("ticket__date");
    venue.classList.add("ticket__venue");
    location.classList.add("ticket__location");
    buyBtn.classList.add("buy-btn");
    dateObj.classList.add("ticket__wrapper-child");
    venueObj.classList.add("ticket__wrapper-child");
    locationObj.classList.add("ticket__wrapper-child");

    // APPEND CHILDREN
    dateObj.append(dateLabel, date);
    venueObj.append(venueLabel, venue);
    locationObj.append(locationLabel, location);
    ticketWrapper.append(dateObj, venueObj, locationObj, buyBtn);
    ticketContainer.append(ticketWrapper, divider);
  });
}

renderTickets();
