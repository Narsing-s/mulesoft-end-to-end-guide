// Additional learning areas kept separate so the portal can evolve without duplicating the core UI code.
const extraRoadmap=[
['21','Architecture Decision Playbook','Advanced','Make explicit architecture decisions around API boundaries, sync/async, reliability, security, performance and deployment.','../61-Architecture-Decision-Playbook/README.md'],
['22','Interview & Scenario Mastery','Advanced','Practice structured technical and production-support scenarios with evidence-first troubleshooting.','../62-Interview-and-Scenario-Mastery/README.md'],
['23','Capstone Production Readiness','Advanced','Validate contracts, security, testing, deployment, observability, recovery and operational evidence before production.','../63-Capstone-Production-Checklist/README.md']
];
const extraTopics=[
['Architecture Decision Playbook','Practical ADRs and decision matrices for API boundaries, reliability, security, performance and deployment.','../61-Architecture-Decision-Playbook/README.md','architecture'],
['Interview & Scenario Mastery','Structured MuleSoft interview and real-world incident scenarios with production-focused answer patterns.','../62-Interview-and-Scenario-Mastery/README.md','operate'],
['Capstone Production Readiness','Production checklist covering contracts, application quality, data, messaging, security, testing, deployment and operations.','../63-Capstone-Production-Checklist/README.md','operate']
];
const extraLabs=[
['15','Architecture Decision Lab','Advanced','Create an ADR and failure matrix for a banking integration with explicit trade-offs.','../61-Architecture-Decision-Playbook/README.md'],
['16','Interview Scenario Drill','Advanced','Take an unfamiliar production incident and produce evidence, diagnosis, mitigation and prevention steps.','../62-Interview-and-Scenario-Mastery/README.md'],
['17','Production Readiness Review','Advanced','Run the complete capstone checklist and record missing evidence before release.','../63-Capstone-Production-Checklist/README.md']
];
roadmap.push(...extraRoadmap);
topics.push(...extraTopics);
labs.push(...extraLabs);
commands.push(['Architecture Decision Playbook','../61-Architecture-Decision-Playbook/README.md'],['Interview & Scenario Mastery','../62-Interview-and-Scenario-Mastery/README.md'],['Capstone Production Readiness','../63-Capstone-Production-Checklist/README.md']);
renderAll();
