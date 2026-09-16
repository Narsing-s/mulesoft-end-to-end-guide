# 65 — Real-World Scenario Library

Use these scenarios as practical drills. Do not jump directly to the fix. Produce evidence first.

## Scenario 1 — HTTP 404
**Symptom:** A consumer receives 404.

**Investigation:** Verify URL/base path, deployed API contract, HTTP method, APIkit routing and gateway/proxy path rewriting. Compare the request against the deployed contract.

**Expected outcome:** Identify whether the request never reached the application or reached an application route that does not match.

## Scenario 2 — HTTP 415
**Symptom:** POST requests fail with 415.

**Investigation:** Inspect `Content-Type`, accepted media types, API contract and request body format. Reproduce with a minimal request.

## Scenario 3 — Database timeout
**Symptom:** API latency increases and DB calls time out.

**Investigation:** Correlate timestamps, measure DB dependency time, inspect connection pool availability, query behavior, database health and recent changes.

## Scenario 4 — MQ duplicate
**Symptom:** A business operation appears twice.

**Investigation:** Establish message ID/business key, consumer acknowledgement behavior, retry/re-delivery history and downstream idempotency state.

## Scenario 5 — SFTP file missing
**Symptom:** Scheduled integration reports no file.

**Investigation:** Confirm schedule, remote path, filename pattern, credentials, connectivity, permissions, file arrival time and whether another process moved the file.

## Scenario 6 — TLS certificate failure
**Symptom:** Downstream HTTPS calls fail after certificate rotation.

**Investigation:** Check certificate chain, hostname/SAN, truststore/keystore, expiry and deployment configuration. Compare the working and failing environments.

## Scenario 7 — Deployment starts but application is unhealthy
**Symptom:** Deployment completes but health checks fail.

**Investigation:** Inspect startup logs, configuration resolution, required secrets, dependency connectivity, port/listener configuration and runtime resource limits.

## Scenario 8 — DataWeave null failure
**Symptom:** Transformation works for normal data but fails when an optional field is absent.

**Investigation:** Reproduce with the smallest failing payload, identify the selector/type assumption, define the desired null/empty behavior and add a regression test.

## Scenario 9 — Slow Scatter-Gather
**Symptom:** API response time suddenly increases.

**Investigation:** Measure each route separately, identify the slow dependency, inspect timeout behavior and evaluate whether parallel execution is still appropriate for the workload.

## Scenario 10 — Incident after deployment
**Symptom:** Error rate rises immediately after release.

**Investigation:** Compare release timestamp with incident timeline, inspect changed artifact/configuration, compare logs before and after release, determine rollback criteria and validate recovery.

## Scenario 11 — Unreadable production logs
**Symptom:** Operators cannot connect related events.

**Investigation:** Check correlation/request identifiers, structured logging fields, timestamp consistency and whether sensitive data is being logged.

## Scenario 12 — Memory pressure
**Symptom:** Application memory usage grows during large-file processing.

**Investigation:** Check payload sizes, streaming behavior, transformations that materialize data, repeat operations, concurrency and heap/GC evidence.

## Scenario 13 — Retry storm
**Symptom:** A downstream outage causes rapidly increasing traffic.

**Investigation:** Inspect retry count, backoff, timeout, concurrency and downstream error rates. Replace unbounded retry behavior with bounded recovery and terminal handling.

## Scenario 14 — API contract mismatch
**Symptom:** Consumer and provider disagree after a release.

**Investigation:** Compare contract versions, required/optional fields, media types, status codes and compatibility rules. Identify whether the change is backward compatible.

## Scenario 15 — Safe recovery
**Symptom:** A queue contains failed business messages.

**Investigation:** Classify poison versus transient messages, preserve identifiers and original payload metadata, correct the underlying fault first, then replay using controlled batches and observe results.

## Required incident answer format

1. Impact
2. Scope
3. Time window
4. Correlation IDs / message IDs
5. Evidence collected
6. Hypotheses
7. Confirmed cause
8. Immediate mitigation
9. Recovery validation
10. Root cause
11. Preventive action
12. Evidence that the prevention works
