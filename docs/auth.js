const SESSION_KEY='mulejourney.local.session.v2';
const ACCOUNT_KEY='mulejourney.local.account.v2';
const GREETING_STATUS_KEY='mulejourney.first-login.greeting.status.v2';
const LOGIN_PAGE='login.html';
const HOME_PAGE='index.html';

function readJson(key){try{return JSON.parse(localStorage.getItem(key)||'null')}catch{return null}}
function getLocalSession(){return readJson(SESSION_KEY)}
function hasValidSession(){const s=getLocalSession();return !!(s&&s.authenticated===true&&s.name)}
function redirectToLogin(){if(!location.pathname.endsWith('/login.html')&&!location.pathname.endsWith('login.html'))location.replace(LOGIN_PAGE)}
function requireLogin(){if(!hasValidSession())redirectToLogin()}
function signOut(){localStorage.removeItem(SESSION_KEY);location.replace(LOGIN_PAGE)}

function deleteLocalAccount(){
  const keys=[];
  for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    if(key&&key.startsWith('mulejourney.'))keys.push(key);
  }
  keys.forEach(key=>localStorage.removeItem(key));
  try{sessionStorage.clear()}catch{}
  location.replace(LOGIN_PAGE+'?deleted=1');
}

function showDeleteAccountDialog(){
  const existing=document.querySelector('#deleteAccountModal');
  if(existing){existing.remove();return}
  const modal=document.createElement('div');
  modal.id='deleteAccountModal';
  modal.setAttribute('role','dialog');
  modal.setAttribute('aria-modal','true');
  modal.style.cssText='position:fixed;inset:0;z-index:2000;display:flex;align-items:center;justify-content:center;padding:20px;background:#020812cc;backdrop-filter:blur(8px)';
  const box=document.createElement('div');
  box.style.cssText='width:min(520px,100%);padding:24px;border:1px solid #5b3140;border-radius:18px;background:#0b1828;color:#e8eef8;box-shadow:0 24px 80px #0009';
  const title=document.createElement('h2');title.textContent='Delete local account?';title.style.margin='0 0 10px';
  const text=document.createElement('p');text.textContent='This removes your MuleJourney local profile, session, learning progress, theme and greeting-email status from this browser. Because MuleJourney is static, this does not delete anything from an external email provider or GitHub.';text.style.cssText='color:#b9c7d8;line-height:1.6;margin:0 0 16px';
  const warning=document.createElement('p');warning.textContent='This action cannot be undone in this browser. Type DELETE to confirm.';warning.style.cssText='color:#ffb5c2;font-weight:700;margin:0 0 10px';
  const input=document.createElement('input');input.type='text';input.autocomplete='off';input.placeholder='Type DELETE';input.setAttribute('aria-label','Type DELETE to confirm account deletion');input.style.cssText='width:100%;box-sizing:border-box;padding:11px 12px;border-radius:10px;border:1px solid #42556c;background:#07111f;color:#fff';
  const actions=document.createElement('div');actions.style.cssText='display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap;margin-top:18px';
  const cancel=document.createElement('button');cancel.type='button';cancel.textContent='Keep my account';cancel.style.cssText='border:1px solid #40546b;background:#122235;color:#e6edf7;border-radius:10px;padding:9px 13px;cursor:pointer;font-weight:700';
  const confirm=document.createElement('button');confirm.type='button';confirm.textContent='Delete account';confirm.disabled=true;confirm.style.cssText='border:1px solid #a4475a;background:#7b263b;color:#fff;border-radius:10px;padding:9px 13px;cursor:pointer;font-weight:800;opacity:.55';
  function close(){modal.remove()}
  function update(){const ok=input.value.trim()==='DELETE';confirm.disabled=!ok;confirm.style.opacity=ok?'1':'.55'}
  input.addEventListener('input',update);
  cancel.addEventListener('click',close);
  confirm.addEventListener('click',()=>{if(input.value.trim()==='DELETE')deleteLocalAccount()});
  modal.addEventListener('click',e=>{if(e.target===modal)close()});
  box.append(title,text,warning,input,actions);actions.append(cancel,confirm);modal.append(box);document.body.appendChild(modal);input.focus();
}

