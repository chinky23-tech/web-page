

// mobile menu


const mobileButton = document.getElementById('mobileButton');
const mobileMenu = document.getElementById('mobileMenu');
const hamburgerIcon = document.getElementById('hamburgerIcon');
const closeIcon = document.getElementById('closeIcon');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
  mobileMenu.classList.toggle('hidden');
  hamburgerIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
}

// Toggle when clicking the button
mobileButton.addEventListener('click', toggleMenu);

// Auto-close when clicking any mobile menu link
mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close menu helper
function closeMenu() {
  mobileMenu.classList.add('hidden');
  closeIcon.classList.add('hidden');
  hamburgerIcon.classList.remove('hidden');
}

// Close when clicking outside
document.addEventListener('click', (event) => {
  const isClickInside = mobileButton.contains(event.target) || mobileMenu.contains(event.target);
  if (!isClickInside && !mobileMenu.classList.contains('hidden')) {
    closeMenu();
  }
});



