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
| API management/governance | `11-API-Management` and `52-API-Governance` |
| Testing/MUnit | `12-Testing` and `25-MUnit` |
| Deployment | `13-Deployment` |
| DevOps/CI/CD | `14-DevOps-CICD` and `50-Release-Engineering` |
| Observability | `15-Observability` and `51-Production-Operations` |
| Advanced engineering | `16-Advanced-MuleSoft` and `35-Advanced-MuleSoft` |
| Real-world capstone | `17-Real-World-Project` |
| Interview preparation | `18-Interview-Preparation`, `27-Interview-Scenarios`, `34-Interview-Mastery` |
| Exercises | `19-Hands-On-Exercises` |
| Production support | `20-Production-Scenarios`, `26-Troubleshooting`, `39-Production-Engineering-Playbooks` |
| Reference implementations | `21-Reference-Implementations` |
| Architecture/patterns | `22-Patterns-And-Architecture` and `41-Integration-Patterns-Cookbook` |
| Performance | `23-Performance` |
| Security deep dive | `24-Security` and `48-Security-Engineering` |
| Troubleshooting | `26-Troubleshooting` |
| Cheat sheets/glossary | `28-Glossary-And-Cheat-Sheets` and `GLOSSARY.md` |
| Environment configuration | `29-Environment-Configuration` |
| Migration | `30-Migration` |
| Completeness tracking | `31-Master-Topic-Checklist`, `37-Complete-Coverage-Map`, `54-Gap-Analysis-and-Completeness` |
| Runtime/version matrix | `32-Version-Matrix` |
| Self-contained learning | `33-Self-Contained-Learning` |
| Platform services | `38-Platform-Services-And-Modern-MuleSoft` and `45-Platform-Architecture` |
| Hands-on labs | `40-Hands-On-Labs` |
| Project templates | `42-Project-Templates` |
| Reference material | `43-Reference` |
| Career paths | `44-Career-Paths` |
| DataWeave deep dive | `46-DataWeave-Deep-Dive` |
| Runtime internals | `47-Runtime-Internals` |
| Messaging engineering | `49-Messaging-Engineering` |
| Learning assessment | `55-Learning-Assessment-and-Project-Ladder` |
| Modern platform deep dive | `56-Modern-Platform-Deep-Dive` |
| Developer delivery & API verification | `68-Developer-Delivery-and-API-Verification` |

## Canonical beginner → expert route

```text
ZERO
 ↓
00 Start Here
 ↓
01 Fundamentals
 ↓
02 Mule Applications
 ↓
03 DataWeave
 ↓
04 API Development
 ↓
05 API-Led Connectivity
 ↓
06 Error Handling
 ↓
07 Connectors → 08 Database → 09 Enterprise Integration
 ↓
10 Security → 11 API Management
 ↓
12 Testing → 13 Deployment → 14 CI/CD
 ↓
15 Observability → 20/26 Troubleshooting
 ↓
22 Architecture → 23 Performance → 35 Advanced
 ↓
40 Labs → 41 Patterns → 42 Projects
 ↓
45 Platform → 46 DataWeave Deep Dive → 47 Runtime → 48 Security → 49 Messaging
 ↓
50 Release → 51 Production → 52 Governance
 ↓
55 Assessment + Project Ladder
 ↓
17 Banking Capstone
 ↓
56 Modern Platform Deep Dive
 ↓
Architect / Production Engineer
 ↓
Continuous engineering
```

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
17. Diagram(s)
18. Version assumptions
19. Related canonical chapters

## Modern platform coverage

The modern-platform track explicitly covers Anypoint Code Builder, API gateway/Flex Gateway terminology, Anypoint Monitoring, CloudHub 2.0 Private Spaces and networking, Runtime Fabric/Kubernetes concepts, platform access/auditability, certificate and secret rotation, API automation, and modern API contract styles.

These subjects are version-sensitive. The chapter should identify the tested environment and link to the applicable official documentation when exact product behavior matters.
