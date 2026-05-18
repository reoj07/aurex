import"./modulepreload-polyfill-CSRv37U6.js";import{c as e,f as t,i as n,l as r,r as i,u as a}from"./cryptoDepositRequests-BzHgtKAL.js";import"./admin-shell-Bc7ijRy7.js";var o=document.getElementById(`crypto-wallet-form`),s=document.getElementById(`wallet-id`),c=document.getElementById(`wallet-asset`),l=document.getElementById(`wallet-chain`),u=document.getElementById(`wallet-address`),d=document.getElementById(`wallet-offsite-link`),f=document.getElementById(`wallet-note`),p=document.getElementById(`wallet-qr-upload`),m=document.getElementById(`wallet-qr-file-name`),h=document.getElementById(`wallet-qr-preview`),g=document.getElementById(`wallet-reset`),_=document.getElementById(`wallet-list`),v=document.getElementById(`pending-crypto-list`),y=document.getElementById(`processed-crypto-list`),b=document.getElementById(`crypto-summary`),x=document.getElementById(`crypto-status-message`),S=``;C(),o.addEventListener(`submit`,async e=>{e.preventDefault();let n=t({id:s.value,asset:c.value,chain:l.value,address:u.value,offsiteLink:d.value,note:f.value,qrDataUrl:S});A(`Saved wallet ${n.asset} ${n.chain}. Deposit Crypto now uses this address and QR for new user requests.`,`success`),D(),C()}),g.addEventListener(`click`,()=>{D(),A(`Wallet form reset.`,``)}),p.addEventListener(`change`,async e=>{let t=e.target.files?.[0];if(!t){S=``,m.textContent=`Choose QR image`,O(``);return}S=await k(t),m.textContent=t.name,O(S)}),_.addEventListener(`click`,e=>{let t=e.target.closest(`[data-wallet-action]`);if(!t)return;let i=t.dataset.id,a=t.dataset.walletAction,o=r().find(e=>e.id===i);if(o){if(a===`edit`){s.value=o.id,c.value=o.asset,l.value=o.chain,u.value=o.address,d.value=o.offsiteLink||``,f.value=o.note||``,S=o.qrDataUrl||``,m.textContent=o.qrDataUrl?`Existing QR image loaded`:`Choose QR image`,O(S),A(`Editing wallet ${o.asset} ${o.chain}.`,``);return}a===`delete`&&(n(i),A(`Deleted wallet ${o.asset} ${o.chain}.`,`error`),C())}}),v.addEventListener(`click`,e=>{let t=e.target.closest(`[data-request-action]`);if(!t)return;let n=t.dataset.id,r=t.dataset.requestAction;if(r===`approve`){let e=i(n);e&&(A(`Approved ${e.reference}. ${e.amount} ${e.asset} credited to ${e.accountMode} Exchange assets.`,`success`),C());return}if(r===`reject`){let e=a(n,`Admin`,window.prompt(`Optional rejection reason`,`Transfer proof could not be verified.`)||``);e&&(A(`Rejected ${e.reference}.`,`error`),C())}});function C(){let t=r(),n=e(),i=n.filter(e=>e.status===`pending`),a=n.filter(e=>e.status!==`pending`),o=n.filter(e=>e.status===`approved`);b.innerHTML=`
    <span>Crypto Ops</span>
    <strong>${t.length} wallets configured</strong>
    <p>${i.length} deposits waiting for approval. ${o.length} approved deposits already reflected in user Exchange assets.</p>
  `,w(t),T(i),E(a)}function w(e){if(!e.length){_.innerHTML=`<div class="latest-preview empty-state"><strong>No wallets configured</strong><p>Save a wallet address and QR to make it available on the user Deposit Crypto page.</p></div>`;return}_.innerHTML=e.map(e=>`
    <article class="history-item payment-request-card">
      <div class="history-item-head">
        <div>
          <div class="history-item-code">${M(e.asset)} ${M(e.chain)}</div>
          <p>${M(e.address)}</p>
        </div>
        <div class="history-item-actions">
          <button type="button" class="mini-button" data-wallet-action="edit" data-id="${N(e.id)}">Edit</button>
          <button type="button" class="danger-button" data-wallet-action="delete" data-id="${N(e.id)}">Delete</button>
        </div>
      </div>
      <div class="payment-request-grid">
        <article class="preview-card"><span>Offsite link</span><strong>${M(e.offsiteLink||`Not set`)}</strong></article>
        <article class="preview-card"><span>Updated</span><strong>${j(e.updatedAt)}</strong></article>
      </div>
      ${e.note?`<div class="payment-request-note"><span>Wallet note</span><p>${M(e.note)}</p></div>`:``}
      ${e.qrDataUrl?`
        <div class="payment-request-proof">
          <span>QR preview</span>
          <img src="${N(e.qrDataUrl)}" alt="${N(`${e.asset} ${e.chain} QR`)}" />
        </div>
      `:``}
    </article>
  `).join(``)}function T(e){if(!e.length){v.innerHTML=`<div class="latest-preview empty-state"><strong>No pending crypto deposits</strong><p>New user crypto deposit submissions will appear here with proof and TX hash.</p></div>`;return}v.innerHTML=e.map(e=>`
    <article class="history-item payment-request-card pending">
      <div class="history-item-head">
        <div>
          <div class="history-item-code">${M(e.reference)}</div>
          <p>${M(e.accountMode)} account • ${M(e.asset)} ${M(e.chain)}</p>
        </div>
        <div class="payment-status-chip pending">Pending</div>
      </div>
      <div class="payment-request-grid">
        <article class="preview-card"><span>Amount</span><strong>${M(e.amount)} ${M(e.asset)}</strong></article>
        <article class="preview-card"><span>Requested at</span><strong>${j(e.createdAt)}</strong></article>
        <article class="preview-card"><span>Wallet address</span><strong>${M(e.address)}</strong></article>
        <article class="preview-card"><span>TX hash</span><strong>${M(e.txHash||`Missing`)}</strong></article>
      </div>
      ${e.note?`<div class="payment-request-note"><span>Transfer note</span><p>${M(e.note)}</p></div>`:``}
      ${e.proofOfPaymentDataUrl?`
        <div class="payment-request-proof">
          <span>Transfer proof</span>
          <img src="${N(e.proofOfPaymentDataUrl)}" alt="${N(e.proofOfPaymentName||`Transfer proof`)}" />
          <p>${M(e.proofOfPaymentName||`Transfer proof`)}</p>
        </div>
      `:``}
      <div class="payment-request-actions">
        <button type="button" class="primary-button" data-request-action="approve" data-id="${N(e.id)}">Approve Deposit</button>
        <button type="button" class="danger-button" data-request-action="reject" data-id="${N(e.id)}">Reject</button>
      </div>
    </article>
  `).join(``)}function E(e){if(!e.length){y.innerHTML=`<div class="latest-preview empty-state"><strong>No processed crypto deposits</strong><p>Approved or rejected crypto deposit requests will appear here.</p></div>`;return}y.innerHTML=e.map(e=>`
    <article class="history-item payment-request-card ${N(e.status)}">
      <div class="history-item-head">
        <div>
          <div class="history-item-code">${M(e.reference)}</div>
          <p>${M(e.accountMode)} account • ${M(e.asset)} ${M(e.chain)}</p>
        </div>
        <div class="payment-status-chip ${N(e.status)}">${M(e.status)}</div>
      </div>
      <div class="history-item-meta">
        <span>${M(e.amount)} ${M(e.asset)}</span>
        <span>${M(e.txHash||`No TX hash`)}</span>
        <span>${j(e.updatedAt)}</span>
      </div>
      ${e.rejectionReason?`<div class="payment-request-note compact"><span>Rejection reason</span><p>${M(e.rejectionReason)}</p></div>`:``}
    </article>
  `).join(``)}function D(){o.reset(),s.value=``,S=``,m.textContent=`Choose QR image`,O(``)}function O(e){if(!e){h.className=`wallet-qr-preview empty-state`,h.innerHTML=`<strong>No QR uploaded</strong><p>Wallet QR preview will appear here.</p>`;return}h.className=`wallet-qr-preview`,h.innerHTML=`<img src="${N(e)}" alt="Wallet QR preview" />`}function k(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(String(r.result||``)),r.onerror=()=>n(Error(`Unable to read file.`)),r.readAsDataURL(e)})}function A(e,t=``){x.textContent=e,x.className=`status-message ${t}`.trim()}function j(e){let t=new Date(e);return Number.isNaN(t.getTime())?`Unknown time`:new Intl.DateTimeFormat(`en-GB`,{year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`}).format(t)}function M(e){return String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function N(e){return M(e)}