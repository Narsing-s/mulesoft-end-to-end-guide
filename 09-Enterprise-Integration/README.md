# 09 — Enterprise Integration Patterns

## Choice
Select one route based on a condition.

```text
Request -> Choice -> rule A / rule B / default
```

## For Each
Processes each item in a collection. Understand how the current payload changes inside the scope and how to collect results.

## Parallel For Each
Processes collection items concurrently. Use only when the operation is safe for concurrent execution and the downstream system can handle the load.

## Scatter-Gather
Sends work to multiple routes and combines their results. Good for independent calls that can run in parallel.

Example:

```text
             +-> Customer API --+
Request -----+-> Account API ----+-> combined response
             +-> Rewards API ---+
```

## Async
Starts asynchronous processing so the caller does not have to wait for the asynchronous work to complete. Design carefully around error visibility and delivery guarantees.

## Until Successful
Retries processing until it succeeds or retry limits are reached. Understand when repeating the operation is safe.

## Batch
Batch is designed for processing large datasets in records/steps and is useful for scheduled or bulk workloads. Learn batch jobs, block/step processing, aggregation and failure handling.

## Streaming
Streaming avoids loading an entire large dataset into memory when the source/operation supports streaming semantics. Learn repeatable vs non-repeatable streams and downstream implications.

## Routing decision exercise
For a banking reconciliation job, decide where to use Choice, For Each, Scatter-Gather, Async and Batch. Document why each choice is safe.

## Advanced concern: concurrency
More parallelism does not automatically mean better performance. It can increase database connections, memory use, external API throttling and contention.
