document.addEventListener("DOMContentLoaded", function () {
    function updateLogoByScreenSize() {
        const logo_img = document.getElementById("logo_img");
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
});

