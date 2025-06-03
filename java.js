const hamburger = document.getElementById('hamburger');
const navBar = document.getElementById('bar');

hamburger.addEventListener('click', () => {
  const isOpen = navBar.classList.toggle('show');

  // Set icon based on new state
  hamburger.textContent = isOpen ? '×' : '☰';
});

const quotes = [
    "Every great developer was once a beginner.",
    "A collection of things I've built, broken, and fixed again.",
    "Code is the brush, the web is the canvas.",
    "Curiosity built this page — and it's not done yet.",
    "Design with purpose. Code with clarity.",
    "Turning coffee into code, and bugs into features.",
    "Built from late nights, mistakes, and breakthroughs."
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  document.addEventListener("DOMContentLoaded", () => {
    const quoteElement = document.querySelector(".intro-right");
    if (quoteElement) {
      quoteElement.textContent = randomQuote;
    }
  });
