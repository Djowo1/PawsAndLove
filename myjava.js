// Initialize variables
let slideIndex = 1;
let intervalId;

// Function to show slides
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");

  // Check if n is within bounds
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Show the current slide
  slides[slideIndex - 1].style.display = "block";
}

// Function to plus slides
function plusSlides(n) {
  // Clear the interval
  clearInterval(intervalId);

  // Show the next slide
  showSlides(slideIndex += n);

  // Restart the interval
  intervalId = setInterval(function() {
    plusSlides(1);
  }, 6000);
}

// Initialize the slideshow
document.addEventListener('DOMContentLoaded', () => {
  showSlides(slideIndex);
  intervalId = setInterval(function() {
    plusSlides(1);
  }, 6000);

  // Pause slideshow on hover
  let prevButton = document.querySelector('.prev');
  let nextButton = document.querySelector('.next');
  prevButton.addEventListener('mouseover', function() {
    clearInterval(intervalId);
  });
  prevButton.addEventListener('mouseout', function() {
    intervalId = setInterval(function() {
      plusSlides(1);
    }, 6000);
  });
  nextButton.addEventListener('mouseover', function() {
    clearInterval(intervalId);
  });
  nextButton.addEventListener('mouseout', function() {
    intervalId = setInterval(function() {
      plusSlides(1);
    }, 6000);
  });

  // Donate button functionality
  const donateBtn = document.querySelector('#donate-btn');
  if (donateBtn) {
    donateBtn.addEventListener('click', () => {
      const donationForm = document.getElementById('donation-form');
      if (donationForm.classList.contains('hidden')) {
        donationForm.classList.remove('hidden');
      } else {
        donationForm.classList.add('hidden');
      }
    });
  } else {
    console.error('Donate button not found!');
  }
});

// Select elements
const cartIcon = document.querySelector('.cart-icon');
const cartCounter = document.querySelector('.cart-counter');
const cartDropdown = document.querySelector('.cart-dropdown');
const cartItemsList = document.querySelector('.cart-items');
const totalCost = document.querySelector('.total-cost');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const clearCartButton = document.querySelector('.clear-cart');

// Initialize cart
let cart = [];

// Function to update cart
function updateCart() {
  // Update cart counter
  cartCounter.textContent = cart.length;

  // Update cart items list
  cartItemsList.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `
      <h4>${item.name}</h4>
      <p>Price: $${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Subtotal: $${item.price * item.quantity}</p>
    `;
    cartItemsList.appendChild(cartItem);
    total += item.price * item.quantity;
  });
  totalCost.textContent = `Total: $${total.toFixed(2)}`;
}

// Add event listeners to add to cart buttons
addToCartButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const item = {
      name: e.target.parentElement.querySelector('h3').textContent,
      price: parseFloat(e.target.parentElement.querySelector('h4').textContent.replace('$', '')),
      description: e.target.parentElement.querySelector('small') ? e.target.parentElement.querySelector('small').textContent : '',
      quantity: 1,
    };
    cart.push(item);
    updateCart();
  });
});

// Add event listener to clear cart button
clearCartButton.addEventListener('click', () => {
  cart = [];
  updateCart();
});

// Toggle cart dropdown on cart icon click
if (cartIcon) {
  cartIcon.addEventListener('click', () => {
    const cartDropdown = document.querySelector('.cart-dropdown');
    if (cartDropdown) {
      cartDropdown.classList.toggle('hidden');
    }
  });
} else {
  console.error("Element with class 'relative' not found.");
}

// Get all section elements
const sections = document.querySelectorAll('.animated');

// Create an IntersectionObserver instance
const observer = new IntersectionObserver((entries) => {
  // Loop through the observed entries
  entries.forEach((entry) => {
    // Check if the section is visible
    if (entry.isIntersecting) {
      // Add a class to trigger the animation
      entry.target.classList.add('opacity-100');
      entry.target.classList.add('duration-30');
      entry.target.classList.add('transition-opacity');
      entry.target.classList.add('ease-in-out');
      // Stop observing the section
      observer.unobserve(entry.target);
    }
  });
}, {
  // Options for the observer
  threshold: 0.1, // Trigger when 10% of the section is visible
});

// Observe all sections
sections.forEach((section) => {
  observer.observe(section);
});


