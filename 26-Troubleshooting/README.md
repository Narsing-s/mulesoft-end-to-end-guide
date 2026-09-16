# Production Troubleshooting Playbook

Use the sequence: **symptom -> evidence -> scope -> root cause -> fix -> prevention**.

## HTTP 404
Check listener host/port, base path, APIkit contract path, deployed version and gateway/proxy routing.

## HTTP 405
The resource exists but the method is not allowed. Check whether the RAML/OAS defines the method and whether APIkit generated/mapped the correct flow. OPTIONS/CORS preflight can also expose method configuration problems.

## HTTP 415
Usually content type mismatch. Check `Content-Type`, request body format, API contract and connector expectations.

## HTTP 400
Validate required fields, types, query/path parameters and API contract constraints.

## HTTP 401/403
Separate authentication failure from authorization/policy failure. Check token, client application, scopes, policy configuration and gateway behavior.

## HTTP 502/503/504
Do not assume Mule is the root cause. Check gateway logs, listener availability, upstream/downstream health, timeout settings, DNS, TLS and deployment status.

## DB failure
Check connectivity, DNS, credentials, TLS, connection pool exhaustion, SQL syntax, permissions and database availability.

## MQ/JMS failure
Check broker connectivity, destination, credentials, acknowledgement mode, redelivery and dead-letter handling.

## Slow API
Compare application time with downstream time. Look for slow DB queries, sequential calls, DataWeave cost, connection waits and excessive logging.

## Deployment failure
Check application packaging, Maven dependencies, Java/Mule compatibility, properties, certificates, connector versions and target runtime support.

## TLS failure
Check certificate expiry, trust chain, hostname, keystore/truststore format, protocol/cipher compatibility and whether the correct certificate is actually deployed.

## Object Store/key errors
Validate that the key expression never becomes null and that serialization/deserialization is consistent.

## Incident template
```text
Incident:
Start/end time:
Affected API:
Symptoms:
Business impact:
First error:
Correlation IDs:
Logs/evidence:
Root cause:
Immediate fix:
Permanent fix:
Prevention:
Monitoring added:
```
