const hamburger = document.getElementById('hamburger');
const navBar = document.getElementById('bar');

hamburger.addEventListener('click', () => {
  const isOpen = navBar.classList.toggle('show');

  // Set icon based on new state
  hamburger.textContent = isOpen ? '×' : '☰';
});

