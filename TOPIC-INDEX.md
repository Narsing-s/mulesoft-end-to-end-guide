# MuleSoft End-to-End Guide — Canonical Topic Index

The repository is intentionally ordered from fundamentals to production engineering. Use this index when a topic appears in more than one section.

| Area | Canonical folder |
|---|---|
| Start here | `00-START-HERE.md` |
| Fundamentals | `01-Fundamentals` |
| Mule applications/runtime | `02-Mule-Applications` |
| DataWeave | `03-DataWeave` |
| API development | `04-API-Development` |
| API-led connectivity | `05-API-Led-Connectivity` |
| Errors/resilience | `06-Error-Handling` |
| Connectors | `07-Connectors` |
| Database | `08-Database-Integration` |
| Enterprise integration/messaging | `09-Enterprise-Integration` |
| API security | `10-API-Security` |
| API management/governance | `11-API-Management` |
| Testing/MUnit | `12-Testing` and `25-MUnit` |
| Deployment | `13-Deployment` |
| DevOps/CI/CD | `14-DevOps-CICD` |
| Observability | `15-Observability` |
| Advanced engineering | `16-Advanced-MuleSoft` and `35-Advanced-MuleSoft` |
| Real-world capstone | `17-Real-World-Project` |
| Interview preparation | `18-Interview-Preparation`, `27-Interview-Scenarios`, `34-Interview-Mastery` |
| Exercises | `19-Hands-On-Exercises` |
| Production support | `20-Production-Scenarios`, `26-Troubleshooting`, `39-Production-Engineering-Playbooks` |
| Reference implementations | `21-Reference-Implementations` |
| Architecture/patterns | `22-Patterns-And-Architecture` |
| Performance | `23-Performance` |
| Security deep dive | `24-Security` |
| Troubleshooting | `26-Troubleshooting` |
| Cheat sheets/glossary | `28-Glossary-And-Cheat-Sheets` and `GLOSSARY.md` |
| Environment configuration | `29-Environment-Configuration` |
| Migration | `30-Migration` |
| Completeness tracking | `31-Master-Topic-Checklist`, `37-Complete-Coverage-Map` |
| Runtime/version matrix | `32-Version-Matrix` |
| Self-contained learning | `33-Self-Contained-Learning` |
| Platform services and modern MuleSoft | `38-Platform-Services-And-Modern-MuleSoft` |

## Naming rule

Keep one canonical home for each concept. If an older section contains the same concept, link to the canonical topic instead of creating another competing explanation.

## Lesson standard

Each substantial topic should follow:

1. What is it?
2. Why is it needed?
3. Architecture / flow
4. Prerequisites
5. Step-by-step implementation
6. Complete XML/configuration where useful
7. DataWeave and sample input/output
8. Test/MUnit example
9. Common mistakes
10. Failure scenarios
11. Troubleshooting
12. Security
13. Performance
14. Production considerations
15. Interview questions
16. Hands-on exercise

## Missing-topic priority list

- Anypoint Code Builder
- Flex Gateway
- API Governance and conformance
- Anypoint Monitoring
- CloudHub 2.0 networking/private-space concepts
- Runtime Fabric/Kubernetes operational concepts
- RBAC and platform access management
- certificate/secret rotation
- deeper IBM MQ/JMS operational scenarios
- DataWeave edge cases and large transformation practice
- production incident/change-management playbooks
- architecture decision records and trade-off exercises

These areas are now represented by the dedicated platform and production folders; detailed chapters should be added underneath them as the content grows.
