gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// create the smooth scroller FIRST!
const smoother = ScrollSmoother.create({
  wrapper: "#wrapper",
  content: "#content",
  smooth: 1,
  normalizeScroll: true, // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
  ignoreMobileResize: true, // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
  effects: true,
  preventDefault: true,
});

let tl = gsap.timeline();
let mySplitText = new SplitText("#split-stagger", { type: "words,chars" });
let chars = mySplitText.chars;

chars.forEach((char, i) => {
  smoother.effects(char, { speed: 1, lag: (i + 1) * 0.1 });
});

let split, tln;

const createSplit = () => {
  split && split.revert();
  tln && tln.revert();
  split = new SplitText("p", {
    type: "chars",
  });

  tln = gsap
    .timeline({
      scrollTrigger: {
        trigger: "#textSection",
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 0.75,
        markers: false,
      },
    })
    .set(
      split.chars,
      {
        color: "#ffcc66",
        stagger: 0.1,
      },

      0.1
    );
};
createSplit();
const debouncer = gsap.delayedCall(0.2, createSplit).pause();

window.addEventListener("resize", () => debouncer.restart(true));
