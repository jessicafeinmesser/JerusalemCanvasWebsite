// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", () => {
  //javascript to close sale banner
  if (document.getElementById("close-banner")) {
    document.getElementById("close-banner").addEventListener("click", () => {
      const banner = document.getElementById("sale-banner");
      banner.style.display = "none";
    });
  }

  // Hamburger menu functionality
  const menu = document.querySelector(".nav-list");
  const menuItems = document.querySelectorAll(".navItem");
  const hamburger = document.querySelector(".hamburger");
  const closeIcon = document.querySelector(".closeIcon");
  const menuIcon = document.querySelector(".menuIcon");

  function toggleMenu() {
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

  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }

  menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", toggleMenu);
  });

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

  // Gallery modal functionality
  const modal = document.getElementById("gallery-modal");
  const modalImg = document.getElementById("modal-img");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");
  const galleryImages = document.querySelectorAll(".gallery-img");
  const paintingDescription = document.getElementById("painting-description");
  const etsyButton = document.getElementById("etsy-button");

  // Painting data for descriptions and Etsy links
  const paintingData = [
    {
      src: "images/JF_001_ChofetzChaim.avif",
      alt: "The Chafetz Chaim",
      description:
        "Colorful and unique portrait of the Chafetz Chaim z''l. Each square in the background is individually hand painted, with the letters spelling out the verses from Tehillim: 'מי האיש החפץ חיים'",
      etsyLink:
        "https://www.etsy.com/listing/1407339927/beautiful-unique-painting-of-the-chofetz?click_key=2f13346bade4594eab1082fcb40bb545e1f78307%3A1407339927&click_sum=a98ed495&ref=shop_home_feat_2&frs=1",
    },
    {
      src: "images/JF_002_RavOvadiaScan.avif",
      alt: "Rav Ovadia Yosef",
      description:
        "Colorful and unique portrait of Rav Ovadia Yosef z''l. Each square in the background is individually hand painted, with the letters spelling out his name.",
      etsyLink:
        "https://www.etsy.com/listing/1393119316/beautiful-unique-painting-of-rav-ovadiya?click_key=9369bbb18e2b87aebf1b5906c92e19994a43312e%3A1393119316&click_sum=1ece3586&ref=shop_home_active_28&frs=1",
    },
    {
      src: "images/JF_016_RavSchachterScan.avif",
      alt: "Rav Herschel Schachter",
      description:
        "Colorful and unique portrait of the Rav Herschel Schachter. Each square in the background is individually hand painted, with the letters spelling out the verses from Shir Hashirim which were the inspiration for the titles of his sefarim.",
      etsyLink:
        "https://www.etsy.com/listing/1407326545/beautiful-unique-painting-of-rav?click_key=599212721e3e271629b63cff2968b59641c46722%3A1407326545&click_sum=08293c53&ref=items-pagination-18&frs=1",
    },
    {
      src: "images/JF_023_RavKookScan.avif",
      alt: "Rav Kook",
      description:
        "Colorful and unique portrait of Rav Kook z''l. Each square in the background is individually hand painted, with the letters spelling out the lyrics of his famous song: 'בן אדם עלה למעלה עלה'",
      etsyLink:
        "https://www.etsy.com/listing/1393111046/beautiful-unique-painting-of-rav-avraham?click_key=5352b4be43d714ec9fe96bcda932bec9a8dc0514%3A1393111046&click_sum=82cfe3b0&ref=shop_home_active_24&frs=1",
    },
    {
      src: "images/JF_003_RebbeScan.avif",
      alt: "The Lubavitcher Rebbe",
      description:
        "Colorful and unique portrait of the Lubavicther Rebbe z''l. Each square in the background is individually hand painted, with the letters spelling out the introduction to the Tanya",
      etsyLink:
        "https://www.etsy.com/listing/1393118410/beautiful-unique-painting-of-the?click_key=0508210892539fe4239a966a17bf6f5e630927f8%3A1393118410&click_sum=208f92fe&ref=shop_home_feat_1&frs=1",
    },
    {
      src: "images/JF_004_RavSoloveitchikScan.avif",
      alt: "Rav Soloveitchik",
      description:
        "Colorful and unique portrait of Rav Soloveitchik z''l. Each square in the background is individually hand painted, with the letters spelling out the beginning of his Sefer, Kol Dodi Dofek.",
      etsyLink:
        "https://www.etsy.com/listing/1393116384/beautiful-unique-painting-of-rav?click_key=5bf90d2e0988ed72b4ac6fb2356b7fcb59b730dd%3A1393116384&click_sum=6783e991&ref=shop_home_active_14&frs=1",
    },
    {
      src: "images/JF_005_RavAharonLeibScan.avif",
      alt: "Rav Aharon Leib Shteinman",
      description:
        "Colorful and unique portrait of Rav Aharon Leib Shteinman z''l. Each square in the background is individually hand painted, with the letters spelling out the beginning of his name.",
      etsyLink:
        "https://www.etsy.com/listing/1393115426/beautiful-unique-painting-of-rav-aharon?click_key=9edab52fac1b853980e006a06c5f1856d828681d%3A1393115426&click_sum=89cf085c&ref=shop_home_active_29&frs=1",
    },
    {
      src: "images/JF_009_RabbiSacksScan.avif",
      alt: "Rabbi Lord Jonathan Sacks",
      description:
        "Colorful and unique portrait of Rabbi Lord Jonathan Sacks z''l. Each square in the background is individually hand painted, with the letters spelling out one of his profound quotes.",
      etsyLink:
        "https://www.etsy.com/listing/1393112512/beautiful-unique-painting-of-rabbi?click_key=c1e6d73faed40e9e776d74277a0eb2348f5dc876%3A1393112512&click_sum=1568ce6b&ref=shop_home_active_17&frs=1",
    },
    {
      src: "images/JF_006_RavMosheScan.avif",
      alt: "Rav Moshe Feinstein",
      description:
        "Colorful and unique portrait of Rav Moshe Feinstein z''l. Each square in the background is individually hand painted, with the letters spelling out the beginning of his Sefer, Igros Moshe.",
      etsyLink:
        "https://www.etsy.com/listing/1407333311/beautiful-unique-painting-of-rav-moshe?click_key=d5f426ae413f043a615b011c3a127f411d6aa334%3A1407333311&click_sum=1588daec&ref=shop_home_active_25&frs=1",
    },
    {
      src: "images/JF_025_Carlebach.avif",
      alt: "Rav Shlomo Carlebach",
      description:
        "A painting that captures the soulful essence of Rav Shlomo Carlebach.",
      etsyLink:
        "https://www.etsy.com/listing/1862917037/beautiful-original-painting-of-shlomo?click_key=ef534560c63f8090c7801c4e73f24e508453744b%3A1862917037&click_sum=38980a8f&ref=shop_home_active_2&frs=1",
    },
    {
      src: "images/JF_037_GoldenKotel.avif",
      alt: "Kotel in Gold",
      description:
        "A beautiful, semi-abtract textured rendition of the Kotel in black and white with elegant touches of gold leaf. Feel the magic and spirituality of the stones, and the prayers of the diverse group of people who come to speak to G-d.",
      etsyLink:
        "https://www.etsy.com/listing/1862733933/painting-of-kotel-in-black-white-and?click_key=547123074f95553e97a2ab2b6f8651c3f0738d7a%3A1862733933&click_sum=2c450478&ref=shop_home_active_9&frs=1",
    },
    {
      src: "images/JF_007_prayersAtKotelScan.avif",
      alt: "Prayers at the Kotel",
      description:
        "A colorful, radiant painting of the prayers of Jewish men rising to the heavens at the Kotel. Look closely and you will see the words from Tehillim: תְּפִלָּה לְעָנִי כִי יַעֲטֹף וְלִפְנֵי ה' יִשְׁפֹּךְ שִׂיחוֹ",
      etsyLink:
        "https://www.etsy.com/listing/1408214047/prayers-at-the-kotel-canvas-print?click_key=627edad02bfbeff07b4e83f6afcbab67e19ca36a%3A1408214047&click_sum=4eec40f5&ref=shop_home_active_21&frs=1",
    },
    {
      src: "images/JF_008_.avif",
      alt: "Tekes at the Kotel",
      description:
        "This painting is based on a picture that I took when I went to the Kotel to pray. There was a Tekes (army ceremony) taking place, with hundreds of soldiers, their families, friends, and complete strangers gathering in unity for the event.",
      etsyLink:
        "https://www.etsy.com/listing/1394000028/tekes-at-the-kotel-canvas-print?click_key=6591e73f7e2519f4ade8affc39e53ca6857d2b2f%3A1394000028&click_sum=18cee243&ref=shop_home_active_20&frs=1",
    },
    {
      src: "images/JF_026_DancingWithTorah.avif",
      alt: "Ivdu Et Hashem B'Simcha",
      description:
        "A painting inpsired by a video that was being shared at the start of the war: soldiers dancing with a Torah and Israeli flag. Feel the resilience and faith of these brave men.",
      etsyLink:
        "https://www.etsy.com/listing/1746147326/painting-of-israeli-soldiers-dancing?click_key=bedf638b07443fe24f6b19645992250f1f55b7de%3A1746147326&click_sum=89e19515&ref=shop_home_active_12&frs=1",
    },
    {
      src: "images/JF_031_SoldiersBlessing.avif",
      alt: "A Soldier's Blessing",
      description:
        "A touching rendition of a soldier receiving a blessing from a Rabbi before heading off to fight for his nation.",
      etsyLink:
        "https://www.etsy.com/listing/1862908381/a-soldiers-blessing-painting-of-rabbi?click_key=119af2f35d4e104f34132f432dd964a17124098f%3A1862908381&click_sum=d4877424&ref=shop_home_active_3&frs=1",
    },
    {
      src: "images/JF_010_strollThroughOldCityScan.avif",
      alt: "Stroll Through the Old City",
      description:
        "A charming, calming painting of the Old City of Jerusalem. Feel the holiness, mystery and serenity contained in the hallowed walls of Jerusalem stone.",
      etsyLink:
        "https://www.etsy.com/listing/1408593839/stroll-through-the-old-city-painting?click_key=1ba43a846fe839a20fa56a65ca97d984f6175c46%3A1408593839&click_sum=f8cbb15f&ref=shop_home_active_18&frs=1",
    },
    {
      src: "images/JF_034_OdYeshvu.avif",
      alt: "Od Yeshvu Zikeinim U'Zkeinot",
      description:
        "A heartwarming piece inspired by the words of Zechariah HaNavi: 'Once again elderly men and women will sit in the streets of Jerusalem... and the streets of the city will be filled with children playing'. A beautiful vision that we see coming to life before our very eyes!",
      etsyLink:
        "https://www.etsy.com/listing/1862759981/od-yeshvu-old-city-painting?click_key=bcc6d49e08a1bec64767b7204614f945aa516fc1%3A1862759981&click_sum=ce4a632c&ref=shop_home_active_6&frs=1",
    },
    {
      src: "images/JF_011_maaratHamachpela.avif",
      alt: "Maarat Hamachpela",
      description:
        "A beautiful rendition of Ma'arat HaMachpela, the resting place of our patriarchs and matriarchs, in calming pastels. Feel the holiness radiating from the walls.",
      etsyLink:
        "https://www.etsy.com/listing/1393983710/maarat-hamachpeila-painting-canvas-print?click_key=0ed7c3ef2776e1358f40d88defa1a70d8117e43a%3A1393983710&click_sum=3f2a79ec&ref=shop_home_active_15&frs=1",
    },
    {
      src: "images/JF_035_KeverRachel.avif",
      alt: "Kever Rachel",
      description:
        "A beautiful rendition of Kever Rachel, the resting place of Rachel Imeinu, surrounded by color and greenery. Feel the holiness radiating from the walls.",
      etsyLink:
        "https://www.etsy.com/listing/1848546952/kever-rachel-tomb-of-rachel-painting?click_key=ef63027381172f5b430cf052516f6248a5fca200%3A1848546952&click_sum=b64de74d&ref=shop_home_active_8&frs=1",
    },
    {
      src: "images/JF_024_WolfLambScan.avif",
      alt: "The Wolf Shall Dwell With The Lamb",
      description:
        "A unique, colorful painting depicting the vision of Yeshayahu (Isaiah) about the time of the future redemption when there will be world peace - symbolized by the wolf and lamb dwelling side by side in harmony.",
      etsyLink:
        "https://www.etsy.com/listing/1408209229/the-wolf-shall-dwell-with-the-lamb?click_key=393992bbbd5b64d641a744061ffa215684983022%3A1408209229&click_sum=25436b7a&ref=shop_home_active_22&frs=1",
    },
    {
      src: "images/JF_038_EinGedi.avif",
      alt: "Ein Gedi",
      description:
        "The greenery, majesty, and wildlife of Ein Gedi come alive in this painting of Ein Gedi.",
      etsyLink:
        "https://www.etsy.com/listing/1848569622/beautiful-painting-of-ein-gedi-in-israel?click_key=5b6dacb72538e3dc236710dc99c5beec96b49c77%3A1848569622&click_sum=f614f89e&ref=shop_home_active_4&frs=1",
    },
    {
      src: "images/JF_039_MigdalDavid.avif",
      alt: "Migdal David",
      description:
        "A bright, textured painting of Midgal David surrounded by greenery. A special part of the Old City's history and architecture.",
      etsyLink:
        "https://www.etsy.com/listing/1862755675/migdal-david-tower-of-david-painting?click_key=1127f5e2c029be53810fc83e111c1e1c8b9063e5%3A1862755675&click_sum=0e044192&ref=shop_home_active_7&frs=1",
    },
    {
      src: "images/JF_014_ImEshkachech.avif",
      alt: "Im Eshkachech",
      description:
        "A beautiful, colorful painting of the Beit Hamikdash, Temple, standing above the rolling hills and ancient walls of Jerusalem. On top are the words Im Eshkachech Yerushalayim- If I forget you, Jerusalem. The Jewish people yearn daily for the coming of Mashiach and the building of the Third Temple. This painting is an eye-catching and inspiring reminder.",
      etsyLink:
        "https://www.etsy.com/listing/1862930257/im-eshkachech-yerushalayim-beautiful?click_key=ae5860bfdc4e2294a1111ee8630a365b0a6dd082%3A1862930257&click_sum=6325813f&ref=shop_home_active_1&frs=1",
    },
    {
      src: "images/JF_030_SoundOfGeula.avif",
      alt: "The Sound of Geula",
      description:
        "A bright, pastel-colored painting of Jerusalem in the times of Mashiach. The Beit HaMikdash standing tall, with throngs coming to pray and stand in awe. In the corner, Mashiach blowing his shofar, signalling the coming of the Geula.",
      etsyLink:
        "https://www.etsy.com/listing/1862771131/the-sound-of-geula-jerusalem-painting?click_key=6ef55a564b764587c3e36d0ba4cd0de9debbbf89%3A1862771131&click_sum=042d49e7&ref=shop_home_active_5&frs=1",
    },
    {
      src: "images/JF_029_BeforeTheGates.avif",
      alt: "Standing Before The Gates",
      description:
        "A beautiful, serene painting of the hills and walls of Jerusalem. It is inspired by a verse from Tehillim, Psalms 122:'עומדות היו רגלינו בשעריך ירושלים'-Our feet stood before your gates, Jerusalem",
      etsyLink:
        "https://www.etsy.com/listing/1746166980/beautiful-israel-painting-standing?click_key=2c931f474f55acc3c28f4552f1daa3ffe28b24ff%3A1746166980&click_sum=7e64cf2b&ref=shop_home_active_11&frs=1",
    },
    {
      src: "images/JF_012_AuraOfShabbos.avif",
      alt: "The Aura of Shabbos",
      description:
        "A beautiful, colorful painting expressing the peace and holiness that we experience each Friday nigh when Shabbos begins. There is no comparison to the inner serenity and joy that can be achieved at this time. With this painting, you can bring the aura of Shabbos into your home throughout the week.",
      etsyLink:
        "https://www.etsy.com/listing/1428399317/the-aura-of-shabbos-unique-acrylic?click_key=ae2a8a3c1a515fec867e815e24d1af6cb9b0f4fc%3A1428399317&click_sum=1c654050&ref=shop_home_active_13&frs=1",
    },
    {
      src: "images/JF_013_ShivatHaminim.avif",
      alt: "Shivat Haminim",
      description:
        "A beautiful, colorful painting of Israel's special seven species, the Shivat Haminim. A constant reminder of the special qualities of Eretz Yisrael, hanging elegantly in your own home.",
      etsyLink:
        "https://www.etsy.com/listing/1660374556/beautiful-painting-of-the-shivat-haminim?click_key=d7c833f86b7608a2c13c73da5466a8c1c9f9e628%3A1660374556&click_sum=9a69321e&ref=shop_home_active_16&frs=1",
    },
    {
      src: "images/JF_015_BeitMidrash.avif",
      alt: "In The Beit Midrash",
      description:
        "A painting that captures the vibrancy and energy of men learning Torah in a Beit Midrash.",
      etsyLink: "./contact.html",
    },
    {
      src: "images/Hadlakat Neirot Chanukah.png",
      alt: "Hadlakat Neirot Chanukah",
      description:
        "A colorful, abstract rendition of a menorah, overlaid with the text of Chanukah lighting.",
      etsyLink: "./contact.html",
    },
    {
      src: "images/JF_027_Mishebeirach.jpg",
      alt: "Mishebeirach L'Chayalei Tzahal",
      description:
        "A soldier praying at the Kotel, with the text of Mishebeirach L'Chayalei Tzahal, the prayer for the Israeli forces, hand-calligraphed.",
      etsyLink: null, // No Etsy link, use WhatsApp
    },
    {
      src: "images/JF_028_TefillahShalom.jpg",
      alt: "Tefillah L'Shalom Hamedina",
      description:
        "A prayer for the State of Israel, hand-calligraphed on top of an Israeli flag.",
      etsyLink: null, // No Etsy link, use WhatsApp
    },
    {
      src: "images/JF_032_HadlakatNeirot.jpg",
      alt: "Hadlakat Neirot",
      description:
        "The text of Shabbat candelighting, hand-calligraphed on top of a bright, abstract candlestick background.",
      etsyLink: null, // Etsy link
    },
    {
      src: "images/JF_033_AlHamichya.jpg",
      alt: "Al HaMichya",
      description:
        "The text of Al Hamichya, hand-calligraphed, surrounded by the Shivat Haminim.",
      etsyLink: null, // No Etsy link, use WhatsApp
    },
  ];

  galleryImages.forEach((img) => {
    img.addEventListener("click", (e) => {
      const imgSrc = e.target.getAttribute("src");
      const matchedPainting = paintingData.find(
        (painting) => painting.src === imgSrc
      );

      if (matchedPainting) {
        modalImg.src = matchedPainting.src;
        captionText.textContent = matchedPainting.alt;
        paintingDescription.textContent =
          matchedPainting.description || "Description not available.";

        if (matchedPainting.etsyLink) {
          // Show Etsy link
          etsyButton.style.display = "inline-block";
          etsyButton.href = matchedPainting.etsyLink;
          etsyButton.textContent = "View on Etsy";
        } else {
          // Show WhatsApp link
          const whatsappMessage = encodeURIComponent(
            `Hi, I am interested in buying "${matchedPainting.alt}".`
          );
          etsyButton.style.display = "inline-block";
          etsyButton.href = `https://wa.me/+17322814838?text=${whatsappMessage}`;
          etsyButton.textContent = "Inquire on WhatsApp";
        }
      }

      modal.style.display = "block";
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Services page modal functionality--------------------------

  // Elements for Commission Modal
  const commissionButton = document.getElementById("commissionButton");
  const commissionModal = document.getElementById("commissionModal");
  if (commissionModal) {
    const commissionClose = commissionModal.querySelector(".close");
    if (commissionClose) {
      commissionClose.addEventListener("click", () => {
        commissionModal.style.display = "none";
      });
    }
  }
  const commissionClose = commissionModal.querySelector(".close");
  const commissionWhatsAppButton = document.getElementById(
    "commissionWhatsAppButton"
  );
  const commissionContactButton = document.getElementById(
    "commissionContactButton"
  );

  // Elements for Monogram Modal
  const monogramButton = document.getElementById("monogramButton");
  const monogramModal = document.getElementById("monogramModal");
  const monogramClose = monogramModal.querySelector(".close");
  const monogramWhatsAppButton = document.getElementById(
    "monogramWhatsAppButton"
  );
  const monogramContactButton = document.getElementById(
    "monogramContactButton"
  );

  // Open Commission Modal
  commissionButton.addEventListener("click", () => {
    commissionModal.style.display = "flex";
  });

  // Close Commission Modal
  commissionClose.addEventListener("click", () => {
    commissionModal.style.display = "none";
  });

  // WhatsApp Redirect for Commission
  commissionWhatsAppButton.addEventListener("click", () => {
    const phoneNumber = "+17322814838";
    const message = encodeURIComponent(
      "Hi! I would like to order a custom commission."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  });

  // Contact Page Redirect for Commission
  commissionContactButton.addEventListener("click", () => {
    window.location.href = "/contact.html"; // Replace with actual contact page URL
  });

  // Open Monogram Modal
  monogramButton.addEventListener("click", () => {
    monogramModal.style.display = "flex";
  });

  // Close Monogram Modal
  monogramClose.addEventListener("click", () => {
    monogramModal.style.display = "none";
  });

  // WhatsApp Redirect for Monogram
  monogramWhatsAppButton.addEventListener("click", () => {
    const phoneNumber = "+17322814838";
    const message = encodeURIComponent(
      "Hi! I would like to order a custom monogram."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  });

  // Contact Page Redirect for Monogram
  monogramContactButton.addEventListener("click", () => {
    window.location.href = "/contact.html"; // Replace with actual contact page URL
  });

  // Close Modals on Click Outside
  window.addEventListener("click", (event) => {
    if (event.target === commissionModal) {
      commissionModal.style.display = "none";
    }
    if (event.target === monogramModal) {
      monogramModal.style.display = "none";
    }
  });

  //----------------------------------------------------------------

  // Carousel functionality
  const carousels = document.querySelectorAll(".carousel-images");

  carousels.forEach((carousel) => {
    const images = carousel.querySelectorAll(".carousel-image");
    if (images.length > 0) {
      let currentIndex = 0;
      const rotationInterval = 2000;

      function showImage(index) {
        images.forEach((img, i) => {
          img.style.display = i === index ? "block" : "none";
        });
      }

      showImage(currentIndex);

      setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      }, rotationInterval);
    }
  });
});
