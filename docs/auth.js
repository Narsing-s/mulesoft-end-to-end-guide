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

function loadScript(src){return new Promise((resolve,reject)=>{const existing=document.querySelector(`script[src="${src}"]`);if(existing){if(existing.dataset.loaded==='true')return resolve();existing.addEventListener('load',()=>resolve(),{once:true});existing.addEventListener('error',reject,{once:true});return}const script=document.createElement('script');script.src=src;script.async=true;script.onload=()=>{script.dataset.loaded='true';resolve()};script.onerror=()=>reject(new Error(`Could not load ${src}`));document.head.appendChild(script)})}

async function sendGreetingForSession(session){
  if(!session?.email)return {status:'failed',message:'No signed-in email address is available.'};
  try{
    await loadScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js');
    await loadScript('email-config.js');
    const cfg=window.MULEJOURNEY_EMAIL||{};
    if(!cfg.publicKey||cfg.publicKey.startsWith('YOUR_')||!cfg.serviceId||cfg.serviceId.startsWith('YOUR_')||!cfg.templateId||cfg.templateId.startsWith('YOUR_')){
      const result={status:'not-configured',email:session.email,at:new Date().toISOString()};
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
  banner.style.cssText='position:fixed;right:20px;bottom:20px;z-index:1001;max-width:440px;padding:15px 17px;border:1px solid #29415e;border-radius:14px;background:#0b1828;color:#e8eef8;box-shadow:0 18px 50px #0007;font-size:.86rem;line-height:1.5';
  const title=document.createElement('strong');
  title.textContent=status.status==='sent'?'Welcome! ✉️':status.status==='not-configured'?'Login successful':'Login successful';
  const message=document.createElement('div');
  message.style.cssText='margin-top:4px;color:#aebed1';
  message.textContent=status.status==='sent'?`Greeting email sent to ${session.email}.`:status.status==='not-configured'?'Greeting email is not configured yet. Add the EmailJS values described in EMAIL-SETUP.md.':'The greeting email could not be sent. You can retry below after checking EmailJS.';
  const actions=document.createElement('div');actions.style.cssText='display:flex;gap:8px;flex-wrap:wrap;margin-top:10px';
  const resend=document.createElement('button');resend.type='button';resend.textContent='Send greeting again';resend.style.cssText='border:1px solid #55d6be;background:#55d6be;color:#031018;border-radius:9px;padding:7px 10px;cursor:pointer;font-weight:800';
  resend.addEventListener('click',async()=>{resend.disabled=true;resend.textContent='Sending…';const result=await sendGreetingForSession(session);resend.disabled=false;resend.textContent='Send greeting again';message.textContent=result.status==='sent'?`Greeting email sent to ${session.email}.`:result.status==='not-configured'?'Greeting email is not configured yet. Add the EmailJS values described in EMAIL-SETUP.md.':'The greeting email could not be sent. Check EmailJS configuration and browser console.'});
  const setup=document.createElement('a');setup.href='EMAIL-SETUP.md';setup.textContent='Email setup';setup.style.cssText='border:1px solid #29415e;background:#102034;color:#dce9f7;border-radius:9px;padding:7px 10px;text-decoration:none';
  const dismiss=document.createElement('button');dismiss.type='button';dismiss.textContent='Dismiss';dismiss.style.cssText='border:1px solid #29415e;background:#102034;color:#dce9f7;border-radius:9px;padding:7px 10px;cursor:pointer';dismiss.addEventListener('click',()=>banner.remove());
  actions.append(resend,setup,dismiss);banner.append(title,message,actions);document.body.appendChild(banner);
  if(status.status==='sent')setTimeout(()=>banner.remove(),7000);
}

function mountAuth(){
  const nav=document.querySelector('.nav-actions');
  if(!nav)return;
  const existing=document.querySelector('#localAuth');
  if(existing)existing.remove();
  const session=getLocalSession();
  const wrap=document.createElement('span');
  wrap.id='localAuth';
  wrap.style.cssText='display:inline-flex;align-items:center;gap:8px';
  if(session){
    const name=document.createElement('span');name.textContent=`Hi, ${session.name}`;name.style.cssText='color:#9eb0c5;font-size:.8rem';
    const out=document.createElement('button');out.className='icon-btn';out.type='button';out.textContent='Logout';out.addEventListener('click',signOut);wrap.append(name,out);
  }
  nav.prepend(wrap);
  showGreetingStatus(session);
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

// The learning portal is private-by-session: opening index.html directly without a
// successful local login immediately returns to the login screen. This is a UX gate,
// not security for sensitive data; GitHub Pages is static and has no trusted server auth.
if(!location.pathname.endsWith('/login.html')&&!location.pathname.endsWith('login.html'))requireLogin();
if(location.pathname.endsWith('/login.html')||location.pathname.endsWith('login.html')){
  if(hasValidSession())location.replace(HOME_PAGE);
}else{
  mountAuth();
  routeRepositoryDocuments();
}
