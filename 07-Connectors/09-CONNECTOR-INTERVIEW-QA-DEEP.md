# Deep Connector Interview Questions and Answers

Every question is followed immediately by its answer.

## Q1. What is a MuleSoft connector?

**Answer:** A connector is a reusable Mule extension that helps an application communicate with an external API, database, protocol, broker, or application system without implementing the entire low-level integration protocol manually.

## Q2. What is a source?

**Answer:** A source starts a Mule flow when an event occurs. Examples include HTTP Listener, Scheduler, a file source, or a connector-specific consumer/source.

## Q3. What is an operation?

**Answer:** An operation performs an action such as querying a database, sending an HTTP request, publishing a message, reading a file, or upserting a CRM record.

## Q4. Why use a global connector configuration?

**Answer:** It centralizes reusable connection information such as endpoint, authentication and transport settings. Multiple connector operations can reference the same configuration, improving consistency and maintenance.

## Q5. Why externalize connector properties?

**Answer:** Environment-specific values should not be embedded in flow logic. External properties allow the same application artifact to be configured differently for development, test and production and help protect secrets.

## Q6. What is the difference between retry and reconnection?

**Answer:** Reconnection attempts to restore a connector connection/session after connectivity loss. Retry repeats a failed operation. They solve different failure classes and must not be configured interchangeably.

## Q7. Why is retrying dangerous?

**Answer:** The target may have completed the first operation even though Mule received a timeout or connection error. Repeating a non-idempotent write can therefore create duplicates.

## Q8. How do you design idempotency?

**Answer:** Define a stable business/message identifier, check whether it was already processed, process only new events, and record successful completion. Where supported, also use provider idempotency keys or external IDs.

## Q9. How do you troubleshoot HTTP 401?

**Answer:** Verify the authentication method, token/credential validity, client configuration, scopes and endpoint. Do not assume a network problem when the server has explicitly returned an authentication response.

## Q10. How do you troubleshoot HTTP 429?

**Answer:** Identify the provider quota/rate limit, inspect retry-after/provider guidance, reduce concurrency or request frequency where appropriate, batch/paginate efficiently, and implement bounded backoff rather than an uncontrolled retry loop.

## Q11. Why can HTTP POST create duplicates after a timeout?

**Answer:** The server may accept the POST and complete the write, but the response can be lost before Mule receives it. A retry can submit the same business action again. Use idempotency controls when the API supports them.

## Q12. What causes DB connection pool exhaustion?

**Answer:** Too much concurrency, long-running queries, long transactions, insufficient pool sizing, connection leaks or database-side saturation can consume all available connections. Diagnose the bottleneck before increasing pool size.

## Q13. Why use parameterized SQL?

**Answer:** It separates SQL structure from values, reduces injection risk and produces clearer, safer database operations.

## Q14. How do you troubleshoot a slow DB connector operation?

**Answer:** Measure query duration, inspect query plans/indexes, check locks/deadlocks, database CPU/I/O, network latency, connection acquisition time, transaction duration and pool saturation.

## Q15. How do you prevent partial file processing?

**Answer:** Coordinate file completion with the producer using atomic rename, a completion marker or another agreed readiness protocol. Do not equate file visibility with write completion.

## Q16. SFTP versus FTPS?

**Answer:** SFTP is an SSH-based file transfer protocol. FTPS is FTP protected with TLS. They have different security/configuration models and are not interchangeable.

## Q17. Why can MQ messages be processed twice?

**Answer:** A consumer can complete business processing but fail before acknowledgement/commit, so the broker can redeliver the message. Idempotent processing is therefore important.

## Q18. What should you check for IBM MQ failures?

**Answer:** Check queue manager, channel, connection mode, destination, authentication, TLS/security, provider reason codes, acknowledgement/transaction state and whether the message was redelivered or moved to a DLQ.

## Q19. What should you understand for Kafka?

**Answer:** Bootstrap servers, topics, partitions, consumer groups, offsets, commits, ordering, concurrency, lag, authentication/TLS, serialization/schema and replay behavior.

