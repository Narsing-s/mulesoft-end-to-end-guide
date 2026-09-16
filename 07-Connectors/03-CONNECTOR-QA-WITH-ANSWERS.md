# MuleSoft Connector Interview Questions & Answers

This is an **answer-first interview handbook**. Every question has its answer immediately underneath it. Do not memorize one-line definitions; learn the reasoning, configuration, failure handling and production trade-offs.

## Q1. What is a MuleSoft connector?

### Answer
A MuleSoft connector is a reusable extension that allows a Mule application to communicate with an external application, database, protocol, messaging platform, or service. Connectors expose sources and/or operations so a flow can receive data from or send data to the target system.

For example, HTTP Request communicates with an HTTP API, Database Select communicates with a relational database, SFTP Read retrieves a file, and Salesforce Query retrieves CRM records.

A connector handles much of the low-level communication while DataWeave transforms the data before or after the connector operation.

## Q2. What is the difference between a connector source and a connector operation?

### Answer
A **source** starts a Mule flow. An **operation** executes an action inside an already-running flow.

```text
HTTP Listener                 <- source
       |
       v
DataWeave Transform
       |
       v
Database Select               <- operation
       |
       v
HTTP Response
```

HTTP Listener receives a request and therefore starts the flow. Database Select performs work after the event already exists.

## Q3. How do you add a connector in Anypoint Studio?

### Answer
Create/open the Mule project, use the Mule Palette's **Search in Exchange**, search for the connector, select it and add it to the project. Studio adds the required dependency and makes the operations available in the palette. Then configure a reusable global connection and the source/operation. MuleSoft documents this Exchange-to-Studio workflow. 

## Q4. Why do connectors have independent versions?

### Answer
In Mule 4, connectors and modules are application dependencies rather than all being bundled into the runtime. They therefore have independent release cycles, allowing an application to use a compatible connector version without waiting for a full Mule runtime release. Always record the Mule runtime, Java and connector versions tested together.

## Q5. What is a global connector configuration?

### Answer
A global configuration stores reusable connection information such as endpoint, authentication, TLS, timeout and connection settings. Multiple operations can reference it.

```xml
<http:request-config name="Customer_API_Config">
    <http:request-connection protocol="HTTPS" host="${customer.host}" port="443"/>
</http:request-config>
```

This avoids repeating connection details across operations.

## Q6. How should connector credentials be stored?

### Answer
Credentials must be externalized and protected. Never hard-code passwords, API secrets, private keys, tokens or production credentials in XML or source control. Use secure properties, an approved secret manager, deployment configuration, or platform identity/workload identity where supported.

## Q7. What should you configure for a production connector?

### Answer
Evaluate endpoint, authentication, TLS/certificates, timeout, reconnection, retry, pooling, transactions, pagination, batching, rate limits, idempotency, error handling, observability, MUnit tests, integration tests, secret rotation and an operational runbook. A connector is not production-ready merely because the happy path works.

## Q8. What is the HTTP Connector used for?

### Answer
HTTP Connector supports HTTP communication. HTTP Listener receives inbound requests and HTTP Request calls external HTTP endpoints.

```text
Client -> HTTP Listener -> Validate -> DataWeave -> HTTP Request -> External API
```

Study methods, paths, query/path parameters, headers, TLS, authentication, timeouts, status-code handling, retry and idempotency.

## Q9. How do you handle HTTP 401, 403, 404, 429 and 500?

### Answer
Treat them differently. **401** normally indicates authentication failure; **403** authorization failure; **404** missing/incorrect resource; **429** throttling/rate limiting; **500** downstream server failure. Retry only when the error and business operation make retry safe. Never apply one blind retry policy to every HTTP error.

## Q10. What is Database Connector?

### Answer
Database Connector provides relational database connectivity through supported JDBC drivers. Common operations include Select, Insert, Update, Delete, bulk operations and stored-procedure-related processing. Configure a reusable database connection and parameterized operation-specific SQL.

## Q11. Why should SQL parameters be used instead of string concatenation?

### Answer
Parameterized SQL separates SQL structure from values and helps prevent SQL injection. It also handles types more safely and makes queries maintainable.

