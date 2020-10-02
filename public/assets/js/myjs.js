var profileIcon = $(".profile"),
  cartIcon = $(".cart"),
  salesIcon = $(".sales"),
  archiveIcon = $(".archive"),
  settingsIcon = $(".settings");

var profile = $("#profile"),
  cart = $("#cart"),
  sales = $("#sales"),
  archive = $("#archive"),
  settings = $("#settings");

$("i.icon").on("click", function () {
  $(this)
    .addClass("checked no-hover")
    .parent()
    .siblings("a")
    .find(".icon")
    .removeClass("checked no-hover");
});

profileIcon.on("click", function () {
  profile.addClass("active").siblings().removeClass("active");
});

cartIcon.on("click", function () {
  cart.addClass("active").siblings().removeClass("active");
});

salesIcon.on("click", function () {
  sales.addClass("active").siblings().removeClass("active");
});

archiveIcon.on("click", function () {
  archive.addClass("active").siblings().removeClass("active");
});

settingsIcon.on("click", function () {
  settings.addClass("active").siblings().removeClass("active");
});
