# 32 — Mule Version & Compatibility Matrix

Version awareness is part of professional MuleSoft development. A Mule application is affected by its runtime, Java, DataWeave, APIkit, connectors, Maven/plugin versions, Studio version, deployment target and environment configuration.

## Current learning baseline

For this repository, use the version matrix below as a learning reference. **Always record the exact versions used by your own project.**

| Mule Runtime | DataWeave family | Learning note |
|---|---|---|
| 4.8 | 2.8 | Common enterprise baseline |
| 4.9 | 2.9 | Common enterprise baseline |
| 4.10 | 2.10 | Java/runtime compatibility must be recorded |
| 4.11 | 2.11 | Record connector/module versions too |
| 4.12 | 2.12 | Current 2026 learning baseline |

Mule Runtime 4.12 release information for 2026 includes DataWeave 2.12 and ongoing runtime/diagnostic improvements. Recent APIkit releases in 2026 also include security and observability updates. citeturn0search0turn0search1

## Do not memorize version numbers

Interview-safe answer:

> “I use the runtime and Java version supported by the target environment, record connector/module versions in Maven, test the application on that exact runtime and validate compatibility before promotion.”

That is better than guessing a version.

## Record this for every application

```text
Application:
Mule Runtime:
Java:
DataWeave:
Mule Maven Plugin:
APIkit:
MUnit:
HTTP Connector:
Database Connector:
JMS/IBM MQ Connector:
Other connectors:
Anypoint Studio:
Deployment target:
OS/container/Kubernetes details where applicable:
Environment:
Property set/version:
Certificate/truststore version:
Last tested date:
```

## Why “works in Studio” is not enough

A local application can work while deployment fails because of:

- different runtime version
- different Java version
- dependency conflict
- missing connector dependency
- incompatible connector/module version
- different property values
- missing environment variable
- certificate/truststore differences
- network/firewall/DNS differences
- deployment-target differences
- external system configuration

## Version-control workflow

```text
Change dependency
   ↓
Build
   ↓
MUnit
   ↓
Run application
   ↓
Smoke test
   ↓
Package
   ↓
Deploy non-production
   ↓
Verify
   ↓
Promote
```

## Repository rule

Core explanations in this repository are self-contained. Version-specific facts are separated from conceptual teaching so that learners can understand the concept without leaving the repository.

For exact project compatibility, use the version values actually present in the project's `pom.xml` and deployment environment. Never copy a dependency version from an unrelated tutorial.