```xml
<db:select config-ref="DB_Config">
    <db:sql><![CDATA[
        SELECT * FROM customer WHERE customer_id = :customerId
    ]]></db:sql>
    <db:input-parameters><![CDATA[#[{customerId: vars.customerId}]]]></db:input-parameters>
</db:select>
```

## Q12. What is connection pool exhaustion?

### Answer
It occurs when all available database connections are busy and new requests must wait or fail. Investigate application concurrency, slow queries, long transactions, pool sizing, database capacity and connection lifecycle. Increasing the pool blindly can overload the database.

## Q13. What is File Connector used for?

### Answer
File Connector accesses files on a filesystem available to the Mule runtime. Typical operations include read, write, list, move, copy and delete. Production designs must handle file readiness, partial files, duplicate processing, permissions, archive/reject paths and disk capacity.

## Q14. What is the difference between File, FTP and SFTP?

### Answer
**File** works with an accessible filesystem. **FTP** communicates using FTP. **SFTP** transfers files over SSH. They solve different connectivity requirements. For secure remote partner transfer, SFTP is commonly preferred when supported by the partner.

## Q15. How do you prevent a Mule application from reading a partially uploaded file?

### Answer
Use a producer/consumer convention such as uploading to a temporary filename and renaming only after completion, or use the connector's supported file-readiness mechanism. Also use stable naming, archive successful files and quarantine failures.

## Q16. What is SFTP Connector?

### Answer
SFTP Connector provides secure file transfer over SSH. Typical configuration includes host, port, username, authentication method, working directory, timeout and security settings. Production concerns include private-key protection, host verification, partner availability, duplicate files, archive strategy, large files and retry behavior.

## Q17. What is JMS Connector?

### Answer
JMS Connector enables communication with JMS-compatible messaging infrastructure using queues and topics.

```text
Producer -> Queue -> Consumer
Publisher -> Topic -> Subscriber A
                   -> Subscriber B
```

Define acknowledgement, redelivery, correlation, transaction behavior, duplicate handling and dead-letter strategy.

## Q18. What is IBM MQ Connector?

### Answer
IBM MQ Connector integrates Mule with IBM MQ. Know queue manager, queue, channel, message ID, correlation ID, Put/Get, TLS, authorization and transaction concepts. Troubleshooting should distinguish Mule problems from MQ queue, channel, security, network and queue-manager problems.

## Q19. What is Anypoint MQ Connector?

### Answer
Anypoint MQ Connector integrates Mule applications with managed Anypoint MQ messaging. Study client credentials, queues/destinations, publishing, consuming, acknowledgement, retry/redelivery, visibility/locking behavior where applicable, dead-letter handling and idempotency.

## Q20. What is Salesforce Connector?

### Answer
Salesforce Connector integrates Mule applications with Salesforce. Study query, create, update, delete, upsert and bulk/event capabilities supported by the selected connector version. Production designs must consider Salesforce API limits, permissions, pagination, bulk processing, duplicate rules, partial failures and retry safety.

## Q21. What is the difference between retry and reconnection?

### Answer
**Reconnection** restores a connector connection after a connection-level failure. **Retry** repeats an operation.

```text
Connection failure -> reconnect -> connection restored
Operation timeout -> classify -> retry if safe
```

Retry can duplicate a business action if the first attempt actually succeeded but the response was lost.

## Q22. Why is idempotency important for connectors?

### Answer
Idempotency prevents repeated processing from creating unintended repeated business effects. For example, if a payment request times out, Mule may not know whether the payment was completed. Retrying without an idempotency key can create a duplicate.

## Q23. What should you test for a connector in MUnit?

### Answer
Test success, empty response, invalid response, connectivity failure, timeout, authentication failure, authorization failure, rate limiting, downstream 5xx, malformed input, duplicate processing and response transformation. Mock external calls when the unit test is intended to validate Mule flow logic rather than the external system.

## Q24. How do you troubleshoot a connector failure in production?

### Answer
Use evidence rather than immediately restarting.

```text
Timestamp -> Correlation ID -> App/environment -> Flow/operation
       -> Connector error -> Recent change -> Credentials/certificates
       -> DNS/network/TLS -> Downstream health -> Rate/pool/thread limits
       -> Payload/business validation -> Safe recovery -> RCA/prevention
```

## Q25. How do connector versions relate to Mule runtime versions?

### Answer
Connectors have their own versions and compatibility requirements. The project must use connector/module versions compatible with its Mule runtime and Java version. Studio adds dependencies and schemas based on the project's dependencies.