## Q20. Why is Salesforce Upsert useful?

**Answer:** Upsert can synchronize using a stable external identifier so an existing record is updated while a missing record is created, reducing duplicate creation during repeated synchronization.

## Q21. How do you troubleshoot Salesforce throttling?

**Answer:** Check API usage/limits, request volume, pagination, concurrency and operation choice. Use efficient queries/bulk patterns where appropriate and follow Salesforce-specific backoff guidance.

## Q22. What is a SOAP fault?

**Answer:** It is a SOAP-level response describing a service/protocol/application failure. It is different from a transport failure such as DNS failure, connection refusal or timeout.

## Q23. What is the difference between authentication and authorization?

**Answer:** Authentication establishes who the caller is. Authorization determines what that identity is allowed to do.

## Q24. What should be protected in connector configuration?

**Answer:** Passwords, OAuth secrets/tokens, API keys, private keys, certificates and sensitive endpoint information should be protected using appropriate secure configuration/secret-management mechanisms.

## Q25. What should MUnit test for a connector?

**Answer:** Test success, invalid input, connector/provider failure, timeout/connectivity failure, retry behavior where applicable, duplicate/idempotency behavior and error handling. External calls are normally mocked in unit tests.

## Q26. How do you troubleshoot a certificate failure?

**Answer:** Check certificate validity/expiry, hostname/SAN, trust chain, truststore/keystore configuration, protocol/cipher compatibility and whether the deployed environment uses the expected certificate material.

## Q27. What is connection pooling?

**Answer:** It reuses established connections instead of creating a new connection for every operation. Pool size must match workload and downstream capacity; excessive concurrency can overload the target.

## Q28. Why do rate limits matter?

**Answer:** A provider can reject or throttle requests even when the connector is correctly configured. Production design must account for quotas, concurrency, batching, pagination and backoff.

## Q29. What is the difference between a connector configuration problem and a provider problem?

**Answer:** A configuration problem originates in the Mule application, such as an invalid endpoint or credential. A provider problem can be an outage, throttling or server-side error. Logs, status codes and controlled tests help separate them.

## Q30. How would you explain a connector incident in an interview?

**Answer:** Use: **symptom → evidence → root cause → safe recovery → validation → prevention**. Mention correlation ID, exact error type, downstream checks, retry/idempotency decision and the test or monitoring improvement added afterward.

## Q31. What makes a connector implementation production-ready?

**Answer:** Secure configuration, verified compatibility, intentional timeouts, safe retry/reconnection, idempotency, appropriate transactions, pagination/batching, rate-limit handling, MUnit coverage, observability, alerts, runbook and tested recovery procedures.

## Q32. What should you verify before upgrading a connector?

**Answer:** Check connector release notes, supported Mule runtime/Java versions, dependency changes, migration/upgrade guidance, breaking changes, configuration changes and regression tests.

## Q33. How do you decide between HTTP and MQ?

**Answer:** HTTP is commonly suited to synchronous request/response interactions where the caller needs a response. Messaging is suited to asynchronous decoupling, buffering, independent processing and eventual processing. The business SLA and delivery requirements determine the choice.

## Q34. How do you decide between File and SFTP?

**Answer:** File works with a filesystem accessible to the Mule runtime. SFTP is for remote SSH-based file transfer. The network location and partner transfer contract determine the appropriate connector.

## Q35. How do you handle a downstream outage?

**Answer:** First determine whether the operation is safe to retry. Depending on the integration, use bounded retry/backoff, queueing, DLQ/quarantine, circuit-breaking patterns where applicable, alerting and reconciliation. Avoid duplicate business effects.

## Q36. What is the most important connector skill for production support?

**Answer:** Structured diagnosis. Do not immediately restart or retry. Identify the connector, operation, exact error, configuration changes, credentials/certificates, network, provider health, quotas, pool pressure and duplicate risk before choosing recovery.
