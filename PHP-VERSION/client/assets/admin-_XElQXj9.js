import"./modulepreload-polyfill-CSRv37U6.js";import{a as e,f as t,i as n,l as r,n as i,p as a,t as o,u as s}from"./tradeProductSettings-CeNT5iea.js";/* empty css               */var c=document.getElementById(`invite-form`),l=document.getElementById(`latest-preview`),u=document.getElementById(`history-list`),d=document.getElementById(`status-message`),f=document.getElementById(`copy-latest`),p=document.getElementById(`reset-form`),m=document.getElementById(`clear-history`),h=document.getElementById(`product-search`),g=document.getElementById(`product-catalog`),_=document.getElementById(`selected-products-summary`),v=document.getElementById(`save-products`),y=document.getElementById(`reset-products`),b=new Set(n().selectedProducts),x=``;S(),c.addEventListener(`submit`,async e=>{e.preventDefault();let n=new FormData(c),r=t(Object.fromEntries(n.entries()));k(`Invite code ${r.code} generated and saved.`,`success`),S(r),await O(r.code,!1)}),f.addEventListener(`click`,async()=>{let e=r();if(!e){k(`Generate a code before copying.`,`error`);return}await O(e.code)}),p.addEventListener(`click`,()=>{c.reset(),k(`Form reset.`,`success`)}),m.addEventListener(`click`,()=>{a([]),S(),k(`All saved invite codes were cleared.`,`success`)}),h.addEventListener(`input`,e=>{x=e.target.value.trim().toUpperCase(),C()}),g.addEventListener(`change`,e=>{let t=e.target.closest(`input[type="checkbox"][data-product]`);if(!t)return;let n=t.dataset.product;t.checked?b.add(n):b.delete(n),C()}),v.addEventListener(`click`,()=>{let t=e([...b]);b=new Set(t),C(),k(`Saved ${t.length} trade drawer product${t.length===1?``:`s`}.`,`success`)}),y.addEventListener(`click`,()=>{let t=e(o);b=new Set(t),x=``,h.value=``,C(),k(`Trade drawer products restored to the default list.`,`success`)}),u.addEventListener(`click`,async e=>{let t=e.target.closest(`[data-action]`);if(!t)return;let n=t.dataset.code,r=s(),i=r.find(e=>e.code===n);if(!i){k(`That invite code no longer exists.`,`error`),S();return}if(t.dataset.action===`copy`){await O(i.code);return}t.dataset.action===`delete`&&(a(r.filter(e=>e.code!==n)),S(),k(`Invite code ${n} deleted.`,`success`))});function S(e){let t=e||r(),n=s();f.disabled=!t,w(t),T(n),C()}function C(){let e=[...b],t=i.filter(e=>e.includes(x));_.innerHTML=e.length?e.map(e=>`<span class="product-chip">${A(e)}</span>`).join(``):`<span class="product-chip muted">No products selected</span>`,g.innerHTML=t.length?t.map(e=>`
      <label class="product-option-tile">
        <input type="checkbox" data-product="${j(e)}" ${b.has(e)?`checked`:``} />
        <span>${A(e)}</span>
      </label>
    `).join(``):`<div class="latest-preview empty-state"><strong>No matching products</strong><p>Try a different symbol search.</p></div>`}function w(e){if(!e){l.className=`latest-preview empty-state`,l.innerHTML=`
      <strong>No code generated yet</strong>
      <p>Create a signal and copy the generated code into the user dashboard Invited Me section.</p>
    `;return}l.className=`latest-preview`,l.innerHTML=`
    <span class="latest-label">Copy this code into the user dashboard</span>
    <div class="latest-code">${A(e.code)}</div>
    <div class="preview-grid">
      <article class="preview-card"><span>Title</span><strong>${A(e.title)}</strong></article>
      <article class="preview-card"><span>Pair</span><strong>${A(e.tradingPair)}</strong></article>
      <article class="preview-card"><span>Duration</span><strong>${A(e.purchaseDuration)}</strong></article>
      <article class="preview-card"><span>Trade wallet usage</span><strong>${A(E(e))}</strong></article>
      <article class="preview-card"><span>Rate of return</span><strong>${A(D(e))}</strong></article>
      <article class="preview-card"><span>Direction</span><strong>${A(e.direction)}</strong></article>
      <article class="preview-card"><span>Release Time</span><strong>${A(e.releaseTime)}</strong></article>
    </div>
  `}function T(e){if(!e.length){u.innerHTML=`<div class="latest-preview empty-state"><strong>No saved invites</strong><p>Generated codes will appear here for reuse or deletion.</p></div>`;return}u.innerHTML=e.map(e=>`
    <article class="history-item">
      <div class="history-item-head">
        <div>
          <div class="history-item-code">${A(e.code)}</div>
          <p>${A(e.title)}</p>
        </div>
        <div class="history-item-actions">
          <button type="button" class="mini-button" data-action="copy" data-code="${j(e.code)}">Copy Code</button>
          <button type="button" class="danger-button" data-action="delete" data-code="${j(e.code)}">Delete</button>
        </div>
      </div>
      <div class="history-item-meta">
        <span>${A(e.tradingPair)}</span>
        <span>${A(e.purchaseDuration)}</span>
        <span>${A(E(e))}</span>
        <span>${A(D(e))}</span>
        <span>${A(e.direction)}</span>
      </div>
    </article>
  `).join(``)}function E(e){let t=Number(e.orderPercentage);return Number.isFinite(t)&&t>0?`${t.toFixed(2)}% of Trade wallet`:`${A(e.orderAmount)} fixed`}function D(e){return`${Number(e.rateOfReturn||0).toFixed(2)}%`}async function O(e,t=!0){try{await navigator.clipboard.writeText(e),t&&k(`Invite code ${e} copied.`,`success`)}catch{k(`Invite code ${e} was generated, but clipboard access is unavailable.`,`error`)}}function k(e,t=``){d.textContent=e,d.className=`status-message ${t}`.trim()}function A(e){return String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function j(e){return A(e)}