## Q26. What is connector metadata?

### Answer
Metadata describes the structure/type of data expected or returned by an operation. It helps Studio and DataWeave provide better field information, autocomplete and transformation guidance.

## Q27. How do you choose between HTTP, DB, MQ and SFTP?

### Answer
Choose according to the business interaction:

- **HTTP:** synchronous API request/response.
- **DB:** relational data access when direct DB integration is appropriate.
- **MQ:** asynchronous messaging and decoupling.
- **SFTP:** batch/file exchange with partners or legacy systems.

Then evaluate security, latency, volume, reliability, ownership, transaction requirements, retry safety and downstream capabilities.

## Q28. How do you explain connector configuration in an interview?

### Answer
Say: "First I identify the target system and protocol. I add the appropriate connector through Exchange/Studio, create a reusable global configuration, externalize environment-specific properties, secure credentials, configure TLS when required, set timeouts and reconnection, and configure the operation. I validate the payload with DataWeave, classify connector errors, design retry/idempotency according to business semantics, test success and failures with MUnit, and verify observability and recovery in the target environment."

## Q29. Why should you not hard-code connector settings?

### Answer
Development, QA and production normally use different endpoints, credentials and settings. Hard-coding increases deployment risk and can expose secrets. Externalized configuration lets the same artifact move across environments with environment-specific values.

## Q30. What is the most important connector skill for a MuleSoft developer?

### Answer
It is not memorizing XML tags. It is reasoning from requirement to protocol, connector, authentication, configuration, transformation, business operation, error classification, retry/idempotency, testing, security, observability, deployment and production support.

# Scenario Questions With Answers

## Q31. SFTP files are being processed twice. What do you investigate?

### Answer
Check multiple workers/replicas polling the same location, archive/move behavior, retry rereads, partner duplicate names and missing idempotency. Fix the actual cause rather than simply deleting duplicates.

## Q32. Database calls suddenly become slow. What do you check?

### Answer
Check query execution time, indexes/query plan, connection pool utilization, database CPU/memory, locks/deadlocks, transaction duration, network latency and application concurrency. Compare against the normal baseline.

## Q33. MQ messages are repeatedly redelivered. What do you investigate?

### Answer
Check acknowledgement behavior, transaction rollback, consumer exceptions, poison messages, timeout/visibility behavior where applicable, downstream failures and DLQ configuration. Determine whether the message fails deterministically.

## Q34. Salesforce calls return throttling errors. What do you do?

### Answer
Measure traffic, identify expensive operations, inspect Salesforce limits, reduce unnecessary calls, batch where appropriate, use controlled backoff, and redesign high-volume processing when necessary. Do not turn throttling into an infinite retry loop.

## Q35. HTTP Request times out but the downstream team says the request was received. Should Mule retry?

### Answer
Not automatically. Determine whether the operation is idempotent or supports an idempotency key. The downstream system may have completed the operation while the response was lost. Blind retry could duplicate the business action.

## Q36. Production SFTP authentication suddenly fails after months of success. What do you check?

### Answer
Check password/key rotation, account expiry, certificate/key validity, server authentication changes, host-key/security changes, network connectivity, permissions and recent configuration changes. Compare the failure timestamp with security or credential rotation events.

## Q37. A connector works locally but fails in CloudHub. What do you compare?

### Answer
Compare environment properties, secrets, DNS/network accessibility, firewall/private-network routing, TLS trust, certificates, proxy requirements, connector version, Java/runtime version and target allowlists. Local connectivity does not prove cloud connectivity.

## Q38. Why should every connector chapter include a production example?

### Answer
Because connector knowledge is operational, not merely syntactic. A developer who can configure HTTP but cannot diagnose timeout, rate limit, TLS or duplicate-processing failures is not prepared for production ownership.

# Final interview rule

For a 3–5 year MuleSoft role, answer at three levels:

**Developer:** configuration + operation + DataWeave.

**Production:** timeout + error handling + retry + security + observability.

**Engineer:** architecture + capacity + idempotency + transaction semantics + failure recovery + trade-offs.

The repository should therefore teach every connector through the same progression: **understand → configure → implement → transform → test → fail deliberately → troubleshoot → secure → operate → explain in an interview.**
