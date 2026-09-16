# 33 — Self-Contained Learning System

This repository is designed to teach MuleSoft concepts **inside this repository**.

The learner should not have to leave the project to understand the lesson. External references are optional verification material, not prerequisites.

## The lesson contract

Every major topic should answer these questions in order:

1. What is it?
2. Why does it exist?
3. What problem does it solve?
4. What are the important terms?
5. What happens at runtime?
6. What does the architecture look like?
7. How do I create it in Anypoint Studio?
8. What XML/configuration is required?
9. What input enters the flow?
10. What output leaves the flow?
11. How do I test it?
12. What can go wrong?
13. How do I debug it?
14. How do I secure it?
15. How do I make it reliable?
16. How do I test it with MUnit?
17. How would I deploy it?
18. How would I monitor it?
19. What would I change for production?
20. Can I solve an exercise without copying the answer?

## Learning philosophy

We teach from **mental model → tiny example → complete implementation → failure → debugging → production design**.

A chapter is not considered complete merely because it names a Mule component.

## Version note

Examples should record the Mule runtime, Java, DataWeave and connector/module versions they were written for. Syntax and supported configuration can vary by version.

## Internal-first rule

Use this repository as the primary teaching material. Official vendor references may be listed as optional verification links, but no core lesson should say “read external documentation to understand this topic.”

## Definition of done

A topic is complete only when it has:

- beginner explanation
- terminology
- visual flow
- implementation
- test input/output
- failure scenarios
- troubleshooting
- security notes
- performance notes
- MUnit exercise
- production scenario
- interview questions
- beginner exercise
- advanced exercise
- links to related lessons in this repository

## Master progression

```text
Understand
   ↓
Build
   ↓
Run
   ↓
Test
   ↓
Break
   ↓
Debug
   ↓
Secure
   ↓
Measure
   ↓
Deploy
   ↓
Operate
   ↓
Improve
```
