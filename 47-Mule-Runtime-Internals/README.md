# 47 — Mule Runtime Internals

Understand why Mule applications behave the way they do in development and production.

## Runtime model
- Mule event and message model
- Payload, attributes and variables
- Flow vs sub-flow vs private flow
- Scopes and execution boundaries
- Reactive/non-blocking execution concepts
- Scheduler and asynchronous processing
- Event propagation

## Memory and streaming
- Repeatable vs non-repeatable streams
- Cursor providers
- Streaming configuration
- Large-payload memory risks
- Heap and garbage collection fundamentals
- JVM sizing and diagnostics

## Reliability
- Transactions
- Transaction types and boundaries
- Redelivery and retries
- Until Successful
- Idempotency
- Object Store
- Persistent vs in-memory state

## Advanced execution
- Parallel processing
- Scatter-Gather internals and aggregation
- Batch architecture
- Async scope
- VM/event-driven patterns
- Timeouts and back-pressure concepts

## Troubleshooting labs
- CPU spike
- OutOfMemoryError
- thread/resource exhaustion
- slow downstream dependency
- stuck scheduler
- repeated message delivery
- stream-consumption failure

Each lab must document symptoms, evidence, root cause, fix, prevention and monitoring signals.
