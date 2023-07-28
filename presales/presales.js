const arrowRight = document.querySelector('.arrowRight');
const arrowLeft = document.querySelector('.arrowLeft');
const roadCont = document.querySelector('.hotPresales');

arrowLeft.addEventListener('click', () => {
    roadCont.scroll({
        left: roadCont.scrollLeft - 500,
        behavior: 'smooth'
    })
})
arrowRight.addEventListener('click', () => {
    roadCont.scroll({
        left: roadCont.scrollLeft + 500,
        behavior: 'smooth'
    })
})

const presaleDiv = document.querySelector('.presaleDiv');
const loadMoreBtn = document.querySelector('.loadMoreBtn');
const loader = document.querySelector('.loader');

let nextToken = '';
let isDataFinished = false;
let isLoading = true;
let reloadData = false;

const search = document.querySelector('.search');
const filter = document.querySelector('.filter');
const stats = document.querySelector('.status');
const sort = document.querySelector('.sort');

// SEARCH LINK https://api.presale.world/search-pools_v2?q=PEPE
// FLITERS KYC & AUDITS = kyc-audit, KYC = kyc, AUDIT = audit, NONE = none
// STATUS UPCOMING = upcoming, cancelled, live, ended, any
// SORT = start-time, end-time, recent, recent-update

const getPresales = async (url) => {

    if(isDataFinished) return;

    if(reloadData){
        presaleDiv.innerHTML = "";
    }

    loader.style.display = 'flex';
    loadMoreBtn.style.display = 'none';

    try {
        const res = await axios.get(url || `https://api.presale.world/list-pools?flt=${filter.value}&sts=${stats.value}&srt=${sort.value}&pt=${nextToken}`);
        if(!res.data.nextPageToken){
            loadMoreBtn.style.display = 'none';
            isDataFinished = true;
        } else {
            loadMoreBtn.style.display = 'block';
        }

        nextToken = res.data.nextPageToken;

        res.data.pools.map(data => {
            if(data?.platform ?.toLowerCase() !== 'novation'){
                const div = document.createElement('div');
                div.className = 
                "shadow-lg bg-gray-900 p-5 rounded-xl w-full max-w-[400px] flex items-start justify-start flex-col";
                div.innerHTML = presaleHtml(data);
                presaleDiv.appendChild(div);
            }
        });

    } catch (error) {
        window.alert("Sorry, we can't retrieve live presales at the moment, please try again later");
    } finally {
        loader.style.display = 'none';
    }
}

getPresales();


loadMoreBtn.addEventListener('click', () => {
    getPresales();
});

const searchForm = document.querySelector('.submitForm');
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    isDataFinished = false;
    reloadData = true;
    nextToken = '';
    getPresales(`https://api.presale.world/search-pools_v2?q=${search.value}`);
    reloadData = false;
});

const reloadDataFunction = () => {
    nextToken = '';
    isDataFinished = false;
    reloadData = true;
    getPresales()
    reloadData = false;
}

stats.addEventListener('change', () => {
    reloadDataFunction();
});

filter.addEventListener('change', () => {
    reloadDataFunction();
});

sort.addEventListener('change', () => {
    reloadDataFunction();
});

let hotSalesArray = [];

const getHotSales = async (next = '', length = 10) => {
    
    const url = `https://api.presale.world/list-pools?flt=&sts=live&srt=total&pt=${next}`;
    
    const res = await axios.get(url);
    console.log(res.data)
    
    if(res?.data?.pools.length < 10){
        getHotSales(res?.data?.nextPageToken, length - res?.data?.pools.length);
    }

    return hotSalesArray.concat(res?.data?.pools?.splice(0, length));
}

async function getHoties(){
    const hotPresaleDiv = document.querySelector('.hotPresales');
    const hotPresales = await getHotSales();
    hotPresales.map(presale => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a href=${presale?.link} class="flex-center flex-col mb-20 relative hotPresaleChild">
          <img src=${presale?.imageUrl} alt="presale-img" class="w-20 object-cover circle">
          <div class="flex flex-center">
            <h1 class="text-sm text-center monts max-w-[150px]">${presale?.tokenSymbol}</h1>
          </div>
          <p class="absolute top-0 right-0 text-[8px] md:text-sm bg-red-600 p-1 rounded-full">HOT 🔥</p>
        </a>
        `;
        hotPresaleDiv.append(div);
    })
};
getHoties();