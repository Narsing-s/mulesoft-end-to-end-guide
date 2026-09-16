# 15 — Logging, Monitoring and Production Support

## Observability in simple words
Observability means collecting enough useful information to understand what an application is doing and why it failed or became slow.

## Logging
Log meaningful events, not every internal detail. Include safe identifiers such as a correlation ID and operation name. Do not log secrets or unnecessary sensitive customer data.

## Correlation ID
A correlation ID is an identifier that helps connect logs across an end-to-end request.

```text
Client -> EAPI [CID-123]
          -> PAPI [CID-123]
             -> SAPI [CID-123]
```

## Metrics
Useful signals include request count, error count, latency and resource utilization. Choose business/operational metrics that help answer real questions.

## Alerts
An alert should be actionable. Define severity, owner, threshold, runbook and escalation path.

## Troubleshooting method
When an API fails:

```text
1. Confirm scope and time
2. Capture endpoint/request ID
3. Check client response
4. Find correlation ID
5. Read application logs
6. Identify failing dependency
7. Compare with healthy requests
8. Confirm root cause
9. Apply safe fix
10. Verify recovery
11. Document prevention
```

## Common scenarios
- 400: inspect request validation
- 401/403: inspect authentication/authorization
- 404: inspect URL/routing/resource
- 405: inspect HTTP method/API contract
- 415: inspect Content-Type and accepted media type
- 429: inspect rate limits
- 500: inspect application error
- 502/504: investigate gateway/dependency/network/timeouts

## Performance
Measure before optimizing. Look for slow downstream calls, excessive database queries, large payloads, unnecessary transformations, high concurrency and connection-pool limits.

## Production support exercise
Take a simulated 502 incident and write a timeline, evidence, root cause, corrective action and preventive action without exposing sensitive data.
