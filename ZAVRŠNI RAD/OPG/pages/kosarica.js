if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName("btn-danger");

  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("unos-kolicine");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName("kupi-proizvod-btn");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("btn-kupi")[0]
    .addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
  var isZero = document.getElementsByClassName("ukupno-cijena")[0].innerText;
  console.log(isZero);
  if (isZero == "0HRK") {
    alert("Košarica je prazna!");
  } else {
    alert("Hvala na kupovini!");
    var cartItems = document.getElementsByClassName("proizvodi-u-kosarici")[0];
    while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
  }
}
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  if (input.value > 50) {
    input.value = 1;
    alert("Maksimalna količina za narudžbu je 50");
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("ime-proizvoda")[0].innerText;
  var price = shopItem.getElementsByClassName("cijena-proizvoda")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("slika-proizvoda")[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("kosarica-redak");
  var cartItems = document.getElementsByClassName("proizvodi-u-kosarici")[0];
  var cartItemNames = cartItems.getElementsByClassName("ime-u-kosarici");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("Proizvod je već dodan u košaricu!");
      return;
    }
  }
  var cartRowContents = `
           <div class="kosarica-proizvod kosarica-stupac">
              <img
                class="slika-u-kosarici"
                src="${imageSrc}"
                width="100"
                height="100"
              />
              <span class="ime-u-kosarici">${title}</span>
            </div>
              <span class="kosarica-cijena kosarica-stupac">${price}</span>
            <div class="kosarica-kolicina kosarica-stupac">
              <input class="unos-kolicine" type="number" value="1" />
              <button class="btn btn-danger" type="button">OBRIŠI</button>
           </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("unos-kolicine")[0]
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName(
    "proizvodi-u-kosarici"
  )[0];
  var cartRows = cartItemContainer.getElementsByClassName("kosarica-redak");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("kosarica-cijena")[0];
    var quantityElement = cartRow.getElementsByClassName("unos-kolicine")[0];
    console.log(priceElement, quantityElement);
    var price = parseFloat(priceElement.innerText.replace("HRK", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("ukupno-cijena")[0].innerText = total + "HRK";
}