function loadScript(src){return new Promise((resolve,reject)=>{const existing=document.querySelector(`script[src="${src}"]`);if(existing){if(existing.dataset.loaded==='true')return resolve();existing.addEventListener('load',()=>resolve(),{once:true});existing.addEventListener('error',reject,{once:true});return}const script=document.createElement('script');script.src=src;script.async=true;script.onload=()=>{script.dataset.loaded='true';resolve()};script.onerror=()=>reject(new Error(`Could not load ${src}`));document.head.appendChild(script)})}

async function sendGreetingForSession(session){
  if(!session?.email)return {status:'failed',message:'No signed-in email address is available.'};
  try{
    await loadScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js');
    await loadScript('email-config.js');
    const cfg=window.MULEJOURNEY_EMAIL||{};
    if(!cfg.publicKey||cfg.publicKey.startsWith('YOUR_')||!cfg.serviceId||cfg.serviceId.startsWith('YOUR_')||!cfg.templateId||cfg.templateId.startsWith('YOUR_')){
      const result={status:'not-configured',email:session.email,at:new Date().toISOString(),message:'EmailJS public key, service ID and template ID are not configured.'};
      localStorage.setItem(GREETING_STATUS_KEY,JSON.stringify(result));
      return result;
    }
    emailjs.init({publicKey:cfg.publicKey,limitRate:{id:'mulejourney-greeting',throttle:1000}});
    await emailjs.send(cfg.serviceId,cfg.templateId,{to_email:session.email,email:session.email,user_email:session.email,name:session.name,login_time:new Date().toLocaleString(),subject:'Welcome to MuleJourney'});
    const result={status:'sent',email:session.email,at:new Date().toISOString()};
    localStorage.setItem(GREETING_STATUS_KEY,JSON.stringify(result));
    return result;
  }catch(error){
    console.warn('MuleJourney greeting email was not sent.',error);
    const result={status:'failed',email:session.email,at:new Date().toISOString(),message:String(error?.text||error?.message||error)};
    localStorage.setItem(GREETING_STATUS_KEY,JSON.stringify(result));
    return result;
  }
}

function showGreetingStatus(session){
  const status=readJson(GREETING_STATUS_KEY);
  if(!status||!session||status.email!==session.email)return;
  const old=document.querySelector('#greetingStatus');if(old)old.remove();
  const banner=document.createElement('div');
  banner.id='greetingStatus';
  banner.style.cssText='position:fixed;right:20px;bottom:20px;z-index:1001;max-width:460px;padding:15px 17px;border:1px solid #29415e;border-radius:14px;background:#0b1828;color:#e8eef8;box-shadow:0 18px 50px #0007;font-size:.86rem;line-height:1.5';
  const title=document.createElement('strong');
  title.textContent=status.status==='sent'?'Welcome! ✉️':status.status==='not-configured'?'Login successful — email setup required':'Login successful — email could not be sent';
  const message=document.createElement('div');
  message.style.cssText='margin-top:4px;color:#aebed1';
  message.textContent=status.status==='sent'?`Greeting email sent to ${session.email}.`:status.status==='not-configured'?'EmailJS is not configured in this public site yet. The resend button cannot deliver mail until the three EmailJS values are configured.':'The greeting email could not be sent. Check the EmailJS error details in the browser console and verify the service/template settings.';
  const actions=document.createElement('div');actions.style.cssText='display:flex;gap:8px;flex-wrap:wrap;margin-top:10px';
  const resend=document.createElement('button');resend.type='button';resend.textContent='Send greeting again';resend.style.cssText='border:1px solid #55d6be;background:#55d6be;color:#031018;border-radius:9px;padding:7px 10px;cursor:pointer;font-weight:800';
  resend.addEventListener('click',async()=>{resend.disabled=true;resend.textContent='Sending…';const result=await sendGreetingForSession(session);resend.disabled=false;resend.textContent='Send greeting again';message.textContent=result.status==='sent'?`Greeting email sent to ${session.email}.`:result.status==='not-configured'?'EmailJS is not configured yet. Open Email setup and add the Public Key, Service ID and Template ID.':`The greeting email failed: ${result.message||'check EmailJS configuration and the browser console.'}`});
  const setup=document.createElement('a');setup.href='EMAIL-SETUP.md';setup.textContent='Email setup';setup.style.cssText='border:1px solid #29415e;background:#102034;color:#dce9f7;border-radius:9px;padding:7px 10px;text-decoration:none';
  const dismiss=document.createElement('button');dismiss.type='button';dismiss.textContent='Dismiss';dismiss.style.cssText='border:1px solid #29415e;background:#102034;color:#dce9f7;border-radius:9px;padding:7px 10px;cursor:pointer';dismiss.addEventListener('click',()=>banner.remove());
  actions.append(resend,setup,dismiss);banner.append(title,message,actions);document.body.appendChild(banner);
  if(status.status==='sent')setTimeout(()=>banner.remove(),7000);
}

