# Repository-Wide Deep Explanation Standard

This is the mandatory explanation contract for the entire repository. The repository itself is the teaching system: theory, examples, diagrams, labs, troubleshooting and interview answers belong here.

## Every topic must answer

1. What is it?
2. Why does it exist?
3. Where is it used?
4. What problem does it solve?
5. How does it work internally at a useful engineering level?
6. What are the important configuration fields?
7. What does the Mule XML look like?
8. What does the DataWeave look like?
9. What is the input?
10. What is the output?
11. What happens on success?
12. What happens on failure?
13. Which error types can occur?
14. How should retry and timeout be designed?
15. How is idempotency handled?
16. What are security implications?
17. What are performance and scalability implications?
18. How is it tested with MUnit?
19. How is it monitored in production?
20. How is it troubleshot?
21. What is the recovery/runbook procedure?
22. What interview questions should a developer be able to answer?

## Required lesson structure

```text
Concept
  ↓
Mental model
  ↓
Architecture diagram
  ↓
When / when not to use
  ↓
Configuration
  ↓
Input
  ↓
Implementation
  ↓
Output
  ↓
Failure cases
  ↓
Testing
  ↓
Security
  ↓
Performance
  ↓
Observability
  ↓
Troubleshooting
  ↓
Production runbook
  ↓
Interview Q&A
  ↓
Hands-on challenge
```

## Example standard

Every transformation topic should show:

```text
INPUT
  ↓
DataWeave
  ↓
OUTPUT
```

Every integration topic should show:

```text
Source → Mule Event → Transform → Connector → Target
                         ↓
                    Error Handler
```

Every production topic should show:

```text
Failure → Detect → Correlate → Diagnose → Recover → Verify → Prevent
```

## Self-contained rule

Do not make a learner leave the repository to understand the lesson. If a concept is required to complete a topic, add the required theory, diagram, example and explanation to the repository and link to the internal chapter.

External product pages are not part of the learning experience or navigation model.

## Version discipline

When behavior depends on versions, state the assumed Mule runtime, Java, connector/module and deployment target inside the lesson. Explain the reason for the compatibility constraint and provide an internal migration note when behavior differs between versions.

## Quality gate

A lesson is complete only when a learner can read it, reproduce the example, compare input/output, intentionally trigger a failure, diagnose it, fix it, test it and explain the design in an interview.

**Repository principle: Learn here → Build here → Test here → Break here → Fix here → Explain here.**