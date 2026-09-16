# MuleSoft Anypoint Studio — Core Components, Routers, Scopes & Processing Patterns

> Practical handbook for Mule 4 developers: what to use, when to use it, configuration, examples, failure behavior, production guidance, and interview questions.

## 1. Big picture

Mule applications are built from **event sources + processors + routers/scopes + connectors + error handlers**. Core processors run on Mule Runtime; routers decide how an event moves through one or more processing paths. MuleSoft documents Choice, First Successful, Round Robin and Scatter-Gather as flow-control routers, and For Each, Parallel For Each, Try, Until Successful and Batch as important scopes/components. citeturn0search3turn0search7

```text
                    Mule Event
                        |
                 +------+------+
                 | Event Source |
                 | HTTP/SFTP/MQ |
                 +------+------+
                        |
                 +------v------+
                 | Transform   |
                 | DataWeave   |
                 +------+------+
                        |
        +---------------+----------------+
        |               |                |
      Choice       Scatter-Gather    For Each
   one route       many routes       each item
        |               |                |
   Connector(s)   Connector(s)     Connector(s)
        |               |                |
        +---------------+----------------+
                        |
                 Error Handler
                        |
             On Error Continue/Propagate
```

## 2. Decision table — choose the right component

| Requirement | Component | Execution model | Main caution |
|---|---|---|---|
| Pick exactly one route from conditions | Choice | First matching route | Conditions must be ordered |
| Try independent alternatives until one succeeds | First Successful | Sequential alternatives | Alternatives should be safe to retry |
| Send same event to every independent route | Scatter-Gather | Parallel by default | Aggregates route results; failures become composite routing errors |
| Process a collection one item at a time | For Each | Sequential | Stops on an unhandled iteration error |
| Process collection concurrently | Parallel For Each | Parallel, bounded by max concurrency | Buffers results; large collections may require Batch |
| Process very large record sets | Batch Job | Batch-oriented | Design record-level failure/retry deliberately |
| Retry a block synchronously | Until Successful | Sequential retries | Retries the entire scope; avoid duplicate side effects |
| Isolate local error handling | Try | Same flow, local handler | Decide continue vs propagate |
| Run work asynchronously | Async | Separate execution path | Not suitable when caller needs result immediately |
| Repeat processing with a delay/condition | Until Successful | Synchronous retries | Configure finite retries and delay |
| Cache repeated computation | Cache Scope | Reuses cached results | Cache invalidation/TTL matters |
| Reuse common processors | Flow Reference/Subflow | Reusable sequence | Keep responsibilities clear |
| Stop processing with a controlled error | Raise Error | Explicit failure | Use meaningful custom error types |

MuleSoft's current component reference includes Async, Batch Job, Choice, Error Handler, First Successful, For Each, Parallel For Each, Scatter-Gather, Scheduler, Subflow, Transaction, Transform, Try and Until Successful. citeturn0search3

---

# 3. Choice Router

## What it does

Choice evaluates DataWeave expressions in order. **Only the first route whose expression is true executes**; otherwise the default route executes. citeturn0search9

### Diagram

```text
                    Request
                       |
                    Choice
                  /    |     \
             when A  when B  otherwise
                |       |        |
             Route A  Route B  Reject/Default
```

### Studio configuration

1. Drag **Choice** into the flow.
2. Add one or more **When** routes.
3. Put a DataWeave expression in each When.
4. Add processors inside each route.
5. Configure **Otherwise** for unmatched input.

Example conditions:

```text
#[payload.status == 'ACTIVE']
#[payload.country == 'IN']
#[attributes.queryParams.type == 'premium']
```

### XML pattern

```xml
<choice doc:name="Route Customer">
    <when expression="#[payload.status == 'ACTIVE']">
        <logger message="Active customer"/>
    </when>
    <when expression="#[payload.status == 'INACTIVE']">
        <logger message="Inactive customer"/>
    </when>
    <otherwise>
        <raise-error type="APP:INVALID_STATUS" description="Unsupported status"/>
    </otherwise>
</choice>
```

### Production rules

