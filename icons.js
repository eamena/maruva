(function () {
  var sprite = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  sprite.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
  sprite.setAttribute("aria-hidden", "true");
  sprite.innerHTML =
    '<symbol id="icon-leaf" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>' +
    '<path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>' +
    "</symbol>" +
    '<symbol id="icon-hand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M8 2v12M11 1v13M14 1v13M17 3v11"/>' +
    '<path d="M8 14c-2 0-4 2-4 4v1c0 2 2 3 4 3h8c2 0 4-1 4-3v-1c0-2-2-4-4-4"/>' +
    "</symbol>" +
    '<symbol id="icon-seedling" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M12 22V13"/>' +
    '<path d="M12 13c0-6-6-9-10-7 0 5 4 8 10 7"/>' +
    '<path d="M12 15c0-5 6-8 10-6 0 5-4 8-10 6"/>' +
    "</symbol>" +
    '<symbol id="icon-recycle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<polyline points="1 4 1 10 7 10"/>' +
    '<polyline points="23 20 23 14 17 14"/>' +
    '<path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/>' +
    "</symbol>" +
    '<symbol id="icon-paw" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<circle cx="7" cy="7" r="2"/>' +
    '<circle cx="17" cy="7" r="2"/>' +
    '<circle cx="5" cy="14" r="1.5"/>' +
    '<circle cx="19" cy="14" r="1.5"/>' +
    '<path d="M12 22c-2.2 0-5-1.5-6-4s-1-5 0-7c1-2 3-3 6-3s5 1 6 3 1 5 0 7-3.8 4-6 4z"/>' +
    "</symbol>";

  document.body.insertBefore(sprite, document.body.firstChild);
})();
