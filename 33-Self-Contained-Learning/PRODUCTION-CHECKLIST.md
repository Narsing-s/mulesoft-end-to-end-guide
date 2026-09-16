# Production Readiness Checklist

## Design

- [ ] API contract is versioned.
- [ ] Resources and methods have clear semantics.
- [ ] Timeout behavior is defined.
- [ ] Retry behavior is defined.
- [ ] Idempotency is defined where needed.
- [ ] Partial failure behavior is documented.

## Security

- [ ] TLS is used where appropriate.
- [ ] Authentication is defined.
- [ ] Authorization is defined.
- [ ] Secrets are externalized.
- [ ] Sensitive data is not logged.
- [ ] Sensitive response fields are deliberately selected.
- [ ] Certificate rotation is planned.

## Reliability

- [ ] Downstream failures have controlled behavior.
- [ ] Retry does not amplify duplicate business operations.
- [ ] Dead-letter strategy exists for asynchronous processing.
- [ ] Poison messages cannot loop forever.
- [ ] Connection pools have sane limits.
- [ ] Timeouts prevent indefinite waiting.

## Testing

- [ ] Happy path tests exist.
- [ ] Validation tests exist.
- [ ] Error tests exist.
- [ ] Dependency failures are mocked.
- [ ] Regression tests exist for production defects.
- [ ] Build runs tests automatically.

## Observability

- [ ] Correlation ID exists.
- [ ] Logs are structured enough to investigate incidents.
- [ ] Key latency and error metrics exist.
- [ ] Health/readiness behavior is understood.
- [ ] Alerts have actionable thresholds.
- [ ] Dashboards identify affected APIs and dependencies.

## Deployment

- [ ] Configuration differs safely by environment.
- [ ] Secrets are not committed.
- [ ] Artifact version is traceable.
- [ ] Rollback is tested.
- [ ] Deployment ownership is clear.
- [ ] Post-deployment verification exists.

## Operations

- [ ] Runbook exists.
- [ ] Common failure scenarios are documented.
- [ ] On-call escalation path exists.
- [ ] RCA template exists.
- [ ] Known limitations are recorded.

## Go-live question

If the only answer to “How will we know it is broken?” is “a user will tell us,” the application is not operationally ready.
