import"./modulepreload-polyfill-CSRv37U6.js";import{a as e,f as t,i as n,l as r,n as i,p as a,r as o,u as s}from"./inviteShareSettings-Cj7f2N7H.js";import"./admin-shell-Bc7ijRy7.js";var c=document.getElementById(`invite-form`),l=document.getElementById(`latest-preview`),u=document.getElementById(`history-list`),d=document.getElementById(`status-message`),f=document.getElementById(`copy-latest`),p=document.getElementById(`reset-form`),m=document.getElementById(`clear-history`),h=document.getElementById(`share-settings-form`),g=document.getElementById(`share-domain`),_=document.getElementById(`share-invite-link`),v=document.getElementById(`copy-share-link`);y(),c.addEventListener(`submit`,async e=>{e.preventDefault();let n=new FormData(c),r=t(Object.fromEntries(n.entries()));E(`Invite code ${r.code} generated and saved.`,`success`),y(r),await T(r.code,!1)}),h.addEventListener(`submit`,t=>{t.preventDefault(),b(e({domain:g.value})),E(`Share settings saved for the user dashboard.`,`success`)}),v.addEventListener(`click`,async()=>{await T(_.value,!0,`Share link copied.`)}),f.addEventListener(`click`,async()=>{let e=r();if(!e){E(`Generate a code before copying.`,`error`);return}await T(e.code)}),p.addEventListener(`click`,()=>{c.reset(),E(`Form reset.`,`success`)}),m.addEventListener(`click`,()=>{a([]),y(),E(`All saved invite codes were cleared.`,`success`)}),u.addEventListener(`click`,async e=>{let t=e.target.closest(`[data-action]`);if(!t)return;let n=t.dataset.code,r=s(),i=r.find(e=>e.code===n);if(!i){E(`That invite code no longer exists.`,`error`),y();return}if(t.dataset.action===`copy`){await T(i.code);return}t.dataset.action===`delete`&&(a(r.filter(e=>e.code!==n)),y(),E(`Invite code ${n} deleted.`,`success`))});function y(e){let t=e||r(),n=s();f.disabled=!t,x(t),S(n),b(o())}function b(e){g.value=e.domain,_.value=i(e,n())}function x(e){if(!e){l.className=`latest-preview empty-state`,l.innerHTML=`
      <strong>No code generated yet</strong>
      <p>Create a signal and copy the generated code into the user dashboard Invited Me section.</p>
    `;return}l.className=`latest-preview`,l.innerHTML=`
    <span class="latest-label">Copy this code into the user dashboard</span>
    <div class="latest-code">${D(e.code)}</div>
    <div class="preview-grid">
      <article class="preview-card"><span>Title</span><strong>${D(e.title)}</strong></article>
      <article class="preview-card"><span>Pair</span><strong>${D(e.tradingPair)}</strong></article>
      <article class="preview-card"><span>Duration</span><strong>${D(e.purchaseDuration)}</strong></article>
      <article class="preview-card"><span>Trade wallet usage</span><strong>${D(C(e))}</strong></article>
      <article class="preview-card"><span>Rate of return</span><strong>${D(w(e))}</strong></article>
      <article class="preview-card"><span>Direction</span><strong>${D(e.direction)}</strong></article>
      <article class="preview-card"><span>Release Time</span><strong>${D(e.releaseTime)}</strong></article>
    </div>
  `}function S(e){if(!e.length){u.innerHTML=`<div class="latest-preview empty-state"><strong>No saved invites</strong><p>Generated codes will appear here for reuse or deletion.</p></div>`;return}u.innerHTML=e.map(e=>`
    <article class="history-item">
      <div class="history-item-head">
        <div>
          <div class="history-item-code">${D(e.code)}</div>
          <p>${D(e.title)}</p>
        </div>
        <div class="history-item-actions">
          <button type="button" class="mini-button" data-action="copy" data-code="${O(e.code)}">Copy Code</button>
          <button type="button" class="danger-button" data-action="delete" data-code="${O(e.code)}">Delete</button>
        </div>
      </div>
      <div class="history-item-meta">
        <span>${D(e.tradingPair)}</span>
        <span>${D(e.purchaseDuration)}</span>
        <span>${D(C(e))}</span>
        <span>${D(w(e))}</span>
        <span>${D(e.direction)}</span>
      </div>
    </article>
  `).join(``)}function C(e){let t=Number(e.orderPercentage);return Number.isFinite(t)&&t>0?`${t.toFixed(2)}% of Trade wallet`:`${D(e.orderAmount)} fixed`}function w(e){return`${Number(e.rateOfReturn||0).toFixed(2)}%`}async function T(e,t=!0,n=`Invite code ${e} copied.`){try{await navigator.clipboard.writeText(e),t&&E(n,`success`)}catch{E(`Invite code ${e} was generated, but clipboard access is unavailable.`,`error`)}}function E(e,t=``){d.textContent=e,d.className=`status-message ${t}`.trim()}function D(e){return String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function O(e){return D(e)}