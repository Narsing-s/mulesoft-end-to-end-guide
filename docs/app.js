const roadmap=[
['00','Canonical Start-to-End Path','Beginner','Start here if you are new: follow the exact sequence, level gates, projects and continuous-learning loop.','../53-End-to-End-Study-Path/README.md'],
['01','Foundations','Beginner','Learn HTTP, APIs, Mule events, flows, connectors, Studio and the request lifecycle.','../00-START-HERE.md'],
['02','Mule Runtime & Event','Beginner','Understand runtime, message, payload, attributes, vars, scopes, processors and flow execution.','../01-Fundamentals/README.md'],
['03','DataWeave','Beginner','Transform JSON, XML, CSV and Java objects; learn selectors, operators, functions, modules, types and performance.','../03-DataWeave/README.md'],
['04','API Development','Beginner','Design RAML/OAS contracts, build HTTP APIs, use APIkit, validate inputs and version APIs.','../04-API-Development/README.md'],
['05','API-Led Connectivity','Intermediate','Apply System, Process and Experience API boundaries to real integration problems.','../05-API-Led-Connectivity/README.md'],
['06','Integration Patterns','Intermediate','Choice, For Each, Scatter-Gather, async processing, retry, batch, queues and idempotency.','../22-Patterns-And-Architecture/README.md'],
['07','Enterprise Connectors','Intermediate','HTTP, Database, File, SFTP, JMS, IBM MQ, Anypoint MQ, SOAP, Email and SaaS integrations.','../09-Enterprise-Integration/README.md'],
['08','Error Handling','Intermediate','Design typed errors, handlers, retries, timeouts, recovery, dead-letter flows and safe error responses.','../06-Error-Handling/README.md'],
['09','Security','Advanced','TLS, mTLS, OAuth2, JWT, policies, secure properties, authorization and safe logging.','../24-Security/README.md'],
['10','Testing','Intermediate','MUnit mocks, spies, assertions, coverage, negative tests, contract tests and CI quality gates.','../25-MUnit/README.md'],
['11','Deployment & DevOps','Advanced','Maven, environments, Runtime Manager, CloudHub, CloudHub 2.0, Runtime Fabric, Hybrid and CI/CD.','../13-Deployment/README.md'],
['12','Operations','Advanced','Logs, metrics, alerts, incident response, RCA, observability, performance and troubleshooting.','../26-Troubleshooting/README.md'],
['13','Architecture','Advanced','Resilience, scalability, governance, event-driven design, canonical models and trade-offs.','../22-Patterns-And-Architecture/README.md'],
['14','Assessment & Project Ladder','Advanced','Know exactly when you are ready to move forward and build progressively harder projects.','../55-Learning-Assessment-and-Project-Ladder/README.md'],
['15','Modern Platform Deep Dive','Advanced','Code Builder, gateways, monitoring, Private Spaces, Runtime Fabric, RBAC, auditability, rotation and API automation.','../56-Modern-Platform-Deep-Dive/README.md'],
['16','API Contracts & Protocol Engineering','Advanced','Contract-first REST, RAML/OAS, event contracts, compatibility, versioning and protocol selection.','../57-API-Contracts-and-Protocols/README.md'],
['17','Quality Engineering','Advanced','Negative testing, MUnit, contract/integration testing, dependency/security checks and CI quality gates.','../58-Quality-Engineering/README.md'],
['18','Continuous Engineering','Advanced','After the capstone, increase scale, failure, security, availability and architecture complexity. There is no final end.','../53-End-to-End-Study-Path/README.md']
];

