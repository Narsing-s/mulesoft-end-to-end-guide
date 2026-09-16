/* MuleJourney visible account controls — keeps logout explicit in the learning UI. */
(function(){
  const SESSION_KEY='mulejourney.local.session.v2';
  function readSession(){try{return JSON.parse(localStorage.getItem(SESSION_KEY)||'null')}catch{return null}}
  function mount(){
    const session=readSession();
    const old=document.getElementById('mulejourney-account-controls');
    if(old)old.remove();
    if(!session?.authenticated)return;

    const bar=document.createElement('div');
    bar.id='mulejourney-account-controls';
    bar.style.cssText='position:fixed;right:18px;bottom:18px;z-index:1800;display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid #29415e;border-radius:14px;background:rgba(7,17,31,.96);box-shadow:0 14px 45px rgba(0,0,0,.35);backdrop-filter:blur(12px);font:600 13px Inter,system-ui,sans-serif;color:#dce9f7';

    const identity=document.createElement('div');
    identity.style.cssText='display:flex;flex-direction:column;gap:2px;min-width:0;max-width:220px';
    const name=document.createElement('strong');
    name.textContent=session.name||'Learner';
    name.style.cssText='white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#fff';
    const email=document.createElement('span');
    email.textContent=session.email||'';
    email.style.cssText='font-size:11px;color:#8ea1b6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis';
    identity.append(name,email);

    const logout=document.createElement('button');
    logout.type='button';
    logout.textContent='Log out';
    logout.setAttribute('aria-label','Log out');
    logout.title='Log out';
    logout.style.cssText='border:1px solid #55d6be;border-radius:10px;padding:9px 13px;background:#55d6be;color:#031018;font-weight:900;cursor:pointer;white-space:nowrap';
    logout.onclick=function(){
      logout.disabled=true;
      logout.textContent='Logging out…';
      localStorage.removeItem(SESSION_KEY);
      location.replace('login.html');
    };

    bar.append(identity,logout);
    document.body.appendChild(bar);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
  window.addEventListener('pageshow',mount);
})();
