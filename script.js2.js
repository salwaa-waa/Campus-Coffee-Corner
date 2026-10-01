/* ==================================================
   CAMPUS COFFEE CORNER
   JAVASCRIPT
================================================== */


/* ================= DARK MODE ================= */

const themeToggle =
    document.getElementById("themeToggle");


themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

        themeToggle.textContent = "☀️";

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        themeToggle.textContent = "🌙";

        localStorage.setItem(
            "theme",
            "light"
        );

    }

});


/* ================= LOAD THEME ================= */

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeToggle.textContent = "☀️";

}


/* ================= MOBILE MENU ================= */

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");


menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

});


/* ================= CLOSE MOBILE MENU ================= */

const navigationLinks =
    document.querySelectorAll(".nav-links a");


navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

    });

});


/* ================= SCROLL ANIMATION ================= */

const sections =
    document.querySelectorAll(
        ".section, .post-card, .about"
    );


const observer =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "fade-in",
                        "show"
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


sections.forEach(function (section) {

    section.classList.add("fade-in");

    observer.observe(section);

});


/* ================= COMMENTS ================= */

const commentForm =
    document.getElementById("commentForm");

const commentList =
    document.getElementById("commentList");

const message =
    document.getElementById("message");


/* LOAD COMMENTS */

function loadComments() {

    const comments =
        JSON.parse(
            localStorage.getItem("comments")
        ) || [];


    commentList.innerHTML = "";


    comments.forEach(function (item) {

        const comment =
            document.createElement("div");

        comment.className =
            "comment-item";


        comment.innerHTML = `

            <strong>
                ${escapeHTML(item.name)}
            </strong>

            <p>
                ${escapeHTML(item.comment)}
            </p>

        `;


        commentList.appendChild(comment);

    });

}


/* SUBMIT COMMENT */

commentForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name")
                .value.trim();


        const comment =
            document.getElementById("comment")
                .value.trim();


        if (
            name === "" ||
            comment === ""
        ) {

            return;

        }


        const comments =
            JSON.parse(
                localStorage.getItem("comments")
            ) || [];


        comments.unshift({

            name: name,

            comment: comment

        });


        localStorage.setItem(

            "comments",

            JSON.stringify(
                comments
            )

        );


        commentForm.reset();


        message.textContent =
            "Komentar berhasil ditambahkan!";


        loadComments();


        setTimeout(function () {

            message.textContent = "";

        }, 3000);

    }
);


/* ================= SECURITY ================= */

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ================= INITIALIZE ================= */

loadComments();