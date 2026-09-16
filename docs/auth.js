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

function showGreetingStatus(session){
  const status=readJson(GREETING_STATUS_KEY);
  if(!status||status.email!==session.email)return;
  const banner=document.createElement('div');
  banner.id='greetingStatus';
  banner.style.cssText='position:fixed;right:20px;bottom:20px;z-index:1001;max-width:420px;padding:15px 17px;border:1px solid #29415e;border-radius:14px;background:#0b1828;color:#e8eef8;box-shadow:0 18px 50px #0007;font-size:.86rem;line-height:1.5';
  const title=status.status==='sent'?'Welcome! ✉️':status.status==='not-configured'?'Login successful':'Login successful';
  const message=status.status==='sent'?`Greeting email sent to ${session.email}.`:status.status==='not-configured'?'Greeting email is not configured yet. Add the EmailJS values described in EMAIL-SETUP.md.':'The greeting email could not be sent. Check the EmailJS configuration and browser console, then sign in again.';
  banner.innerHTML=`<strong>${title}</strong><div style="margin-top:4px;color:#aebed1">${message}</div><button type="button" style="margin-top:10px;border:1px solid #29415e;background:#102034;color:#dce9f7;border-radius:9px;padding:6px 9px;cursor:pointer">Dismiss</button>`;
  banner.querySelector('button').addEventListener('click',()=>banner.remove());
  document.body.appendChild(banner);
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
    const name=document.createElement('span');
    name.textContent=`Hi, ${session.name}`;
    name.style.cssText='color:#9eb0c5;font-size:.8rem';
    const out=document.createElement('button');
    out.className='icon-btn';out.type='button';out.textContent='Logout';out.addEventListener('click',signOut);
    wrap.append(name,out);
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
