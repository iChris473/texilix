function formatNumber(number) {
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  const suffixIndex = Math.floor(Math.log10(number) / 3);
  const shortNumber = (number / Math.pow(1000, suffixIndex)).toFixed(2);
  const result = shortNumber + (suffixes[suffixIndex] || '');
  return (result == "NaN") ? "N/A" : result;
}

const formatDesc = text => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = text;
  const extractedText = tempElement.textContent || tempElement.innerText;
  return extractedText;
}

const presaleHtml = (data, currency) => (`

<div class="flex items-center justify-start gap-3">
  <div class="rounded-lg flex-center">
    <img src=${data?.imageUrl || data?.icon_url || data?.logoUrl || data?.logo || "https://app.uncx.network/img/no-icon.0e5c6c82.png"} alt="icon" class="w-[80px] h-[100px] object-contain">
  </div>
  <div>
    <h1 class="cont text-lg">${data?.tokenName || data?.s_token?.name || data?.tokenOfSaleName || data?.name}</h1>
    <p class="nunito text-md">${data?.tokenSymbol || data?.s_token?.symbol || data?.tokenOfSaleSymbol || data?.symbol}</p>
  </div>
</div>
<div class="w-full">
  <div class="flex gap-3 text-xl monospace">
    <p class="text-gray-400">Launchpad:</p>
    <span class="blue-text capitalize">
      ${data?.platform == 'pink' ? "Pinksale" : data?.s_token ? "UNCX" : data?.kingpass_min_contribution ? "Kingpad" : data?.contributions ? 
      "CookieSale" : data?.platform || "DXSale" }
    </span>
  </div>
  <div>
    <!-- CURRENCY -->
    <div class="flex flex-col my-5">
      <p class="monospace text-md opacity-80">${data?.type ? "TYPE" : "CURRENCY"}</p>
      <h3 class="nunito blue-text text-xl">${data?.type || data?.currency || currency}</h3>
    </div>
    <!-- CAPS -->
    <div class="flex items-start justify-between w-[90%] gap-2">
      <div class="nunito">
        <p class="opacity-80 monospace text-lg">SOFT CAP</p>
        <h3 class="text-2xl">${formatNumber(parseFloat(data?.softCap || data?.saleSoftCap || data?.soft_cap)) || "N/A"}</h3>
      </div>
      <div class="nunito">
        <p class="opacity-80 monospace text-lg">HARD CAP</p>
        <h3 class="text-2xl">${formatNumber(parseFloat(data?.hardCap || data?.saleHardCap || data?.hard_cap)) || "N/A"}</h3>
      </div>
    </div>
    <!-- PROJECT LINKS -->
    <div style="position: relative" class="mt-8 mb-3 pb-2">
        <div class="flex items-center justify-between my-5 w-[90%]">
          <div>
            ${(!data?.contributions && (data?.audit || data?.isAudited)) ? `<a href=${data?.audit} class="mb-5 truncate-text text-lg text-left nunito border-b border-blue mr-5 text-blue">Audit</a>` : ""}
            ${data?.contributions ? "" : (data?.kyc || data?.isKYC) ? `<a href=${data?.kyc} class="mb-5 truncate-text text-lg text-left nunito border-b border-blue mr-5 text-blue">KYC</a>` : ""}
          </div>
          <p class="${data?.status == 5 && 'none'} text-lg nunito blue-text capitalize">${data?.contributions ? "" : typeof data?.status == 'string' ? data?.status : data?.kingpass_min_contribution ? "Ended" : ""}</p>
        </div>
        <p class="truncate-text text-sm text-left opacity-80 monts mr-5">
          ${data?.socials?.description || data?.description  || formatDesc(data?.descriptionText || "") || ""}
        </p>
        <p style="position: absolute" class="!absolue bottom-0 opacity-40 right-5 text-xs">
          ${(data?.socials?.description || data?.descriptionText || data?.description) ? 'see more...' : ""}.
        </p>
    </div>
    <div class="flex justify-start">
      ${
        (data?.link || data?.website_url || data?.websiteUrl || data?.website) ?
      `<a href=${data?.link || data?.website_url || data?.websiteUrl || data?.website} class="text-lg w-[40%] mt-5 nunito blue-grad py-2 rounded-lg turner text-center">
        <span class="turn-child">View</span>
      </a>` : ''
      }
    </div>
  </div>
</div>

`)