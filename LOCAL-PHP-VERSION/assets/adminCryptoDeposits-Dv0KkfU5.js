import"./modulepreload-polyfill-myak50gs.js";import{c as e,f as t,i as n,l as r,r as i,u as a}from"./cryptoDepositRequests-BzHgtKAL.js";import"./admin-shell-1mbUli2C.js";var o=document.getElementById(`crypto-wallet-form`),s=document.getElementById(`wallet-id`),c=document.getElementById(`wallet-asset`),l=document.getElementById(`wallet-chain`),u=document.getElementById(`wallet-address`),d=document.getElementById(`wallet-offsite-link`),f=document.getElementById(`wallet-note`),p=document.getElementById(`wallet-qr-upload`),m=document.getElementById(`wallet-qr-file-name`),h=document.getElementById(`wallet-qr-preview`),g=document.getElementById(`wallet-reset`),_=document.getElementById(`wallet-list`),v=document.getElementById(`pending-crypto-list`),y=document.getElementById(`processed-crypto-list`),b=document.getElementById(`crypto-summary`),x=document.getElementById(`crypto-status-message`),S=document.getElementById(`crypto-detail-body`),C=``;w(),o.addEventListener(`submit`,async e=>{e.preventDefault();let n=t({id:s.value,asset:c.value,chain:l.value,address:u.value,offsiteLink:d.value,note:f.value,qrDataUrl:C});P(`Saved wallet ${n.asset} ${n.chain}. Deposit Crypto now uses this address and QR for new user requests.`,`success`),j(),w()}),g.addEventListener(`click`,()=>{j(),P(`Wallet form reset.`,``)}),p.addEventListener(`change`,async e=>{let t=e.target.files?.[0];if(!t){C=``,m.textContent=`Choose QR image`,M(``);return}C=await N(t),m.textContent=t.name,M(C)}),_.addEventListener(`click`,e=>{let t=e.target.closest(`[data-wallet-action]`);if(!t)return;let i=t.dataset.id,a=t.dataset.walletAction,o=r().find(e=>e.id===i);if(o){if(a===`edit`){s.value=o.id,c.value=o.asset,l.value=o.chain,u.value=o.address,d.value=o.offsiteLink||``,f.value=o.note||``,C=o.qrDataUrl||``,m.textContent=o.qrDataUrl?`Existing QR image loaded`:`Choose QR image`,M(C),P(`Editing wallet ${o.asset} ${o.chain}.`,``);return}if(a===`delete`){n(i),P(`Deleted wallet ${o.asset} ${o.chain}.`,`error`),w();return}a===`details`&&k(o,`wallet`)}}),v.addEventListener(`click`,t=>{let n=t.target.closest(`[data-request-action]`);if(!n)return;let r=n.dataset.id,o=n.dataset.requestAction;if(o===`approve`){let e=i(r);e&&(P(`Approved ${e.reference}. ${e.amount} ${e.asset} credited to ${e.accountMode} Exchange assets.`,`success`),w());return}if(o===`reject`){let e=a(r,`Admin`,window.prompt(`Optional rejection reason`,`Transfer proof could not be verified.`)||``);e&&(P(`Rejected ${e.reference}.`,`error`),w());return}if(o===`details`){let t=e().find(e=>e.id===r);t&&k(t,`request`)}}),y.addEventListener(`click`,t=>{let n=t.target.closest(`[data-request-action="details"]`);if(!n)return;let r=e().find(e=>e.id===n.dataset.id);r&&k(r,`request`)});function w(){let t=r(),n=e(),i=n.filter(e=>e.status===`pending`),a=n.filter(e=>e.status!==`pending`),o=n.filter(e=>e.status===`approved`);b.innerHTML=`
    <span>Crypto Ops</span>
    <strong>${t.length} wallets configured</strong>
    <p>${i.length} deposits waiting for approval. ${o.length} approved deposits already reflected in user Exchange assets.</p>
  `,T(t),E(i),D(a)}function T(e){if(!e.length){_.innerHTML=`<div class="latest-preview empty-state"><strong>No wallets configured</strong><p>Save a wallet address and QR to make it available on the user Deposit Crypto page.</p></div>`;return}_.innerHTML=`
    <div class="list-group admin-list-group">
      ${e.map(e=>`
        <div class="list-group-item admin-list-group-item">
          <div class="d-flex justify-content-between align-items-start gap-3 flex-wrap">
            <div>
              <div class="fw-semibold text-warning">${I(e.asset)} ${I(e.chain)}</div>
              <div class="text-break small text-muted">${I(e.address)}</div>
              <div class="small mt-2">Updated ${F(e.updatedAt)}</div>
            </div>
            <div class="d-flex gap-2 flex-wrap justify-content-end">
              <button type="button" class="btn btn-sm btn-outline-light" data-wallet-action="details" data-id="${L(e.id)}" data-bs-toggle="offcanvas" data-bs-target="#cryptoDetailOffcanvas">Details</button>
              <button type="button" class="btn btn-sm btn-outline-light" data-wallet-action="edit" data-id="${L(e.id)}">Edit</button>
              <button type="button" class="btn btn-sm btn-outline-danger" data-wallet-action="delete" data-id="${L(e.id)}">Delete</button>
            </div>
          </div>
        </div>
      `).join(``)}
    </div>
  `}function E(e){if(!e.length){v.innerHTML=`<div class="latest-preview empty-state"><strong>No pending crypto deposits</strong><p>New user crypto deposit submissions will appear here with proof and TX hash.</p></div>`;return}v.innerHTML=O(e,!0)}function D(e){if(!e.length){y.innerHTML=`<div class="latest-preview empty-state"><strong>No processed crypto deposits</strong><p>Approved or rejected crypto deposit requests will appear here.</p></div>`;return}y.innerHTML=O(e,!1)}function O(e,t){return`
    <div class="table-responsive">
      <table class="table table-dark table-hover align-middle admin-table mb-0">
        <thead>
          <tr>
            <th>Reference</th>
            <th>Account</th>
            <th>Asset</th>
            <th>Amount</th>
            <th>Chain</th>
            <th>TX hash</th>
            <th>${t?`Requested`:`Updated`}</th>
            <th>Status</th>
            <th class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${e.map(e=>`
            <tr>
              <td class="fw-semibold text-warning">${I(e.reference)}</td>
              <td>${I(e.accountMode)}</td>
              <td>${I(e.asset)}</td>
              <td>${I(e.amount)} ${I(e.asset)}</td>
              <td>${I(e.chain)}</td>
              <td class="text-break small">${I(e.txHash||`Missing`)}</td>
              <td>${F(t?e.createdAt:e.updatedAt)}</td>
              <td><span class="badge ${A(e.status)} text-capitalize">${I(e.status)}</span></td>
              <td class="text-end">
                <div class="d-inline-flex gap-2 flex-wrap justify-content-end">
                  <button type="button" class="btn btn-sm btn-outline-light" data-request-action="details" data-id="${L(e.id)}" data-bs-toggle="offcanvas" data-bs-target="#cryptoDetailOffcanvas">Details</button>
                  ${t?`<button type="button" class="btn btn-sm btn-warning" data-request-action="approve" data-id="`+L(e.id)+`">Approve</button><button type="button" class="btn btn-sm btn-outline-danger" data-request-action="reject" data-id="`+L(e.id)+`">Reject</button>`:``}
                </div>
              </td>
            </tr>
          `).join(``)}
        </tbody>
      </table>
    </div>
  `}function k(e,t){if(t===`wallet`){S.innerHTML=`
      <div class="d-grid gap-3">
        <div class="list-group admin-list-group compact-list">
          <div class="list-group-item admin-list-group-item"><strong>Asset / Chain</strong><div>${I(e.asset)} ${I(e.chain)}</div></div>
          <div class="list-group-item admin-list-group-item"><strong>Address</strong><div class="text-break">${I(e.address)}</div></div>
          <div class="list-group-item admin-list-group-item"><strong>Offsite link</strong><div class="text-break">${I(e.offsiteLink||`Not set`)}</div></div>
          <div class="list-group-item admin-list-group-item"><strong>Updated</strong><div>${F(e.updatedAt)}</div></div>
        </div>
        ${e.note?`<div class="payment-request-note"><span>Wallet note</span><p>${I(e.note)}</p></div>`:``}
        ${e.qrDataUrl?`<div class="payment-request-proof"><span>QR preview</span><img src="${L(e.qrDataUrl)}" alt="${L(`${e.asset} ${e.chain} QR`)}" /></div>`:``}
      </div>
    `;return}S.innerHTML=`
    <div class="d-grid gap-3">
      <div class="list-group admin-list-group compact-list">
        <div class="list-group-item admin-list-group-item"><strong>Reference</strong><div>${I(e.reference)}</div></div>
        <div class="list-group-item admin-list-group-item"><strong>Account</strong><div>${I(e.accountMode)}</div></div>
        <div class="list-group-item admin-list-group-item"><strong>Asset / Chain</strong><div>${I(e.asset)} ${I(e.chain)}</div></div>
        <div class="list-group-item admin-list-group-item"><strong>Amount</strong><div>${I(e.amount)} ${I(e.asset)}</div></div>
        <div class="list-group-item admin-list-group-item"><strong>Address</strong><div class="text-break">${I(e.address)}</div></div>
        <div class="list-group-item admin-list-group-item"><strong>TX hash</strong><div class="text-break">${I(e.txHash||`Missing`)}</div></div>
      </div>
      ${e.note?`<div class="payment-request-note"><span>Transfer note</span><p>${I(e.note)}</p></div>`:``}
      ${e.rejectionReason?`<div class="payment-request-note"><span>Rejection reason</span><p>${I(e.rejectionReason)}</p></div>`:``}
      ${e.proofOfPaymentDataUrl?`<div class="payment-request-proof"><span>Transfer proof</span><img src="${L(e.proofOfPaymentDataUrl)}" alt="${L(e.proofOfPaymentName||`Transfer proof`)}" /><p>${I(e.proofOfPaymentName||`Transfer proof`)}</p></div>`:``}
    </div>
  `}function A(e){return e===`approved`?`text-bg-success`:e===`rejected`?`text-bg-danger`:`text-bg-warning`}function j(){o.reset(),s.value=``,C=``,m.textContent=`Choose QR image`,M(``)}function M(e){if(!e){h.className=`wallet-qr-preview empty-state`,h.innerHTML=`<strong>No QR uploaded</strong><p>Wallet QR preview will appear here.</p>`;return}h.className=`wallet-qr-preview`,h.innerHTML=`<img src="${L(e)}" alt="Wallet QR preview" />`}function N(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(String(r.result||``)),r.onerror=()=>n(Error(`Unable to read file.`)),r.readAsDataURL(e)})}function P(e,t=``){x.textContent=e,x.className=`status-message ${t}`.trim()}function F(e){let t=new Date(e);return Number.isNaN(t.getTime())?`Unknown time`:new Intl.DateTimeFormat(`en-GB`,{year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`}).format(t)}function I(e){return String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function L(e){return I(e)}