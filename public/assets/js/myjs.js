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

$(".bannerInput").change((event) => {
  readURL1($(event.target)[0], $(event.target).siblings(".disImg"));
  console.log($(event.target)[0]);
});

function readURL1(input, targetElement) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $(targetElement).attr("src", e.target.result);
    };

    reader.readAsDataURL(input.files[0]); // convert to base64 string
  }
}
