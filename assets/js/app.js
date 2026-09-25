document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Language toggle ----------
     Russian is the default markup. Every translatable node carries its English
     text in data-en (innerHTML) or data-en-<attr> (attributes). */
  const ATTRS = ["alt", "title", "aria-label", "href", "content"];
  const root = document.documentElement;
  const langButtons = document.querySelectorAll("[data-lang]");

  const setLang = (lang) => {
    root.lang = lang;
    document.querySelectorAll("[data-en]").forEach((el) => {
      const isTitle = el.tagName === "TITLE";
      if (el.dataset.ru === undefined) el.dataset.ru = isTitle ? el.textContent : el.innerHTML;
      const value = lang === "en" ? el.dataset.en : el.dataset.ru;
      if (isTitle) el.textContent = value;
      else el.innerHTML = value;
    });
    ATTRS.forEach((attr) => {
      document.querySelectorAll(`[data-en-${attr}]`).forEach((el) => {
        if (!el.hasAttribute(`data-ru-${attr}`)) el.setAttribute(`data-ru-${attr}`, el.getAttribute(attr) || "");
        el.setAttribute(attr, el.getAttribute(`data-${lang === "en" ? "en" : "ru"}-${attr}`));
      });
    });
    langButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    try { localStorage.setItem("lang", lang); } catch (e) { /* storage may be blocked */ }
  };

  langButtons.forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));

  let initial = "ru";
  try {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    initial = fromUrl || localStorage.getItem("lang") || "ru";
  } catch (e) { /* ignore */ }
  if (initial === "en") setLang("en");

  /* ---------- Mobile nav ---------- */
  const burger = document.querySelector(".burger");
  const nav = document.getElementById("nav");
  const closeNav = () => {
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  };
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));

  /* ---------- Program tabs ---------- */
  const tabs = [...document.querySelectorAll(".tab")];
  const panes = [...document.querySelectorAll(".pane")];
  const select = (tab) => {
    tabs.forEach((t) => t.setAttribute("aria-selected", String(t === tab)));
    panes.forEach((p) => { p.hidden = p.id !== tab.getAttribute("aria-controls"); });
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      next.focus();
      select(next);
    });
  });

  /* ---------- Gallery arrows ---------- */
  const rail = document.getElementById("rail");
  document.querySelectorAll(".arrow").forEach((btn) => {
    btn.addEventListener("click", () => {
      rail.scrollBy({ left: Number(btn.dataset.dir) * rail.clientWidth * 0.7, behavior: "smooth" });
    });
  });
});
