# MuleSoft Studio — Core Components, Routers, Scopes & Processing Patterns

This chapter teaches the processing layer from first principles. Every concept is explained with purpose, execution model, diagram, configuration idea, example, failure behavior, production guidance and interview questions.

## 1. Big picture

```text
Mule Event
   |
Event Source
   |
Transform / Validate
   |
Router or Scope
   |
Connector / Business Logic
   |
Error Handler
   |
Response / Next Flow
```

A Mule application combines event sources, processors, routers/scopes, connectors and error handlers. The correct component depends on whether the requirement is selection, fan-out, iteration, retry, isolation, asynchronous work or reuse.

## 2. Decision table

| Requirement | Component | Main idea | Main caution |
|---|---|---|---|
| Pick one route | Choice | First matching condition | Order conditions carefully |
| Try alternatives | First Successful | Stop after first success | Alternatives must be safe |
| Call independent routes | Scatter-Gather | Fan-out and aggregate | Downstream capacity/timeouts |
| Process collection sequentially | For Each | One item after another | Large collections may be unsuitable |
| Process collection concurrently | Parallel For Each | Bounded concurrency | Memory and downstream limits |
| Process very large data | Batch | Record-oriented batch processing | Design failure/retry semantics |
| Retry a block | Until Successful | Re-execute after failure | Duplicate side effects |
| Isolate local errors | Try | Local error policy | Continue vs propagate decision |
| Run independent work | Async | Main flow does not wait | Caller cannot depend on result |
| Reuse flow logic | Flow Reference / Subflow | Centralize logic | Keep responsibilities clear |
| Cache repeated work | Cache Scope | Reuse results | Invalidation and TTL |
| Explicit failure | Raise Error | Controlled business/technical error | Use meaningful types |

## 3. Choice Router

### Theory
Choice evaluates conditions in order and executes the first matching route. Otherwise is the fallback path.

```text
Request
  |
Choice
 / | \
A  B  Otherwise
|  |     |
A  B   Reject/Default
```

Example:

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

Production rules: order conditions deliberately, normalize expensive values once, handle nulls, and provide an explicit fallback for unexpected input.

## 4. Scatter-Gather

Scatter-Gather invokes independent routes and combines their results.

```text
                 Input
                   |
             Scatter-Gather
             /      |      \
         Customer Orders  Loyalty
             \      |      /
              Aggregate
                  |
              Response
```

Use it when calls are independent and the response requires multiple sources. Set concurrency and timeout according to downstream capacity. Route-level Try scopes can convert expected failures into controlled results.

Example:

```xml
<scatter-gather timeout="10000" maxConcurrency="3">
  <route><http:request config-ref="CRM_HTTP" method="GET" path="/customer"/></route>
  <route><db:select config-ref="DB_CONFIG"><db:sql>SELECT * FROM orders WHERE customer_id = :id</db:sql></db:select></route>
  <route><http:request config-ref="LOYALTY_HTTP" method="GET" path="/loyalty"/></route>
</scatter-gather>
```

If a route fails without local handling, the aggregate operation can fail as a composite routing error. A timeout must be treated as an operational failure and monitored.

## 5. For Each

For Each processes a collection sequentially.

```text
[1,2,3,4]
   |
For Each
   |
1 -> 2 -> 3 -> 4
```

Use it when sequential processing is important or the dataset is manageable. Do not choose it blindly for huge datasets.

```xml
<foreach collection="#[payload.customers]">
  <http:request config-ref="CUSTOMER_API" method="POST" path="/customers"/>
</foreach>
```

## 6. Parallel For Each

Parallel For Each processes collection items concurrently with bounded concurrency.

```text
[1,2,3,4,5,6]
      |
Parallel For Each
 |  |  |  |  |  |
 1  2  3  4  5  6
      |
 aggregated results
```

Use it when items are independent. The safe concurrency value must consider downstream limits, database pool capacity, CPU, memory and provider quotas.

## 7. Batch

Batch is appropriate for large record-oriented workloads.

```text
File / DB / Scheduler
        |
     Batch Job
        |
 Validate → Transform → Process
        |
 success / failure records
        |
 reports / retry / reconciliation
```

Example: process 500,000 customer records without treating the entire dataset as one ordinary in-memory collection. Design record-level failure handling and recovery.

## 8. Until Successful

Until Successful retries the processors inside its scope until success or retry exhaustion.

```text
Operation
   |
Success? ── yes ──> Continue
   |
  no
   |
Delay → Retry → Retry limit
                 |
              exhausted
```

```xml
<until-successful maxRetries="3" millisBetweenRetries="2000">
  <http:request config-ref="PARTNER_API" method="POST" path="/orders"/>
</until-successful>
```

