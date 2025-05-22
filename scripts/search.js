const userList = [
    { id: "user1", avatar: "https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288884.jpg?ga=GA1.1.1519145777.1743998646&semt=ais_hybrid&w=740"},
    { id: "user2", avatar: "https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288875.jpg?ga=GA1.1.1519145777.1743998646&amp;semt=ais_hybrid&amp;w=740" },
    { id: "user3", avatar: "https://img.freepik.com/free-photo/3d-rendering-young-cartoon-tiger_23-2150897631.jpg?ga=GA1.1.1519145777.1743998646&amp;semt=ais_hybrid&amp;w=740" },
    { id: "user4", avatar: "https://img.freepik.com/free-photo/3d-fox-cartoon-illustration_23-2151395199.jpg?ga=GA1.1.1519145777.1743998646&amp;semt=ais_hybrid&amp;w=740" },
    { id: "user5", avatar: "https://img.freepik.com/free-photo/view-cartoon-animated-3d-penguin_23-2150882048.jpg?ga=GA1.1.1519145777.1743998646&amp;semt=ais_hybrid&amp;w=740" },
    { id: "user6", avatar: "https://img.freepik.com/free-photo/cute-lion-studio_23-2150813133.jpg?ga=GA1.1.1519145777.1743998646&amp;semt=ais_hybrid&amp;w=740" },
    { id: "user7", avatar: "https://img.freepik.com/free-photo/3d-rendering-forest-animal-using-laptop_23-2150991336.jpg?ga=GA1.1.1519145777.1743998646&amp;semt=ais_hybrid&amp;w=740" },
    { id: "user8", avatar: "https://img.freepik.com/free-photo/view-3d-animated-cartoon-bird_23-2150946443.jpg?ga=GA1.1.1519145777.1743998646&amp;semt=ais_hybrid&amp;w=740" }
];

function Search() {
    const logo_img = document.getElementById("logo_img");
    const searchIcon = document.querySelector(".search_tab");
    const searchPanel = document.getElementById("searchPanel");
    const sidebar = document.querySelector(".left_sidebar");

    const searchInput = document.querySelector(".search-input");
    const recentList = document.getElementById("recentList");
    const noRecent = document.getElementById("noRecent");

    searchIcon.addEventListener("click", () => {
        searchPanel.style.display = "block";
        sidebar.classList.add("sidebar--collapsed");
        logo_img.innerHTML = `
            <a href="../index.html">
                <img src="../assets/icons/small_logo.svg" alt="logo" class="logo_img" />
            </a>`;
    });

    document.addEventListener("click", (e) => {
        const width = window.innerWidth;
        const isClickInside =
            searchPanel.contains(e.target) || searchIcon.contains(e.target);
        if (!isClickInside) {
            searchPanel.style.display = "none";
            sidebar.classList.remove("sidebar--collapsed");
            if (width >= 1264) {
                logo_img.innerHTML = `
                <a href="../index.html">
                    <img src="../assets/icons/logo.svg" alt="logo" class="logo_img" />
                </a>`;
            }
            renderRecentSearch();
        }
    });

    const recentHistory = [];

    searchInput.addEventListener("input", (e) => {
        const keyword = e.target.value.trim();
        SearchResults(keyword);
    });

    function SearchResults(keyword) {
        if (!keyword) {
            recentList.innerHTML = "";
            noRecent.style.display = "block";
            return;
        }

        const filtered = userList.filter(user =>
            user.id.toLowerCase().includes(keyword.toLowerCase())
        );

        if (filtered.length === 0) {
            recentList.innerHTML = "";
            noRecent.style.display = "block";
            return;
        }

        recentList.innerHTML = "";
        filtered.forEach(user => {
            const li = document.createElement("li");
            li.classList.add("search-result");

            li.innerHTML = `
      <img src="${user.avatar}" alt="${user.id}" class="avatar">
      <span class="user-id">${user.id}</span>
    `;

            li.addEventListener("click", () => {
                if (!recentHistory.some(u => u.id === user.id)) {
                    recentHistory.unshift(user);
                    if (recentHistory.length > 10) recentHistory.pop();
                }

                renderRecentSearch();

                searchInput.value = "";
                SearchResults("");

                window.location.href = `profile.html?user=${user.id}`;
            });


            recentList.appendChild(li);
        });

        noRecent.style.display = "none";
    }


    function renderRecentSearch() {
        recentList.innerHTML = "";
        if (recentHistory.length === 0) {
            noRecent.style.display = "block";
            return;
        }

        recentHistory.forEach(user => {
            const li = document.createElement("li");
            li.classList.add("search-result");

            li.innerHTML = `
                <a href="profile.html?user=${user.id}" style="display:flex; align-items:center; gap:10px; text-decoration:none;">
                  <img src="${user.avatar}" alt="${user.id}" class="avatar">
                  <span class="user-id">${user.id}</span>
                </a>
            `;

            recentList.appendChild(li);
        });


        noRecent.style.display = "none";
    }

}

Search();