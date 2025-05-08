const menuIcon = document.getElementById('menu-icon');
const sideMenu = document.getElementById('side-menu');
const closeBtn = document.getElementById('close-btn');

menuIcon.addEventListener('click', () => {
  sideMenu.style.width = '250px';
});

closeBtn.addEventListener('click', () => {
  sideMenu.style.width = '0';
});
