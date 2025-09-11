jQuery(window).on("load", function () {
  "use strict";
  jQuery("#loading-area").addClass("show");
  setTimeout(function () {
    jQuery("#loading-area").addClass("active");
  }, 1500);
  setTimeout(function () {
    jQuery("#loading-area").fadeOut(1000, function () {
      jQuery(this).remove();
    });
  }, 2500);
  document.body.addEventListener("keydown", function () {
    document.body.classList.add("show-focus-outline");
  });
  document.body.addEventListener("mousedown", function () {
    document.body.classList.remove("show-focus-outline");
  });
});
