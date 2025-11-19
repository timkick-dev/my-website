
window.addEventListener('scroll', () => {
  const hero = document.getElementById('hero');
  hero.style.opacity = 1 - window.scrollY / 600;
});
