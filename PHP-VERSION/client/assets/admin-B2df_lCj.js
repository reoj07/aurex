import"./modulepreload-polyfill-CSRv37U6.js";import{a as e,c as t,i as n,s as r}from"./inviteOrders-BXsfElEg.js";/* empty css               */var i=document.getElementById(`invite-form`),a=document.getElementById(`latest-preview`),o=document.getElementById(`history-list`),s=document.getElementById(`status-message`),c=document.getElementById(`copy-latest`),l=document.getElementById(`reset-form`),u=document.getElementById(`clear-history`);d(),i.addEventListener(`submit`,async e=>{e.preventDefault();let t=new FormData(i),n=r(Object.fromEntries(t.entries()));_(`Invite code ${n.code} generated and saved.`,`success`),d(n),await g(n.code,!1)}),c.addEventListener(`click`,async()=>{let e=n();if(!e){_(`Generate a code before copying.`,`error`);return}await g(e.code)}),l.addEventListener(`click`,()=>{i.reset(),_(`Form reset.`,`success`)}),u.addEventListener(`click`,()=>{t([]),d(),_(`All saved invite codes were cleared.`,`success`)}),o.addEventListener(`click`,async n=>{let r=n.target.closest(`[data-action]`);if(!r)return;let i=r.dataset.code,a=e(),o=a.find(e=>e.code===i);if(!o){_(`That invite code no longer exists.`,`error`),d();return}if(r.dataset.action===`copy`){await g(o.code);return}r.dataset.action===`delete`&&(t(a.filter(e=>e.code!==i)),d(),_(`Invite code ${i} deleted.`,`success`))});function d(t){let r=t||n(),i=e();c.disabled=!r,f(r),p(i)}function f(e){if(!e){a.className=`latest-preview empty-state`,a.innerHTML=`
      <strong>No code generated yet</strong>
      <p>Create a signal and copy the generated code into the user dashboard Invited Me section.</p>
    `;return}a.className=`latest-preview`,a.innerHTML=`
    <span class="latest-label">Copy this code into the user dashboard</span>
    <div class="latest-code">${v(e.code)}</div>
    <div class="preview-grid">
      <article class="preview-card"><span>Title</span><strong>${v(e.title)}</strong></article>
      <article class="preview-card"><span>Pair</span><strong>${v(e.tradingPair)}</strong></article>
      <article class="preview-card"><span>Duration</span><strong>${v(e.purchaseDuration)}</strong></article>
      <article class="preview-card"><span>Trade wallet usage</span><strong>${v(m(e))}</strong></article>
      <article class="preview-card"><span>Rate of return</span><strong>${v(h(e))}</strong></article>
      <article class="preview-card"><span>Direction</span><strong>${v(e.direction)}</strong></article>
      <article class="preview-card"><span>Release Time</span><strong>${v(e.releaseTime)}</strong></article>
    </div>
  `}function p(e){if(!e.length){o.innerHTML=`<div class="latest-preview empty-state"><strong>No saved invites</strong><p>Generated codes will appear here for reuse or deletion.</p></div>`;return}o.innerHTML=e.map(e=>`
    <article class="history-item">
      <div class="history-item-head">
        <div>
          <div class="history-item-code">${v(e.code)}</div>
          <p>${v(e.title)}</p>
        </div>
        <div class="history-item-actions">
          <button type="button" class="mini-button" data-action="copy" data-code="${y(e.code)}">Copy Code</button>
          <button type="button" class="danger-button" data-action="delete" data-code="${y(e.code)}">Delete</button>
        </div>
      </div>
      <div class="history-item-meta">
        <span>${v(e.tradingPair)}</span>
        <span>${v(e.purchaseDuration)}</span>
        <span>${v(m(e))}</span>
        <span>${v(h(e))}</span>
        <span>${v(e.direction)}</span>
      </div>
    </article>
  `).join(``)}function m(e){let t=Number(e.orderPercentage);return Number.isFinite(t)&&t>0?`${t.toFixed(2)}% of Trade wallet`:`${v(e.orderAmount)} fixed`}function h(e){return`${Number(e.rateOfReturn||0).toFixed(2)}%`}async function g(e,t=!0){try{await navigator.clipboard.writeText(e),t&&_(`Invite code ${e} copied.`,`success`)}catch{_(`Invite code ${e} was generated, but clipboard access is unavailable.`,`error`)}}function _(e,t=``){s.textContent=e,s.className=`status-message ${t}`.trim()}function v(e){return String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function y(e){return v(e)}