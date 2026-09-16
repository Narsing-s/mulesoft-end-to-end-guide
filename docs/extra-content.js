// Additional learning areas kept separate so the portal can evolve without duplicating the core UI code.
const extraRoadmap=[
['21','Architecture Decision Playbook','Advanced','Make explicit architecture decisions around API boundaries, sync/async, reliability, security, performance and deployment.','../61-Architecture-Decision-Playbook/README.md'],
['22','Interview & Scenario Mastery','Advanced','Practice structured technical and production-support scenarios with evidence-first troubleshooting.','../62-Interview-and-Scenario-Mastery/README.md'],
['23','Capstone Production Readiness','Advanced','Validate contracts, security, testing, deployment, observability, recovery and operational evidence before production.','../63-Capstone-Production-Checklist/README.md'],
['24','Question & Answer Bank','Advanced','Study real MuleSoft questions with concise answers, examples and production notes.','../64-Question-and-Answer-Bank/README.md'],
['25','Real-World Scenario Library','Advanced','Practice HTTP, DB, MQ, SFTP, TLS, deployment, DataWeave and production incident scenarios.','../65-Real-World-Scenario-Library/README.md'],
['26','Portfolio & Job Readiness','Advanced','Turn projects, incidents, architecture decisions and DataWeave work into demonstrable professional evidence.','../66-Portfolio-and-Job-Readiness/README.md']
];
const extraTopics=[
['Architecture Decision Playbook','Practical ADRs and decision matrices for API boundaries, reliability, security, performance and deployment.','../61-Architecture-Decision-Playbook/README.md','architecture'],
['Interview & Scenario Mastery','Structured MuleSoft interview and real-world incident scenarios with production-focused answer patterns.','../62-Interview-and-Scenario-Mastery/README.md','operate'],
['Capstone Production Readiness','Production checklist covering contracts, application quality, data, messaging, security, testing, deployment and operations.','../63-Capstone-Production-Checklist/README.md','operate'],
['Question & Answer Bank','Real MuleSoft Q&A from fundamentals through advanced production engineering.','../64-Question-and-Answer-Bank/README.md','build'],
['Real-World Scenario Library','Evidence-first incident and troubleshooting scenarios for real integration operations.','../65-Real-World-Scenario-Library/README.md','operate'],
['Portfolio & Job Readiness','Practical evidence checklist for projects, interviews, production support and architecture discussions.','../66-Portfolio-and-Job-Readiness/README.md','architecture']
];
const extraLabs=[
['15','Architecture Decision Lab','Advanced','Create an ADR and failure matrix for a banking integration with explicit trade-offs.','../61-Architecture-Decision-Playbook/README.md'],
['16','Interview Scenario Drill','Advanced','Take an unfamiliar production incident and produce evidence, diagnosis, mitigation and prevention steps.','../62-Interview-and-Scenario-Mastery/README.md'],
['17','Production Readiness Review','Advanced','Run the complete capstone checklist and record missing evidence before release.','../63-Capstone-Production-Checklist/README.md'],
['18','Question Drill','Advanced','Answer technical questions without looking, then verify the explanation and add a production example.','../64-Question-and-Answer-Bank/README.md'],
['19','Incident Scenario Drill','Advanced','Investigate a realistic integration failure using evidence before selecting a recovery action.','../65-Real-World-Scenario-Library/README.md'],
['20','Portfolio Evidence Review','Advanced','Review a project for architecture, testing, security, deployment and production evidence.','../66-Portfolio-and-Job-Readiness/README.md']
];
roadmap.push(...extraRoadmap);
topics.push(...extraTopics);
labs.push(...extraLabs);
commands.push(
['Architecture Decision Playbook','../61-Architecture-Decision-Playbook/README.md'],
['Interview & Scenario Mastery','../62-Interview-and-Scenario-Mastery/README.md'],
['Capstone Production Readiness','../63-Capstone-Production-Checklist/README.md'],
['Question & Answer Bank','../64-Question-and-Answer-Bank/README.md'],
['Real-World Scenario Library','../65-Real-World-Scenario-Library/README.md'],
['Portfolio & Job Readiness','../66-Portfolio-and-Job-Readiness/README.md']
);
renderAll();
