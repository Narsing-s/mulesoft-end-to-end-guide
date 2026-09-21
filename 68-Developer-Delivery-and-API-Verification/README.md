# 68 — Developer Delivery & API Verification

This chapter covers practical delivery skills that sit between writing Mule flows and running a reliable MuleSoft project. It intentionally does **not** repeat the main API, MUnit, CI/CD, security, or release chapters. Use those canonical chapters for the deeper concepts.

## 1. Postman as an API verification tool

Postman is useful for manually verifying an API contract and quickly reproducing production-like requests.

Beginner flow:

```text
Requirement
   ↓
RAML / OAS contract
   ↓
Postman request
   ↓
Headers + authentication
   ↓
Request body
   ↓
API response
   ↓
Verify status + headers + body
```

For every important endpoint, capture:

- HTTP method and URL
- required headers
- authentication
- request example
- expected status code
- expected response body
- expected error responses
- correlation/request ID
- idempotency behavior where applicable

### Beginner example

Request:

```http
POST /customers
Content-Type: application/json
Authorization: Bearer <token>
```

Body:

```json
{
  "name": "Ravi",
  "email": "ravi@example.com"
}
```

Expected success:

```json
{
  "id": "C1001",
  "name": "Ravi",
  "email": "ravi@example.com"
}
```

Do not only test the happy path. Also test missing fields, invalid values, unauthorized requests, duplicate requests, downstream failures and oversized input.

## 2. Automated API checks with Newman/CI

A Postman collection becomes more valuable when the same requests can run automatically after a build or deployment.

```text
Postman collection
       ↓
Environment variables
       ↓
Automated runner
       ↓
API
       ↓
Assertions
       ↓
Pass / Fail
       ↓
CI/CD quality gate
```

Assertions should verify behavior, not just HTTP 200.

Examples:

- status code
- response schema
- required fields
- important business values
- error contract
- response-time threshold where appropriate

Keep secrets outside the collection and inject them through secure CI variables.

## 3. API verification levels

Use several levels rather than relying on one tool:

| Level | Purpose |
|---|---|
| DataWeave/unit test | transformation correctness |
| MUnit | Mule flow behavior |
| Contract test | producer/consumer compatibility |
| API collection test | deployed API behavior |
| Integration test | real dependency interaction |
| Smoke test | deployment health |
| Load test | capacity and performance |

A green build does not automatically prove that a deployed API is reachable and correctly configured.

## 4. Environment variables and promotion

Never edit production source code just to change an endpoint, password or environment value.

```text
Same artifact
   ├── DEV configuration
   ├── TEST configuration
   └── PROD configuration
```

Separate:

- application code
- non-secret environment configuration
- secrets
- certificates
- deployment parameters

Promotion should move the tested artifact while changing only environment-specific configuration.

## 5. Maven build hygiene

A Mule project normally contains a Maven build descriptor. Understand:

- application/runtime compatibility
- Mule Maven plugin
- connector versions
- dependency scopes
- transitive dependencies
- repositories
- reproducible builds
- Maven settings
- artifact versioning

Useful validation sequence:

```text
Clean
 ↓
Compile/package
 ↓
Unit/MUnit tests
 ↓
Dependency validation
 ↓
Package artifact
 ↓
Deploy
 ↓
Smoke test
```

Do not solve dependency failures by randomly upgrading several libraries at once. Change one controlled dependency set, build, test and record the reason.

## 6. Dependency and supply-chain security

For production projects, dependency management is also a security concern.

Check for:

- vulnerable dependencies
- outdated connector versions
- abandoned libraries
- unexpected transitive dependencies
- untrusted repositories
- secrets accidentally committed with build files

Recommended pipeline concept:

```text
Source
 ↓
Build
 ↓
Tests
 ↓
Dependency/security scan
 ↓
Artifact
 ↓
Deployment
```

A security scanner finding should be classified before remediation: false positive, accepted risk, upgrade available, replacement required, or urgent exposure.

## 7. Git branching and pull-request quality

A beginner-friendly workflow:

```text
Issue / requirement
       ↓
Feature branch
       ↓
Small focused commits
       ↓
Build + tests
       ↓
Pull request
       ↓
Review
       ↓
Merge
       ↓
CI/CD
```

A good MuleSoft pull request should make it easy to answer:

