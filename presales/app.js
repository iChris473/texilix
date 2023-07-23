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