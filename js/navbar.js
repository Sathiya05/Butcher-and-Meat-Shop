/* PrimeCut Butchers — Navbar (single source of truth) */
(function () {
  function initThemeDir() {
    try {
      var t = localStorage.getItem("site-theme") || "light";
      document.documentElement.setAttribute("data-theme", t);
      if (t === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      var d = localStorage.getItem("site-direction") || "ltr";
      document.documentElement.dir = d;
    } catch (e) {}
  }
  initThemeDir();

  function currentPage() {
    var p = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    if (p === "") p = "index.html";
    return p.split("?")[0].split("#")[0];
  }

  function isActive(href) {
    var c = currentPage();
    href = href.toLowerCase();
    if (href === "index.html" && (c === "index.html" || c === "")) return true;
    return c === href;
  }

  function isHomeActive() {
    var c = currentPage();
    return c === "index.html" || c === "" || c === "home2.html";
  }

  function themeIcon() {
    var t = document.documentElement.getAttribute("data-theme") || "light";
    if (t === "dark") {
      // sun
      return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
  }

  var rtlIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>';

  var logoSVG = '<span style="display:inline-flex;align-items:center;justify-content:center;width:2.6rem;height:2.6rem;border-radius:.8rem;background:#7F1D1D;color:#fff;flex-shrink:0" aria-hidden="true">'
    + '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.91a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="M22 12.65 13.5 16.5a1 1 0 0 1-.83 0L3 12.5"/></svg></span>';

  function link(href, label) {
    var a = isActive(href) ? "nav-link active" : "nav-link";
    var aria = isActive(href) ? ' aria-current="page"' : "";
    return '<a href="' + href + '" class="' + a + '"' + aria + ">" + label + "</a>";
  }

  function dropItem(href, title, desc) {
    var active = isActive(href);
    var cls = active ? "drop-item active" : "drop-item";
    var aria = active ? ' aria-current="page"' : "";
    return '<a href="' + href + '" class="' + cls + '"' + aria + '><span class="drop-title">' + title + "</span>"
      + (desc ? '<span class="drop-desc">' + desc + "</span>" : "") + "</a>";
  }

  function homeDropdownHTML() {
    var parentActive = isHomeActive() ? " active" : "";
    var expanded = "false";
    return '<div class="nav-dropdown" id="homeDropdown">'
      + '<button class="nav-link nav-drop-btn' + parentActive + '" aria-haspopup="true" aria-expanded="' + expanded + '" aria-controls="homeDropMenu" id="homeDropBtn">Home'
      + '<svg class="drop-caret" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>'
      + '<div class="drop-menu" id="homeDropMenu" role="menu" aria-label="Home versions">'
      + dropItem("index.html", "Home 1 ")
      + dropItem("home2.html", "Home 2 ")
      + "</div></div>";
  }

  function render() {
    var host = document.getElementById("navbar");
    if (!host) return;
    var dir = document.documentElement.dir || "ltr";
    var dirLabel = dir === "rtl" ? "Switch to LTR" : "Switch to RTL";

    host.innerHTML =
      '<header class="nav-shell sticky top-0 z-50">'
      + '<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">'
      + '<div class="flex items-center justify-between h-16 lg:h-[72px] gap-3">'
      + '<a href="index.html" class="flex items-center gap-3 min-w-0" aria-label="PrimeCut Butchers home">' + logoSVG
      + '<span class="leading-tight min-w-0"><span class="block font-bold text-base sm:text-lg truncate" style="font-family:\'Playfair Display\',serif">PrimeCut <span style="color:#7F1D1D" class="dark:text-[#D4A373]">Butchers</span></span>'
      + '<span class="block text-[11px] sm:text-xs muted tracking-wide truncate">Quality Cuts. Honest Sourcing.</span></span></a>'
      + '<div class="nav-desktop items-center gap-1" role="menubar">'
      + homeDropdownHTML()
      + link("about.html", "About") + link("products.html", "Products") + link("custom-cuts.html", "Custom Cuts")  + link("bulk-orders.html", "Bulk Orders") + link("contact.html", "Contact")
      + "</div>"
      + '<div class="nav-desktop items-center gap-2">'
      + '<button id="themeBtn" class="icon-btn" aria-label="Toggle theme" title="Toggle theme">' + themeIcon() + "</button>"
      + '<button id="rtlBtn" class="icon-btn" aria-label="Toggle RTL direction" title="' + dirLabel + '">' + rtlIcon + '<span id="rtlState" class="sr-only">' + dir.toUpperCase() + "</span></button>"
      + '<a href="custom-cuts.html#enquiry" class="btn-primary !py-2.5 !px-5 text-sm">Order Enquiry</a>'
      + "</div>"
      + '<div class="nav-mobile-btn items-center gap-2">'
      + '<button id="menuBtn" class="icon-btn" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">'
      + '<svg id="menuIconOpen" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>'
      + '<svg id="menuIconClose" class="hidden" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>'
      + "</button></div></div>"
      + '<div id="mobileMenu">'
      + '<div class="menu-body">'
      + '<p class="menu-label text-xs font-bold uppercase tracking-wider muted">Home</p>'
      + link("index.html", "Home 1 ") + link("home2.html", "Home 2 ")
      + link("about.html", "About")+ link("products.html", "Products") + link("custom-cuts.html", "Custom Cuts")  + link("bulk-orders.html", "Bulk Orders")  + link("contact.html", "Contact")
      + '<a href="custom-cuts.html#enquiry" class="btn-primary mobile-link">Order Enquiry</a>'
      + '<div class="menu-utils">'
      + '<div class="flex items-center gap-2"><button id="themeBtnM" class="icon-btn" aria-label="Toggle theme">' + themeIcon() + '</button><span class="text-sm font-medium">Theme</span></div>'
      + '<div class="flex items-center gap-2"><span class="text-sm font-medium">RTL / LTR</span><button id="rtlBtnM" class="icon-btn" aria-label="Toggle RTL direction">' + rtlIcon + "</button></div>"
      + "</div>"
      + "</div></div></nav></header>";

    bind();
  }

  function toggleTheme() {
    var cur = document.documentElement.getAttribute("data-theme") || "light";
    var next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try { localStorage.setItem("site-theme", next); } catch (e) {}
    refreshThemeIcons();
    if (window.toast) toast(next === "dark" ? "Dark mode enabled" : "Light mode enabled");
  }

  function refreshThemeIcons() {
    var icon = themeIcon();
    ["themeBtn", "themeBtnM"].forEach(function (id) {
      var b = document.getElementById(id);
      if (b) b.innerHTML = icon;
    });
  }

  function toggleRTL() {
    var cur = document.documentElement.dir || "ltr";
    var next = cur === "rtl" ? "ltr" : "rtl";
    document.documentElement.dir = next;
    try { localStorage.setItem("site-direction", next); } catch (e) {}
    var s = document.getElementById("rtlState");
    if (s) s.textContent = next.toUpperCase();
    if (window.toast) toast(next === "rtl" ? "RTL layout enabled" : "LTR layout enabled");
  }

  function setMenu(open) {
    var m = document.getElementById("mobileMenu");
    var btn = document.getElementById("menuBtn");
    if (!m || !btn) return;
    m.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    var o = document.getElementById("menuIconOpen");
    var c = document.getElementById("menuIconClose");
    if (o) o.classList.toggle("hidden", open);
    if (c) c.classList.toggle("hidden", !open);
  }

  function setDrop(open) {
    var wrap = document.getElementById("homeDropdown");
    var btn = document.getElementById("homeDropBtn");
    var menu = document.getElementById("homeDropMenu");
    if (!wrap || !btn || !menu) return;
    wrap.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function bind() {
    ["themeBtn", "themeBtnM"].forEach(function (id) {
      var b = document.getElementById(id);
      if (b) b.addEventListener("click", toggleTheme);
    });
    ["rtlBtn", "rtlBtnM"].forEach(function (id) {
      var b = document.getElementById(id);
      if (b) b.addEventListener("click", toggleRTL);
    });
    // Desktop Home dropdown: click toggle + hover intent + keyboard
    var dropBtn = document.getElementById("homeDropBtn");
    var dropWrap = document.getElementById("homeDropdown");
    if (dropBtn && dropWrap) {
      dropBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        setDrop(!dropWrap.classList.contains("open"));
      });
      dropWrap.addEventListener("mouseenter", function () { setDrop(true); });
      dropWrap.addEventListener("mouseleave", function () { setDrop(false); });
      dropBtn.addEventListener("keydown", function (e) {
        if (e.key === "ArrowDown") { e.preventDefault(); setDrop(true); var f = dropWrap.querySelector(".drop-item"); if (f) f.focus(); }
      });
      dropWrap.querySelectorAll(".drop-item").forEach(function (item) {
        item.addEventListener("keydown", function (e) {
          if (e.key === "Escape") { setDrop(false); dropBtn.focus(); }
        });
      });
      document.addEventListener("click", function (e) {
        if (dropWrap.classList.contains("open") && !dropWrap.contains(e.target)) setDrop(false);
      });
    }
    var btn = document.getElementById("menuBtn");
    var menu = document.getElementById("mobileMenu");
    if (btn && menu) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        setMenu(!menu.classList.contains("open"));
      });
      menu.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { setMenu(false); });
      });
      document.addEventListener("click", function (e) {
        if (menu.classList.contains("open") && !menu.contains(e.target) && !btn.contains(e.target)) setMenu(false);
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          if (menu.classList.contains("open")) { setMenu(false); btn.focus(); }
          setDrop(false);
        }
      });
    }
    window.__setMenu = setMenu;
    window.__toggleTheme = toggleTheme;
    window.__toggleRTL = toggleRTL;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
})();
