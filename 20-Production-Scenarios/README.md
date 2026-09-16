# 20 — Production Scenarios and Runbooks

These scenarios teach investigation rather than guessing.

## 1. API returns 400
Check request body, required fields, validation rules, query/URI parameters and content type. Compare with a known-good request.

## 2. API returns 401/403
Check credentials/token validity, scopes, policy configuration and client identity.

## 3. API returns 404
Check base path, API version, resource path, deployment URL and routing/APIkit configuration.

## 4. API returns 405
Check whether the requested HTTP method is actually defined by the API contract and whether a preflight OPTIONS request is being handled correctly where relevant.

## 5. API returns 415
Check `Content-Type`, accepted media types and the request body format.

## 6. API returns 502/504
Establish whether the gateway, Mule application or downstream dependency generated the failure. Check timeouts, DNS/network connectivity, TLS and dependency health.

## 7. Database failure
Check connectivity, credentials, pool state, database availability, query errors, locks and capacity.

## 8. IBM MQ failure
Check connection/channel/queue configuration, authentication, acknowledgements, queue depth and dead-letter handling.

## 9. Duplicate message
Identify the business key or idempotency key, check durable state and make processing safe to repeat.

## 10. Slow API
Measure each dependency. Do not assume DataWeave or Mule is the bottleneck. Compare application time, downstream latency, database time and queue behavior.

## 11. Deployment failure
Check artifact/package validity, runtime compatibility, properties, dependencies, credentials and environment configuration.

## 12. TLS failure
Inspect certificate validity, trust chain, hostname, keystore/truststore configuration and protocol compatibility.

## Incident template

```text
Incident:
Start time:
End time:
Affected API:
Impact:
Correlation IDs:
Symptoms:
Evidence:
Root cause:
Immediate fix:
Verification:
Preventive action:
Owner:
```

## Rule
Always separate **observed evidence** from **assumptions**. Record what the logs, metrics, requests and dependency responses actually prove.
