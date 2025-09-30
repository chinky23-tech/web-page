const products = document.getElementById('products');
const cartItems = document.getElementById('cartItems');
const cartSummary = document.getElementById('cartSummary');

let cart = [];

//step 1: fetch products from API 

async function loadProducts(){
  const res = await fetch('https://fakestoreapi.com/products');
  const productList = await res.json();
  renderProducts(productList);
}

//step 2: render products dynamically

function renderProducts(productList){
  products.innerHTML = ''; //clear container first

  productList.forEach(p => {
    const productCard = document.createElement('div');
    productCard.className = 'bg-white p-4 rounded-xl shadow-md text-center';
    productCard.innerHTML = `<h3 class= "font-bold text-gray-700">${p.title}</h3>
    <p class="text-gray-500">${Math.floor(p.price * 80)}</p>
    <button data-id="${p.id}"
    class="addBtn mt-3 bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-600">
    Add to cart
    </button>`;
    products.appendChild(productCard);

    
  });
}

//step 3: event delegation for Add to Cart
products.addEventListener('click', e =>{

if(e.target.classList.contains('addBtn')){
  const id = Number(e.target.dataset.id);
  addToCart(id);
}

});

//step 4: event delegation for remove from cart

cartItems.addEventListener('click' , e => {
if(e.target.classList.contains('removeBtn')){
  const index = Number(e.target.dataset.index);
  removeFromCart(index);
}
});
// Cart Functions
async function addToCart(id) {
  // fetch single product details (from API)
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const item = await res.json();

  cart.push(item);
  displayCart();
}

function removeFromCart(index) {
  cart = cart.filter((_, i) => i !== index);
  displayCart();
}

function displayCart() {
  cartItems.innerHTML = '';

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = "flex justify-between items-center border-b py-1";
    div.innerHTML = `
      <span>${item.title} - ₹${Math.floor(item.price * 80)}</span>
      <button class="removeBtn text-red-500 hover:text-red-700" data-index="${index}">
        Remove
      </button>`;
    cartItems.appendChild(div);
  });

  const total = cart.reduce((sum, item) => sum + item.price * 80, 0);
  cartSummary.textContent = `Total Items: ${cart.length} | Total Price: ₹${total}`;
}

// Load products on page start
loadProducts();