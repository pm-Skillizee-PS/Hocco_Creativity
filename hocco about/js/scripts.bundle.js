"use strict";

const GS = gsap;
const TL = GS.timeline();
const INTRO = GS.timeline();
const JUMP = document.getElementById("jumping");

const cursorNormal = new Image();
const cursorHover = new Image();
cursorNormal.src =
  "https://www.hocco.in/wp-content/themes/hocco/assets/images/illustration/cursor-normal.svg";
cursorHover.src =
  "https://www.hocco.in/wp-content/themes/hocco/assets/images/illustration/cursor-hover.svg";
const cursor = document.createElement("div");
cursor.id = "cursor";
cursor.append(cursorNormal);

if (window.innerWidth > 1200) {
  document.body.style.cursor = "none";
  document.body.appendChild(cursor);
}

let loadTimer = null;

GS.registerPlugin(MotionPathPlugin, ScrollTrigger);

const Bundle = (function () {
  const customCursor = () => {
    GS.set(cursor, { opacity: 0 });

    $(document).on("mousemove", function (e) {
      GS.to(cursor, 0.15, { opacity: 1, y: e.clientY, x: e.clientX });
    });

    $(document).on("mouseleave", function () {
      GS.to(cursor, 0.15, { opacity: 0 });
    });

    $(document).on("mouseenter", function () {
      GS.to(cursor, 0.15, { opacity: 1 });
    });
  };

  const cursorInteraction = () => {
    const $link = $(
      'a, button, input[type="submit"], input[type="button"], .swiper-pagination-bullet, .swiper-button-prev, .swiper-button-next'
    );
    setTimeout(() => {
      $link.hover(
        function (e) {
          cursor.innerHTML = "";
          cursor.append(cursorHover);
          // GS.to(cursor, 0.15, { scale: 1.2 });
        },
        function () {
          cursor.innerHTML = "";
          cursor.append(cursorNormal);
          // GS.to(cursor, 0.15, { scale: 1 });
        }
      );
    }, 1);
  };

  const intro = () => {
    const title = document.getElementById("intro_title");
    const btn = document.querySelector(".intro-btn");
    const split = Splitting({ target: title, by: "lines" });

    INTRO.to("#header", {
      opacity: 1,
    }).to("#header .header-container", {
      opacity: 1,
      y: 0,
      ease: Power4.easeOut,
    });

    if (title) {
      title.innerHTML = "";
      Array.from(split).forEach((el) => {
        const lines = el.lines;
        Array.from(lines).forEach((line) => {
          let html = "";
          Array.from(line).forEach((item, i) => {
            html += item.innerHTML + " ";
          });
          const span = '<span class="intro-title-line">' + html + "</span>";
          title.innerHTML += span;
        });
      });

      const lines = GS.utils.toArray(".intro-title-line");

      GS.set(title, { opacity: 1 });
      GS.set(btn, { y: 150 });
      GS.set(".intro-vector-1", { x: -200 });
      GS.set(".intro-vector-2", { y: -80 });
      GS.set(".intro-vector-3", { x: 200 });
      GS.set(btn, { y: 150 });
      Array.from(lines).forEach((line, i) => {
        GS.set(line, { y: i * 100 });
      });

      INTRO.to(
        lines,
        {
          duration: 1.5,
          opacity: 1,
          y: 0,
          ease: Power4.easeOut,
        },
        "-=.5"
      )
        .to(
          "#goo feGaussianBlur",
          {
            duration: 1.15,
            attr: { stdDeviation: 0 },
            onStart: () => title.classList.add("active"),
            onComplete: () => title.classList.remove("active"),
          },
          "-=1.5"
        )
        .to(
          btn,
          {
            opacity: 1,
            y: 0,
            ease: Power4.easeOut,
          },
          "-=1"
        )
        .to(
          ".intro-vector-1, .intro-vector-3",
          {
            opacity: 1,
            x: 0,
            ease: Power4.easeOut,
          },
          "-=0.5"
        )
        .to(
          ".intro-vector-2",
          {
            opacity: 1,
            y: 0,
            ease: Power4.easeOut,
            clearProps: "y",
          },
          "-=0.5"
        );
    }
  };

  const scrollToElement = () => {
    $('a[href^="#"]').on("click", function (event) {
      const target = $(this.getAttribute("href"));
      if (target.length) {
        event.preventDefault();
        $("html, body").stop().animate(
          {
            scrollTop: target.offset().top,
          },
          1000
        );
      }
    });
  };

  const menu = () => {
    const navbar = $("#header .navbar");
    const hamburger = $("#hamburger");
    const icon = $(".menu-item-has-children .has-submenu__icon");
    const submenu = $(".sub-menu");
    const active = "active";

    hamburger.on("click", function (e) {
      e.stopPropagation();
      $(this).toggleClass(active);
      icon.removeClass(active);
      navbar.slideToggle();
      submenu.slideUp();
    });

    icon.on("click", function (e) {
      e.stopPropagation();
      $(this).toggleClass(active);
      $(this).next().slideToggle();
    });
  };

  const product = () => {
    const product = document.getElementById("product");
    const thumb = GS.utils.toArray("#product .product-thumb")[0];
    const items = GS.utils.toArray("#product .product-thumb__item");
    const wraps = GS.utils.toArray("#product .product-thumb__wrap");
    const links = GS.utils.toArray("#product .product-thumb__link");
    const images = GS.utils.toArray("#product .product-image__item");
    let itemRotate = 45;
    let itemGap = 12.75;
    let timer = null;
    const ST = {
      trigger: "#product",
      start: "70% bottom",
    };

    if (product) {
      function animate() {
        let activeZIndex = 3;
        let lastZIndex = 2;
        let activeIndex = items.length - 2;
        let lastIndex = items.length - 1;

        const interval = () => {
          const rect = links[activeIndex].getBoundingClientRect();
          const pos = {
            x: rect.x + rect.width / 2,
            y:
              $(links[activeIndex]).offset().top -
              product.offsetTop +
              rect.height / 1.5,
          };

          GS.fromTo(
            images[activeIndex],
            {
              clipPath: "circle(0% at " + pos.x + "px " + pos.y + "px)",
            },
            {
              duration: 2,
              clipPath:
                "circle(90vmax at " +
                window.innerWidth / 2 +
                "px " +
                window.innerHeight / 2 +
                "px)",
              clearProps: "clipPath",
              ease: Power2.easeInOut,
              onStart: () => {
                GS.set(images, { zIndex: 1 });
                GS.set(images[activeIndex], { zIndex: activeZIndex });
                GS.set(images[lastIndex], { zIndex: lastZIndex });
                items.forEach((item, i) => {
                  item.classList.remove("active");
                });
                items[activeIndex].classList.add("active");

                GS.fromTo(
                  images[activeIndex].querySelector("img"),
                  {
                    scale: 0.75,
                  },
                  {
                    scale: 1,
                    duration: 2.5,
                  }
                );
              },
              onComplete: () => {
                lastIndex = activeIndex;
                if (activeIndex === 0) {
                  activeIndex = items.length - 1;
                } else {
                  activeIndex--;
                }
                timer = setTimeout(interval, 5000);
              },
            }
          );
        };

        timer = setTimeout(interval, 5000);
        $(links).on("click", function () {
          if (timer) {
            clearTimeout(timer);
          }
          activeIndex = $(this).parent().parent().index();
          interval();
        });
      }

      if (window.innerWidth < 768) {
        itemRotate = 129;
        itemGap = 24;
      }

      GS.set(thumb, { rotate: -100 });
      items.forEach((item, i) => {
        GS.set(item, {
          attr: {
            style:
              "--item-rotate: rotate(" +
              itemRotate +
              "deg); --link-rotate: rotate(" +
              -itemRotate +
              "deg); opacity: 1",
          },
        });
        itemRotate = itemRotate - itemGap;
      });

      GS.to(thumb, {
        rotate: 0,
        duration: 1,
        scrollTrigger: ST,
        ease: Back.easeOut.config(1.7),
      });

      GS.fromTo(
        wraps,
        {
          opacity: 0,
          rotate: -45,
        },
        {
          stagger: 0.1,
          rotate: 0,
          opacity: 1,
          ease: Power4.easeOut,
          scrollTrigger: ST,
        }
      );

      GS.fromTo(
        images[images.length - 1].querySelector("img"),
        {
          opacity: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          scrollTrigger: ST,
          onStart: () => items[items.length - 1].classList.add("active"),
          onComplete: () => animate(),
        }
      );
    }
  };

  const bestSelling = () => {
    const $item = $("#best_selling .product .product__item");

    $item.hover(
      function () {
        const circles = GS.utils.toArray($(this).find("circle"));
        GS.to(circles, {
          duration: 0.75,
          scale: 1,
        });
      },
      function () {
        const circles = GS.utils.toArray($(this).find("circle"));
        GS.to(circles, {
          duration: 0.75,
          scale: 0,
        });
      }
    );
  };

  const news = () => {
    const swiper = new Swiper("#news .swiper", {
      navigation: {
        nextEl: "#news .swiper-button-next",
        prevEl: "#news .swiper-button-prev",
      },
    });
  };

  const testimonial = () => {
    const swiper = new Swiper("#testimonial .swiper", {
      spaceBetween: 24,

      autoplay: {
        delay: 7000,
        disableOnInteraction: false,
      },

      navigation: {
        nextEl: "#testimonial .swiper-button-next",
        prevEl: "#testimonial .swiper-button-prev",
      },

      pagination: {
        el: "#testimonial .swiper-pagination",
        clickable: true,
      },
    });
  };

  const footer = () => {
    const $btn = $("#jumping");
    const $image = $("#footer_animation");
    const imgWalk =
      "https://www.hocco.in/wp-content/themes/hocco/assets/images/hero/walk.gif";
    const imgJump =
      "https://www.hocco.in/wp-content/themes/hocco/assets/images/hero/jump.gif";
    const cloud1 = document.querySelector(".cloud-1");
    const cloud2 = document.querySelector(".cloud-2");
    let animationStart = false;
    let timer = null;

    const jump = (jumping = true) => {
      if (!animationStart) {
        if (jumping) {
          $image.addClass("jump").removeClass("walk");
          $image.attr("src", imgJump);
        } else {
          $image.addClass("walk").removeClass("jump");
          $image.attr("src", imgWalk);
        }
      }
    };

    const jumping = () => {
      jump();
      animationStart = true;

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        animationStart = false;
        jump(false);
      }, 1100);
    };

    TL.to("#footer_hero_bg", 65, {
      repeat: -1,
      backgroundPosition: "-10000px 0px",
      ease: Linear.easeNone,
    });

    GS.fromTo(
      cloud1,
      10,
      {
        x: 0,
      },
      {
        repeat: -1,
        ease: Linear.easeNone,
        x: -(window.innerWidth + cloud1.offsetWidth),
      }
    );

    GS.fromTo(
      cloud2,
      8,
      {
        x: 0,
        ease: Linear.easeNone,
      },
      {
        repeat: -1,
        repeatDelay: 0.2,
        ease: Linear.easeNone,
        x: -(window.innerWidth + cloud2.offsetWidth),
      }
    );

    $btn.on("click", () => jumping());
    $(document).on("keydown", (e) => {
      const { top } = $btn[0].getBoundingClientRect();
      if (e.key === " " && top < window.innerHeight) {
        $btn.focus();
        jumping();
      }
    });
  };

  const modal = () => {
    const $dataModal = $("[data-modal]");
    const $close = $("[data-close]");
    const show = "show";

    $dataModal.on("click", function () {
      const id = $(this).data("modal");
      $("body").addClass("modal-open");
      $(id).addClass(show);
      $(id).find(".modal__dialog").addClass(show);
    });

    $close.on("click", function () {
      const $container = $(this).closest(".modal");
      const $modal = $(this).closest(".modal__dialog");
      $("body").removeClass("modal-open");
      $modal.removeClass(show);
      setTimeout(() => {
        $container.removeClass(show);
      }, 250);
    });
  };

  const about = () => {
    const ABOUT = GS.timeline();
    const about = document.getElementById("about_slider");
    const dots = document.getElementById("about_dots");
    let timer = null;
    let animationDone = false;
    let activeIndex = 0;
    let lastIndex = activeIndex;

    if (about) {
      const slides = GS.utils.toArray("#about_slider .about-slide");
      const titles = GS.utils.toArray("#about_slider .h1");
      const texts = GS.utils.toArray("#about_slider .about-text");
      const vectors = GS.utils.toArray("#about_slider .about-vector");
      const stars = GS.utils.toArray("#about_slider .about-star");
      $("body").addClass("overflow-hidden");
      window.scrollTo(0, 0);

      const animationShow = () => {
        GS.set(slides[activeIndex], { zIndex: 2, opacity: 1 });
        return GS.timeline()
          .fromTo(
            titles[activeIndex],
            {
              opacity: 0,
            },
            {
              duration: 1.5,
              opacity: 1,
              ease: Power4.easeOut,
              onStart: () => {
                titles[activeIndex].classList.add("active"),
                  GS.to(dots.childNodes[lastIndex], { scale: 1 });
                GS.to(dots.childNodes[activeIndex], { scale: 2 });
              },
              onComplete: () => titles[activeIndex].classList.remove("active"),
            }
          )
          .fromTo(
            "#goo feGaussianBlur",
            {
              duration: 1.15,
              attr: { stdDeviation: 10 },
            },
            {
              attr: { stdDeviation: 0 },
            },
            "-=1.5"
          )
          .to(
            texts[activeIndex],
            {
              opacity: 1,
            },
            "-=.75"
          )
          .to(
            stars[activeIndex],
            {
              opacity: 1,
            },
            "-=.25"
          )
          .to(
            vectors[activeIndex],
            {
              opacity: 1,
              onComplete: () => {
                animationDone = true;
                if (activeIndex === slides.length - 1) {
                  $("body").removeClass("overflow-hidden");
                }
              },
            },
            "-=.25"
          );
      };

      const animationHide = () => {
        return GS.timeline()
          .to(texts[lastIndex], {
            opacity: 0,
            onStart: () => {
              animationDone = false;
            },
          })
          .to(
            stars[lastIndex],
            {
              opacity: 0,
            },
            "-=.5"
          )
          .to(
            vectors[lastIndex],
            {
              opacity: 0,
            },
            "-=.5"
          )
          .fromTo(
            titles[lastIndex],
            {
              duration: 1.5,
              opacity: 1,
              ease: Power4.easeOut,
            },
            {
              opacity: 0,
            },
            "-=.5"
          )
          .fromTo(
            "#goo feGaussianBlur",
            {
              duration: 1.15,
              attr: { stdDeviation: 0 },
            },
            {
              attr: { stdDeviation: 10 },
              onStart: () => titles[lastIndex].classList.add("active"),
              onComplete: () => {
                titles[lastIndex].classList.remove("active");
                GS.set(slides[lastIndex], { zIndex: 1, opacity: 0 });
              },
            },
            "-=.5"
          );
      };

      let height = 0;
      let dotsHTML = "";

      slides.forEach((el, i) => {
        const elHeight = parseInt(
          getComputedStyle(el).getPropertyValue("height"),
          10
        );
        height = height < elHeight ? elHeight : height;
        dotsHTML += "<span></span>";
      });

      about.style.height = height + "px";
      dots.innerHTML = dotsHTML;

      INTRO.add(animationShow()).fromTo(
        dots,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
        },
        "-=.5"
      );

      $("#about_intro").on("mousewheel DOMMouseScroll touchmove", function (e) {
        const delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
        if (timer) clearTimeout(timer);

        timer = setTimeout(function () {
          if (animationDone) {
            lastIndex = activeIndex;
            if (delta > 0) {
              if (activeIndex === slides.length - 1) {
                $("html, body").animate({ scrollTop: 0 });
                $("body").addClass("overflow-hidden");
              }
              activeIndex = activeIndex !== 0 ? activeIndex - 1 : activeIndex;
            } else {
              activeIndex =
                activeIndex !== slides.length - 1
                  ? activeIndex + 1
                  : activeIndex;
            }
            if (lastIndex !== activeIndex) {
              ABOUT.add(animationHide()).add(animationShow());
            }
          }
        }, 100);
      });
    }
  };

  const aboutSwiper = () => {
    const swiper = new Swiper("#about_slider .swiper", {
      spaceBetween: 24,

      autoplay: {
        delay: 7000,
        disableOnInteraction: false,
      },

      pagination: {
        el: "#about_slider .swiper-pagination",
        clickable: true,
      },
    });
  };

  const journey = () => {
    const journey = document.getElementById("journey");
    const path = "#journey_line path";
    const logo = "#journey_h";

    if (journey) {
      GS.set(logo, { y: -40, xPercent: 110 });
      GS.set("#journey_thumb", { xPercent: 20 });

      GS.to(logo, {
        scrollTrigger: {
          trigger: journey,
          start: "top center",
          end: () => "+=" + journey.getBoundingClientRect().height,
          // end: "bottom center",
          scrub: 0.25,
          onUpdate: (self) => {
            if (self.progress > 0.91) {
              GS.to("#journey_thumb", { opacity: 1, xPercent: 10 });
            }
          },
        },
        paused: true,
        ease: "none",
        // immediateRender: true,
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
        },
      });
    }
  };

  const jobs = () => {
    const job = document.getElementById("job_details");
    if (job) {
      $("#wrapper").addClass("job-details");
    }
  };

  const storeLocator = () => {
    const $card = $(".locator__card");
    const $map = $("#locator_map");
    const active = "active";

    $card.on("click", function () {
      var $this = $(this);
      var src = $this.data("iframe");

      $card.removeClass(active);
      $this.addClass(active);
      $map.attr("src", src);
    });
  };

  const productFilter = () => {
    const $productFilter = $("#product_filter");
    const $filter = $("[data-product-filter]");
    const $product = $("[data-product]");
    const year = new Date().getFullYear();
    const active = "active";
    const show = "show";

    $(`[data-product-filter="${year}"]`).addClass(active);
    $(`[data-product="${year}"]`).addClass(show);
    $productFilter.text(year);
    $filter.each((i, item) => {
      const $item = $(item);
      const filter = $item.data("product-filter");
      if (parseInt(filter, 10) > parseInt(year, 10)) {
        $item.addClass("disabled");
      }
    });

    $productFilter.on("click", function () {
      const $this = $(this);
      $this.next().slideToggle();
      $this.toggleClass(active);
    });

    $filter.on("click", function () {
      const $this = $(this);
      const selectYear = $this.data("product-filter");

      $filter.removeClass(active);
      $product.removeClass(show);
      $(`[data-product="${selectYear}"]`).addClass(show);
      $this.addClass(active);
      $productFilter.text(selectYear);
    });

    const sliderEl = document.querySelectorAll(
      ".product .product__slider .product__slider__input"
    );
    sliderEl.forEach((el) => {
      const parent = el.closest(".product__slider");
      parent.parentElement.style.setProperty(
        "--position",
        `${100 - el.value}%`
      );
      el.addEventListener("input", (e) => {
        parent.parentElement.style.setProperty(
          "--position",
          `${100 - e.target.value}%`
        );
      });
    });
  };

  const marquee = () => {
    const marquee = document.getElementById("media_marquee");
    const wrapEl = marquee.querySelector(".swiper-wrapper");

    const slideEl1 = wrapEl.cloneNode(true);
    const slideEl2 = wrapEl.cloneNode(true);
    const slideEl3 = wrapEl.cloneNode(true);
    const slides = [
      ...slideEl1.children,
      ...slideEl2.children,
      ...slideEl3.children,
    ];
    // Appends clone children to the wrap element
    slides.forEach((slideEl) => wrapEl.appendChild(slideEl));

    const loopInstance = horizontalLoop(
      marquee.querySelectorAll(".swiper-slide"),
      {
        repeat: -1,

        paddingRight: 0,

        speed: 0.5,
      }
    );

    $(marquee).hover(function() {
      loopInstance.pause();
    }, function() {
      loopInstance.play();
    });

    // Pause scrolling on hover
    // marquee.addEventListener("mouseenter", function () {
    //   loopInstance.pause(); // Assuming horizontalLoop() has a pause method
    // });

    // marquee.addEventListener("mouseleave", function () {
    //   loopInstance.play(); // Resume when mouse leaves
    // });

    // new Swiper(marquee, {
    //     slidesPerView: 'auto',
    //     spaceBetween: 24,
    //     loop: true,
    //     speed: 10000,
    //     allowTouchMove: false,
    //     centeredSlides: true,
    //     centeredSlidesBounds: true,

    //     autoplay: {
    //         delay: 0,
    //         disableOnInteraction: false,
    //         pauseOnMouseEnter: true,
    //     }
    // });
  };

  return {
    init() {
      setTimeout(() => {
        intro();
        // about();
        journey();
      }, 100);
      aboutSwiper();
      scrollToElement();
      menu();
      product();
      bestSelling();
      news();
      testimonial();
      footer();
      modal();
      jobs();
      cursorInteraction();
      storeLocator();
      productFilter();
      marquee();
    },

    loader() {
      if (window.innerWidth > 1200) customCursor();

      $("#wrapper").imagesLoaded(() => {
        $("#loader").fadeOut(50);
        this.init();
        if (loadTimer) {
          clearInterval(loadTimer);
        }
      });

      $("#loader").imagesLoaded(() => {
        $("#loading_dots").addClass("show");
      });
    },
  };
})();

const images = document.querySelectorAll("#loading img");
const active = "active";
let index = 0;

function loading() {
  $(images).removeClass(active);
  images[index].classList.add(active);
  index === images.length - 1 ? (index = 0) : index++;
}
loading();
loadTimer = setInterval(loading, 500);

jQuery(window).on("load", Bundle.loader());
jQuery(window).on("scroll", () => {
  $("#header").toggleClass("fixed-header", window.scrollY >= 100);
});
