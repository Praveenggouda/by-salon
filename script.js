
/*
  B&Y Unisex Salon — Frontend JavaScript
  Features:
  1. Four service categories
  2. Service names and sample prices
  3. WhatsApp booking links
  4. Mobile navigation
  5. Automatic footer year
*/

const SALON = {
  name: "B&Y Unisex Salon",
  whatsappNumber: "918431878531"
};

// DEMO prices only — confirm actual prices with the salon owner.
const serviceCategories = [
  {
    number: "01",
    name: "Hair Studio",
    description:
      "Fresh cuts, beautiful colour and hair care made for you.",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Hair styling in a salon",
    services: [
      { name: "Haircut & Styling", price: 399 },
      { name: "Hair Spa", price: 799 },
      { name: "Hair Colour", price: 1499 }
    ]
  },
  {
    number: "02",
    name: "Skin & Beauty",
    description:
      "A little glow, a little care and a lot of confidence.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Relaxing facial and beauty treatment",
    services: [
      { name: "Classic Facial", price: 999 },
      { name: "Clean-Up", price: 499 },
      { name: "Threading", price: 99 }
    ]
  },
  {
    number: "03",
    name: "Bridal Beauty",
    description:
      "Thoughtful beauty services for your most special days.",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Professional makeup and beauty look",
    services: [
      { name: "Party Makeup", price: 2499 },
      { name: "Bridal Makeup", price: 9999 },
      { name: "Hair Styling", price: 999 }
    ]
  },
  {
    number: "04",
    name: "Nail Art Studio",
    description:
      "Little details that make your personal style shine.",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Manicure and nail art",
    services: [
      { name: "Classic Manicure", price: 499 },
      { name: "Gel Polish", price: 799 },
      { name: "Nail Art", price: 999 }
    ]
  }
];

// Format amounts in Indian Rupees.
function formatPrice(price) {
  return "₹" + price.toLocaleString("en-IN");
}

// Create a WhatsApp link with a prefilled message.
function createWhatsAppUrl(message) {
  const number = SALON.whatsappNumber.replace(/\D/g, "");

  if (!number || number.includes("X")) {
    return "#contact";
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// Create a service category card.
function createServiceCard(category) {
  const card = document.createElement("article");
  card.className = "service-card";

  // Image section
  const imageWrap = document.createElement("div");
  imageWrap.className = "service-image";

  const image = document.createElement("img");
  image.src = category.image;
  image.alt = category.imageAlt;
  image.loading = "lazy";

  const number = document.createElement("span");
  number.className = "service-number";
  number.textContent = category.number;

  imageWrap.append(image, number);

  // Card content
  const content = document.createElement("div");
  content.className = "service-content";

  const title = document.createElement("h3");
  title.textContent = category.name;

  const description = document.createElement("p");
  description.className = "service-description";
  description.textContent = category.description;

  // Services and prices
  const list = document.createElement("ul");
  list.className = "service-list";

  category.services.forEach((service) => {
    const item = document.createElement("li");

    const serviceName = document.createElement("span");
    serviceName.textContent = service.name;

    const price = document.createElement("span");
    price.className = "service-price";
    price.textContent = formatPrice(service.price);

    item.append(serviceName, price);
    list.appendChild(item);
  });

  // WhatsApp button for this category
  const bookingLink = document.createElement("a");
  bookingLink.className = "service-book";

  bookingLink.href = createWhatsAppUrl(
    `Hi ${SALON.name}! 👋\n\n` +
    `I visited your website and would like to enquire about ` +
    `${category.name}.\n\n` +
    `Please share the available services, final prices and ` +
    `appointment timings.\n\nThank you!`
  );

  bookingLink.target = "_blank";
  bookingLink.rel = "noopener noreferrer";
  bookingLink.textContent = "BOOK ON WHATSAPP ↗";

  content.append(title, description, list, bookingLink);
  card.append(imageWrap, content);

  return card;
}

// Display all four service categories.
function renderServices() {
  const serviceGrid = document.getElementById("serviceGrid");

  if (!serviceGrid) {
    console.error("Service grid not found. Check index.html.");
    return;
  }

  const fragment = document.createDocumentFragment();

  serviceCategories.forEach((category) => {
    fragment.appendChild(createServiceCard(category));
  });

  serviceGrid.replaceChildren(fragment);
}

// Set WhatsApp links for general booking buttons.
function setupWhatsAppButtons() {
  document.querySelectorAll("[data-whatsapp-general]").forEach((link) => {
    link.href = createWhatsAppUrl(
      `Hi ${SALON.name}! 👋\n\n` +
      `I visited your website and would like to enquire ` +
      `about your services and book an appointment.\n\n` +
      `Please let me know the available timings.\n\nThank you!`
    );

    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

// Mobile navigation menu.
function setupMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("navMenu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");

    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  // Close the menu after selecting a navigation link.
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    });
  });

  // Close the menu when Escape is pressed.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    }
  });
}

// Automatically update the copyright year.
function setupFooterYear() {
  const year = document.getElementById("currentYear");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

// Initialize the frontend.
renderServices();
setupWhatsAppButtons();
setupMobileMenu();
setupFooterYear();
