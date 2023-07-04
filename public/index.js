var splide = new Splide(".splide", {
  type: "loop",
  perPage: 3,
  perMove: 1,
  pagination: false,
  drag: true,
  snap: true,
  breakpoints: {
    768: {
      perPage: 1, // Display 1 slide on viewport widths equal to or smaller than 768px
    },
  },
});

splide.mount();
// Add an event listener to each menu item to handle the click event
var menuItems = document.querySelectorAll(".menu-item");
menuItems.forEach(function (menuItem) {
  menuItem.addEventListener("click", function (event) {
    event.stopPropagation();
    var submenu = this.querySelector(".submenu");
    submenu.classList.toggle("active");
  });
});

// Close the submenu when clicking outside of it
document.addEventListener("click", function (event) {
  var submenu = document.querySelector(".submenu.active");
  if (submenu && !submenu.contains(event.target)) {
    submenu.classList.remove("active");
  }
});
var buttons = document.querySelectorAll(".add-to-cart");
console.log(buttons);
buttons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    const productName = button.dataset.productName;
    const productPrice = button.dataset.productPrice;
    const productImg = button.dataset.productImage;
    console.log(productImg);
    fetch("/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: productName, price: productPrice, imageUrl :productImg }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
var all = document.querySelectorAll(".non-cart");
var cartButton = document.getElementById("cart-button");
var cart = document.querySelector(".cart");
cartButton.addEventListener("click", (e) => {
  cart.classList.toggle("invisible");
  all.forEach((item) => { 
    item.classList.toggle("blur")
  })

});
function refresh() {
  location.reload();
  cart.classList.remove("invisible");
}
