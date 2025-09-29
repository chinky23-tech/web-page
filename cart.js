const products = document.getElementById('products');
const cartItems = document.getElementById('cartItems');
const cartSummary = document.getElementById('cartSummary');
const addBtn = document.querySelectorAll('addBtn');
const removeBtn = document.querySelectorAll('removeBtn');

const  productList = [{id:1, name:'laptop',price: 50000},
  {id:2, name: 'headphones' , price: 2000},
  {id:3, name:'keyboard', price: 1500},
  {id:4, name: 'mouse' , price: 1500},
  {id:5, name: 'monitor', price: 120000}
];

let cart = [];

productList.forEach(p => {
  const productCard = document.createElement('div');
  productCard.className = "bg-white p-4 rounded-xl shadow-md text-center";
  productCard.innerHTML = 
  `<h3 class="font-bold text-gray-700">${p.name}</h3>
  <button data-id="${p.id}"
  class=addBtn mt-3 bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-600">
  Add to cart</button>`;
  products.appendChild(productCard);
  
  
});

addBtn.forEach(btn => {
btn.addEventListener('click' , e => {
const id= Number(e.target.dataset.id);
});
});

function addToCart(id){
  const item = productList.find(p => p.id === id);
  cart.push(item);
  displayCart();
}

function removeFromCart(index){

  cart = cart.filter((_,i) => i !== index);
  displayCart();
}

function displayCart(){
  cartItems.innerHTML = '';
  cart.forEach((item, index) => {
const div = document.createElement('div');
div.className = "flex justify-between items-center border-b py-1";
div.innerHTML = `
<span>${item.name} - ${item.price}</span
<button class=removeBtn text-red-500 hover:text-red-700 data-index="${index}">Remove</button>`;
cartItems.appendChild(div);
  });



removeBtn.forEach(btn => {
btn.addEventListener('click' , e => {
const index = Number(e.target.dataset.index);
removeFromCart(index);
});
});
const total = cart.reduce((sum, item) => sum + item.price, 0);
      cartSummary.textContent = `Total Items: ${cart.length} | Total Price: ₹${total}`;
}