- What requirement changed?
- Which API/flow changed?
- Which DataWeave changed?
- What tests were added or updated?
- What configuration changed?
- Is there a security impact?
- Is there a backward-compatibility impact?
- Is deployment/rollback affected?
- Are documentation and examples updated?

Avoid mixing unrelated refactoring into a functional change.

## 8. Code-review checklist for Mule XML and DataWeave

Review for:

### Correctness
- Does the flow satisfy the requirement?
- Are success and failure paths explicit?
- Are variables and payload changes intentional?

### DataWeave
- Are null/default cases handled?
- Are data types correct?
- Could the transformation materialize a very large payload?
- Is the transformation readable?

### Errors
- Are expected business errors separated from technical failures?
- Is retry safe?
- Could an error be swallowed?
- Is the client response contract stable?

### Security
- Are secrets absent from source?
- Is sensitive data excluded from logs?
- Are authorization assumptions clear?

### Operations
- Is there a useful correlation ID?
- Can an operator diagnose failure from logs/metrics?
- Is a timeout explicit where needed?
- Is the downstream dependency protected?

## 9. Deployment smoke-test checklist

Immediately after deployment verify:

1. application is started
2. expected endpoint is reachable
3. authentication works
4. one valid request succeeds
5. one expected validation error behaves correctly
6. downstream connectivity works
7. logs contain correlation information
8. no startup/configuration errors exist
9. metrics/alerts are reporting
10. rollback information is available

Do not declare a deployment successful only because the deployment status says STARTED.

## 10. Requirement-to-test traceability

For each requirement, map:

```text
Requirement
   ↓
API contract
   ↓
Mule implementation
   ↓
DataWeave
   ↓
Test
   ↓
Deployment verification
   ↓
Production evidence
```

Example:

| Requirement | Implementation | Test | Evidence |
|---|---|---|---|
| Reject amount <= 0 | validation | MUnit + API test | response + log |
| Create customer | POST flow | MUnit + smoke test | 201 response |
| Avoid duplicate payment | idempotency | duplicate-request test | one business operation |

This prevents a feature from being considered complete when only the Mule XML exists.

## 11. Rollback decision basics

Before deployment know:

- previous working artifact
- configuration differences
- database/schema compatibility
- downstream compatibility
- migration/reconciliation impact
- rollback owner
- smoke-test commands
- evidence to capture

Rollback is not always simply "deploy the previous JAR". Database changes and irreversible external side effects may require a forward-fix or compensation.

## 12. Beginner troubleshooting decision tree

When an API fails:

```text
Can the client reach the API?
 ├─ No → DNS/network/gateway/listener
 └─ Yes
     ↓
Is authentication accepted?
 ├─ No → token/credentials/policy
 └─ Yes
     ↓
Does Mule receive the request?
 ├─ No → routing/listener/policy
 └─ Yes
     ↓
Did validation fail?
 ├─ Yes → request/schema/business validation
 └─ No
     ↓
Did a downstream call fail?
 ├─ Yes → dependency/timeout/auth/network
 └─ No
     ↓
Check transformation/business logic
```

Always collect a correlation identifier before searching logs when one is available.

## 13. Evidence for production changes

A production change should leave enough evidence to reconstruct what happened:

- requirement/change reference
- artifact version
- deployment time
- environment
- configuration version
- test result
- smoke-test result
- deployment result
- relevant logs/metrics
- rollback or recovery action if used

Avoid storing credentials or sensitive payloads as evidence.

## 14. Completion exercise

Take one small REST API and produce all of these:

1. RAML/OAS contract
2. Mule implementation
3. DataWeave mapping
4. MUnit tests
5. Postman collection
6. automated API assertions
7. environment configuration
8. CI build
9. security/dependency check
10. deployment
11. smoke test
12. troubleshooting decision tree
13. rollback note
14. requirement-to-test traceability

If you can explain every artifact to a beginner and show why it exists, you are practicing the same lifecycle used in real integration delivery.

## 15. Relationship to existing chapters

Use the canonical chapters for depth:

- API design → `04-API-Development`
- Security → `10-API-Security` / `48-Security-Engineering`
- MUnit → `12-Testing` / `25-MUnit`
- CI/CD → `14-DevOps-CICD` / `50-Release-Engineering`
- Operations → `15-Observability` / `51-Production-Operations`
- Troubleshooting → `26-Troubleshooting`
- Governance → `52-API-Governance`

This chapter adds the **delivery verification workflow** that connects those existing areas instead of duplicating them.