- Put the most specific/high-value conditions before broad conditions.
- Always consider an explicit default path.
- Do not perform expensive DataWeave repeatedly in every condition; normalize once when appropriate.
- Validate null/missing fields before dereferencing.
- Keep route names descriptive.

### Example

Input:

```json
{"customerId":"C100","status":"ACTIVE"}
```

Output from the active route:

```json
{"customerId":"C100","action":"PROCESS"}
```

### Interview Q&A

**Q: Does Choice execute multiple matching routes?**

**Answer:** No. The first expression that evaluates to true is selected; later conditions are not evaluated for routing. citeturn0search9

---

# 4. Scatter-Gather

## What it does

Scatter-Gather sends the event to multiple routes concurrently, waits for route completion, and combines the resulting Mule events. MuleSoft documents `maxConcurrency`, `timeout`, `target`, and `targetValue` for configuration. citeturn0search4turn0search12

### Best use cases

- Call Customer API + Orders API + Loyalty API independently.
- Gather multiple data sources into one response.
- Execute independent enrichment calls concurrently.

### Diagram

```text
                         Input
                           |
                    + Scatter-Gather +
                    |       |       |
                  Route 1 Route 2 Route 3
                    |       |       |
                 CRM API Orders DB Loyalty
                    |       |       |
                    +-------+-------+
                            |
                       Aggregated result
```

### Studio configuration

Set:

- Routes
- Timeout when appropriate
- Max concurrency when downstream capacity is limited
- Target/Target Value when you want to preserve the original payload and store results in a variable

### XML pattern

```xml
<scatter-gather doc:name="Get Enrichment" timeout="10000" maxConcurrency="3">
    <route>
        <http:request config-ref="CRM_HTTP" method="GET" path="/customer"/>
    </route>
    <route>
        <db:select config-ref="DB_CONFIG">
            <db:sql>SELECT * FROM orders WHERE customer_id = :id</db:sql>
        </db:select>
    </route>
    <route>
        <http:request config-ref="LOYALTY_HTTP" method="GET" path="/loyalty"/>
    </route>
</scatter-gather>
```

### Important error behavior

If a route fails without handling its error locally, Scatter-Gather can raise `MULE:COMPOSITE_ROUTING`. Route-level `Try` scopes can convert expected failures into controlled route results. A timeout can result in `MULE:TIMEOUT`. citeturn0search4turn0search12

### Safe partial-response pattern

```text
Route A -> success
Route B -> Try -> on-error-continue -> {status:"UNAVAILABLE"}
Route C -> success
                    |
                aggregate
```

### Transaction warning

Inside a transaction, Scatter-Gather does not execute routes in parallel; transaction rules can change the execution model. citeturn0search11

### Interview Q&A

**Q: Scatter-Gather vs Choice?**

**Answer:** Choice selects one route based on conditions. Scatter-Gather invokes multiple routes and aggregates their results.

---

# 5. For Each

For Each processes a collection sequentially. Each iteration receives the current item as payload. It can also partition a collection with `batchSize`. citeturn0search6

### Diagram

```text
[record1, record2, record3]
          |
       For Each
      /    |    \
    r1    r2    r3
   seq -> seq -> seq
```

### XML pattern

```xml
<foreach collection="#[payload.customers]" batchSize="1">
    <http:request config-ref="CUSTOMER_API" method="POST" path="/customers"/>
</foreach>
```

### Batch size

For 200 records and `batchSize=50`, Mule processes four groups of 50. citeturn0search6

### When to use

Use For Each when ordering and sequential processing matter, or when each item depends on state produced by earlier iterations.

### Common mistake

Do not use For Each for a huge collection merely because it is easy. Consider Batch Processing for large workloads.

---

# 6. Parallel For Each

Parallel For Each splits a collection and processes items concurrently, with a configurable `maxConcurrency` and timeout. Results are aggregated in the original order. citeturn0search2turn0search5

### Diagram

```text
[1,2,3,4,5,6]
      |
 Parallel For Each
  |  |  |  |  |  |
  1  2  3  4  5  6
  |  |  |  |  |  |
  +--+--+--+--+--+
          |
      [r1,r2,r3,r4,r5,r6]
```

### XML pattern

