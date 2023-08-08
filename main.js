function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

const cookieBtn = document.querySelector('.cookie-btn');
const modal = document.querySelector('.modal');

const closeCookieModal = () => {
    modal.style.display = 'none';
    document.querySelector('.body').classList.remove('cookie-modal');
    document.querySelector('.cookie-cont').style.display = 'none';
    window.localStorage.setItem('cookie', 'true');
}

cookieBtn.addEventListener('click', closeCookieModal);

const cookie = window.localStorage.getItem('cookie');

if (cookie) {
    closeCookieModal();
}

const faq1 = document.querySelector('.faq1');
const faq2 = document.querySelector('.faq2');
const faq3 = document.querySelector('.faq3');
const faq4 = document.querySelector('.faq4');
const faq5 = document.querySelector('.faq5');
const faq6 = document.querySelector('.faq6');
let showFaq;
let showing = false;

const displayFaq = faq => {
    switch (faq) {
        case 'faq1':
            showFaq && (showFaq.style.display = 'none');
            if(showing && showFaq.className.includes(faq)){
                faq1.style.display = 'none';
                showFaq = null;
                showing = false;
            } else {
                faq1.style.display = 'block';
                showFaq = faq1;
                showing = true;
            }
            break;
        case 'faq2':
            showFaq && (showFaq.style.display = 'none');
            if(showing && showFaq.className.includes(faq)){
                faq2.style.display = 'none';
                showFaq = null;
                showing = false;
            } else {
                faq2.style.display = 'block';
                showFaq = faq2;
                showing = true;
            }
            break;
        case 'faq3':
            showFaq && (showFaq.style.display = 'none');
            if(showing && showFaq.className.includes(faq)){
                faq3.style.display = 'none';
                showFaq = null;
                showing = false;
            } else {
                faq3.style.display = 'block';
                showFaq = faq3;
                showing = true;
            }
            break;
        case 'faq4':
            showFaq && (showFaq.style.display = 'none');
            if(showing && showFaq.className.includes(faq)){
                faq4.style.display = 'none';
                showFaq = null;
                showing = false;
            } else {
                faq4.style.display = 'block';
                showFaq = faq4;
                showing = true;
            }
            break;
        case 'faq5':
            showFaq && (showFaq.style.display = 'none');
            if(showing && showFaq.className.includes(faq)){
                faq5.style.display = 'none';
                showFaq = null;
                showing = false;
            } else {
                faq5.style.display = 'block';
                showFaq = faq5;
                showing = true;
            }
            break;
        case 'faq6':
            showFaq && (showFaq.style.display = 'none');
            if(showing && showFaq.className.includes(faq)){
                faq6.style.display = 'none';
                showFaq = null;
                showing = false;
            } else {
                faq6.style.display = 'block';
                showFaq = faq6;
                showing = true;
            }
            break;
        default:
            break;
    }
}

const mobileNav = document.querySelector('.mobileNav');
const mobileX = document.querySelector('.mobileX')
const mobileBar = document.querySelector('.mobileBar')

mobileBar.addEventListener('click', () => {
    mobileNav.style.display = 'block';
    modal.style.display = 'block';
})

mobileX.addEventListener('click', () => {
    mobileNav.style.display = 'none';
    modal.style.display = 'none';
})

modal.addEventListener('click', () => {
    mobileNav.style.display = 'none';
    modal.style.display = 'none';
})