import"./modulepreload-polyfill-CSRv37U6.js";import{_ as e,a as t,c as n,h as r,i,l as a,m as o,n as s,s as c,t as l,u,v as d}from"./tradeProductSettings-CCW1PrSg.js";/* empty css               */var f=document.getElementById(`invite-form`),p=document.getElementById(`latest-preview`),m=document.getElementById(`history-list`),h=document.getElementById(`status-message`),g=document.getElementById(`copy-latest`),_=document.getElementById(`reset-form`),v=document.getElementById(`clear-history`),y=document.getElementById(`product-search`),b=document.getElementById(`product-catalog`),x=document.getElementById(`selected-products-summary`),S=document.getElementById(`save-products`),C=document.getElementById(`reset-products`),w=document.getElementById(`share-settings-form`),T=document.getElementById(`share-domain`),E=document.getElementById(`share-invite-link`),D=document.getElementById(`copy-share-link`),O=new Set(i().selectedProducts),k=``;A(),f.addEventListener(`submit`,async t=>{t.preventDefault();let n=new FormData(f),r=e(Object.fromEntries(n.entries()));R(`Invite code ${r.code} generated and saved.`,`success`),A(r),await L(r.code,!1)}),w.addEventListener(`submit`,e=>{e.preventDefault(),j(u({domain:T.value})),R(`Share settings saved for the user dashboard.`,`success`)}),D.addEventListener(`click`,async()=>{await L(E.value,!0,`Share link copied.`)}),g.addEventListener(`click`,async()=>{let e=o();if(!e){R(`Generate a code before copying.`,`error`);return}await L(e.code)}),_.addEventListener(`click`,()=>{f.reset(),R(`Form reset.`,`success`)}),v.addEventListener(`click`,()=>{d([]),A(),R(`All saved invite codes were cleared.`,`success`)}),y.addEventListener(`input`,e=>{k=e.target.value.trim().toUpperCase(),M()}),b.addEventListener(`change`,e=>{let t=e.target.closest(`input[type="checkbox"][data-product]`);if(!t)return;let n=t.dataset.product;t.checked?O.add(n):O.delete(n),M()}),S.addEventListener(`click`,()=>{let e=t([...O]);O=new Set(e),M(),R(`Saved ${e.length} trade drawer product${e.length===1?``:`s`}.`,`success`)}),C.addEventListener(`click`,()=>{let e=t(l);O=new Set(e),k=``,y.value=``,M(),R(`Trade drawer products restored to the default list.`,`success`)}),m.addEventListener(`click`,async e=>{let t=e.target.closest(`[data-action]`);if(!t)return;let n=t.dataset.code,i=r(),a=i.find(e=>e.code===n);if(!a){R(`That invite code no longer exists.`,`error`),A();return}if(t.dataset.action===`copy`){await L(a.code);return}t.dataset.action===`delete`&&(d(i.filter(e=>e.code!==n)),A(),R(`Invite code ${n} deleted.`,`success`))});function A(e){let t=e||o(),i=r();g.disabled=!t,N(t),P(i),M(),j(n())}function j(e){T.value=e.domain,E.value=c(e,a())}function M(){let e=[...O],t=s.filter(e=>e.includes(k));x.innerHTML=e.length?e.map(e=>`<span class="product-chip">${z(e)}</span>`).join(``):`<span class="product-chip muted">No products selected</span>`,b.innerHTML=t.length?t.map(e=>`
      <label class="product-option-tile">
        <input type="checkbox" data-product="${B(e)}" ${O.has(e)?`checked`:``} />
        <span>${z(e)}</span>
      </label>
    `).join(``):`<div class="latest-preview empty-state"><strong>No matching products</strong><p>Try a different symbol search.</p></div>`}function N(e){if(!e){p.className=`latest-preview empty-state`,p.innerHTML=`
      <strong>No code generated yet</strong>
      <p>Create a signal and copy the generated code into the user dashboard Invited Me section.</p>
    `;return}p.className=`latest-preview`,p.innerHTML=`
    <span class="latest-label">Copy this code into the user dashboard</span>
    <div class="latest-code">${z(e.code)}</div>
    <div class="preview-grid">
      <article class="preview-card"><span>Title</span><strong>${z(e.title)}</strong></article>
      <article class="preview-card"><span>Pair</span><strong>${z(e.tradingPair)}</strong></article>
      <article class="preview-card"><span>Duration</span><strong>${z(e.purchaseDuration)}</strong></article>
      <article class="preview-card"><span>Trade wallet usage</span><strong>${z(F(e))}</strong></article>
      <article class="preview-card"><span>Rate of return</span><strong>${z(I(e))}</strong></article>
      <article class="preview-card"><span>Direction</span><strong>${z(e.direction)}</strong></article>
      <article class="preview-card"><span>Release Time</span><strong>${z(e.releaseTime)}</strong></article>
    </div>
  `}function P(e){if(!e.length){m.innerHTML=`<div class="latest-preview empty-state"><strong>No saved invites</strong><p>Generated codes will appear here for reuse or deletion.</p></div>`;return}m.innerHTML=e.map(e=>`
    <article class="history-item">
      <div class="history-item-head">
        <div>
          <div class="history-item-code">${z(e.code)}</div>
          <p>${z(e.title)}</p>
        </div>
        <div class="history-item-actions">
          <button type="button" class="mini-button" data-action="copy" data-code="${B(e.code)}">Copy Code</button>
          <button type="button" class="danger-button" data-action="delete" data-code="${B(e.code)}">Delete</button>
        </div>
      </div>
      <div class="history-item-meta">
        <span>${z(e.tradingPair)}</span>
        <span>${z(e.purchaseDuration)}</span>
        <span>${z(F(e))}</span>
        <span>${z(I(e))}</span>
        <span>${z(e.direction)}</span>
      </div>
    </article>
  `).join(``)}function F(e){let t=Number(e.orderPercentage);return Number.isFinite(t)&&t>0?`${t.toFixed(2)}% of Trade wallet`:`${z(e.orderAmount)} fixed`}function I(e){return`${Number(e.rateOfReturn||0).toFixed(2)}%`}async function L(e,t=!0,n=`Invite code ${e} copied.`){try{await navigator.clipboard.writeText(e),t&&R(n,`success`)}catch{R(`Invite code ${e} was generated, but clipboard access is unavailable.`,`error`)}}function R(e,t=``){h.textContent=e,h.className=`status-message ${t}`.trim()}function z(e){return String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function B(e){return z(e)}