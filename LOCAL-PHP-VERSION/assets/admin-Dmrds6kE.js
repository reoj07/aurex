import"./modulepreload-polyfill-myak50gs.js";import{i as e,o as t}from"./inviteOrders-Cv8S0Irf.js";import"./admin-shell-Cp2onYhX.js";var n=document.getElementById(`invite-form`),r=document.getElementById(`latest-preview`),i=document.getElementById(`status-message`),a=document.getElementById(`copy-latest`),o=document.getElementById(`reset-form`);s(),n.addEventListener(`submit`,async e=>{e.preventDefault();let r=new FormData(n),i=t(Object.fromEntries(r.entries()));f(`Invite code ${i.code} generated and saved.`,`success`),s(i),await d(i.code,!1)}),a.addEventListener(`click`,async()=>{let t=e();if(!t){f(`Generate a code before copying.`,`error`);return}await d(t.code)}),o.addEventListener(`click`,()=>{n.reset(),f(`Form reset.`,`success`)});function s(t){let n=t||e();a.disabled=!n,c(n)}function c(e){if(!e){r.className=`latest-preview empty-state`,r.innerHTML=`
      <strong>No code generated yet</strong>
      <p>Create a signal and copy the generated code into the user dashboard Invited Me section.</p>
    `;return}r.className=`latest-preview`,r.innerHTML=`
    <span class="latest-label">Copy this code into the user dashboard</span>
    <div class="latest-code">${p(e.code)}</div>
    <div class="preview-grid">
      <article class="preview-card"><span>Title</span><strong>${p(e.title)}</strong></article>
      <article class="preview-card"><span>Pair</span><strong>${p(e.tradingPair)}</strong></article>
      <article class="preview-card"><span>Duration</span><strong>${p(e.purchaseDuration)}</strong></article>
      <article class="preview-card"><span>Trade wallet usage</span><strong>${p(l(e))}</strong></article>
      <article class="preview-card"><span>Rate of return</span><strong>${p(u(e))}</strong></article>
      <article class="preview-card"><span>Direction</span><strong>${p(e.direction)}</strong></article>
      <article class="preview-card"><span>Release Time</span><strong>${p(e.releaseTime)}</strong></article>
    </div>
  `}function l(e){let t=Number(e.orderPercentage);return Number.isFinite(t)&&t>0?`${t.toFixed(2)}% of Trade wallet`:`${p(e.orderAmount)} fixed`}function u(e){return`${Number(e.rateOfReturn||0).toFixed(2)}%`}async function d(e,t=!0,n=`Invite code ${e} copied.`){try{await navigator.clipboard.writeText(e),t&&f(n,`success`)}catch{f(`Invite code ${e} was generated, but clipboard access is unavailable.`,`error`)}}function f(e,t=``){i.textContent=e,i.className=`status-message ${t}`.trim()}function p(e){return String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}