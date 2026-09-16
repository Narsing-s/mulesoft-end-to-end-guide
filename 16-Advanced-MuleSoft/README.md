# 16 — Advanced MuleSoft

## Resilience
A resilient integration expects dependency failures and has controlled timeouts, retries, fallbacks or asynchronous processing where appropriate.

## Idempotency
An idempotent operation can safely receive the same logical request more than once without creating an unintended duplicate effect. This is critical for payment-like operations.

Example approach:

```text
Request contains idempotency key
        |
        v
Check durable store
  |          |
known      new
  |          |
return     process
result     and save result
```

## Retry and backoff
Retry transient failures with bounded attempts and appropriate delay. Do not retry permanent validation errors. Do not retry non-idempotent side effects blindly.

## Caching
Caching can reduce repeated calls but introduces freshness and invalidation concerns. Cache only data for which stale values are acceptable.

## Concurrency
Parallel processing can improve throughput but consumes more CPU, memory, connections and downstream capacity.

## Back-pressure
Back-pressure means preventing producers from overwhelming consumers. Messaging, controlled concurrency and bounded resources are common architectural tools.

## Memory management
Large payloads can create memory pressure. Use streaming where supported and avoid unnecessary copies/transforms.

## Batch
Use batch processing for suitable large datasets. Design restart/recovery behavior and record-level failure handling.

## Transactions
Understand transactional boundaries and the difference between local and distributed transaction coordination.

## Performance tuning
Measure latency, throughput, error rate and resource use before making changes. Tune one bottleneck at a time and retest under realistic load.

## Advanced design exercise
Design a payment workflow that handles timeout, duplicate submission, downstream outage and notification failure while preserving a clear transaction state.
