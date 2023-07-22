const presaleDiv = document.querySelector('.presaleDiv');
const loadMoreBtn = document.querySelector('.loadMoreBtn');
const loader = document.querySelector('.loader');

let nextToken = '';
let isDataFinished = false;
let isLoading = true;

const getPresales = async () => {

    if(isDataFinished) return;

    loader.style.display = 'flex';
    loadMoreBtn.style.display = 'none';

    try {
        const res = await axios.get(`https://api.presale.world/list-pools?flt=audit&sts=live&srt=total&pt=${nextToken}`);

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

loadMoreBtn.addEventListener('click', getPresales);