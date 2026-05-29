document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("productModal");
  if (!overlay) return;

  const closeBtn = overlay.querySelector(".modal-close");
  const modalImg = overlay.querySelector("#modalImage");
  const modalNoImg = overlay.querySelector("#modalNoImage");
  const modalName = overlay.querySelector("#modalName");
  const modalPrice = overlay.querySelector("#modalPrice");
  const modalPresentation = overlay.querySelector("#modalPresentation");
  const modalDescription = overlay.querySelector("#modalDescription");
  const modalUsage = overlay.querySelector("#modalUsage");
  const modalUsageText = overlay.querySelector("#modalUsageText");
  const modalIngredients = overlay.querySelector("#modalIngredients");
  const modalIngredientsText = overlay.querySelector("#modalIngredientsText");
  const modalBadge = overlay.querySelector("#modalBadge");

  const badgeLabelMap = {
    "badge-facial-corporal": "Facial y Corporal",
    "badge-facial": "Facial",
  };

  function openModal(card) {
    const img = card.dataset.image;
    if (img) {
      modalImg.src = img;
      modalImg.alt = card.dataset.name;
      modalImg.style.display = "block";
      modalNoImg.style.display = "none";
    } else {
      modalImg.style.display = "none";
      modalNoImg.style.display = "flex";
    }

    modalName.textContent = card.dataset.name;
    modalPrice.textContent = card.dataset.price;
    modalPresentation.textContent = card.dataset.presentation;

    const badgeClass = card.dataset.badgeClass || "";
    if (badgeClass && modalBadge) {
      modalBadge.className = `product-type-badge ${badgeClass}`;
      modalBadge.textContent = badgeLabelMap[badgeClass] || "";
      modalBadge.style.display = "inline-block";
    } else if (modalBadge) {
      modalBadge.style.display = "none";
    }

    const descParts = card.dataset.description.split("||").filter((p) => p.trim());
    modalDescription.innerHTML = descParts.map((p) => `<p>${p}</p>`).join("");

    const usage = card.dataset.usage || "";
    if (usage) {
      modalUsageText.textContent = usage;
      modalUsage.style.display = "block";
    } else {
      modalUsage.style.display = "none";
    }

    const ingredients = card.dataset.ingredients || "";
    if (ingredients && modalIngredients) {
      modalIngredientsText.textContent = ingredients;
      modalIngredients.style.display = "block";
    } else if (modalIngredients) {
      modalIngredients.style.display = "none";
    }

    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".product-catalog-card").forEach((card) => {
    card.addEventListener("click", () => openModal(card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  closeBtn.addEventListener("click", closeModal);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  const hash = window.location.hash.slice(1);
  if (hash) {
    const target = document.getElementById(hash);
    if (target && target.classList.contains("product-catalog-card")) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        openModal(target);
      }, 150);
    }
  }
});
