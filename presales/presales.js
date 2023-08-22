window.addEventListener('scroll', function(){
    const header = document.querySelector('.navDivDiv');
    header.classList.toggle('!hidden', window.scrollY > 0);
})
const roadCont = document.querySelector('.hotPresales');
const launchpad = document.querySelector('.launchpads');

const presaleDiv = document.querySelector('.presaleDiv');
const loadMoreBtn = document.querySelector('.loadMoreBtn');
const loader = document.querySelector('.loader');

let nextToken = '';
let isDataFinished = false;
let isLoading = true;
let reloadData = false;

const search = document.querySelector('.search');
const stats = document.querySelector('.status');
const filter = document.querySelector('.filter');
const sort = document.querySelector('.sort');
const filterP = document.querySelector('.filterP');
const sortP = document.querySelector('.sortP');

let uncx_url = 'https://api-pcakev2.unicrypt.network/api/v1/presales/search';
let dxsale = false;
let uncxPanswap = true;

const getPresalesMethod = async (url, method, body, currency) => {

    if(isDataFinished) return;

    if(reloadData){
        presaleDiv.innerHTML = "";
    }

    loader.style.display = 'flex';
    loadMoreBtn.style.display = 'none';

    try {
        
        let res;

        if(body){
            res = await axios[method](url, body);
        } else if(dxsale) {
            res = await axios.get(url);
        } else {
            res = await axios.get(`https://api.presale.world/list-pools?flt=${filter.value}&sts=${stats.value}&srt=${sort.value}&pt=${nextToken}`);
        }

        if(res.data?.meta?.currentPage < res.data?.meta?.totalPages){
            loadMoreBtn.style.display = 'block';
            nextToken = res.data?.meta?.currentPage + 1;
        }

        else if(res.data?.count){
            if(Math.floor(res.data?.count / 20) > (nextToken || 0)) {
                loadMoreBtn.style.display = 'block';
                nextToken ? nextToken++ : (nextToken = 1);
            } else {
                if(!uncxPanswap){
                    loadMoreBtn.style.display = 'none';
                } else {
                    loadMoreBtn.style.display = 'block';
                    uncxPanswap = false;
                    uncx_url = 'https://api-univ2-accounts.unicrypt.network/api/v1/presales/search';
                    nextToken = 0;
                    console.log("Entered pinksale")
                }
            }
        } else {
            if(!res.data.nextPageToken && !res.data?.count){
                loadMoreBtn.style.display = 'none';
                isDataFinished = true;
            } else {
                nextToken = res.data.nextPageToken;
                loadMoreBtn.style.display = 'block';
            }
        }

        (res.data?.pools || res.data?.rows || res.data?.items).map(data => {
            if(data?.platform ?.toLowerCase() !== 'novation'){
                const div = document.createElement('div');
                div.className = 
                "shadow-lg bg-gray-900 p-5 rounded-xl w-full max-w-[400px] flex items-start justify-start flex-col";
                div.innerHTML = presaleHtml(data, currency);
                presaleDiv.appendChild(div);
            }
        });

    } catch (error) {
        console.log(error)
        window.alert("Sorry, we can't retrieve live presales at the moment, please try again later");
    } finally {
        loader.style.display = 'none';
    }
}

let pinkLaunchpad = true;
const getPresales = () => {

    if(launchpad.value === 'dxsale'){
        if(!dxsale){
            stats.innerHTML = `
                <option value="inProgressSales">Live</option>
                <option value="upcomingSales">Upcoming</option>
                <option value="successfulSales">Success</option>
                <option value="uncertainSales">Failed</option>
            `
            filterP.style.display = 'none';
            sortP.style.display = 'none';
        }
    }
    else if(launchpad.value !== 'presale_gempad' && pinkLaunchpad){
        stats.innerHTML = `
            <option value="1">Live</option>
            <option value="0">Upcoming</option>
            <option value="2">Success</option>
            <option value="3">Failed</option>
        `
        pinkLaunchpad = false;
        filterP.style.display = 'none';
        sortP.style.display = 'none';
    }

    if(launchpad.value == 'presale_gempad'){
        stats.innerHTML = `
            <option value="any">All</option>
            <option value="live">Live</option>
            <option value="upcoming">Upcoming</option>
            <option value="ended">Ended</option>
            <option value="cancelled">Cancelled</option>
        `
        pinkLaunchpad = true;
        filterP.style.display = 'flex';
        sortP.style.display = 'flex';
    }

    const uncxBody = {
        filters: {
          sort: "profit",
          sortAscending: false,
          search: "",
          hide_flagged: false,
          show_hidden: false
        },
      page: nextToken || 0,
      rows_per_page: 20,
      stage: parseInt(stats.value)
    }

    if(launchpad.value == 'dxsale'){
        dxsale = true;
        getPresalesMethod(`https://scan.dx.app/api/sales/offChain/${stats.value}?sort=creationTimestamp%3ADESC&limit=20&page=${nextToken || 1}`);
    } else if(launchpad.value == 'uncx'){
        getPresalesMethod(uncx_url, 'post', uncxBody, uncxPanswap ? 'BNB' : 'ETH');
    } else {
        getPresalesMethod();
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
    uncxPanswap = true;
    isDataFinished = false;
    reloadData = true;
    getPresales();
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

launchpad.addEventListener('change', () => {
    reloadDataFunction();
});

let hotSalesArray = [];

const getHotSales = async (next = '', length = 10) => {
    
    const url = `https://api.presale.world/list-pools?flt=&sts=live&srt=total&pt=${next}`;
    
    const res = await axios.get(url);
    
    if(res?.data?.pools.length < 10){
        getHotSales(res?.data?.nextPageToken, length - res?.data?.pools.length);
    }

    return hotSalesArray.concat(res?.data?.pools?.splice(0, length));
}

async function getHoties(){
    const primary = document.querySelector('.primary');
    // const secondary = document.querySelector('.secondary');
    let hotPresales = await getHotSales();
    hotPresales.map(presale => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a href=${presale?.link} class="flex-center flex-col mb-20 relative hotPresaleChild">
          <img src=${presale?.imageUrl || "https://app.uncx.network/img/no-icon.0e5c6c82.png"} alt="presale-img" class="w-20 object-cover circle">
          <div class="flex flex-center">
            <h1 class="text-sm text-center monts max-w-[150px]">${presale?.tokenSymbol}</h1>
          </div>
          <p class="absolute top-0 right-0 text-[8px] md:text-sm bg-red-600 p-1 rounded-full">HOT 🔥</p>
        </a>
        `;
        primary.append(div);
    })
    hotPresales.map(presale => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a href=${presale?.link} class="flex-center flex-col mb-20 relative hotPresaleChild">
          <img src=${presale?.imageUrl || "https://app.uncx.network/img/no-icon.0e5c6c82.png"} alt="presale-img" class="w-20 object-cover circle">
          <div class="flex flex-center">
            <h1 class="text-sm text-center monts max-w-[150px]">${presale?.tokenSymbol}</h1>
          </div>
          <p class="absolute top-0 right-0 text-[8px] md:text-sm bg-red-600 p-1 rounded-full">HOT 🔥</p>
        </a>
        `;
        primary.append(div);
    })
};
getHoties();

/*

---------- UNCX PRESALES ---------
 - URLS
    - PANCAKESWAP V2: https://api-pcakev2.unicrypt.network/api/v1/presales/search
    - UNISWAP V2: https://api-univ2-accounts.unicrypt.network/api/v1/presales/search

 - STAGES PROPERTY
    O: UPCOMING
    1: LIVE
    2: SUCCESS
    3: FAILED

*/
