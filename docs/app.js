const roadmap=[
['01','Foundations','Start with HTTP, integrations, Mule events, flows, connectors and Studio.'],
['02','DataWeave','Learn transformation from basic selectors to functions, modules, types and performance.'],
['03','API Development','Build RAML/OAS APIs with HTTP Listener, APIkit, validation and versioning.'],
['04','API-Led Connectivity','Understand System, Process and Experience APIs with practical boundaries.'],
['05','Integration Patterns','Choice, For Each, Scatter-Gather, Async, retry, batch, queues and idempotency.'],
['06','Connectors','HTTP, Database, File, SFTP, JMS, IBM MQ, Anypoint MQ, SOAP, Email and SaaS.'],
['07','Errors','Design controlled error types, handlers, retries, timeouts and recovery.'],
['08','Security','TLS, mTLS, OAuth, JWT, policies, secure properties and safe logging.'],
['09','Testing','MUnit, mocks, spies, assertions, coverage, Postman and contract testing.'],
['10','Deployment','Maven, Runtime Manager, CloudHub, CloudHub 2.0, Runtime Fabric and on-prem.'],
['11','Operations','Logs, metrics, alerts, incidents, RCA, troubleshooting and performance.'],
['12','Architecture','Resilience, scalability, governance, event-driven design and trade-offs.']
];
const topics=[
['Mule Event','Understand payload, attributes and variables.','../00-START-HERE.md'],
['DataWeave','Transform JSON, XML, CSV and other data formats.','../03-DataWeave/README.md'],
['APIkit','Turn API contracts into implementation flows.','../04-API-Development/README.md'],
['API-Led','Design System, Process and Experience APIs.','../05-API-Led-Connectivity/README.md'],
['Error Handling','Build predictable failure responses and recovery.','../06-Error-Handling/README.md'],
['Database','Use parameterized queries, pools and transactions.','../08-Database-Integration/README.md'],
['Messaging','Understand queues, acknowledgement, retry and DLQ patterns.','../09-Enterprise-Integration/README.md'],
['Security','Protect APIs, credentials, transport and logs.','../24-Security/README.md'],
['MUnit','Test flows without depending on real external systems.','../25-MUnit/README.md'],
['Production','Troubleshoot real failures systematically.','../26-Troubleshooting/README.md'],
['Architecture','Choose integration patterns based on requirements.','../22-Patterns-And-Architecture/README.md'],
['Performance','Measure and improve latency, throughput and resource use.','../23-Performance/README.md']
];
const roadmapGrid=document.querySelector('#roadmapGrid');
roadmap.forEach(x=>{roadmapGrid.innerHTML+=`<article class="step"><b>${x[0]}</b><h3>${x[1]}</h3><p>${x[2]}</p></article>`});
const topicGrid=document.querySelector('#topicGrid');
function renderTopics(q=''){topicGrid.innerHTML='';topics.filter(x=>x[0].toLowerCase().includes(q)||x[1].toLowerCase().includes(q)).forEach(x=>{topicGrid.innerHTML+=`<a class="topic" href="${x[2]}"><b>TOPIC</b><h3>${x[0]}</h3><p>${x[1]}</p></a>`})}
renderTopics();
document.querySelector('#search').addEventListener('input',e=>renderTopics(e.target.value.toLowerCase().trim()));
