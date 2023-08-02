const presaleHtml = (data, currency) => (`

<div class="flex items-center justify-start gap-3">
  <div class="rounded-lg flex-center">
    <img src=${data?.imageUrl || data?.icon_url || "https://app.uncx.network/img/no-icon.0e5c6c82.png"} alt="icon" class="w-[80px] h-[100px] object-contain">
  </div>
  <div>
    <h1 class="cont text-lg">${data?.tokenName || data?.s_token?.name}</h1>
    <p class="nunito text-md">${data?.tokenSymbol || data?.s_token?.symbol}</p>
  </div>
</div>
<div class="w-full">
  <div class="flex gap-3 text-xl monospace">
    <p class="text-gray-400">Launchpad:</p>
    <span class="blue-text capitalize">
      ${data?.platform == 'pink' ? "Pinksale" : data?.s_token ? "UNCX" : data?.platform }
    </span>
  </div>
  <div>
    <!-- CURRENCY -->
    <div class="flex flex-col my-5">
      <p class="monospace text-md opacity-80">CURRENCY</p>
      <h3 class="nunito blue-text text-xl">${data?.currency || currency}</h3>
    </div>
    <!-- CAPS -->
    <div class="flex items-start justify-between w-[90%] gap-2">
      <div class="nunito">
        <p class="opacity-80 monospace text-lg">SOFT CAP</p>
        <h3 class="text-2xl">${data?.softCap || "N/A"}</h3>
      </div>
      <div class="nunito">
        <p class="opacity-80 monospace text-lg">HARD CAP</p>
        <h3 class="text-2xl">${data?.hardCap || "N/A"}</h3>
      </div>
    </div>
    <!-- PROJECT LINKS -->
    <div style="position: relative" class="mt-8 mb-3 pb-2">
        <div class="flex items-center justify-between my-5 w-[90%]">
          <div>
            ${data?.audit ? `<a href=${data?.audit} class="mb-5 truncate-text text-lg text-left nunito border-b border-blue mr-5 text-blue">Audit</a>` : ""}
            ${data?.kyc ? `<a href=${data?.kyc} class="mb-5 truncate-text text-lg text-left nunito border-b border-blue mr-5 text-blue">KYC</a>` : ""}
          </div>
          <p class="text-lg nunito blue-text capitalize">${typeof data?.status == 'string' ? data?.status : ""}</p>
        </div>
        <p class="truncate-text text-sm text-left opacity-80 monts mr-5">${data?.socials?.description || ""}</p>
        <p style="position: absolute" class="!absolue bottom-0 opacity-40 right-5 text-xs">
          ${data?.socials?.description ? 'see more...' : ""}.
        </p>
    </div>
    <div class="flex justify-start">
      ${
        (data?.link || data?.website_url) ?
      `<a href=${data?.link || data?.website_url} class="text-lg w-[40%] mt-5 nunito blue-grad py-2 rounded-lg turner text-center">
        <span class="turn-child">View</span>
      </a>` : ''
      }
    </div>
  </div>
</div>

`)