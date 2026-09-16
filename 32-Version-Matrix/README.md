# 32 — Mule Version & Compatibility Matrix

Version-specific behavior changes over time. Use this page as a navigation aid, not as a replacement for the release notes or product documentation.

## Mule Runtime → DataWeave

| Mule Runtime | Bundled DataWeave |
|---|---|
| 4.8 | 2.8 |
| 4.9 | 2.9 |
| 4.10 | 2.10 |
| 4.11 | 2.11 |
| 4.12 | 2.12 |

The exact connector/module compatibility must still be checked for the runtime and dependency versions used by a project.

## What to record in every project

```text
Mule Runtime:
Java:
DataWeave:
Mule Maven Plugin:
APIkit:
Connector versions:
Anypoint Studio:
Deployment target:
Environment:
```

## Why this matters

A flow can work in Studio and still fail in another environment because of differences in:

- runtime version
- Java version
- connector/module version
- dependency version
- deployment target
- property values
- certificates
- external system configuration

## Recommended learning approach

1. Learn the concept using the guide.
2. Implement it in your project's supported runtime.
3. Check the relevant connector/module documentation.
4. Run MUnit tests.
5. Package with Maven.
6. Test in a non-production environment.
7. Record runtime/dependency versions.

Never copy a dependency version from a random tutorial without checking compatibility with your application.
