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