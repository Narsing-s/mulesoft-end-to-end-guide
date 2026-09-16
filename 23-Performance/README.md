# MuleSoft Performance Guide

Performance means completing work within the expected time while using resources safely.

## First measure, then optimize
Capture latency, throughput, CPU, memory, downstream latency and error rate. Do not optimize based only on intuition.

## Common causes of slow applications
- Large payloads held in memory.
- Expensive DataWeave transformations.
- Sequential calls that could be independent.
- Small DB connection pools.
- Missing DB indexes.
- Slow downstream services.
- Excessive logging.
- Unbounded concurrency.
- Repeated remote calls that could be cached.
- Long synchronous workflows.

## DataWeave practices
- Select only required fields.
- Avoid repeated transformations.
- Prefer simple selectors and appropriate functions.
- Understand streaming behavior for large inputs.
- Do not materialize huge files unnecessarily.
- Test with realistic payload sizes.

## HTTP practices
Set sensible response and connection timeouts. Keep payloads small. Use compression where appropriate. Avoid making a client wait for work that can safely become asynchronous.

## Database practices
- Parameterize queries.
- Index search columns.
- Select required columns rather than `SELECT *` when appropriate.
- Configure a sensible connection pool.
- Keep transactions short.
- Avoid one DB call per item when a bulk operation is suitable.

## Concurrency
Parallel processing can improve latency for independent work but can also overload downstream systems. Always set concurrency according to dependency capacity.

## Production checklist
- Baseline before change.
- Change one major factor at a time.
- Compare p50/p95/p99 latency when available.
- Check error rate.
- Check CPU and memory.
- Check downstream timings.
- Check thread and connection utilization.
- Load test before high-risk production changes.
