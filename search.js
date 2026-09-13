/* ==========================================
   WEBSITE SEARCH SYSTEM
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {


    const searchInput =
        document.getElementById("searchInput");

    const searchButton =
        document.getElementById("searchButton");


    if (!searchInput || !searchButton) {
        return;
    }


    /* ==========================================
       YOUR WEBSITE PAGES
       ========================================== */

    const pages = [

        "index.html",

        "2019.html",
        "2020.html",
        "2021.html",
        "2022.html",
        "2023.html",
        "2024.html",
        "2025.html",
        "2026.html",

        "ptnall.html",

        "list19.html",
        "list20.html",
        "list21.html",
        "list22.html",
        "list23.html",
        "list24.html",
        "list25.html",
        "list26.html",

        "important.v.html",

        "gnu.html",
        "gne.html",
        "gnm.html",
        "gnh.html",

        "listu.html",
        "liste.html",
        "listm.html",
        "listh.html",

        "nsu.html",
        "nse.html",
        "nsmt1.html",
        "nss1.html",
        "nss2.html",
        "nsh.html",
        "nsm.html",
        "nsg.html",
        "nsH.html",

        "lecture.html",
        "impq.html",

        "boku.html",
        "boke.html",
        "bokmt1.html",
        "bokmt2.html",
        "boks1.html",
        "boks2.html",
        "bokh.html",
        "bokm.html",
        "bokg.html",
        "bokH.html",

        "c.q.a.html",
        "c.q.a.v.html",

        "f.q.p.html",
        "f.p.g.html",
        "f.s.q.a.html",
        "f.imp.html",
        "f.b10.html",
        "f.s.v.html",
        "f.pattern.html",

        "thanks.html"

    ];


    /* ==========================================
       NORMALIZE TEXT
       ========================================== */

    function normalize(text) {

        return text
            .toLowerCase()
            .replace(/\s+/g, " ")
            .trim();

    }


    /* ==========================================
       REMOVE OLD HIGHLIGHT
       ========================================== */

    function removeHighlight() {

        document
            .querySelectorAll(".search-highlight")
            .forEach(function (element) {

                element.classList.remove(
                    "search-highlight"
                );

            });

    }


    /* ==========================================
       SEARCH CURRENT PAGE
       ========================================== */

    function searchCurrentPage(searchText) {

        removeHighlight();


        const elements =
            document.querySelectorAll(
                "h1, h2, h3, h4, h5, h6, p, button, a, option, span"
            );


        for (let element of elements) {

            const text =
                normalize(element.textContent);


            if (
                text.includes(searchText) &&
                text.trim() !== ""
            ) {

                element.classList.add(
                    "search-highlight"
                );


                element.scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });


                return true;

            }

        }


        return false;

    }


    /* ==========================================
       SEARCH OTHER PAGE
       ========================================== */

    async function searchOtherPages(searchText) {


        for (let page of pages) {


            if (
                page.toLowerCase() ===
                location.pathname
                    .split("/")
                    .pop()
                    .toLowerCase()
            ) {

                continue;

            }


            try {

                const response =
                    await fetch(page);


                if (!response.ok) {
                    continue;
                }


                const html =
                    await response.text();


                const parser =
                    new DOMParser();


                const documentPage =
                    parser.parseFromString(
                        html,
                        "text/html"
                    );


                const elements =
                    documentPage.querySelectorAll(
                        "h1, h2, h3, h4, h5, h6, p, button, a, option, span"
                    );


                let found = false;


                for (
                    let element of elements
                ) {

                    const text =
                        normalize(
                            element.textContent
                        );


                    if (
                        text.includes(
                            searchText
                        ) &&
                        text.trim() !== ""
                    ) {

                        found = true;

                        break;

                    }

                }


                if (found) {

                    goToPage(
                        page,
                        searchText
                    );

                    return;

                }


            } catch (error) {

                console.log(
                    "Page search error:",
                    page
                );

            }

        }


        alert(
            "Search result nahi mila."
        );

    }


    /* ==========================================
       GO TO OTHER PAGE
       ========================================== */

    function goToPage(
        page,
        searchText
    ) {

        const url =
            page +
            "?search=" +
            encodeURIComponent(
                searchText
            );


        window.location.href = url;

    }


    /* ==========================================
       MAIN SEARCH
       ========================================== */

    async function searchWebsite() {


        const searchText =
            normalize(
                searchInput.value
            );


        if (searchText === "") {

            alert(
                "Please search something."
            );

            searchInput.focus();

            return;

        }


        /* FIRST CURRENT PAGE */

        const found =
            searchCurrentPage(
                searchText
            );


        if (found) {

            return;

        }


        /* THEN OTHER PAGES */

        await searchOtherPages(
            searchText
        );

    }


    /* ==========================================
       SEARCH ICON
       ========================================== */

    searchButton.addEventListener(
        "click",
        searchWebsite
    );


    /* ==========================================
       ENTER KEY
       ========================================== */

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                searchWebsite();

            }

        }
    );


    /* ==========================================
       SEARCH AFTER OPENING ANOTHER PAGE
       ========================================== */

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const searchedText =
        urlParams.get("search");


    if (searchedText) {

        searchInput.value =
            searchedText;


        setTimeout(
            function () {

                searchCurrentPage(
                    normalize(
                        searchedText
                    )
                );

            },
            300
        );

    }


    /* ==========================================
       MORE MENU
       ========================================== */

    const moreButton =
        document.getElementById(
            "moreButton"
        );

    const moreMenu =
        document.getElementById(
            "moreMenu"
        );


    if (
        moreButton &&
        moreMenu
    ) {

        moreButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                if (
                    moreMenu.style.display ===
                    "block"
                ) {

                    moreMenu.style.display =
                        "none";

                } else {

                    moreMenu.style.display =
                        "block";

                }

            }
        );


        moreMenu.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );


        document.addEventListener(
            "click",
            function () {

                moreMenu.style.display =
                    "none";

            }
        );

    }

});