const toggleBtn = document.getElementsByClassName("toggle-btn")[0];
const navbarlinks = document.getElementsByClassName('navbar-links')[0]
const links = document.getElementById('links');

toggleBtn.addEventListener('click', () => {
    navbarlinks.classList.toggle('active');
})