Critical rule: a retry can repeat side effects. Use idempotency, upsert semantics or a safe deduplication key before retrying a non-idempotent operation.

## 9. Try Scope

Try isolates a section of processing so it can have a local error policy.

```text
Flow
 |
Try
 |-- DB write
 |-- Partner call
 |
 +-- local error handler
 |
Continue / Propagate
```

Use it when one part of a flow needs different recovery behavior. Do not hide business failures with Continue merely to make the flow appear successful.

## 10. On Error Continue vs Propagate

```text
Error
 |
 +--> Continue   handled locally; parent can continue
 |
 +--> Propagate  failure remains visible to caller/parent
```

Use Continue only when the business outcome is genuinely handled. Use Propagate when the operation must be considered failed.

## 11. Async

Async starts independent work without making the main path wait for its result.

```text
Request
 |
 +---- Main response
 |
 +---- Async → audit / notification
```

Do not use Async when the caller needs the result or when the work must be tightly coupled to the main business transaction.

## 12. First Successful

First Successful is a fallback pattern.

```text
Primary
  |
 fails
  v
Secondary
  |
 fails
  v
Fallback
```

Use it for interchangeable providers, regions or sources. Do not confuse it with Scatter-Gather: one chooses alternatives; the other invokes multiple independent routes.

## 13. Round Robin

Round Robin distributes successive events among alternative routes.

```text
Event 1 → A
Event 2 → B
Event 3 → C
Event 4 → A
```

Use only when routes are operationally equivalent and each target can safely receive the assigned traffic.

## 14. Flow Reference vs Subflow

Flow Reference calls reusable flow logic. Subflow is useful for reusable processor sequences without needing an independently triggered flow.

```text
Main Flow
   |
   +--> reusable validation
   +--> reusable audit
   +--> reusable response mapping
```

Keep reusable logic cohesive. Avoid turning a flow into a maze of tiny references that make debugging difficult.

## 15. Cache Scope

Cache Scope avoids repeating expensive work for equivalent requests.

```text
Request
 |
Cache lookup
 /      \
hit      miss
 |         |
result   expensive work
             |
          store result
```

Define cache key, TTL/invalidation behavior and whether stale data is acceptable.

## 16. Transactions

A transaction groups compatible operations so commit/rollback behavior is explicit.

```text
Begin
  |
 DB operation
  |
 MQ operation
  |
 success? ---- yes → Commit
    |
    no
    ↓
 Rollback
```

Always identify the transaction boundary and which resources actually participate. Do not assume every connector operation is transactionally coupled.

## 17. Idempotency

Retries and duplicate delivery make idempotency essential.

```text
Request + Idempotency Key
          |
     Already processed?
       /          \
     yes           no
      |             |
 return saved    process once
 result             |
                 save key
```

Typical strategies include unique database constraints, idempotency tables, object-store keys and provider-supported idempotency keys.

## 18. Production decision framework

```text
One route?             → Choice
Multiple alternatives? → First Successful
All independent?       → Scatter-Gather
Small collection?      → For Each
Independent collection?→ Parallel For Each
Huge workload?         → Batch
Temporary failure?     → Until Successful + idempotency
Local recovery?        → Try
Independent side work? → Async
Reusable sequence?     → Flow Reference/Subflow
Repeat expensive work? → Cache
Atomic resource work?  → Transaction
Duplicate delivery?    → Idempotency
```

## 19. Failure checklist

When a router/scope fails, check:

1. What event entered the component?
2. What payload and attributes existed?
3. Which route/scope actually executed?
4. What condition or configuration selected it?
5. Did a downstream connector fail?
6. Was the failure handled locally?
7. Was retry safe?
8. Could the operation have executed twice?
9. Was a timeout or concurrency limit reached?
10. What correlation ID identifies the incident?
11. What recovery action is safe?
12. What test should prevent recurrence?

## Interview questions

**Q: Choice vs Scatter-Gather?**  Choice selects one route; Scatter-Gather invokes multiple routes and aggregates results.

**Q: For Each vs Parallel For Each?**  For Each is sequential; Parallel For Each introduces concurrency and therefore requires capacity and memory controls.

**Q: Why is retry dangerous for POST operations?**  A timeout can occur after the remote system commits the request, so retrying may create a duplicate unless the operation is idempotent.

**Q: When should Batch be preferred?**  For large record-oriented workloads where controlled processing and failure handling are more important than keeping a complete collection in an ordinary flow.

**Q: Continue or Propagate?**  Continue means the local handler considers the error handled; Propagate preserves failure semantics for the caller or parent handler.

## Definition of done

A component lesson is complete only when the learner can **explain → configure → build → test → intentionally break → diagnose → recover → secure → observe → answer interview questions** without needing a separate documentation page.