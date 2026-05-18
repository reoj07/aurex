import"./modulepreload-polyfill-CSRv37U6.js";import{_ as e,a as t,c as n,g as r,i,l as a,m as o,n as s,p as c,s as l,t as u}from"./tradeProductSettings-DSWbKr6m.js";/* empty css               */var d=document.getElementById(`invite-form`),f=document.getElementById(`latest-preview`),p=document.getElementById(`history-list`),m=document.getElementById(`status-message`),h=document.getElementById(`copy-latest`),g=document.getElementById(`reset-form`),_=document.getElementById(`clear-history`),v=document.getElementById(`product-search`),y=document.getElementById(`product-catalog`),b=document.getElementById(`selected-products-summary`),x=document.getElementById(`save-products`),S=document.getElementById(`reset-products`),C=document.getElementById(`share-settings-form`),w=document.getElementById(`share-domain`),T=document.getElementById(`share-team-size`),E=document.getElementById(`share-income`),D=document.getElementById(`share-invite-code`),O=document.getElementById(`share-invite-link`),k=document.getElementById(`copy-share-link`),A=new Set(i().selectedProducts),j=``;M(),d.addEventListener(`submit`,async e=>{e.preventDefault();let t=new FormData(d),n=r(Object.fromEntries(t.entries()));a({inviteCode:n.code}),B(`Invite code ${n.code} generated and saved.`,`success`),M(n),await z(n.code,!1)}),C.addEventListener(`submit`,e=>{e.preventDefault(),N(a({domain:w.value,teamSize:T.value,invitationIncome:E.value,inviteCode:D.value})),B(`Share settings saved for the user dashboard.`,`success`)}),k.addEventListener(`click`,async()=>{await z(O.value,!0,`Share link copied.`)}),h.addEventListener(`click`,async()=>{let e=c();if(!e){B(`Generate a code before copying.`,`error`);return}await z(e.code)}),g.addEventListener(`click`,()=>{d.reset(),B(`Form reset.`,`success`)}),_.addEventListener(`click`,()=>{e([]),M(),B(`All saved invite codes were cleared.`,`success`)}),v.addEventListener(`input`,e=>{j=e.target.value.trim().toUpperCase(),P()}),y.addEventListener(`change`,e=>{let t=e.target.closest(`input[type="checkbox"][data-product]`);if(!t)return;let n=t.dataset.product;t.checked?A.add(n):A.delete(n),P()}),x.addEventListener(`click`,()=>{let e=t([...A]);A=new Set(e),P(),B(`Saved ${e.length} trade drawer product${e.length===1?``:`s`}.`,`success`)}),S.addEventListener(`click`,()=>{let e=t(u);A=new Set(e),j=``,v.value=``,P(),B(`Trade drawer products restored to the default list.`,`success`)}),p.addEventListener(`click`,async t=>{let n=t.target.closest(`[data-action]`);if(!n)return;let r=n.dataset.code,i=o(),a=i.find(e=>e.code===r);if(!a){B(`That invite code no longer exists.`,`error`),M();return}if(n.dataset.action===`copy`){await z(a.code);return}n.dataset.action===`delete`&&(e(i.filter(e=>e.code!==r)),M(),B(`Invite code ${r} deleted.`,`success`))});function M(e){let t=e||c(),r=o();h.disabled=!t,F(t),I(r),P(),N(t?a({inviteCode:t.code}):n())}function N(e){w.value=e.domain,T.value=e.teamSize,E.value=e.invitationIncome,D.value=e.inviteCode,O.value=l(e)}function P(){let e=[...A],t=s.filter(e=>e.includes(j));b.innerHTML=e.length?e.map(e=>`<span class="product-chip">${V(e)}</span>`).join(``):`<span class="product-chip muted">No products selected</span>`,y.innerHTML=t.length?t.map(e=>`
      <label class="product-option-tile">
        <input type="checkbox" data-product="${H(e)}" ${A.has(e)?`checked`:``} />
        <span>${V(e)}</span>
      </label>
    `).join(``):`<div class="latest-preview empty-state"><strong>No matching products</strong><p>Try a different symbol search.</p></div>`}function F(e){if(!e){f.className=`latest-preview empty-state`,f.innerHTML=`
      <strong>No code generated yet</strong>
      <p>Create a signal and copy the generated code into the user dashboard Invited Me section.</p>
    `;return}f.className=`latest-preview`,f.innerHTML=`
    <span class="latest-label">Copy this code into the user dashboard</span>
    <div class="latest-code">${V(e.code)}</div>
    <div class="preview-grid">
      <article class="preview-card"><span>Title</span><strong>${V(e.title)}</strong></article>
      <article class="preview-card"><span>Pair</span><strong>${V(e.tradingPair)}</strong></article>
      <article class="preview-card"><span>Duration</span><strong>${V(e.purchaseDuration)}</strong></article>
      <article class="preview-card"><span>Trade wallet usage</span><strong>${V(L(e))}</strong></article>
      <article class="preview-card"><span>Rate of return</span><strong>${V(R(e))}</strong></article>
      <article class="preview-card"><span>Direction</span><strong>${V(e.direction)}</strong></article>
      <article class="preview-card"><span>Release Time</span><strong>${V(e.releaseTime)}</strong></article>
    </div>
  `}function I(e){if(!e.length){p.innerHTML=`<div class="latest-preview empty-state"><strong>No saved invites</strong><p>Generated codes will appear here for reuse or deletion.</p></div>`;return}p.innerHTML=e.map(e=>`
    <article class="history-item">
      <div class="history-item-head">
        <div>
          <div class="history-item-code">${V(e.code)}</div>
          <p>${V(e.title)}</p>
        </div>
        <div class="history-item-actions">
          <button type="button" class="mini-button" data-action="copy" data-code="${H(e.code)}">Copy Code</button>
          <button type="button" class="danger-button" data-action="delete" data-code="${H(e.code)}">Delete</button>
        </div>
      </div>
      <div class="history-item-meta">
        <span>${V(e.tradingPair)}</span>
        <span>${V(e.purchaseDuration)}</span>
        <span>${V(L(e))}</span>
        <span>${V(R(e))}</span>
        <span>${V(e.direction)}</span>
      </div>
    </article>
  `).join(``)}function L(e){let t=Number(e.orderPercentage);return Number.isFinite(t)&&t>0?`${t.toFixed(2)}% of Trade wallet`:`${V(e.orderAmount)} fixed`}function R(e){return`${Number(e.rateOfReturn||0).toFixed(2)}%`}async function z(e,t=!0,n=`Invite code ${e} copied.`){try{await navigator.clipboard.writeText(e),t&&B(n,`success`)}catch{B(`Invite code ${e} was generated, but clipboard access is unavailable.`,`error`)}}function B(e,t=``){m.textContent=e,m.className=`status-message ${t}`.trim()}function V(e){return String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function H(e){return V(e)}