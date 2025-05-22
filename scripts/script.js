document.addEventListener("DOMContentLoaded", function () {
    const logo_img = document.getElementById("logo_img");

    function updateLogoByScreenSize() {
        const width = window.innerWidth;
        if (width < 1264) {
            logo_img.innerHTML = `
                <a href="../index.html">
                    <img src="../assets/icons/small_logo.svg" alt="logo" class="logo_img" />
                </a>`;
        } else {
            logo_img.innerHTML = `
                <a href="../index.html">
                    <img src="../assets/icons/logo.svg" alt="logo" class="logo_img" />
                </a>`;
        }
    }

    window.addEventListener("load", updateLogoByScreenSize);
    window.addEventListener("resize", updateLogoByScreenSize);

    const storyButtons = document.querySelectorAll(".story");
    const storyModal = document.getElementById("storyModal");
    const storyImage = document.querySelector(".story-slide");
    const modalUser = document.getElementById("modalUser");
    const modalProfile = document.querySelector(".story-profile");
    const storyInput = document.querySelector(".story-input");
    const storyProgress = document.querySelector(".story-progress");
    const closeModal = document.getElementById("closeModal");
    const prevStory = document.getElementById("prevStory");
    const nextStory = document.getElementById("nextStory");

    const STORY_DURATION = 5000;
    let currentIndex = 0;
    let storyElements = [];
    let storyTimer;

    // 모달에 스토리 표시
    function showStory(index) {
        if (index < 0) index = storyElements.length - 1;
        if (index >= storyElements.length) index = 0;

        currentIndex = index;

        const button = storyElements[index];
        const imgSrc = button.querySelector("img").src;
        const username = button.querySelector(".story_user").textContent;

        storyImage.src = imgSrc;
        modalProfile.src = imgSrc;
        modalUser.textContent = username;
        storyInput.placeholder = `${username}에게 메시지를 보내기...`;

        updateProgressBar(index);

        clearTimeout(storyTimer);
        storyTimer = setTimeout(() => {
            showStory((index + 1) % storyElements.length);
        }, STORY_DURATION);
    }

    // 진행 바 업데이트
    function updateProgressBar(activeIndex) {
        storyProgress.innerHTML = "";
        const bar = document.createElement("div");
        bar.classList.add("active"); // 항상 하나만 추가
        storyProgress.appendChild(bar);
    }

    storyButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            storyElements = Array.from(storyButtons);
            showStory(index);
            storyModal.style.display = "flex";
            document.body.classList.add("modal-open"); // 스크롤 막기
        });
    });

    closeModal.addEventListener("click", () => {
        storyModal.style.display = "none";
        document.body.classList.remove("modal-open");
        clearTimeout(storyTimer);
    });

    window.addEventListener("click", (e) => {
        if (e.target === storyModal) {
            storyModal.style.display = "none";
            document.body.classList.remove("modal-open");
            clearTimeout(storyTimer);
        }
    });


    // 좌우 네비게이션
    nextStory.addEventListener("click", () => {
        showStory((currentIndex + 1) % storyElements.length);
    });

    prevStory.addEventListener("click", () => {
        showStory((currentIndex - 1 + storyElements.length) % storyElements.length);
    });
});
