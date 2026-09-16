# Release Manifest

This file defines exactly what a published MuleSoft End-to-End Guide release must contain.

## Package identity

```text
Product: MuleSoft End-to-End Guide
Format: ZIP distribution
Version: vX.Y.Z
Integrity: SHA-256
Source: Git tag vX.Y.Z
```

## Required top-level content

A valid package must contain at least:

- `README.md`
- `00-START-HERE.md`
- `TOPIC-INDEX.md`
- `docs/index.html`
- `53-End-to-End-Study-Path/`
- `54-Gap-Analysis-and-Completeness/`
- `55-Learning-Assessment-and-Project-Ladder/`
- `56-Modern-Platform-Deep-Dive/`
- `57-Modern-Platform-AI-and-Agentic-Engineering/`
- `58-Release-and-Packaging/`
- `59-Job-Interview-Mastery/`
- `60-Production-Support-Engineering/`
- `61-Architecture-Decision-Playbook/`
- `62-Interview-and-Scenario-Mastery/`
- `63-Capstone-Production-Checklist/`
- `68-Project-Documentation-Templates/`
- `69-Glossary-and-Quick-Reference/`
- `70-Repository-Quality-and-Release/`

## Package must provide

1. Beginner-to-advanced learning path.
2. Practical MuleSoft examples.
3. DataWeave input/output examples.
4. API/RAML/OAS/APIkit guidance.
5. Error handling and resilience.
6. DB, HTTP, SFTP and messaging concepts.
7. Security and secret-handling guidance.
8. MUnit/testing guidance.
9. Maven, Git and CI/CD guidance.
10. CloudHub/CloudHub 2.0/runtime/deployment guidance.
11. Observability and production troubleshooting.
12. Architecture and integration decisions.
13. Hands-on labs and project ladder.
14. Interview questions and scenario practice.
15. Release/package instructions.

## Must not contain

- `.git/`
- `.env` or secret files
- credentials, tokens or private keys
- customer/production data
- IDE caches
- temporary logs
- generated `dist/` contents from an earlier package
- local OS metadata

## Integrity contract

For every release:

```text
Source tag
   ↓
Clean checkout
   ↓
Repository validation
   ↓
Package
   ↓
SHA-256
   ↓
Artifact upload
   ↓
GitHub Release
```

The checksum is generated from the exact ZIP that is published. A user can independently verify the downloaded package before extraction.

## Learning-quality contract

A technical lesson should make the learner able to:

```text
Understand
  ↓
Explain
  ↓
Build
  ↓
Test
  ↓
Break
  ↓
Debug
  ↓
Secure
  ↓
Deploy
  ↓
Operate
  ↓
Explain in an interview
```

Release packaging is successful only when the resulting distribution preserves this learning experience.