const topics=[
['End-to-End Study Path','Exact beginner → intermediate → advanced → capstone → continuous-learning route.','../53-End-to-End-Study-Path/README.md','architecture'],
['Learning Assessment','Readiness gates, evidence-based progression and project ladder.','../55-Learning-Assessment-and-Project-Ladder/README.md','operate'],
['Modern Platform Deep Dive','Code Builder, gateways, monitoring, Private Spaces, Runtime Fabric, RBAC and automation.','../56-Modern-Platform-Deep-Dive/README.md','architecture'],
['API Contracts & Protocols','Contract-first API design, RAML/OAS, event contracts, versioning, compatibility and REST/SOAP/MQ/GraphQL/gRPC concepts.','../57-API-Contracts-and-Protocols/README.md','architecture'],
['Quality Engineering','Test pyramid, negative testing, contract/integration testing, security checks, CI gates and release evidence.','../58-Quality-Engineering/README.md','operate'],
['Mule Event','Understand payload, attributes and variables.','../01-Fundamentals/README.md','build'],
['HTTP & REST','Learn methods, status codes, headers, query/path parameters and content types.','../02-Mule-Applications/README.md','build'],
['DataWeave','Transform JSON, XML, CSV and other data formats.','../03-DataWeave/README.md','build'],
['APIkit','Turn RAML/OAS contracts into implementation flows and validations.','../04-API-Development/README.md','build'],
['API-Led','Design System, Process and Experience APIs with clear responsibilities.','../05-API-Led-Connectivity/README.md','architecture'],
['Integration Patterns','Choose sync, async, routing, aggregation, retry and idempotency patterns.','../22-Patterns-And-Architecture/README.md','architecture'],
['Database','Use parameterized queries, connection pools, transactions and safe data access.','../08-Database-Integration/README.md','build'],
['Messaging','Understand queues, acknowledgements, retry, ordering and DLQ patterns.','../09-Enterprise-Integration/README.md','build'],
['Error Handling','Create predictable error types, responses, recovery and operational signals.','../06-Error-Handling/README.md','operate'],
['Security','Protect transport, identity, credentials, policies and logs.','../24-Security/README.md','security'],
['MUnit','Test happy paths, errors and external dependencies without real systems.','../25-MUnit/README.md','build'],
['Performance','Measure latency, throughput, concurrency, memory and connector bottlenecks.','../23-Performance/README.md','operate'],
['Troubleshooting','Diagnose 400/401/403/404/405/415/5xx, TLS, DB, MQ and deployment failures.','../26-Troubleshooting/README.md','operate'],
['Platform Architecture','Understand control plane, runtime plane, deployment targets and platform boundaries.','../45-Platform-Architecture/README.md','architecture'],
['Runtime Internals','Go deeper into execution, streaming, memory and runtime behavior.','../47-Runtime-Internals/README.md','operate'],
['API Governance','Learn lifecycle, standards, policies and governance controls.','../52-API-Governance/README.md','architecture'],
['Environment Config','Separate environment settings, properties, secrets and deployment configuration.','../29-Environment-Configuration/README.md','security'],
['Mule 3 → 4','Understand event model, DataWeave, MEL, connectors and error-model migration.','../30-Migration/MULE-3-TO-MULE-4.md','architecture'],
['Interview Scenarios','Practice realistic debugging, architecture and production-support questions.','../27-Interview-Scenarios/README.md','operate'],
['Cheat Sheets','Keep the most-used Mule 4 and DataWeave patterns close at hand.','../28-Glossary-And-Cheat-Sheets/MULE-4-CHEAT-SHEET.md','build'],
['Reference Implementations','See compact XML, DataWeave, SQL and error-handling examples.','../21-Reference-Implementations/README.md','build']
];

const labs=[
['01','Hello API','Beginner','Create a listener, accept JSON and return a controlled JSON response.','../00-START-HERE.md'],
['02','DataWeave Transformer','Beginner','Map customer input, filter records, handle nulls and produce a new contract.','../03-DataWeave/README.md'],
['03','Database API','Intermediate','Use parameterized SQL, map rows and return a stable API response.','../08-Database-Integration/README.md'],
['04','APIkit Contract','Intermediate','Start from RAML/OAS, generate flows and investigate validation failures.','../04-API-Development/README.md'],
['05','Reliable Integration','Advanced','Implement retry, timeout, idempotency and a dead-letter strategy.','../22-Patterns-And-Architecture/README.md'],
['06','Production Incident','Advanced','Diagnose a 502, 405, 415, timeout, TLS or database incident methodically.','../26-Troubleshooting/README.md'],
['07','Secure API','Advanced','Apply TLS/mTLS concepts, OAuth/JWT boundaries and secure property handling.','../24-Security/README.md'],
['08','MUnit Quality Gate','Intermediate','Mock connectors, assert outputs and test error paths for CI.','../25-MUnit/README.md'],
['09','Platform Readiness','Advanced','Design Private Space networking, gateway, monitoring, RBAC and deployment controls.','../56-Modern-Platform-Deep-Dive/README.md'],
['10','Contract Engineering','Advanced','Design a consumer-facing contract, event schema, compatibility rules and version/deprecation plan.','../57-API-Contracts-and-Protocols/README.md'],
['11','Quality Engineering Gate','Advanced','Build negative tests, contract/integration checks, security/dependency checks and release evidence.','../58-Quality-Engineering/README.md'],
['12','Banking Capstone','Advanced','Connect Experience → Process → System APIs with DB/MQ and operational controls.','../17-Real-World-Project/README.md']
];

