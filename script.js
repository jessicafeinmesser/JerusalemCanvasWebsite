// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", () => {
  //hamburger button--------------------

  const menu = document.querySelector(".nav-list");
  const menuItems = document.querySelectorAll(".navItem");
  const hamburger = document.querySelector(".hamburger");
  const closeIcon = document.querySelector(".closeIcon");
  const menuIcon = document.querySelector(".menuIcon");

  function toggleMenu() {
    // Add/remove the "showNavList" class to toggle visibility

    if (menu.classList.contains("showNavList")) {
      menu.classList.remove("showNavList");
      closeIcon.style.display = "none";
      menuIcon.style.display = "block";
    } else {
      menu.classList.add("showNavList");
      closeIcon.style.display = "block";
      menuIcon.style.display = "none";
    }
  }

  hamburger.addEventListener("click", toggleMenu);

  menuItems.forEach(function (menuItem) {
    menuItem.addEventListener("click", toggleMenu);
  });
  //------------------------------------------------
  // Get the modal, modal image, and caption
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");
  const galleryImages = document.querySelectorAll(".gallery-img");

  // Functionality for the image modal
  if (modal && closeBtn) {
    galleryImages.forEach((img) => {
      img.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = img.src;
        captionText.textContent = img.alt;
      });
    });

    // Close the modal when the close button is clicked
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close the modal when clicking outside the image
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  } else {
    console.warn("Modal elements not found.");
  }
  //-----------------------------------------------
  // Functionality for filtering painting catalog
  const dropdown = document.getElementById("collection-dropdown");
  if (dropdown) {
    dropdown.addEventListener("change", function () {
      const selectedCollection = this.value;
      const galleryItems = document.querySelectorAll(".gallery-item");

      galleryItems.forEach((item) => {
        if (
          selectedCollection === "all" ||
          item.dataset.collection === selectedCollection
        ) {
          item.style.display = "block"; // Show matching items
        } else {
          item.style.display = "none"; // Hide non-matching items
        }
      });
    });
  }
  //-------------------------------------------------
  // Functionality for contact form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission

      // Retrieve form data
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Example of what you might do with the form data
      console.log(`Name: ${name}`);
      console.log(`Email: ${email}`);
      console.log(`Message: ${message}`);

      // Show a response message
      const responseDiv = document.getElementById("response");
      responseDiv.textContent =
        "Thank you for your message! We will get back to you shortly.";

      // Optionally, clear the form
      contactForm.reset();
    });
  }
  //------------------------------------------------------------
  // Functionality for image carousels
  const carousels = document.querySelectorAll(".carousel-images");
  if (carousels.length) {
    carousels.forEach((carousel) => initializeAutoCarousel(carousel));
  } else {
    console.log("No carousels found on the page!");
  }

  // Initialize auto-rotation for carousels
  function initializeAutoCarousel(carousel) {
    const images = carousel.querySelectorAll(".carousel-image");

    if (images.length) {
      let currentIndex = 0;

      // Show the first image initially
      showImage(images, currentIndex);

      // Set the carousel to automatically rotate
      const rotationInterval = 2000; // 2 seconds
      setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(images, currentIndex);
      }, rotationInterval);
    } else {
      console.error("No images found in the carousel:", carousel);
    }
  }

  function showImage(images, index) {
    images.forEach((img, i) => {
      img.style.display = i === index ? "block" : "none";
    });
  }
});
