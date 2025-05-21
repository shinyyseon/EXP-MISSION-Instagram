const logo_img = document.getElementById("logo_img");

function updateLogoByScreenSize() {
    const width = window.innerWidth;

    // 모바일 화면이면 작은 로고로 교체
    if (width < 1264) {
        logo_img.innerHTML = `
        <img src="assets/icons/small_logo.svg" alt="logo" class="logo_img" />
      `;
    } else {
        logo_img.innerHTML = `
        <img src="assets/icons/logo.svg" alt="logo" class="logo_img" />
        `;
    }
}

window.addEventListener("load", updateLogoByScreenSize);
window.addEventListener("resize", updateLogoByScreenSize);
