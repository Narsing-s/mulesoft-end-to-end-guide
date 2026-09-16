// Additional learning areas kept separate so the portal can evolve without duplicating the core UI code.
const extraRoadmap=[
['21','Architecture Decision Playbook','Advanced','Make explicit architecture decisions around API boundaries, sync/async, reliability, security, performance and deployment.','../61-Architecture-Decision-Playbook/README.md'],
['22','Interview & Scenario Mastery','Advanced','Practice structured technical and production-support scenarios with evidence-first troubleshooting.','../62-Interview-and-Scenario-Mastery/README.md'],
['23','Capstone Production Readiness','Advanced','Validate contracts, security, testing, deployment, observability, recovery and operational evidence before production.','../63-Capstone-Production-Checklist/README.md'],
['24','Study System Operations','Advanced','Use the repository as a repeatable learn-build-test-break-debug-secure-deploy-operate system.','../67-Study-System-Operations/README.md'],
['25','Project Documentation Templates','Advanced','Create consistent API, architecture, deployment, test, RCA, ADR, release and handover evidence.','../68-Project-Documentation-Templates/README.md'],
['26','Glossary & Quick Reference','Intermediate','Quickly review MuleSoft, API, DataWeave, operations, deployment, security and HTTP terminology.','../69-Glossary-and-Quick-Reference/README.md'],
['27','Repository Quality & Release','Advanced','Validate content quality, portal behavior, security hygiene, links and release evidence.','../70-Repository-Quality-and-Release/README.md']
];
const extraTopics=[
['Architecture Decision Playbook','Practical ADRs and decision matrices for API boundaries, reliability, security, performance and deployment.','../61-Architecture-Decision-Playbook/README.md','architecture'],
['Interview & Scenario Mastery','Structured MuleSoft interview and real-world incident scenarios with production-focused answer patterns.','../62-Interview-and-Scenario-Mastery/README.md','operate'],
['Capstone Production Readiness','Production checklist covering contracts, application quality, data, messaging, security, testing, deployment and operations.','../63-Capstone-Production-Checklist/README.md','operate'],
['Study System Operations','Daily, weekly and evidence-based learning workflow for progressing from theory to production capability.','../67-Study-System-Operations/README.md','operate'],
['Project Documentation Templates','Reusable templates for project briefs, contracts, architecture, deployment, testing, RCA, ADRs and release handover.','../68-Project-Documentation-Templates/README.md','architecture'],
['Glossary & Quick Reference','Fast reference for Mule concepts, API terminology, DataWeave functions, operations, security and HTTP status codes.','../69-Glossary-and-Quick-Reference/README.md','build'],
['Repository Quality & Release','Content, portal, security and release checklist for maintaining a reliable learning repository.','../70-Repository-Quality-and-Release/README.md','operate']
];
const extraLabs=[
['15','Architecture Decision Lab','Advanced','Create an ADR and failure matrix for a banking integration with explicit trade-offs.','../61-Architecture-Decision-Playbook/README.md'],
['16','Interview Scenario Drill','Advanced','Take an unfamiliar production incident and produce evidence, diagnosis, mitigation and prevention steps.','../62-Interview-and-Scenario-Mastery/README.md'],
['17','Production Readiness Review','Advanced','Run the complete capstone checklist and record missing evidence before release.','../63-Capstone-Production-Checklist/README.md'],
['18','Study System Drill','Advanced','Take one topic through explain, implement, test, break, debug, secure, deploy and operate.','../67-Study-System-Operations/README.md'],
['19','Project Documentation Drill','Advanced','Create complete architecture, test, deployment, RCA and release evidence for a sample API.','../68-Project-Documentation-Templates/README.md'],
['20','Quick Reference Challenge','Intermediate','Use the glossary to explain core Mule, API, DataWeave and operational terminology without notes.','../69-Glossary-and-Quick-Reference/README.md'],
['21','Repository Release Audit','Advanced','Run the quality checklist against the portal and learning documents before a release.','../70-Repository-Quality-and-Release/README.md']
];
roadmap.push(...extraRoadmap);
topics.push(...extraTopics);
labs.push(...extraLabs);
commands.push(
['Architecture Decision Playbook','../61-Architecture-Decision-Playbook/README.md'],
['Interview & Scenario Mastery','../62-Interview-and-Scenario-Mastery/README.md'],
['Capstone Production Readiness','../63-Capstone-Production-Checklist/README.md'],
['Study System Operations','../67-Study-System-Operations/README.md'],
['Project Documentation Templates','../68-Project-Documentation-Templates/README.md'],
['Glossary & Quick Reference','../69-Glossary-and-Quick-Reference/README.md'],
['Repository Quality & Release','../70-Repository-Quality-and-Release/README.md']
);
renderAll();