const stateKey='mulejourney.completed.v1';
let completed=new Set(JSON.parse(localStorage.getItem(stateKey)||'[]'));
let activeCategory='all';
const roadmapGrid=document.querySelector('#roadmapGrid');
function renderRoadmap(){const level=document.querySelector('#levelFilter').value;roadmapGrid.innerHTML='';roadmap.forEach((x,i)=>{if(level!=='all'&&x[2].toLowerCase()!==level)return;const done=completed.has('roadmap-'+i);roadmapGrid.innerHTML+=`<article class="step ${done?'done':''}"><div class="step-top"><b>${x[0]}</b><button class="check" data-key="roadmap-${i}" title="Mark complete">${done?'✓':'○'}</button></div><span class="level ${x[2].toLowerCase()}">${x[2]}</span><h3>${x[1]}</h3><p>${x[3]}</p><a class="learn-link" href="${x[4]}">Open lesson →</a></article>`});document.querySelectorAll('.check').forEach(b=>b.addEventListener('click',()=>toggleComplete(b.dataset.key)))}
const topicGrid=document.querySelector('#topicGrid');
function renderTopics(q=''){topicGrid.innerHTML='';const term=q.toLowerCase();topics.filter(x=>(activeCategory==='all'||x[3]===activeCategory)&&(!term||x[0].toLowerCase().includes(term)||x[1].toLowerCase().includes(term))).forEach(x=>{const key='topic-'+topics.indexOf(x),done=completed.has(key);topicGrid.innerHTML+=`<a class="topic ${done?'done':''}" href="${x[2]}"><div class="topic-top"><span class="topic-cat">${x[3]}</span><button class="topic-check" data-key="${key}" title="Mark complete">${done?'✓':'+'}</button></div><h3>${x[0]}</h3><p>${x[1]}</p><span class="learn-link">Open topic →</span></a>`});document.querySelectorAll('.topic-check').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();toggleComplete(b.dataset.key)}))}
function renderLabs(){const grid=document.querySelector('#labGrid');grid.innerHTML='';labs.forEach((x,i)=>{const key='lab-'+i,done=completed.has(key);grid.innerHTML+=`<article class="lab-card ${done?'done':''}"><div class="lab-top"><b>${x[0]}</b><button class="check" data-key="${key}">${done?'✓':'○'}</button></div><span class="level ${x[2].toLowerCase()}">${x[2]}</span><h3>${x[1]}</h3><p>${x[3]}</p><a class="learn-link" href="${x[4]}">Open lab guide →</a></article>`});grid.querySelectorAll('.check').forEach(b=>b.addEventListener('click',()=>toggleComplete(b.dataset.key)))}
function toggleComplete(key){completed.has(key)?completed.delete(key):completed.add(key);localStorage.setItem(stateKey,JSON.stringify([...completed]));renderAll()}
function updateProgress(){const total=roadmap.length+topics.length+labs.length,pct=Math.min(100,Math.round(completed.size/total*100));document.querySelector('#progressPct').textContent=pct+'%';document.querySelector('#completedCount').textContent=completed.size;document.querySelector('#progressBar').style.width=pct+'%';document.querySelector('#progressRing').style.setProperty('--p',pct*3.6+'deg')}
function renderAll(){renderRoadmap();renderTopics(document.querySelector('#search').value.trim());renderLabs();updateProgress()}
document.querySelector('#search').addEventListener('input',e=>renderTopics(e.target.value.trim()));document.querySelector('#levelFilter').addEventListener('change',renderRoadmap);document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>{document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));c.classList.add('active');activeCategory=c.dataset.category;renderTopics(document.querySelector('#search').value.trim())}));document.querySelector('#resetProgress').addEventListener('click',()=>{if(confirm('Reset all learning progress?')){completed.clear();localStorage.removeItem(stateKey);renderAll()}});
const commands=[['Start-to-End Study Path','../53-End-to-End-Study-Path/README.md'],['Learning Assessment','../55-Learning-Assessment-and-Project-Ladder/README.md'],['Modern Platform Deep Dive','../56-Modern-Platform-Deep-Dive/README.md'],['API Contracts & Protocols','../57-API-Contracts-and-Protocols/README.md'],['Quality Engineering','../58-Quality-Engineering/README.md'],['Start Here','../00-START-HERE.md'],['Roadmap','#roadmap'],['Topic Library','#topics'],['Hands-on Labs','#labs'],['Interview Mode','#interview'],['Banking Capstone','#capstone'],['Security','../24-Security/README.md'],['MUnit','../25-MUnit/README.md'],['Troubleshooting','../26-Troubleshooting/README.md'],['Architecture','../22-Patterns-And-Architecture/README.md'],['Cheat Sheet','../28-Glossary-And-Cheat-Sheets/MULE-4-CHEAT-SHEET.md']];
const modal=document.querySelector('#commandModal'),commandList=document.querySelector('#commandList');function renderCommands(q=''){commandList.innerHTML='';commands.filter(x=>x[0].toLowerCase().includes(q.toLowerCase())).forEach(x=>commandList.innerHTML+=`<a href="${x[1]}"><span>↗</span>${x[0]}</a>`)}function openCommand(){modal.classList.remove('hidden');document.querySelector('#commandSearch').focus();renderCommands()}function closeCommand(){modal.classList.add('hidden')}
document.querySelector('#commandBtn').addEventListener('click',openCommand);document.querySelector('#closeCommand').addEventListener('click',closeCommand);document.querySelector('#commandSearch').addEventListener('input',e=>renderCommands(e.target.value));modal.addEventListener('click',e=>{if(e.target===modal)closeCommand()});document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openCommand()}if(e.key==='Escape')closeCommand()});
const savedTheme=localStorage.getItem('mulejourney.theme')||'dark';document.documentElement.dataset.theme=savedTheme;document.querySelector('#themeBtn').textContent=savedTheme==='dark'?'☼':'☾';document.querySelector('#themeBtn').addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;localStorage.setItem('mulejourney.theme',next);document.querySelector('#themeBtn').textContent=next==='dark'?'☼':'☾'});window.addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-window.innerHeight;document.querySelector('#progressBar').style.width=max>0?(window.scrollY/max*100)+'%':'0%'});renderAll();