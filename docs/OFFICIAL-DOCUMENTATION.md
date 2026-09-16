# Official MuleSoft Documentation Hub

> **Purpose:** This page maps the learning material in this repository to the official MuleSoft documentation. It is the fastest way to verify platform behavior, version-specific configuration, connector operations, and current product capabilities.
>
> **Important:** This repository is an independent educational project. It is **not an official MuleSoft website, product, or documentation portal**. Official links below point to `docs.mulesoft.com` so learners can verify authoritative information directly.

## How to use this hub

```text
Learn the concept here
        ↓
Read the explanation + example
        ↓
Build the lab
        ↓
Verify version-sensitive details
        ↓
Open the official MuleSoft documentation
        ↓
Record the runtime / connector / Java versions
        ↓
Apply the knowledge in a production-style scenario
```

The repository explains concepts in learning-friendly language; official MuleSoft documentation is the authority for current product behavior, supported versions, exact connector fields, release notes, limits, and configuration syntax.

## Core official documentation

| Subject | What to verify | Official documentation |
|---|---|---|
| Mule application development | Mule events, flows, components, Studio, runtime concepts | https://docs.mulesoft.com/mule-runtime/latest/mule-app-dev |
| Mule Runtime | Runtime behavior and core platform features | https://docs.mulesoft.com/mule-runtime/ |
| DataWeave | Language, operators, functions, types and examples | https://docs.mulesoft.com/dataweave/ |
| Anypoint Connectors | Connector architecture, sources, operations and support categories | https://docs.mulesoft.com/connectors/introduction/introduction-to-anypoint-connectors |
| Anypoint Code Builder connectors | Built-in connectors and XML namespaces | https://docs.mulesoft.com/anypoint-code-builder/ref-connectors |
| APIkit | RAML/OAS/APIkit routing, validation and scaffolding | https://docs.mulesoft.com/apikit/latest/ |
| Runtime Manager | Deployment, management and monitoring | https://docs.mulesoft.com/runtime-manager/ |
| API Gateway | Policies, throttling, security, caching and logging | https://docs.mulesoft.com/mule-gateway/ |
| Database Connector | JDBC connectivity, SQL operations and configuration | https://docs.mulesoft.com/db-connector/latest/ |
| Connector Builder | Building custom connectors from OAS/AI/MCP | https://docs.mulesoft.com/connector-builder/ |
| Anypoint Platform control planes | Control-plane connectivity and environment configuration | https://docs.mulesoft.com/control-planes/configuring-mule-control-planes |

## Connector research rule

For every connector chapter in this repository, use this order:

1. **Understand the repository explanation** — purpose, architecture, examples and production reasoning.
2. **Open the connector's official User Guide** — learn setup and supported usage.
3. **Open the official Reference Guide** — verify sources, operations, fields and connection providers.
4. **Open Release Notes** — verify version changes, fixes and compatibility.
5. **Check Exchange** — confirm the artifact/version available to the project.
6. **Record versions** — Mule runtime, Java, connector, Maven/plugin and deployment target.
7. **Test the behavior** — do not assume a configuration works only because an example exists.

MuleSoft's connector documentation explicitly separates User Guides, Reference Guides and Release Notes, so this repository follows the same research pattern. 

## What belongs in this repository vs. what belongs to official documentation

### This repository

- beginner-friendly explanations
- diagrams and mental models
- configuration reasoning
- DataWeave input → transformation → output examples
- complete Mule XML examples
- labs
- failure injection
- troubleshooting decision trees
- production runbooks
- interview questions and answers
- architecture patterns
- synthetic banking capstone
- cross-topic learning paths

### Official MuleSoft documentation

- current product behavior
- exact supported versions
- exact connector operations and fields
- compatibility requirements
- release notes and known fixes
- official product limits and feature availability
- product-specific installation/configuration instructions
- authoritative API and connector references

## Recommended official starting points

### 1. Mule application development

Start here when learning how Mule applications, events, flows, connectors, modules and DataWeave fit together.

**Official:** https://docs.mulesoft.com/mule-runtime/latest/mule-app-dev

### 2. DataWeave

Use the official DataWeave documentation when verifying syntax, functions, operators, types, coercion and version-specific behavior.

**Official:** https://docs.mulesoft.com/dataweave/

### 3. Connectors

Use the connector overview to understand sources, operations, Exchange assets and connector support categories before opening an individual connector guide.

**Official:** https://docs.mulesoft.com/connectors/introduction/introduction-to-anypoint-connectors

### 4. APIkit

Use the APIkit documentation for contract-driven API scaffolding, routing, validation and supported API types.

**Official:** https://docs.mulesoft.com/apikit/latest/

### 5. Deployment and operations

Use Runtime Manager documentation when moving from local development into CloudHub, CloudHub 2.0, Runtime Fabric, Hybrid or other supported deployment models.

**Official:** https://docs.mulesoft.com/runtime-manager/

## Version discipline

Never copy a version-sensitive configuration blindly.

```text
Mule Runtime version
       +
Java version
       +
DataWeave version
       +
Connector/module version
       +
Maven / mule-maven-plugin version
       +
Deployment target
       ↓
Verified implementation
```

For example, MuleSoft documents DataWeave versions as bundled with specific Mule runtime versions. Therefore a DataWeave example must be checked against the runtime used by the project rather than treated as timeless syntax.

## Repository navigation

- [Repository-wide deep explanations](../53-End-to-End-Study-Path/REPO-WIDE-DEEP-EXPLANATIONS.md)
- [Deep explanation standard](../53-End-to-End-Study-Path/REPO-WIDE-DEEP-EXPLANATION-STANDARD.md)
- [Connector mastery](../07-Connectors/00-CONNECTOR-MASTERY.md)
- [Mandatory connector depth](../07-Connectors/12-MANDATORY-CONNECTOR-DEPTH-EXPLAINED.md)
- [Connector coverage audit](../07-Connectors/13-CONNECTOR-COMPLETE-COVERAGE-AUDIT.md)
- [Complete repository guide](../README.md)

## Quality promise

A lesson should never pretend that an internal example is the product specification. The repository teaches **how to understand and engineer the solution**; the official MuleSoft documentation verifies **what the current product supports**.

That distinction keeps the learning material clean, useful and version-aware.
