// Lightweight site behaviors. Everything stays readable and usable without this script.

// "Applications" menu: <details> works on its own. This adds:
// - mouse hover: opens on enter, closes shortly after leaving (the delay lets
//   the pointer cross the gap to the panel);
// - click on the summary pins it open (it then stays open when the pointer
//   leaves); clicking it again closes it;
// - closes on outside click, on Escape and when focus leaves it.
document.querySelectorAll(".nav-menu").forEach((menu) => {
  const summary = menu.querySelector("summary");
  let closeTimer;
  let pinned = false;

  const close = () => {
    menu.open = false;
    pinned = false;
  };

  summary.addEventListener("click", (event) => {
    event.preventDefault();
    clearTimeout(closeTimer);
    if (menu.open && pinned) {
      close();
    } else {
      menu.open = true;
      pinned = true;
    }
  });

  menu.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "mouse") return;
    clearTimeout(closeTimer);
    menu.open = true;
  });

  menu.addEventListener("pointerleave", (event) => {
    if (event.pointerType !== "mouse" || pinned) return;
    closeTimer = setTimeout(close, 150);
  });

  document.addEventListener("click", (event) => {
    if (menu.open && !menu.contains(event.target)) close();
  });

  menu.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.open) {
      close();
      summary.focus();
    }
  });

  menu.addEventListener("focusout", (event) => {
    if (event.relatedTarget && !menu.contains(event.relatedTarget)) close();
  });
});

// Pointer-following glow (.spotlight): position exposed as --mx / --my.
if (window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".spotlight").forEach((el) => {
    el.addEventListener("pointermove", (event) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      el.style.setProperty("--my", `${event.clientY - rect.top}px`);
    });
  });
}
