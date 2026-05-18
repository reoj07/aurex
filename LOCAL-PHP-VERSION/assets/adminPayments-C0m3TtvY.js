import"./modulepreload-polyfill-myak50gs.js";import{o as e,r as t,s as n}from"./paymentRequests-_3SqHY3E.js";import"./admin-shell-Bwa8fXXy.js";var r=document.getElementById(`payment-summary`),i=document.getElementById(`pending-payment-list`),a=document.getElementById(`processed-payment-list`),o=document.getElementById(`payment-status-message`),s=document.getElementById(`payment-detail-body`);c(),i.addEventListener(`click`,r=>{let i=r.target.closest(`[data-action]`);if(!i)return;let a=i.dataset.id,o=i.dataset.action;if(o===`approve`){let e=t(a);e&&(m(e.side===`Sell`?`Approved ${e.reference}. ${e.amountUsdt} ${e.asset} debited from ${e.accountMode} Exchange for payout settlement.`:`Approved ${e.reference}. ${e.amountUsdt} ${e.asset} credited to ${e.accountMode} Exchange.`,`success`),c());return}if(o===`reject`){let e=n(a);e&&(m(`Rejected ${e.reference}.`,`error`),c());return}if(o===`details`){let t=e().find(e=>e.id===a);t&&f(t)}}),a.addEventListener(`click`,t=>{let n=t.target.closest(`[data-action="details"]`);if(!n)return;let r=e().find(e=>e.id===n.dataset.id);r&&f(r)});function c(){let t=e(),n=t.filter(e=>e.status===`pending`),i=t.filter(e=>e.status!==`pending`),a=t.filter(e=>e.status===`approved`).length,o=t.filter(e=>e.status===`approved`).reduce((e,t)=>e+(t.side===`Sell`?-1:1)*Number(t.amountUsdt||0),0);r.innerHTML=`
    <span>Funding Queue</span>
    <strong>${n.length} pending</strong>
    <p>${a} approved requests with a net ${o.toFixed(2)} USDT account impact.</p>
  `,l(n),u(i)}function l(e){if(!e.length){i.innerHTML=`<div class="latest-preview empty-state"><strong>No pending requests</strong><p>New Admin payment requests from the user Buy with PHP page will appear here.</p></div>`;return}i.innerHTML=d(e,!0)}function u(e){if(!e.length){a.innerHTML=`<div class="latest-preview empty-state"><strong>No processed requests</strong><p>Approved or rejected requests will appear here.</p></div>`;return}a.innerHTML=d(e,!1)}function d(e,t){return`
    <div class="table-responsive">
      <table class="table table-dark table-hover align-middle admin-table mb-0">
        <thead>
          <tr>
            <th>Reference</th>
            <th>Account</th>
            <th>Side</th>
            <th>Amount</th>
            <th>PHP</th>
            <th>${t?`Requested`:`Updated`}</th>
            <th>Status</th>
            <th class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${e.map(e=>`
            <tr>
              <td class="fw-semibold text-warning">${g(e.reference)}</td>
              <td>${g(e.accountMode)}</td>
              <td>${g(e.side||`Buy`)}</td>
              <td>${g(e.amountUsdt)} ${g(e.asset)}</td>
              <td>PHP ${g(e.amountPhp)}</td>
              <td>${h(t?e.createdAt:e.updatedAt)}</td>
              <td><span class="badge ${p(e.status)} text-capitalize">${g(e.status)}</span></td>
              <td class="text-end">
                <div class="d-inline-flex gap-2 flex-wrap justify-content-end">
                  <button type="button" class="btn btn-sm btn-outline-light" data-action="details" data-id="${_(e.id)}" data-bs-toggle="offcanvas" data-bs-target="#paymentDetailOffcanvas">Details</button>
                  ${t?`<button type="button" class="btn btn-sm btn-warning" data-action="approve" data-id="${_(e.id)}">${e.side===`Sell`?`Approve Payout`:`Approve Deposit`}</button><button type="button" class="btn btn-sm btn-outline-danger" data-action="reject" data-id="${_(e.id)}">Reject</button>`:``}
                </div>
              </td>
            </tr>
          `).join(``)}
        </tbody>
      </table>
    </div>
  `}function f(e){s.innerHTML=`
    <div class="d-grid gap-3">
      <div class="list-group admin-list-group compact-list">
        <div class="list-group-item admin-list-group-item"><strong>Reference</strong><div>${g(e.reference)}</div></div>
        <div class="list-group-item admin-list-group-item"><strong>Account</strong><div>${g(e.accountMode)}</div></div>
        <div class="list-group-item admin-list-group-item"><strong>Method</strong><div>${g(e.paymentMethod)}</div></div>
        <div class="list-group-item admin-list-group-item"><strong>Side</strong><div>${g(e.side||`Buy`)}</div></div>
        <div class="list-group-item admin-list-group-item"><strong>USDT</strong><div>${g(e.amountUsdt)} ${g(e.asset)}</div></div>
        <div class="list-group-item admin-list-group-item"><strong>PHP</strong><div>${g(e.amountPhp)}</div></div>
        <div class="list-group-item admin-list-group-item"><strong>Quote rate</strong><div>${g(e.quoteRate)}</div></div>
      </div>
      ${e.receiptNotes?`<div class="payment-request-note"><span>Receipt notes</span><p>${g(e.receiptNotes)}</p></div>`:``}
      ${e.proofOfPaymentDataUrl?`<div class="payment-request-proof"><span>Proof of payment</span><img src="${_(e.proofOfPaymentDataUrl)}" alt="${_(e.proofOfPaymentName||`Proof of payment`)}" /><p>${g(e.proofOfPaymentName||`Proof of payment`)}</p></div>`:``}
    </div>
  `}function p(e){return e===`approved`?`text-bg-success`:e===`rejected`?`text-bg-danger`:`text-bg-warning`}function m(e,t=``){o.textContent=e,o.className=`status-message ${t}`.trim()}function h(e){let t=new Date(e);return Number.isNaN(t.getTime())?`Unknown time`:new Intl.DateTimeFormat(`en-GB`,{year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`}).format(t)}function g(e){return String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function _(e){return g(e)}