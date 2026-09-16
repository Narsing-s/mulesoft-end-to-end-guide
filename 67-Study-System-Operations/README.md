# 67 — Study System Operations

This folder defines how to use the repository as a complete learning system rather than a collection of documents.

## Daily loop

1. Learn one concept.
2. Explain it without notes.
3. Implement a small example.
4. Write input and expected output.
5. Test the happy path.
6. Inject a failure.
7. Diagnose from evidence.
8. Fix the issue.
9. Add a test for the failure.
10. Record the production lesson.

## Weekly loop

- Complete one hands-on lab.
- Complete one DataWeave exercise set.
- Solve one production scenario.
- Review one architecture decision.
- Build or improve one portfolio artifact.
- Revisit mistakes from the previous week.

## Evidence to retain

For every substantial exercise keep:

- requirement
- architecture sketch
- contract
- source code
- DataWeave transformation
- tests
- failure test
- logs/evidence
- RCA where applicable
- security considerations
- deployment notes
- rollback plan
- lessons learned

## Completion rule

A topic is not complete because it was read. Mark it complete only when the learner can explain, implement, test, break, debug, secure, deploy and operate it.

## Suggested progression

```text
Foundation → Build → Integrate → Secure → Test → Deploy → Observe
       → Troubleshoot → Architect → Capstone → Teach
```

## Personal study tracker

| Item | Status | Evidence |
|---|---|---|
| Fundamentals | ☐ | |
| Mule event/runtime | ☐ | |
| DataWeave | ☐ | |
| API development | ☐ | |
| API-led architecture | ☐ | |
| Connectors | ☐ | |
| Errors/resilience | ☐ | |
| Messaging | ☐ | |
| Security | ☐ | |
| MUnit | ☐ | |
| CI/CD | ☐ | |
| Cloud deployment | ☐ | |
| Observability | ☐ | |
| Production support | ☐ | |
| Architecture | ☐ | |
| Capstone | ☐ | |

## Rule for version-sensitive material

Record the Mule runtime, Java version, DataWeave/runtime assumptions, connector versions where relevant, and deployment target for implementation-specific exercises. Recheck version-sensitive documentation before production use.
