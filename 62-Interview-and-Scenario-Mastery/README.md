# 62 — Interview & Scenario Mastery

This section turns knowledge into explainable, practical answers for MuleSoft developer, integration and production-support interviews.

## Answer Framework

For any scenario use:

**Context → Diagnosis → Design → Implementation → Failure Handling → Testing → Security → Operations → Trade-offs**

## Core Scenario Bank

### Mule Runtime
1. Explain a Mule event.
2. Payload vs attributes vs variables.
3. Flow vs sub-flow vs private flow.
4. How does error propagation work?
5. What changes with `on-error-continue` vs `on-error-propagate`?

### DataWeave
6. Transform nested JSON.
7. Handle null and missing fields safely.
8. Group records and calculate totals.
9. Convert JSON to CSV/XML.
10. Optimize a slow transformation.

### APIs
11. RAML vs OAS.
12. APIkit request validation.
13. API-led responsibilities.
14. API versioning and backward compatibility.
15. Authentication vs authorization.

### Messaging
16. When would you use a queue?
17. How do you handle duplicate messages?
18. What happens when a consumer fails repeatedly?
19. Ordering vs throughput trade-offs.
20. DLQ and replay strategy.

### Database
21. Parameterized queries.
22. Transactions and rollback.
23. Connection pool exhaustion.
24. Slow query diagnosis.
25. Duplicate writes after retry.

### Production Support
26. API returns 502.
27. API returns 401/403.
28. API returns 405/415.
29. DB connection suddenly fails.
30. MQ messages stop being consumed.
31. SFTP transfer fails after a password rotation.
32. Deployment succeeds but application is unavailable.
33. Memory usage grows over time.
34. Latency suddenly increases.
35. A customer reports intermittent failures.

### DevOps
36. Maven lifecycle.
37. CI/CD deployment stages.
38. Environment-specific configuration.
39. Secure secrets in deployment pipelines.
40. Rollback and release evidence.

## Production Scenario Template

```text
Incident:
Business impact:
Start time:
Affected API/application:
Correlation ID:
First observable symptom:
Logs/metrics checked:
Dependency checks:
Root cause evidence:
Immediate mitigation:
Permanent fix:
Validation:
Monitoring added:
RCA / preventive action:
```

## Senior-Level Practice

For each scenario, explain the answer twice:

1. **Interview answer:** concise, structured and technically accurate.
2. **Production answer:** commands/logs/evidence, safe mitigation, validation and prevention.

## Completion Gate

You should be able to take an unfamiliar MuleSoft incident and explain what evidence you would collect before proposing a fix. Avoid guessing the root cause from a single log line.
