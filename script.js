const products = [ 
 {
  id: 1,
  name: "Waffle",
  category: "Waffle with Berries",
  price: 6.50,
  image: "img/waffle.jpg"
 },

 {
  id: 2,
  name: "Crème Brûlée",
  category: "Vanilla Bean Crème Brûlée",
  price: 7.00,
  image: "img/cremie-brulee.jpg",
 },

 {
  id: 3,
  name: "Macaron",
  category: "Macaron Mix of Five",
  price: 8.00,
  image: "img/macaron.jpg"
 },

  {
  id: 4,
  name: "Tiramisu",
  category: "Classic Tiramisu",
  price: 5.50,
  image: "img/Tiramisu.jpg"
 },

 {
  id: 5,
  name: "Baklava",
  category: "Pistachio Baklava",
  price: 4.00,
  image: "img/baklava.jpg"
 },

 {
  id: 6,
  name: "Pie",
  category: "Lemon Meringue Pie",
  price: 5.00,
  image: "img/pie.jpg"
 },

 {
  id: 7,
  name: "Cake",
  category: "Red Cake Velvet",
  price: 4.50,
  image: "img/velvet-cake.jpg"
 },

 {
  id:8,
  name: "Brownie",
  category: "Salted Caramel Brownie",
  price: 5.50,
  image: "img/brownie.jpg"
 },

 {
  id: 9,
  name: "Panna Cotta",
  category: "Vanilla Panna Cotta",
  price: 6.50,
  image: "img/panna-cotta.jpg"
 }

];


const container = document.querySelector(".container");

function renderProducts(){
  container.innerHTML = "";

  products.forEach(product => {
    const productHTML = `
       <div class="box-1">
          <img id = "${product.id}" src="${product.image}" alt="${product.name}">
          
          <div class="btn">
            <div class="cart-btn" data-id="${product.id}">

             <button  class="main-btn">
               <i class="fa fa-cart-plus"></i> Add to Cart
             </button>

             <div class="hover-controls">
               <button class="sub" onclick="decreaseItem(${product.id})">−</button>
               <span id="qty-${product.id}">0</span>
               <button class="add" onclick="increaseItem(${product.id})">+</button>
             </div>

            </div>
          </div>

          <div class="texts">
            <p class="text-1">${product.name}</p>
            <p class="text-2">${product.category}</p>
            <p id="price" class="text-3"><span class="curren">$</span>${product.price.toFixed(2)}</p>
          </div>
        </div>
    `;

    container.innerHTML += productHTML;
  });
}

renderProducts();


let cart = {};

// Increase
function increaseItem(id) {
  if (cart[id]) {
    cart[id]++;
  } else {
    cart[id] = 1;
  }

  updateQty(id);
  renderOrders(); 
}

// Decrease
function decreaseItem(id) {
  if (!cart[id]) return;

  cart[id]--;

  if (cart[id] <= 0) {
    delete cart[id];
  }

  updateQty(id);
  renderOrders(); 
}

// Update UI
function updateQty(id) {
  let qty = cart[id] || 0;
  document.getElementById(`qty-${id}`).innerText = qty;
}



const cartContainer = document.getElementById("cart-container");

function renderOrders(){
  cartContainer.innerHTML = "";
  let orderHTML = `
    
  <div>
    <p class="cartt">Your Cart (${Object.keys(cart).length})</p>
 `;

  let total = 0;

  for (let id in cart) {
    let product = products.find(p => p.id == id);
    let qty = cart[id];
    let price = product.price * qty;

    total += price;

    orderHTML += `
    
        <div class="main-order-1">
         <div class="order-1">
           <p class="classic">${product.category}</p>
           <p class="tp">
             <span class="times">${qty}x</span>
             <span class="at">@</span>
             <span class="pri">$${product.price.toFixed(2)}</span>
             <span class="price">$${price.toFixed(2)}</span>
           </p>
         </div>
         <div class="cancel">
           <i id="exit" onclick="decreaseItem(${id})" class="far fa-times-circle fa-lg"></i>
         </div>
        </div>
    
    `;
  }

  orderHTML += `
     <div class="confirm-total">
         <div class="total">
           <div class="order-total">Order Total</div>
           <div class="total-price">$${total.toFixed(2)}</div>
         </div>

         <div class="carbon">
           <p class="neutral">
            <i class="fa fa-tree"></i>
            This is a <span class="cn">carbon-neutral</span> delivery
           </p>
         </div>

         <div class="confirm">
           <button id="confirm-order" onclick="confirmOrder()">Confirm Order</button>
         </div>
      </div>
    </div>
  `;

  cartContainer.innerHTML = orderHTML;
}

renderOrders();



function confirmOrder() {

  const modal = document.getElementById("modal");
  const modalItems = document.getElementById("modal-items");

  modalItems.innerHTML = "";

  let total = 0;

  for (let id in cart) {
    let product = products.find(p => p.id == id);
    let qty = cart[id];
    let price = product.price * qty;

    total += price;

    modalItems.innerHTML += `
  <div class="modal-item">

    <img src="${product.image}" class="modal-img">

    <div class="modal-info">
      <p class="modal-name">${product.category}</p>
      <p class="modal-meta">
        <span class="qty">${qty}x</span>
        <span class="at">@</span>
        <span class="unit">$${product.price.toFixed(2)}</span>
      </p>
    </div>

    <div class="modal-price">
      $${price.toFixed(2)}
    </div>

  </div>
`;
  }


  document.getElementById("modal-total-price").innerText =
    `$${total.toFixed(2)}`;

  modal.classList.remove("hidden");
}


function startNewOrder() {

  cart = {}; // clear cart

  renderProducts(); // reset products UI
  renderOrders(); // clear cart UI

  document.getElementById("modal").classList.add("hidden");
}




