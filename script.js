/* ========== Shop Page Styles ========== */
.shop {
  text-align: center;
  padding: 40px 20px;
  background-color: #fffaf6;
}
.shop h1 {
  color: #b07a56;
  font-size: 32px;
  margin-bottom: 10px;
}
.subtitle {
  color: #5a4631;
  margin-bottom: 30px;
  font-size: 16px;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  justify-items: center;
}
.product-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.06);
  padding: 16px;
  max-width: 250px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 14px rgba(0,0,0,0.1);
}
.product-card img {
  width: 100%;
  border-radius: 10px;
}
.product-card h3 {
  color: #b07a56;
  font-size: 18px;
  margin: 8px 0 4px;
}
.product-card p {
  color: #5a4631;
  font-size: 14px;
  margin-bottom: 8px;
}
.price {
  display: block;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
}
.product-card button {
  background-color: #b07a56;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 14px;
  cursor: pointer;
  transition: background 0.3s;
}
.product-card button:hover {
  background-color: #926443;
}

// Handle Cart Logic
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productName, price, image) {
  cart.push({ productName, price, image });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(productName + " added to cart!");
}

// Display Cart Items on cart.html
if (window.location.pathname.includes("cart.html")) {
  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");

  function displayCart() {
    cartContainer.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <img src="${item.image}" alt="${item.productName}">
        <h4>${item.productName}</h4>
        <p>Rs ${item.price}</p>
        <button onclick="removeItem(${index})">Remove</button>
      `;
      cartContainer.appendChild(div);
    });
    totalElement.textContent = total;
  }

  window.removeItem = function (index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
  };

  displayCart();
}
// Function to add product to cart
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price, image });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

// Function to display cart
function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItems = document.getElementById("cart-items");
  let cartTotal = document.getElementById("cart-total");

  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty 🛍️</p>";
    cartTotal.innerHTML = "";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h3>${item.name}</h3>
          <p>Rs ${item.price}</p>
          <button onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>
    `;
  });

  cartTotal.innerHTML = `<h3>Total: Rs ${total}</h3>`;
}

// Function to remove item
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Checkout function — sends to WhatsApp
function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let total = cart.reduce((sum, item) => sum + item.price, 0);
  let message = "🛍️ *New Order from Aysh.sbr Website*%0A%0A";
  cart.forEach((item, i) => {
    message += `${i + 1}. ${item.name} - Rs ${item.price}%0A`;
  });
  message += `%0A*Total:* Rs ${total}%0A%0AThank you for shopping 💖`;

  // 👇 Replace with your mother’s WhatsApp number (with country code, no +)
  let phoneNumber = "03217681204";
  let url = `https://wa.me/${phoneNumber}?text=${message}`;

  window.open(url, "_blank");
  localStorage.removeItem("cart");
}

// When cart page loads
document.addEventListener("DOMContentLoaded", displayCart);
