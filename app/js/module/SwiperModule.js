export default function SwiperModule() {
  function functionSlider(element, customizeOption, typePagi) {
    const swiperSlider = document.querySelectorAll(element);
    if (swiperSlider) {
      swiperSlider.forEach((item) => {
        const swiper = item.querySelector(".swiper");
        const pagi = item.querySelector(".swiper-pagination");
        const next = item.querySelector(".swiper-next");
        const prev = item.querySelector(".swiper-prev");
        if (!typePagi) {
          typePagi = "bullets";
        }
        var slide = new Swiper(swiper, {
          watchSlidesProgress: true,
          pagination: {
            el: pagi,
            type: typePagi,
            clickable: true,
          },
          navigation: {
            nextEl: next,
            prevEl: prev,
          },
          fadeEffect: {
            crossFade: true,
          },
          ...customizeOption,
        });
      });
    }
  }
  function initGallery() {
    $(".gallery").each(function () {
      const $this = $(this);
      const $item = $this.find(".gItem");
      $(function () {
        $this.lightGallery({
          selector: $item,
          thumbnail: true,
          zoom: true,
        });
      });
    });
  }
  initGallery();
  functionSlider(".element", {
    speed: 1200,
    autoplay: {
      delay: 2600,
    },
    initialSlide: 0,
    centeredSlides: false,
    loop: false,
    effect: "slide",
  });
  functionSlider(".slideSw", {
    speed: 1200,
    //  autoplay: {
    //    delay: 2600,
    //  },
    slidesPerView: "auto",
    initialSlide: 0,
    centeredSlides: false,
    loop: false,
    effect: "slide",
  });
  if (window.innerWidth <= 1200) {
    functionSlider(".slideMb", {
      speed: 1200,
      slidesPerView: "auto",
      initialSlide: 0,
      centeredSlides: false,
      loop: false,
      effect: "slide",
    });
  }
  if (window.innerWidth >= 501) {
    functionSlider(".slidePc", {
      speed: 1200,
      slidesPerView: "auto",
      initialSlide: 0,
      centeredSlides: false,
      loop: false,
      effect: "slide",
    });
  }
  functionSlider(".slideSwLoop", {
    speed: 1200,
    //  autoplay: {
    //    delay: 2600,
    //  },
    slidesPerView: "auto",
    initialSlide: 0,
    centeredSlides: false,
    effect: "slide",
    loop: false,
  });
  functionSlider(".slideSwLogo", {
    speed: 6000,
    allowTouchMove: false,
    freeMode: true,
    freeModeMomentum: false,
    autoplay: {
      delay: 0,
    },
    slidesPerView: "auto",
    initialSlide: 0,
    centeredSlides: true,
    effect: "slide",
    loop: true,
  });
  function initSlideStu() {
    const wrappers = document.querySelectorAll(".slideStu");

    wrappers.forEach((item) => {
      const swiperEl = item.querySelector(".swiper");
      const pagi = item.querySelector(".swiper-pagination");
      const next = item.querySelector(".swiper-next");
      const prev = item.querySelector(".swiper-prev");

      // Helper: gán slide-left/slide-right + left-3/right-3 + is-active
      const applyMarkers = (swiper) => {
        const slides = swiper.slides; // NodeList các .swiper-slide (kể cả duplicate khi loop)
        const n = slides.length;
        const a = swiper.activeIndex; // index theo DOM hiện tại
        if (!n) return;

        // reset
        slides.forEach((s) => {
          s.classList.remove(
            "slide-left",
            "slide-right",
            "left-3",
            "right-3",
            "is-active"
          );
        });

        // active
        const active = slides[a];
        if (active) active.classList.add("is-active");

        // hàm tính khoảng cách vòng tròn ngắn nhất i -> a
        const delta = (i, a, n) => {
          let d = (i - a + n) % n; // [0..n-1]
          if (d > n / 2) d -= n; // -> (-n/2..n/2]
          return d; // âm: bên trái, dương: bên phải
        };

        // gán class trái/phải + đánh dấu phần tử thứ 3 mỗi phía
        let left3Idx = null,
          right3Idx = null;

        slides.forEach((slide, i) => {
          if (i === a) return;
          const d = delta(i, a, n);

          if (d < 0) {
            slide.classList.add("slide-left");
            if (d === -3) left3Idx = i;
          } else if (d > 0) {
            slide.classList.add("slide-right");
            if (d === 3) right3Idx = i;
          }
        });

        if (left3Idx !== null) slides[left3Idx].classList.add("left-3");
        if (right3Idx !== null) slides[right3Idx].classList.add("right-3");
      };

      new Swiper(swiperEl, {
        speed: 1200,
        slidesPerView: "auto",
        initialSlide: 0,
        effect: "slide",

        // defaults (ghi đè bởi breakpoints)
        loop: false,
        centeredSlides: false,

        breakpoints: {
          0: {
            slidesPerView: 2.3,
            grid: { rows: 2, fill: "row" },
            loop: false,
            centeredSlides: false,
          },
          501: {
            loop: true,
            centeredSlides: true, // active ở giữa
          },
        },

        pagination: { el: pagi, type: "bullets", clickable: true },
        navigation: { nextEl: next, prevEl: prev },

        on: {
          init: applyMarkers,
          slideChange: applyMarkers, // đổi index
          slideChangeTransitionEnd: applyMarkers, // sau animation
          resize: applyMarkers, // khi đổi viewport
        },
      });
    });
  }

  initSlideStu();
  document.addEventListener("mona-post-ajax-loaded", function () {
    initGallery();
    initSlideStu();
  });
  functionSlider(".slideFade", {
    speed: 1200,
    //  autoplay: {
    //    delay: 2600,
    //  },
    slidesPerView: "auto",
    initialSlide: 0,
    centeredSlides: false,
    loop: false,
    effect: "fade",
  });

  const prodt_silder = document.querySelectorAll(".prdsSlider");
  if (prodt_silder) {
    prodt_silder.forEach((item, i) => {
      const swiperMain = item.querySelector(".prdsMainSw .swiper");
      const swiperThumb = item.querySelector(".prdsThumbSw .swiper");

      const itemImg = new Swiper(swiperThumb, {
        speed: 1200,
        slidesPerView: "auto",
        grabCursor: true,
        loop: false,
        initialSlide: 0,
        breakpoints: {
          0: {
            slidesPerView: "auto",
          },
          1201: {
            slidesPerView: 8,
            grid: {
              rows: 2,
              fill: "row",
            },
          },
        },
        pagination: {
          el: ".stu-pagi",
          type: "bullets",
          clickable: true,
        },
      });
      //
      const itemMain = new Swiper(swiperMain, {
        speed: 1200,
        slidesPerView: "auto",
        effect: "fade",
        loop: false,
        navigation: {
          nextEl: ".prds-control .swiper-next",
          prevEl: ".prds-control .swiper-prev",
        },
        initialSlide: 0,
        fadeEffect: {
          crossFade: true,
        },
        grabCursor: true,
        thumbs: {
          swiper: itemImg,
        },
      });
    });
    //
  }
}
