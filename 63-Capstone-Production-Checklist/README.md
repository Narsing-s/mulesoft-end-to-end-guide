# 63 — Capstone Production Checklist

Use this before calling a MuleSoft project production-ready.

## Contract
- [ ] RAML/OAS/event contract reviewed
- [ ] Examples and error responses documented
- [ ] Compatibility/versioning strategy documented

## Application
- [ ] Happy path tested
- [ ] Negative paths tested
- [ ] Timeouts configured
- [ ] Retry behavior reviewed
- [ ] Idempotency reviewed
- [ ] Error types are intentional
- [ ] No secrets hard-coded

## Data
- [ ] SQL parameterized
- [ ] Transactions reviewed
- [ ] Connection pool sized from evidence
- [ ] Data ownership documented
- [ ] PII handling reviewed

## Messaging
- [ ] Ack behavior understood
- [ ] Duplicate handling defined
- [ ] Ordering requirements documented
- [ ] DLQ/replay process documented
- [ ] Poison-message handling defined

## Security
- [ ] TLS configuration reviewed
- [ ] Authentication configured
- [ ] Authorization verified
- [ ] Least privilege applied
- [ ] Sensitive logs redacted
- [ ] Secrets/certificates have rotation procedures

## Testing
- [ ] MUnit tests
- [ ] Negative tests
- [ ] Contract tests where applicable
- [ ] Integration tests
- [ ] Smoke test
- [ ] Regression evidence
- [ ] Dependency/security checks

## Deployment
- [ ] Versioned artifact
- [ ] Environment properties reviewed
- [ ] Deployment rollback procedure
- [ ] Health/readiness validation
- [ ] Release evidence captured

## Operations
- [ ] Logs searchable by correlation ID
- [ ] Metrics identified
- [ ] Alerts defined
- [ ] Dashboard available
- [ ] Runbook available
- [ ] On-call/ownership documented
- [ ] Incident/RCA process defined

## Recovery Test

Simulate at least one failure from each category:
- HTTP dependency
- database
- messaging
- file/SFTP
- authentication/TLS
- deployment

For each failure record detection, mitigation, recovery, evidence and prevention.

## Final Evidence Pack

Store:
- architecture diagram
- API contract
- ADRs
- test report
- deployment record
- security review
- operational runbook
- rollback procedure
- sample logs/metrics
- known limitations
