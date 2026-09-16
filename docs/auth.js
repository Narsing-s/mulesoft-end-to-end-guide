const SESSION_KEY='mulejourney.local.session.v2';
const ACCOUNT_KEY='mulejourney.local.account.v2';
const LOGIN_PAGE='login.html';
const HOME_PAGE='index.html';

function readJson(key){try{return JSON.parse(localStorage.getItem(key)||'null')}catch{return null}}
function getLocalSession(){return readJson(SESSION_KEY)}
function hasValidSession(){const s=getLocalSession();return !!(s&&s.authenticated===true&&s.name)}
function redirectToLogin(){if(!location.pathname.endsWith('/login.html')&&!location.pathname.endsWith('login.html'))location.replace(LOGIN_PAGE)}
function requireLogin(){if(!hasValidSession())redirectToLogin()}
function signOut(){localStorage.removeItem(SESSION_KEY);location.replace(LOGIN_PAGE)}

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