```xml
<parallel-foreach collection="#[payload.items]"
                  maxConcurrency="10"
                  timeout="30000">
    <http:request config-ref="API_CONFIG" method="POST" path="/items"/>
</parallel-foreach>
```

### Critical production warning

Parallel For Each buffers route results. MuleSoft warns that very large collections can cause out-of-memory problems; use Batch Processing for large payloads. citeturn0search2turn0search5

### Concurrency calculation

Do not automatically set max concurrency to a large number. Consider:

```text
maxConcurrency <= downstream safe capacity
                   AND
                DB pool size
                   AND
             provider rate limit
```

### Error behavior

All parallel routes continue until they finish; errors are aggregated and may result in `MULE:COMPOSITE_ROUTING`. citeturn0search2

---

# 7. Batch Processing

Batch is the preferred pattern when a large dataset must be processed record-by-record in a controlled, batch-oriented job. The Core Components reference exposes Batch Job as a core component. citeturn0search3

### Architecture

```text
Scheduler/File/SFTP
       |
   Load records
       |
    Batch Job
       |
   +---+---+
   | Process |
   | records |
   +---+---+
       |
  success/failure
       |
 reports/alerts/DLQ
```

### Example business case

```text
Nightly CSV with 500,000 customers
       |
Read CSV
       |
Batch Job
       |
Validate -> enrich -> DB upsert
       |
failed records -> failure report
```

### When Batch is better than Parallel For Each

- Very large input.
- Long-running processing.
- Need controlled record-level processing.
- Need batch-oriented success/failure reporting.

### Interview Q&A

**Q: Why not Parallel For Each for millions of records?**

**Answer:** Parallel For Each buffers results, so large collections can create memory pressure. MuleSoft recommends Batch Processing for large payloads. citeturn0search2

---

# 8. Until Successful — retry mechanism

Until Successful synchronously retries processors until success or retry exhaustion. MuleSoft documents that if a processor fails, the scope retries the processors in the scope and ultimately raises `MULE:RETRY_EXHAUSTED` when retries are exhausted. citeturn0search0turn0search1

### Diagram

```text
        Operation
           |
        success? ---- yes ---> continue
           |
          no
           |
        wait delay
           |
       retry count
       /        \
    remaining   exhausted
       |            |
     retry     RETRY_EXHAUSTED
```

### Configuration concepts

- Maximum retries
- Retry delay
- Processors inside the scope
- Error handling after exhaustion

### XML pattern

```xml
<until-successful maxRetries="3" millisBetweenRetries="2000">
    <http:request config-ref="PARTNER_API" method="POST" path="/orders"/>
</until-successful>
```

### The most important warning

If the block contains multiple processors, a retry reruns the processors in the block. Therefore, **do not put non-idempotent side effects before a retryable operation unless duplicate execution is safe**. MuleSoft explicitly notes that the scope retries the processors inside it. citeturn0search0

### Good

```text
Prepare request
     |
Until Successful
     |
POST idempotent/upsert operation
```

### Risky

```text
Create payment
     |
Send email
     |
Until Successful
```

A retry could repeat both operations depending on the failure point.

---

# 9. Try Scope

Try isolates a group of processors and lets you attach local error handling. It also supports transactions. citeturn0search10

### Pattern

```text
Flow
 |
Try
 |--- DB write
 |--- HTTP notification
 |
 +-- On Error Continue/Propagate
 |
Continue flow
```

### Example

```xml
<try doc:name="Partner Call">
    <http:request config-ref="PARTNER_API" method="POST" path="/orders"/>
    <error-handler>
        <on-error-continue type="HTTP:TIMEOUT">
            <logger message="Partner timeout; fallback created"/>
        </on-error-continue>
    </error-handler>
</try>
```

### When to use

Use Try when only one part of a flow needs a different error policy.

---

# 10. On Error Continue vs On Error Propagate

```text
ERROR
 |
 +--> On Error Continue
 |       handled; parent flow can continue
 |
 +--> On Error Propagate
         error remains visible to caller/parent handler
```

### Practical rule

Use **Continue** only when the business outcome really is considered handled. Use **Propagate** when the transaction/business operation must be considered failed.

Example:

```text
Optional notification fails -> Continue with warning
Payment persistence fails   -> Propagate
```

