/* PrimeCut Butchers — Footer (single source of truth) */
(function () {
  function render() {
    var host = document.getElementById("footer");
    if (!host) return;
    host.innerHTML =
      '<footer class="surface" style="background:var(--card);color:var(--text);border-top:1px solid var(--border)" aria-label="Footer">'
      + '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">'
      + '<div class="grid gap-10 md:grid-cols-2 lg:grid-cols-4">'
      + '<div><div class="flex items-center gap-3 mb-4">'
      + '<span style="display:inline-flex;align-items:center;justify-content:center;width:2.6rem;height:2.6rem;border-radius:.8rem;background:#7F1D1D;color:#fff;flex-shrink:0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.91a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="M22 12.65 13.5 16.5a1 1 0 0 1-.83 0L3 12.5"/></svg></span>'
      + '<span class="leading-tight"><span class="block font-bold text-lg" style="font-family:\'Playfair Display\',serif">PrimeCut <span style="color:#7F1D1D" class="dark:text-[#D4A373]">Butchers</span></span><span class="block text-xs muted tracking-wide">Quality Cuts. Honest Sourcing.</span></span></div>'
      + '<p class="text-sm leading-relaxed muted">Fresh, carefully sourced meat prepared with professional butchery and attention to quality.</p>'
      + '<div class="flex items-center gap-2 mt-4">'
      + '<a href="#" class="social-btn" aria-label="Follow us on Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>'
      + '<a href="#" class="social-btn" aria-label="Follow us on Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>'
      + '<a href="#" class="social-btn" aria-label="Follow us on X"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4l16 16M20 4L4 20"/></svg></a>'
      + '<a href="#" class="social-btn" aria-label="Watch us on YouTube"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.92 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg></a>'
      + "</div></div>"
      + '<nav aria-label="Shop links"><h3 class="font-bold mb-4 text-sm uppercase tracking-wider" style="color:#B45309">Shop</h3>'
      + '<ul class="space-y-2.5 text-sm"><li><a class="hover:underline underline-offset-4" href="index.html">Home </a></li>'
      + '<li><a class="hover:underline underline-offset-4" href="about.html">About</a></li>'
      + '<li><a class="hover:underline underline-offset-4" href="products.html">Products</a></li>'
      + '<li><a class="hover:underline underline-offset-4" href="custom-cuts.html">Custom Cuts</a></li>'
      + '<li><a class="hover:underline underline-offset-4" href="custom-cuts.html#enquiry">Bulk Orders </a></li></ul></nav>'
      + '<nav aria-label="Information links"><h3 class="font-bold mb-4 text-sm uppercase tracking-wider" style="color:#B45309">Information</h3>'
      + '<ul class="space-y-2.5 text-sm"><li><a class="hover:underline underline-offset-4" href="index.html#sourcing">Sourcing Standards</a></li>'
      + '<li><a class="hover:underline underline-offset-4" href="about.html">About Us</a></li>'
      + '<li><a class="hover:underline underline-offset-4" href="index.html#quality">Quality Promise</a></li>'
      + '<li><a class="hover:underline underline-offset-4" href="custom-cuts.html#enquiry">Order Enquiry</a></li>'
      + '<li><a class="hover:underline underline-offset-4" href="contact.html">Contact</a></li></ul></nav>'
      + '<div><h3 class="font-bold mb-4 text-sm uppercase tracking-wider" style="color:#B45309">Contact</h3>'
      + '<ul class="space-y-2.5 text-sm">'
      + '<li><a href="tel:+919876543210" class="hover:underline underline-offset-4">Phone: +91 98765 43210</a></li>'
      + '<li><a href="mailto:hello@primecutbutchers.com" class="hover:underline underline-offset-4">hello@primecutbutchers.com</a></li>'
      + '<li class="muted">Mon – Sat: 8:00 AM – 8:00 PM<br>Sunday: 8:00 AM – 2:00 PM</li>'
      + '<li class="muted">Service Area: Local pickup &amp; nearby delivery</li>'
      + "</ul></div></div>"
      + '<div class="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm muted" style="border-top:1px solid var(--border)">' + '<p>© 2026 PrimeCut Butchers. All rights reserved.</p>'
      + '<p class="flex gap-4"><a href="#" class="hover:underline underline-offset-4">Privacy Policy</a><a href="#" class="hover:underline underline-offset-4">Terms</a></p>'
      + "</div></div></footer>";
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
})();
