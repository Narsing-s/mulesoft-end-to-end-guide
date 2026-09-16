# 58 — Quality Engineering

Production integration quality is more than passing a few MUnit tests. This track connects code quality, contract quality, automated testing and release confidence.

## Quality model

```text
Requirements
     ↓
Contract validation
     ↓
Static checks
     ↓
Unit / MUnit
     ↓
Component tests
     ↓
Contract tests
     ↓
Integration tests
     ↓
Performance checks
     ↓
Security checks
     ↓
CI quality gate
     ↓
Deploy
     ↓
Smoke / health verification
```

## 1. Test pyramid for MuleSoft

Cover:

- DataWeave unit tests
- flow-level MUnit tests
- connector mocking
- error-path tests
- contract tests
- integration tests
- end-to-end tests
- smoke tests
- performance tests

Prefer fast deterministic tests for most logic and reserve full end-to-end tests for critical journeys.

## 2. Negative testing

Every important flow should test:

- malformed JSON/XML
- missing required fields
- invalid data types
- unauthorized request
- forbidden request
- downstream timeout
- downstream 4xx
- downstream 5xx
- DB unavailable
- MQ unavailable
- duplicate message
- duplicate request
- certificate failure
- configuration error

## 3. Static and dependency quality

Include where supported by the project:

- Maven validation
- dependency review
- vulnerable dependency checks
- formatting/linting
- secret scanning
- API contract validation
- generated-code review
- XML/configuration validation

## 4. Test data discipline

Use synthetic data.

Separate:

- deterministic fixtures
- generated test data
- environment configuration
- secrets
- production data

Never commit credentials, tokens or customer data.

## 5. CI quality gate

```text
Pull Request
    ↓
Compile
    ↓
Unit / MUnit
    ↓
Coverage threshold
    ↓
Contract validation
    ↓
Security/dependency checks
    ↓
Package
    ↓
Deploy to test
    ↓
Smoke test
    ↓
Promote
```

## 6. Release confidence

Before production, record:

- artifact version
- source commit
- tests passed
- deployment target
- configuration version
- database changes
- migration status
- known risks
- rollback method
- smoke-test result
- approval/evidence

## Completion gate

A learner can explain why a test exists, reproduce a failure, prove the fix with an automated test, and demonstrate release evidence without relying on manual “it worked once” validation.