---

# 11. Async Scope

Use Async when work can happen independently and the caller does not need its result before the main path continues.

```text
Request
  |
  +------ Main response path
  |
  +------ Async -> audit/log/notification
```

### Do not use Async when

- Caller requires the result.
- Work must be transactionally coupled to the main path.
- You need deterministic ordering with the main flow.

MuleSoft documents Async as a core component and notes transaction implications for asynchronous execution. citeturn0search3turn0search11

---

# 12. First Successful

Use First Successful when you have ordered alternatives and want the first route that succeeds.

```text
Primary API
    |
 fails
    v
Secondary API
    |
 fails
    v
Fallback API
    |
 success -> continue
```

Typical examples:

- Primary service then backup service.
- Region A then Region B.
- Cached source then live source.

Do not confuse it with Scatter-Gather: First Successful is an **alternative/fallback** pattern; Scatter-Gather is a **fan-out and aggregate** pattern.

---

# 13. Round Robin

Round Robin is useful when work should be distributed among alternative routes rather than all routes being executed for every event.

```text
Event 1 -> Route A
Event 2 -> Route B
Event 3 -> Route C
Event 4 -> Route A
```

Good use cases include distributing requests across equivalent downstream targets. Ensure every route is genuinely interchangeable before using this pattern.

---

# 14. Flow Reference vs Subflow

## Flow Reference

Use Flow Reference to call reusable flow logic and preserve normal flow behavior/error handling according to the referenced flow.

```text
Flow A -> Flow Reference -> Flow B
                         -> processors
                         -> error handling
```

## Subflow

Use a Subflow for a reusable sequence of processors that is called from flows.

```text
sub-flow: common-validation
   -> log
   -> transform
   -> validate
```

### Design rule

Create reusable units around business capabilities, not around arbitrary groups of five processors.

---

# 15. Transform Message / DataWeave boundary

Transform Message is the normal boundary for converting payloads, variables, or attributes between systems.

```text
HTTP JSON
   |
Transform Message
   |
DB/SOAP/SFTP shape
```

Example:

```dw
%dw 2.0
output application/json
---
{
  customerId: payload.id,
  name: payload.name,
  active: payload.status == "ACTIVE"
}
```

### Best practice

Keep connector-specific mapping near the integration boundary. Keep business rules readable and testable.

---

# 16. Set Payload / Set Variable / Remove Variable

### Set Payload
Replaces the current payload.

```text
Set Payload -> #[{status: "OK"}]
```

### Set Variable
Stores event-scoped data without replacing the payload.

```text
Set Variable
name: customerId
value: #[payload.id]
```

### Remove Variable
Removes a variable that is no longer needed.

Production tip: avoid storing huge payloads in multiple variables because it increases memory usage and makes debugging harder.

---

# 17. Raise Error

Use Raise Error for explicit business/validation failures.

```xml
<raise-error type="APP:VALIDATION" description="Customer ID is required"/>
```

Good pattern:

```text
Validate input
   |
invalid -> APP:VALIDATION
   |
Error Handler
   |
standard error response
```

---

# 18. Scheduler

Scheduler is useful for periodic jobs.

```text
Scheduler
   |
Read SFTP
   |
Validate
   |
Process
   |
Report
```

Production checklist:

- Avoid overlapping executions when not safe.
- Make processing idempotent.
- Record last successful run.
- Alert on repeated failures.
- Consider timezone explicitly.

---

# 19. Cache Scope

Cache Scope can prevent repeated expensive processing for equivalent requests.

```text
Request -> Cache Scope -> expensive API/DB call
                 |
          cached result
```

Use only when cached data is acceptable. Define TTL/invalidation expectations and avoid caching secrets or user-specific data incorrectly.

---

# 20. Idempotent Message Validator

Use idempotency when duplicate messages are possible.

```text
Message ID
   |
Already processed?
  / \
Yes  No
 |    |
skip process
      |
    process
```

Typical keys:

```text
#[attributes.headers.'x-message-id']
#[payload.orderId]
```

The key must represent the business event uniquely enough for the required retention period.

---

# 21. Transaction

Transactions are appropriate when participating resources and connector capabilities support the required transactional behavior.

