/* =========================================================
   CODED BY TIBA
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. PAGE LOADER
    ===================================================== */

    const pageLoader = document.getElementById("pageLoader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (pageLoader) {
                pageLoader.classList.add("loaded");
            }

        }, 500);

    });


    /* =====================================================
       02. MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        /* Close menu when clicking a link */

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       03. CLOSE MOBILE MENU OUTSIDE
    ===================================================== */

    document.addEventListener("click", event => {

        if (!menuToggle || !navLinks) return;

        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedToggle &&
            navLinks.classList.contains("active")
        ) {

            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* =====================================================
       04. SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("active");

                            observer.unobserve(entry.target);

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("active");

        });

    }


    /* =====================================================
       05. SMOOTH ANCHOR SCROLLING
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const header =
                document.querySelector(".site-header");

            const headerHeight =
                header
                    ? header.offsetHeight + 15
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       06. NAVBAR SCROLL BEHAVIOUR
    ===================================================== */

    const header =
        document.querySelector(".site-header");

    let previousScroll = window.scrollY;

    window.addEventListener(
        "scroll",
        () => {

            const currentScroll =
                window.scrollY;

            if (!header) return;


            /* Small visual change after scrolling */

            if (currentScroll > 50) {

                header.style.paddingTop = "12px";

            } else {

                header.style.paddingTop = "20px";

            }


            /* Hide header while scrolling down */

            if (
                currentScroll > previousScroll &&
                currentScroll > 180
            ) {

                header.style.transform =
                    "translateY(-120px)";

            } else {

                header.style.transform =
                    "translateY(0)";

            }

            previousScroll = currentScroll;

        },
        {
            passive: true
        }
    );


    /* =====================================================
       07. CUSTOM CURSOR
    ===================================================== */

    const cursorDot =
        document.querySelector(".cursor-dot");

    const cursorOutline =
        document.querySelector(".cursor-outline");

    const supportsFinePointer =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    if (
        cursorDot &&
        cursorOutline &&
        supportsFinePointer
    ) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let outlineX = mouseX;
        let outlineY = mouseY;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX = event.clientX;
                mouseY = event.clientY;

                cursorDot.style.left =
                    `${mouseX}px`;

                cursorDot.style.top =
                    `${mouseY}px`;

            }
        );


        const animateCursor = () => {

            outlineX +=
                (mouseX - outlineX) * 0.16;

            outlineY +=
                (mouseY - outlineY) * 0.16;

            cursorOutline.style.left =
                `${outlineX}px`;

            cursorOutline.style.top =
                `${outlineY}px`;

            requestAnimationFrame(
                animateCursor
            );

        };

        animateCursor();


        /* Interactive elements */

        const interactiveElements =
            document.querySelectorAll(
                "a, button, .service-card, .project-card, .stack-item"
            );


        interactiveElements.forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursorOutline.classList.add(
                        "active"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursorOutline.classList.remove(
                        "active"
                    );

                }
            );

        });

    }


    /* =====================================================
       08. PROJECT CARD INTERACTION
    ===================================================== */

    const projectCards =
        document.querySelectorAll(".project-card");


    projectCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    !window.matchMedia(
                        "(hover: hover) and (pointer: fine)"
                    ).matches
                ) {
                    return;
                }

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    (y - centerY) /
                    centerY *
                    -1.2;

                const rotateY =
                    (x - centerX) /
                    centerX *
                    1.2;

                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "perspective(1000px) rotateX(0deg) rotateY(0deg)";

            }
        );

    });


    /* =====================================================
       09. MAGNETIC BUTTONS
    ===================================================== */

    const magneticElements =
        document.querySelectorAll(
            ".btn, .nav-cta, .social-button, .back-top"
        );


    magneticElements.forEach(element => {

        element.addEventListener(
            "mousemove",
            event => {

                if (
                    !window.matchMedia(
                        "(hover: hover) and (pointer: fine)"
                    ).matches
                ) {
                    return;
                }

                const rect =
                    element.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                element.style.transform =
                    `translate(${x * 0.08}px, ${y * 0.08}px)`;

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                element.style.transform = "";

            }
        );

    });


    /* =====================================================
       10. STACK ICON MICRO-INTERACTION
    ===================================================== */

    const stackItems =
        document.querySelectorAll(".stack-item");


    stackItems.forEach(item => {

        item.addEventListener(
            "mouseenter",
            () => {

                const icon =
                    item.querySelector("i");

                if (!icon) return;

                icon.style.transform =
                    "translateY(-5px) scale(1.08)";

            }
        );


        item.addEventListener(
            "mouseleave",
            () => {

                const icon =
                    item.querySelector("i");

                if (!icon) return;

                icon.style.transform = "";

            }
        );

    });


    /* =====================================================
       11. SERVICE CARD MICRO-INTERACTION
    ===================================================== */

    const serviceCards =
        document.querySelectorAll(".service-card");


    serviceCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    !window.matchMedia(
                        "(hover: hover) and (pointer: fine)"
                    ).matches
                ) {
                    return;
                }

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const icon =
                    card.querySelector(".service-icon");

                if (!icon) return;

                const moveX =
                    (x - rect.width / 2) * 0.015;

                const moveY =
                    (y - rect.height / 2) * 0.015;

                icon.style.transform =
                    `translate(${moveX}px, ${moveY}px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                const icon =
                    card.querySelector(".service-icon");

                if (!icon) return;

                icon.style.transform = "";

            }
        );

    });


    /* =====================================================
       12. ACTIVE NAVIGATION SECTION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navigationLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    if (
        sections.length &&
        navigationLinks.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const id =
                            entry.target.getAttribute("id");

                        navigationLinks.forEach(link => {

                            link.classList.remove(
                                "active"
                            );

                            if (
                                link.getAttribute("href") ===
                                `#${id}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    });

                },
                {
                    threshold: 0.25,
                    rootMargin:
                        "-15% 0px -55% 0px"
                }
            );


        sections.forEach(section => {

            sectionObserver.observe(section);

        });

    }


    /* =====================================================
       13. CREATOR ORBIT — GENTLE MOTION
    ===================================================== */

    const creatorVisual =
        document.querySelector(".creator-visual");


    if (creatorVisual) {

        creatorVisual.addEventListener(
            "mousemove",
            event => {

                if (
                    !window.matchMedia(
                        "(hover: hover) and (pointer: fine)"
                    ).matches
                ) {
                    return;
                }

                const rect =
                    creatorVisual.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height -
                    0.5;

                const core =
                    creatorVisual.querySelector(
                        ".creator-core"
                    );

                if (core) {

                    core.style.transform =
                        `translate(
                            ${x * 12}px,
                            ${y * 12}px
                        )`;

                }

            }
        );


        creatorVisual.addEventListener(
            "mouseleave",
            () => {

                const core =
                    creatorVisual.querySelector(
                        ".creator-core"
                    );

                if (core) {
                    core.style.transform = "";
                }

            }
        );

    }


    /* =====================================================
       14. CURRENT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById("currentYear");


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       15. IMAGE LAZY LOADING
    ===================================================== */

    const images =
        document.querySelectorAll("img");


    images.forEach(image => {

        if (!image.hasAttribute("loading")) {

            image.setAttribute(
                "loading",
                "lazy"
            );

        }

        if (!image.hasAttribute("decoding")) {

            image.setAttribute(
                "decoding",
                "async"
            );

        }

    });


    /* =====================================================
       16. EXTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll('a[target="_blank"]')
        .forEach(link => {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        });


    /* =====================================================
       17. PAGE VISIBILITY
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                document
                    .querySelectorAll(
                        ".creator-orbit"
                    )
                    .forEach(orbit => {

                        orbit.style.animationPlayState =
                            "paused";

                    });

            } else {

                document
                    .querySelectorAll(
                        ".creator-orbit"
                    )
                    .forEach(orbit => {

                        orbit.style.animationPlayState =
                            "running";

                    });

            }

        }
    );


    /* =====================================================
       18. RESIZE CLEANUP
    ===================================================== */

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {

                if (
                    window.innerWidth > 760 &&
                    navLinks
                ) {

                    navLinks.classList.remove(
                        "active"
                    );

                    if (menuToggle) {

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }

            }, 200);

        }
    );


});