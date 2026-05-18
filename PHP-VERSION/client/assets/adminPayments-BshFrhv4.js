import"./modulepreload-polyfill-CSRv37U6.js";import{o as e,r as t,s as n}from"./paymentRequests-_3SqHY3E.js";import"./admin-shell-CY619ZFv.js";var r=document.getElementById(`payment-summary`),i=document.getElementById(`pending-payment-list`),a=document.getElementById(`processed-payment-list`),o=document.getElementById(`payment-status-message`);s(),i.addEventListener(`click`,e=>{let r=e.target.closest(`[data-action]`);if(!r)return;let i=r.dataset.id,a=r.dataset.action;if(a===`approve`){let e=t(i);e&&(u(e.side===`Sell`?`Approved ${e.reference}. ${e.amountUsdt} ${e.asset} debited from ${e.accountMode} Exchange for payout settlement.`:`Approved ${e.reference}. ${e.amountUsdt} ${e.asset} credited to ${e.accountMode} Exchange.`,`success`),s());return}if(a===`reject`){let e=n(i);e&&(u(`Rejected ${e.reference}.`,`error`),s())}});function s(){let t=e(),n=t.filter(e=>e.status===`pending`),i=t.filter(e=>e.status!==`pending`),a=t.filter(e=>e.status===`approved`).length,o=t.filter(e=>e.status===`approved`).reduce((e,t)=>e+(t.side===`Sell`?-1:1)*Number(t.amountUsdt||0),0);r.innerHTML=`
    <span>Funding Queue</span>
    <strong>${n.length} pending</strong>
    <p>${a} approved requests with a net ${o.toFixed(2)} USDT account impact.</p>
  `,c(n),l(i)}function c(e){if(!e.length){i.innerHTML=`<div class="latest-preview empty-state"><strong>No pending requests</strong><p>New Admin payment requests from the user Buy with PHP page will appear here.</p></div>`;return}i.innerHTML=e.map(e=>`
    <article class="history-item payment-request-card pending">
      <div class="history-item-head">
        <div>
          <div class="history-item-code">${f(e.reference)}</div>
          <p>${f(e.accountMode)} account • ${f(e.side||`Buy`)} • ${f(e.paymentMethod)}</p>
        </div>
        <div class="payment-status-chip pending">Pending</div>
      </div>
      <div class="payment-request-grid">
        <article class="preview-card"><span>${e.side===`Sell`?`User sells`:`User receives`}</span><strong>${f(e.amountUsdt)} ${f(e.asset)}</strong></article>
        <article class="preview-card"><span>${e.side===`Sell`?`Admin settles`:`User pays`}</span><strong>PHP ${f(e.amountPhp)}</strong></article>
        <article class="preview-card"><span>Quote rate</span><strong>${f(e.quoteRate)} PHP</strong></article>
        <article class="preview-card"><span>Requested at</span><strong>${d(e.createdAt)}</strong></article>
      </div>
      ${e.receiptNotes?`<div class="payment-request-note"><span>Receipt notes</span><p>${f(e.receiptNotes)}</p></div>`:``}
      ${e.proofOfPaymentDataUrl?`
        <div class="payment-request-proof">
          <span>Proof of payment</span>
          <img src="${p(e.proofOfPaymentDataUrl)}" alt="${p(e.proofOfPaymentName||`Proof of payment`)}" />
          <p>${f(e.proofOfPaymentName||`Proof of payment`)}</p>
        </div>
      `:``}
      <div class="payment-request-actions">
        <button type="button" class="primary-button" data-action="approve" data-id="${p(e.id)}">${e.side===`Sell`?`Approve Payout`:`Approve Deposit`}</button>
        <button type="button" class="danger-button" data-action="reject" data-id="${p(e.id)}">Reject</button>
      </div>
    </article>
  `).join(``)}function l(e){if(!e.length){a.innerHTML=`<div class="latest-preview empty-state"><strong>No processed requests</strong><p>Approved or rejected requests will appear here.</p></div>`;return}a.innerHTML=e.map(e=>`
    <article class="history-item payment-request-card ${p(e.status)}">
      <div class="history-item-head">
        <div>
          <div class="history-item-code">${f(e.reference)}</div>
          <p>${f(e.accountMode)} account • ${f(e.side||`Buy`)} • ${f(e.paymentMethod)}</p>
        </div>
        <div class="payment-status-chip ${p(e.status)}">${f(e.status)}</div>
      </div>
      <div class="history-item-meta">
        <span>${f(e.amountUsdt)} ${f(e.asset)}</span>
        <span>PHP ${f(e.amountPhp)}</span>
        <span>${d(e.updatedAt)}</span>
      </div>
      ${e.receiptNotes?`<div class="payment-request-note compact"><span>Receipt notes</span><p>${f(e.receiptNotes)}</p></div>`:``}
    </article>
  `).join(``)}function u(e,t=``){o.textContent=e,o.className=`status-message ${t}`.trim()}function d(e){let t=new Date(e);return Number.isNaN(t.getTime())?`Unknown time`:new Intl.DateTimeFormat(`en-GB`,{year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`}).format(t)}function f(e){return String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function p(e){return f(e)}