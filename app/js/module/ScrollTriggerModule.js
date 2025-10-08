export default function ScrollTriggerModule() {
  //   const overlay = document.getElementById("overlay-confetti");
  //   function lanzarCelebracion() {
  //     overlay.classList.add("show");
  //     img.classList.add("active");
  //     const duration = 4 * 1000;
  //     const animationEnd = Date.now() + duration;
  //     const defaults = {
  //       startVelocity: 30,
  //       spread: 360,
  //       ticks: 60,
  //       zIndex: 1000,
  //     };

  //     function randomInRange(min, max) {
  //       return Math.random() * (max - min) + min;
  //     }

  //     const interval = setInterval(function () {
  //       const timeLeft = animationEnd - Date.now();
  //       if (timeLeft <= 0) return clearInterval(interval);

  //       confetti(
  //         Object.assign({}, defaults, {
  //           particleCount: 50,
  //           origin: {
  //             x: randomInRange(0.2, 0.8),
  //             y: randomInRange(0.2, 0.6),
  //           },
  //         })
  //       );
  //     }, 250);
  //   }
  //   function cerrarPopup() {
  //     overlay.classList.remove("show");
  //   }
  //   const cards = gsap.utils.toArray(".snum-wrapper");
  //   const hold = 0.35,
  //     dur = 0.6;
  //   const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  //   const img = document.querySelector(".snum-img .inner");
  //   cards.forEach((card, i) => {
  //     gsap.set(card, { zIndex: cards.length - i });
  //     tl.to(card, { autoAlpha: 1, duration: dur });
  //     tl.to(card, {}, "+=" + hold);
  //     if (i !== cards.length - 1) {
  //       tl.to(card, { autoAlpha: 0, scale: 1, duration: dur });
  //     }
  //   });
  //   tl.to(img, {
  //     autoAlpha: 1,
  //     duration: dur,
  //     onComplete: () => lanzarCelebracion(),
  //     onReverseComplete: () => {
  //       img.classList.remove("active");
  //       cerrarPopup();
  //     },
  //   });

  //   ScrollTrigger.create({
  //     animation: tl,
  //     trigger: ".sec-snum",
  //     pin: true,
  //     pinSpacing: true,
  //     start: "top top",
  //     end: "+=" + cards.length * 600,
  //     scrub: true,
  //     snap: cards.length > 1 ? 1 / (cards.length - 1) : false,
  //   });
  //   function updateEnd() {
  //     const st = ScrollTrigger.getAll().find(
  //       (s) => s.vars.trigger === document.querySelector(".sec-snum")
  //     );
  //     if (st) {
  //       st.vars.end = "+=" + cards.length * window.innerHeight;
  //       st.refresh();
  //     }
  //   }
  //   window.addEventListener("resize", updateEnd);
  gsap.registerPlugin(ScrollTrigger);
  //   const titleAni = document.querySelectorAll(".titleAni");
  //   Splitting({
  //     target: titleAni,
  //     by: "chars",
  //     key: null,
  //   });
  //   const titleSub = document.querySelectorAll(".titleAni");
  //   if (titleSub) {
  //     titleSub.forEach((element) => {
  //       gsap.to(element.children, {
  //         duration: 1.2,
  //         ease: "power2.out",
  //         x: 0,
  //         opacity: 1,
  //         stagger: 0.06,
  //         scrollTrigger: {
  //           trigger: element,
  //           start: "-20% 80%",
  //           end: "bottom 80%",
  //         },
  //       });
  //     });
  //   }

  const items = gsap.utils.toArray(".rolodex-item");
  const stage = document.querySelector(".rolodex-stage");
  const count = items.length;

  const hts = items.map((el) => el.getBoundingClientRect().height);
  const itemH = hts.reduce((a, b) => a + b, 0) / (count + 1.5);
  const radius = itemH / (2 * Math.sin(Math.PI / count));
  const STEP = 45;

  gsap.set(stage, { height: Math.round(2 * radius) });

  items.forEach((el, i) => {
    const angle = i * -STEP;
    gsap.set(el, {
      xPercent: -50,
      yPercent: -50,
      z: radius,
      rotateX: angle,
      transformOrigin: `50% 50% -${radius}px`,
    });
  });

  const addClass = items.map((el) => gsap.quickSetter(el, "className"));
  function setFront(index) {
    items.forEach((el, i) => {
      el.classList.toggle("is-front", i === index);
    });
  }

  const wrapIndex = gsap.utils.wrap(0, count);
  function updateFront() {
    let rot = gsap.getProperty(stage, "rotationX");

    let idx = Math.round(rot / STEP);
    idx = wrapIndex(idx);
    setFront(idx);
  }
  const img = document.querySelector(".snum-img .inner");
  const anim = gsap.to(stage, {
    rotationX: (count - 1) * STEP,
    ease: "none",
    scrollTrigger: {
      trigger: ".sec-snum",
      start: "top top",
      end: "bottom top",
      markers: false,
      pin: true,
      scrub: 1,
      onLeave: () => {
        img.classList.add("active");
      },
      onEnterBack: () => {
        img.classList.remove("active");
      },
    },
    onUpdate: updateFront,
    onRefresh: updateFront,
  });
  updateFront();
}
