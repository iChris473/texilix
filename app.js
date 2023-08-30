AOS.init();

window.addEventListener('load', function() {
    // Hide the loading animation
    var loadingAnimation = document.getElementById('loading-animation');
    loadingAnimation.style.display = 'none';

    // Show the page content
    var pageContent = document.getElementById('page-content');
    pageContent.style.display = '';
    AOS.init();
});

const url = window.location.href;

if(url.split('.finance').length > 1){
    window.location.href = 'https://www.texilix.com';
}

function goLink(url){
    window.open(url);
}

// const cookieBtn = document.querySelector('.cookie-btn');
// const modal = document.querySelector('.modal');

// const closeCookieModal = () => {
//     modal.style.display = 'none';
//     document.querySelector('.body').classList.remove('cookie-modal');
//     document.querySelector('.cookie-cont').style.display = 'none';
//     window.localStorage.setItem('cookie', 'true');
// }

// cookieBtn.addEventListener('click', closeCookieModal);

// const cookie = window.localStorage.getItem('cookie');

// if(cookie){
//     closeCookieModal();
// }