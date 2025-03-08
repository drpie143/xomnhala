/* ---------- Typewriter Effect ---------- */
function typeWriter(element, text, speed, callback) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

document.addEventListener("DOMContentLoaded", function () {
  const heroText1 = document.getElementById("hero-text1");
  const heroText2 = document.getElementById("hero-text2");

  const text1 = "Chào mừng bạn đến với trang web của Xóm Nhà Lá";
  const text2 = "Đây là nơi chúng tớ lưu giữ kỉ niệm";

  // Hiển thị text1 trước, sau đó text2 sau 500ms khi text1 đã chạy xong
  typeWriter(heroText1, text1, 100, function () {
    setTimeout(function () {
      typeWriter(heroText2, text2, 100);
    }, 500);
  });
});

/* ---------- Fade Transition Functions ---------- */
function fadeOut(element, callback) {
  element.style.opacity = 0;
  setTimeout(callback, 500);
}
function fadeIn(element) {
  element.style.display = "block";
  setTimeout(() => {
    element.style.opacity = 1;
  }, 50);
}

// Set ban đầu cho các container
const mainPage = document.getElementById("mainPage");
const eventGallery = document.getElementById("eventGallery");
eventGallery.style.display = "none";
eventGallery.style.opacity = 0;

// Fade-in cho ảnh của trang 2
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
document.querySelectorAll(".image-item").forEach((item) => {
  observer.observe(item);
});

/* ---------- Cấu hình cho mỗi event gallery ---------- */
const eventGalleries = {
  "Cấp 3": {
    background: "background_event.jpg", // đường dẫn background cho event
    images: [
      {
        src: "image1.jpg",
        alt: "Ảnh 1",
        download: "image1.jpg",
        style: "width: 150px; height: auto;",
      },
      {
        src: "image2.jpg",
        alt: "Ảnh 2",
        download: "image2.jpg",
        style: "width: 150px; height: auto;",
      },
      {
        src: "image3.jpg",
        alt: "Ảnh 3",
        download: "image3.jpg",
        style: "width: 150px; height: auto;",
      },
    ],
    downloadBtnStyle: {
      top: "",
      right: "20px",
      bottom: "20px",
      left: "",
    },
  },
  "Tết 2025": {
    background: "background_event.jpg",
    images: [
      {
        src: "image_tet.jpg",
        alt: "Ảnh Tết 2025",
        download: "image_tet.jpg",
        style: "width: 120px; height: auto;",
      },
      {
        src: "video.mp4",
        alt: "Video Tết 2025",
        download: "video.mp4",
        style: "width: 120px; height: auto;",
      },
    ],
    downloadBtnStyle: {
      top: "",
      left: "",
      bottom: "20px",
      right: "20px",
    },
  },
  "8/3/2025": {
    background: "background_event.jpg",
    images: [
      {
        src: "video_8.3.mp4",
        alt: "Ảnh 8/3/2025 1",
        download: "video.mp4",
        style: "width: 130px; height: auto;",
      },
    ],
    downloadBtnStyle: { bottom: "20px", left: "50%", top: "", right: "" },
  },
};

// Hàm load gallery theo event được chọn
function loadGallery(eventName) {
  const galleryDiv = document.querySelector(".gallery");
  galleryDiv.innerHTML = "";
  const config = eventGalleries[eventName];
  if (config) {
    // Đặt background cho event gallery
    eventGallery.style.backgroundImage = config.background
      ? "url('" + config.background + "')"
      : "";
    // Tùy chỉnh vị trí nút tải về theo cấu hình của event
    if (config.downloadBtnStyle) {
      Object.assign(downloadBtn.style, config.downloadBtnStyle);
    } else {
      downloadBtn.removeAttribute("style");
    }
    config.images.forEach((mediaData) => {
      let mediaEl;
      if (mediaData.src.endsWith(".mp4")) {
        mediaEl = document.createElement("video");
        mediaEl.src = mediaData.src;
        mediaEl.controls = true; // Hiển thị điều khiển video
      } else {
        mediaEl = document.createElement("img");
        mediaEl.src = mediaData.src;
      }
      mediaEl.alt = mediaData.alt;
      mediaEl.setAttribute("data-download", mediaData.download);
      if (mediaData.style) {
        mediaEl.style.cssText += mediaData.style;
      }
      galleryDiv.appendChild(mediaEl);
    });
    // Gắn lại sự kiện cho modal cho các ảnh mới
    attachGalleryModalListeners();
  }
}

// Gắn sự kiện modal cho các ảnh gallery
function attachGalleryModalListeners() {
  const galleryImages = document.querySelectorAll(".gallery img");
  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImage.src = img.src;
      downloadBtn.href = img.getAttribute("data-download");
    });
  });
}

// Chuyển sang Event Gallery khi chọn sự kiện
function navigateEvent() {
  const select = document.getElementById("eventSelect");
  if (select.value && eventGalleries[select.value]) {
    const eventVal = select.value;
    document.getElementById("eventTitle").textContent =
      "Gallery Event - " + eventVal;
    loadGallery(eventVal);
    fadeOut(mainPage, () => {
      mainPage.style.display = "none";
      fadeIn(eventGallery);
    });
  }
}

// Nút "Quay lại"
document.getElementById("backBtn").addEventListener("click", () => {
  document.getElementById("eventSelect").value = "";
  fadeOut(eventGallery, () => {
    eventGallery.style.display = "none";
    fadeIn(mainPage);
  });
});

// Modal functionality cho Gallery Event
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeBtn = document.getElementById("closeBtn");
const downloadBtn = document.getElementById("downloadBtn");

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
