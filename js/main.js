/* PrimeCut Butchers — main interactions */
(function () {
  "use strict";

  /* ---------- Toast ---------- */
  function toast(msg) {
    var wrap = document.getElementById("toastWrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "toastWrap";
      wrap.setAttribute("aria-live", "polite");
      document.body.appendChild(wrap);
    }
    var el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    el.textContent = msg;
    wrap.appendChild(el);
    setTimeout(function () {
      el.classList.add("out");
      setTimeout(function () { el.remove(); }, 350);
    }, 2600);
  }
  window.toast = toast;

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (e) { e.classList.add("visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Product filter ---------- */
  function initFilters() {
    var btns = document.querySelectorAll("[data-filter]");
    var cards = document.querySelectorAll("[data-category]");
    if (!btns.length || !cards.length) return;
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        btns.forEach(function (b) { b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
        var f = btn.getAttribute("data-filter").toLowerCase();
        var count = 0;
        cards.forEach(function (card) {
          var cat = (card.getAttribute("data-category") || "").toLowerCase();
          var show = f === "all" || cat === f;
          card.style.display = show ? "" : "none";
          if (show) count++;
        });
        var info = document.getElementById("filterCount");
        if (info) info.textContent = count + (count === 1 ? " cut shown" : " cuts shown");
      });
    });
  }

  /* ---------- FAQ accordion ---------- */
  function initFAQ() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var btn = item.querySelector(".faq-q");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var open = item.classList.contains("open");
        document.querySelectorAll(".faq-item.open").forEach(function (o) {
          o.classList.remove("open");
          var b = o.querySelector(".faq-q");
          if (b) b.setAttribute("aria-expanded", "false");
        });
        if (!open) {
          item.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ---------- Enquiry buttons -> prefill custom cut form ---------- */
  function initEnquiryButtons() {
    document.querySelectorAll("[data-enquire]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var product = btn.getAttribute("data-enquire") || "a fresh cut";
        try { sessionStorage.setItem("enquiry-product", product); } catch (e) {}
        toast("Added to enquiry: " + product);
      });
    });
    // Prefill on custom-cuts page
    var pre = null;
    try { pre = sessionStorage.getItem("enquiry-product"); } catch (e) {}
    var msg = document.getElementById("ccMessage");
    if (msg && pre) {
      if (!msg.value) msg.value = "Hi! I would like to request: " + pre + ". ";
      var note = document.getElementById("prefillNote");
      if (note) { note.textContent = "Prefilled with: " + pre; note.classList.remove("hidden"); }
    }
  }

  /* ---------- Custom cut builder + live summary ---------- */
  function initCustomCut() {
    var form = document.getElementById("customCutForm");
    if (!form) return;
    var summary = {
      meat: document.getElementById("sumMeat"),
      cut: document.getElementById("sumCut"),
      qty: document.getElementById("sumQty"),
      mode: document.getElementById("sumMode")
    };
    function update() {
      var meat = form.querySelector('input[name="meat"]:checked');
      var cut = form.querySelector('input[name="cut"]:checked');
      var qty = form.querySelector('input[name="qty"]:checked');
      var mode = form.querySelector("#ccMode");
      if (summary.meat) summary.meat.textContent = meat ? meat.value : "—";
      if (summary.cut) summary.cut.textContent = cut ? cut.value : "—";
      if (summary.qty) summary.qty.textContent = qty ? qty.value : "—";
      if (summary.mode) summary.mode.textContent = mode && mode.value ? mode.value : "—";
    }
    form.addEventListener("change", update);
    update();
    // clear meat error once chosen
    form.querySelectorAll('input[name="meat"]').forEach(function (r) {
      r.addEventListener("change", function () {
        var me = document.getElementById("meatError");
        if (me) me.classList.add("hidden");
      });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateForm(form)) { toast("Please complete the required fields"); return; }
      toast("Enquiry submitted successfully");
      showSuccess("orderSuccess");
      form.reset();
      update();
    });
  }

  /* ---------- Generic validation ---------- */
  function setInvalid(input, on, msg) {
    var field = input.closest(".field");
    if (!field) return;
    field.classList.toggle("invalid", on);
    var err = field.querySelector(".error-msg");
    if (err && msg) err.textContent = msg;
  }

  function validateForm(form) {
    var ok = true;
    var name = form.querySelector('[name="name"]');
    var phone = form.querySelector('[name="phone"]');
    var email = form.querySelector('[name="email"]');
    if (name) {
      var bad = !name.value.trim() || name.value.trim().length < 2;
      setInvalid(name, bad, "Please enter your full name.");
      if (bad) ok = false; 
    }
    if (phone) {
      var digits = phone.value.replace(/\D/g, "");
      var badP = digits.length < 7 || digits.length > 15;
      setInvalid(phone, badP, "Please enter a valid phone number.");
      if (badP) ok = false;
    }
    if (email && email.hasAttribute("required")) {
      var badE = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      setInvalid(email, badE, "Please enter a valid email address.");
      if (badE) ok = false;
    } else if (email && email.value.trim()) {
      var badE2 = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      setInvalid(email, badE2, "Please enter a valid email address.");
      if (badE2) ok = false;
    }
    // meat required on custom-cut form
    var meatChecked = form.querySelector('input[name="meat"]:checked');
    var meatGroup = form.querySelector('[data-require="meat"]');
    var meatError = form.querySelector("#meatError");
    if (form.id === "customCutForm" && meatGroup) {
      var badM = !meatChecked;
      meatGroup.classList.toggle("invalid", badM);
      if (meatError) meatError.classList.toggle("hidden", !badM);
      if (badM) {
        ok = false;
        meatGroup.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    var msg = form.querySelector('[name="message"]');
    if (msg && msg.hasAttribute("required")) {
      var badMsg = !msg.value.trim();
      setInvalid(msg, badMsg, "Please enter your message.");
      if (badMsg) ok = false;
    }
    return ok;
  }

  function showSuccess(id) {
    var el = document.getElementById(id);
    if (el) {
      el.classList.remove("hidden");
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function initContactForms() {
    ["contactForm", "orderFormInline"].forEach(function (id) {
      var f = document.getElementById(id);
      if (!f) return;
      // live clear errors
      f.querySelectorAll("input,textarea,select").forEach(function (inp) {
        inp.addEventListener("input", function () { setInvalid(inp, false); });
        inp.addEventListener("change", function () { setInvalid(inp, false); });
      });
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!validateForm(f)) { toast("Please complete the required fields"); return; }
        toast("Enquiry submitted successfully");
        var s = f.querySelector(".form-success");
        if (s) { s.classList.remove("hidden"); s.scrollIntoView({ behavior: "smooth", block: "center" }); }
        else showSuccess("contactSuccess");
        f.reset();
      });
    });
  }

  /* ---------- Quantity custom toggle ---------- */
  function initQtyCustom() {
    var custom = document.getElementById("qtyCustomRadio");
    var customInput = document.getElementById("qtyCustom");
    if (!custom || !customInput) return;
    document.querySelectorAll('input[name="qty"]').forEach(function (r) {
      r.addEventListener("change", function () {
        customInput.disabled = !custom.checked;
        if (custom.checked) customInput.focus();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initReveal();
    initFilters();
    initFAQ();
    initEnquiryButtons();
    initCustomCut();
    initContactForms();
    initQtyCustom();
  });
})();
