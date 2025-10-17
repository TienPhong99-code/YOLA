export default function ScrollTriggerModule() {
  gsap.registerPlugin(ScrollTrigger);

  const isAboutPage = document.querySelector(".page-about");

  const setupAnimation = () => {
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

    const wrapIndex = gsap.utils.wrap(0, count);
    function setFront(index) {
      items.forEach((el, i) => {
        el.classList.toggle("is-front", i === index);
      });
    }

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
        onUpdate: updateFront,

        onRefresh: updateFront,
      },
      onUpdate: updateFront,
    });

    updateFront();

    return () => {
      if (anim) {
        anim.scrollTrigger.kill();
        anim.kill();
        gsap.set(stage, { rotationX: 0, height: "auto" });
        items.forEach((el) => gsap.set(el, { clearProps: "all" }));
        setFront(-1);
      }
    };
  };

  let killAnimation = null;

  if (isAboutPage) {
    gsap.matchMedia().add(
      "(max-width: 499px)",
      () => {
        killAnimation = setupAnimation();

        return () => {
          if (killAnimation) killAnimation();
        };
      },
      ScrollTrigger.isInViewport(".sec-snum")
    );
  } else {
    killAnimation = setupAnimation();
  }
}