function mountAuth(){
  const nav=document.querySelector('.nav-actions');
  if(!nav)return;
  // Remove both current and legacy Account controls so cached/previous UI cannot leave duplicates.
  nav.querySelectorAll('#localAuth, a[aria-label="Open account center"], a[title="Open Account Center"]').forEach(el=>el.remove());
  const session=getLocalSession();
  if(!session){showGreetingStatus(null);return}
  const wrap=document.createElement('span');
  wrap.id='localAuth';
  wrap.style.cssText='display:inline-flex;align-items:center;gap:8px';
  const name=document.createElement('span');name.textContent=`Hi, ${session.name}`;name.style.cssText='color:#9eb0c5;font-size:.8rem';
  const account=document.createElement('a');account.className='icon-btn';account.href='account.html';account.textContent='Account';account.setAttribute('aria-label','Open account center');account.title='Open Account Center';account.style.textDecoration='none';
  wrap.append(name,account);
  nav.prepend(wrap);
  showGreetingStatus(session);
}

function showAccountMenu(){
  const old=document.querySelector('#accountMenu');if(old){old.remove();return}
  const session=getLocalSession();if(!session)return;
  const menu=document.createElement('div');menu.id='accountMenu';menu.style.cssText='position:fixed;right:20px;top:72px;z-index:1500;width:min(300px,calc(100vw - 40px));padding:16px;border:1px solid #29415e;border-radius:16px;background:#0b1828;color:#e8eef8;box-shadow:0 20px 60px #0009';
  const heading=document.createElement('strong');heading.textContent=session.name||'Account';
  const email=document.createElement('div');email.textContent=session.email||'Local profile';email.style.cssText='margin-top:3px;color:#9eb0c5;font-size:.8rem;overflow-wrap:anywhere';
  const rule=document.createElement('div');rule.style.cssText='height:1px;background:#20364e;margin:14px 0';
  const openAccount=document.createElement('a');openAccount.href='account.html';openAccount.textContent='Open Account Center';openAccount.style.cssText='display:block;color:#7dd3fc;padding:8px 0;text-decoration:none;font-weight:800';
  const setup=document.createElement('a');setup.href='EMAIL-SETUP.md';setup.textContent='Email setup';setup.style.cssText='display:block;color:#dce9f7;padding:8px 0;text-decoration:none';
  const logout=document.createElement('button');logout.type='button';logout.textContent='Logout';logout.style.cssText='width:100%;text-align:left;border:0;background:transparent;color:#dce9f7;padding:8px 0;cursor:pointer';logout.addEventListener('click',signOut);
  const deleteBtn=document.createElement('button');deleteBtn.type='button';deleteBtn.textContent='Delete account';deleteBtn.style.cssText='width:100%;text-align:left;border:0;border-top:1px solid #20364e;background:transparent;color:#ff9eaf;padding:12px 0 5px;cursor:pointer;font-weight:800';deleteBtn.addEventListener('click',()=>{menu.remove();showDeleteAccountDialog()});
  menu.append(heading,email,rule,openAccount,setup,logout,deleteBtn);document.body.appendChild(menu);
  setTimeout(()=>document.addEventListener('click',function close(e){if(!menu.contains(e.target)&&!e.target.closest('#localAuth')){menu.remove();document.removeEventListener('click',close)}},{once:true}),0);
}

function routeRepositoryDocuments(){
  document.addEventListener('click',e=>{
    const a=e.target.closest('a');
    if(!a||!a.href)return;
    const raw=a.getAttribute('href')||'';
    if(!raw.startsWith('../'))return;
    e.preventDefault();
    const path=raw.slice(3).split('#')[0];
    const hash=raw.includes('#')?'#'+raw.split('#')[1]:'';
    location.href='https://github.com/Narsing-s/mulesoft-end-to-end-guide/blob/main/'+path+hash;
  });
}

if(!location.pathname.endsWith('/login.html')&&!location.pathname.endsWith('login.html'))requireLogin();
if(location.pathname.endsWith('/login.html')||location.pathname.endsWith('login.html')){
  if(hasValidSession())location.replace(HOME_PAGE);
}else{
  mountAuth();
  routeRepositoryDocuments();
}
