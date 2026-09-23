// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Contact form: Formspree-compatible progressive enhancement.
  // Submits normally if JS fails; if JS runs, intercepts to show an
  // inline success message instead of a full page redirect.
  const form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      const successBox = document.querySelector("[data-form-success]");
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (response.ok) {
          form.reset();
          if (successBox) successBox.classList.add("is-visible");
        } else {
          alert("Something went wrong sending your message — please email us directly.");
        }
      } catch {
        alert("Something went wrong sending your message — please email us directly.");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send message";
      }
    });
  }
});