```text
Begin transaction
      |
  DB operation
      |
  MQ operation
      |
 success -> commit
 failure -> rollback where supported
```

Do not assume that adding a Transaction makes unrelated HTTP/SaaS calls atomic. Understand connector transaction support and scope/thread rules. MuleSoft documents that transactions can change behavior of Async, Parallel For Each, Batch and Scatter-Gather. citeturn0search11

---

# 22. Error Handler master pattern

```text
                       Flow
                        |
                  Try/Connector
                        |
                      ERROR
                        |
             +----------+----------+
             |                     |
       expected/recoverable   business failure
             |                     |
       On Error Continue     On Error Propagate
             |                     |
       fallback/response       caller/error flow
```

Always classify errors:

1. Validation error
2. Authentication/authorization
3. Connectivity
4. Timeout
5. Rate limit
6. Data/schema
7. Duplicate/idempotency
8. Downstream business error
9. Unknown/unexpected

---

# 23. Connector + router combinations

## HTTP -> Choice -> DB/SFTP

```text
HTTP Listener
     |
 Validate
     |
 Choice
 /       \
create   update
 |         |
DB        DB
```

## HTTP -> Scatter-Gather -> aggregate

```text
HTTP
 |
Scatter-Gather
 |      |      |
CRM    Orders  Loyalty
 |      |      |
 +------+------+
        |
   DataWeave
        |
    response
```

## SFTP -> Batch -> DB + error report

```text
SFTP Read
   |
Batch Job
   |
validate/map/upsert
   |
+--+--+
|     |
success failure
          |
       error CSV
```

## MQ -> Try -> Until Successful -> HTTP

```text
MQ Listener
    |
Try
    |
Until Successful
    |
Partner HTTP
    |
 success/failure handler
```

## Collection -> Parallel For Each -> API

```text
Collection
    |
Parallel For Each
    |
maxConcurrency=5
    |
API calls
    |
ordered result list
```

---

# 24. Retry mechanism — choose correctly

| Mechanism | Best for | Avoid when |
|---|---|---|
| Connector reconnection | Establishing/re-establishing connection | Business operation itself is failing |
| Until Successful | Retrying a synchronous processor block | Block contains non-idempotent repeated side effects |
| First Successful | Trying alternative endpoints/routes | All alternatives have side effects |
| Batch retry/error handling | Record-oriented bulk processing | A single atomic transaction is required for all records |
| MQ redelivery/DLQ | Message processing failure | Poison messages can loop forever without a limit |
| HTTP client retry policy | Transient network/provider conditions | POST side effects are not idempotent and response is unknown |

Golden rule:

> Retry **transient failures**, not validation/business failures.

Examples:

```text
400/validation -> do not blindly retry
401 -> fix credentials/token
403 -> fix authorization
404 -> verify resource/path
429 -> respect provider rate limit/backoff
5xx -> potentially retry if operation is safe
network timeout -> potentially retry if operation is idempotent
```

---

# 25. Connector configuration standard

Every important connector chapter in this repository should answer:

```text
1. What is the connector?
2. Why use it?
3. When should I use it?
4. Source or operation?
5. How to install from Exchange?
6. Dependency/version?
7. Global configuration?
8. Authentication?
9. TLS/mTLS?
10. Proxy/network?
11. Timeout?
12. Reconnection?
13. Operations?
14. DataWeave input/output?
15. Error types?
16. Retry strategy?
17. Idempotency?
18. Transactions?
19. Pagination?
20. Batch/streaming?
21. Rate limits?
22. MUnit test?
23. Monitoring/logging?
24. Troubleshooting?
25. Production checklist?
26. Interview questions?
```

This matches the deeper connector implementation standard already used in `06-CONNECTOR-IMPLEMENTATION-STANDARD.md`.

---

# 26. Production-ready checklist

Before calling a flow complete:

