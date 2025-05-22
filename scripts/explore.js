const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const modalClose = document.getElementById("modalClose");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const galleryImages = Array.from(document.querySelectorAll(".gallery-img"));
let currentIndex = 0;

galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index;
        openModal(currentIndex);
    });
});

function openModal(index) {
    modalImg.src = galleryImages[index].src;
    modal.style.display = "flex";

    // ◀ / ▶ 숨기기
    prevBtn.style.display = index === 0 ? "none" : "block";
    nextBtn.style.display = index === galleryImages.length - 1 ? "none" : "block";
}

prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        openModal(currentIndex);
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < galleryImages.length - 1) {
        currentIndex++;
        openModal(currentIndex);
    }
});


// 닫기
modalClose.addEventListener("click", () => {
    modal.style.display = "none";
});

// 외부 클릭 시 닫기
modal.addEventListener("click", (e) => {
    const modalContent = document.querySelector(".modal-content");
    if (!modalContent.contains(e.target)) {
        modal.style.display = "none";
    }
});
