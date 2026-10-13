(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  const toast = document.querySelector(".toast");
  let toastTimer;

  function announce(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3000);
  }

  function closeMenu() {
    if (!menuButton || !nav) return;
    menuButton.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuButton.focus();
      }
    });
    document.addEventListener("click", (event) => {
      if (nav.classList.contains("is-open") && !nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
  }

  document.querySelectorAll("[data-share]").forEach((button) => {
    button.addEventListener("click", async () => {
      const url = window.location.href.split("#")[0];
      const shareData = {
        title: "कान्हेवाला — मिलकर आगे",
        text: "कान्हेवाला के स्थानीय प्रयासों और विकास प्रस्तावों की जानकारी देखें।",
        url
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (error) {
          if (error && error.name !== "AbortError") announce("अभी साझा नहीं हो पाया। लिंक कॉपी करके भेजें।");
        }
        return;
      }

      try {
        await navigator.clipboard.writeText(url);
        announce("पेज का लिंक कॉपी हो गया। अब आप इसे साझा कर सकते हैं।");
      } catch {
        window.prompt("इस लिंक को कॉपी करके साझा करें:", url);
      }
    });
  });

  const photoViewer = document.querySelector(".photo-viewer");
  const viewerImage = photoViewer && photoViewer.querySelector(".viewer-image");
  const viewerCaption = photoViewer && photoViewer.querySelector(".viewer-caption");
  const viewerCount = photoViewer && photoViewer.querySelector(".viewer-count");
  const galleryPhotos = Array.from(document.querySelectorAll(".hero-poster, .evidence-photo img, .team-photo img"));
  let activePhotoIndex = -1;
  let lastFocusedPhoto = null;
  let swipeStartX = null;

  function showPhoto(index) {
    if (!galleryPhotos.length || !viewerImage) return;
    activePhotoIndex = (index + galleryPhotos.length) % galleryPhotos.length;
    const photo = galleryPhotos[activePhotoIndex];
    viewerImage.src = photo.currentSrc || photo.src;
    viewerImage.alt = photo.alt;
    viewerCaption.textContent = photo.closest("figure")?.querySelector("figcaption")?.innerText || photo.alt;
    viewerCount.textContent = `${activePhotoIndex + 1} / ${galleryPhotos.length}`;
  }

  function openPhoto(photo) {
    if (!photoViewer || !photoViewer.showModal) return;
    lastFocusedPhoto = photo;
    showPhoto(galleryPhotos.indexOf(photo));
    photoViewer.showModal();
    photoViewer.querySelector("[data-viewer-close]")?.focus();
  }

  galleryPhotos.forEach((photo) => {
    const hint = document.createElement("span");
    hint.className = "photo-zoom-hint";
    hint.setAttribute("aria-hidden", "true");
    hint.innerHTML = '<svg viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>';
    photo.closest("figure")?.append(hint);
    photo.setAttribute("role", "button");
    photo.setAttribute("tabindex", "0");
    photo.setAttribute("aria-label", `${photo.alt} ? बड़ा करके देखें`);
    photo.addEventListener("click", () => openPhoto(photo));
    photo.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPhoto(photo);
      }
    });
  });

  photoViewer?.querySelector("[data-viewer-close]")?.addEventListener("click", () => photoViewer.close());
  photoViewer?.querySelector("[data-viewer-prev]")?.addEventListener("click", () => showPhoto(activePhotoIndex - 1));
  photoViewer?.querySelector("[data-viewer-next]")?.addEventListener("click", () => showPhoto(activePhotoIndex + 1));
  photoViewer?.addEventListener("click", (event) => {
    if (event.target === photoViewer) photoViewer.close();
  });
  photoViewer?.addEventListener("close", () => lastFocusedPhoto?.focus());
  photoViewer?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showPhoto(activePhotoIndex - 1);
    if (event.key === "ArrowRight") showPhoto(activePhotoIndex + 1);
  });
  viewerImage?.addEventListener("pointerdown", (event) => { swipeStartX = event.clientX; });
  viewerImage?.addEventListener("pointerup", (event) => {
    if (swipeStartX === null) return;
    const distance = event.clientX - swipeStartX;
    if (Math.abs(distance) > 55) showPhoto(activePhotoIndex + (distance < 0 ? 1 : -1));
    swipeStartX = null;
  });

})();