- [ ] Requirement and business outcome are documented.
- [ ] Correct connector selected.
- [ ] Connector version is compatible with runtime.
- [ ] Credentials are externalized.
- [ ] No passwords/tokens are hard-coded.
- [ ] TLS/certificates are validated.
- [ ] Timeout is intentional.
- [ ] Reconnection is configured where useful.
- [ ] Retry is bounded and only for transient failures.
- [ ] Side effects are idempotent or duplicate-safe.
- [ ] Rate limits are respected.
- [ ] Pagination/batching is used for large datasets.
- [ ] Parallelism is bounded by downstream capacity.
- [ ] Errors are classified.
- [ ] Error response is standardized.
- [ ] Correlation IDs are logged.
- [ ] Sensitive values are masked.
- [ ] MUnit tests cover success and failure.
- [ ] Production runbook exists.
- [ ] Dashboard/alerts exist for important integrations.

---

# 27. Interview master questions

### Q1. For Each vs Parallel For Each?
**Answer:** For Each processes sequentially. Parallel For Each processes collection elements concurrently and aggregates results; concurrency can be bounded with `maxConcurrency`. Parallel For Each can create memory pressure for large collections, so Batch is preferable for large workloads. citeturn0search2turn0search6

### Q2. Choice vs Scatter-Gather?
**Answer:** Choice selects one route. Scatter-Gather executes multiple routes and combines their results.

### Q3. Until Successful vs connector reconnection?
**Answer:** Reconnection concerns restoring a connector connection. Until Successful reruns processors in its scope after a failure. They solve different problems. citeturn0search0

### Q4. What happens if Scatter-Gather route fails?
**Answer:** If the route failure is not handled locally, Scatter-Gather can raise a composite routing error. Route-level Try/error handling can convert expected failures into controlled results. citeturn0search4

### Q5. Why limit maxConcurrency?
**Answer:** Because Mule concurrency can otherwise exceed downstream API limits, DB pool capacity, CPU/memory capacity, or partner throttling limits.

### Q6. When should you use Batch?
**Answer:** For large record-oriented workloads where controlled batch processing is preferable to holding and aggregating a very large in-memory collection.

### Q7. What is the biggest retry mistake?
**Answer:** Retrying non-idempotent side effects without a duplicate-prevention strategy.

### Q8. Why use Try inside Scatter-Gather?
**Answer:** To make an expected route failure a controlled route result so other routes can still contribute to the aggregate when that business behavior is acceptable. citeturn0search4

### Q9. Does transaction guarantee parallel execution?
**Answer:** No. Transaction rules can change execution behavior; MuleSoft documents that Scatter-Gather and Parallel For Each do not execute in parallel when running within a transaction. citeturn0search11

### Q10. How do you make an integration production-ready?
**Answer:** Externalize configuration and secrets, secure connections, define timeout/reconnection/retry behavior, make side effects duplicate-safe, bound concurrency, handle errors explicitly, test with MUnit, add observability, and document operational recovery.

---

# 28. Study order

```text
1. Transform Message / DataWeave
2. Choice
3. For Each
4. Try + Error Handler
5. Flow Reference / Subflow
6. Until Successful
7. Scatter-Gather
8. Parallel For Each
9. First Successful
10. Async
11. Batch
12. Transactions
13. Idempotency
14. Cache
15. Production retry patterns
16. Connector-specific implementation
```

After this chapter, study the connector-specific files in this directory and complete the hands-on labs in `07-CONNECTOR-HANDS-ON-LABS.md`.

## Official documentation references

- MuleSoft core components: https://docs.mulesoft.com/anypoint-code-builder/ref-components
- Choice Router: https://docs.mulesoft.com/mule-runtime/4.4/choice-router-concept
- Scatter-Gather: https://docs.mulesoft.com/mule-runtime/4.3/scatter-gather-concept
- For Each: https://docs.mulesoft.com/mule-runtime/4.9/for-each-scope-concept
- Parallel For Each: https://docs.mulesoft.com/mule-runtime/4.9/parallel-foreach-scope
- Until Successful: https://docs.mulesoft.com/anypoint-code-builder/acb-component-until-successful
- Try Scope: https://docs.mulesoft.com/anypoint-code-builder/acb-component-try
- Transaction Management: https://docs.mulesoft.com/mule-runtime/4.9/transaction-management

> Documentation fields and connector operations can vary by connector/version. Use Anypoint Exchange and the current connector reference for exact version-specific configuration rather than assuming that every connector exposes the same fields.