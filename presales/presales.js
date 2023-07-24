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

console.log(search.value, filter.value, stats.value, sort.value);

// SEARCH LINK https://api.presale.world/search-pools_v2?q=PEPE
// FLITERS KYC & AUDITS = kyc-audit, KYC = kyc, AUDIT = audit, NONE = none
// STATUS UPCOMING = upcoming, cancelled, live, ended, any
// SORT = start-time, end-time, recent, recent-update

const getPresales = async (url) => {

    if(isDataFinished) return;

    if(reloadData){
        presaleDiv.innerHTML = '';
    }

    loader.style.display = 'flex';
    loadMoreBtn.style.display = 'none';

    try {
        const res = await axios.get(url || `https://api.presale.world/list-pools?flt=${filter.value}&sts=${stats.value}&srt=${sort.value}&pt=${nextToken}`);
        console.log(res.data);
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