# MuleSoft Glossary and Common Confusions

This chapter exists to remove terminology confusion before learners move into advanced topics.

## API vs flow

An API is an interface or contract exposed to consumers. A flow is an implementation sequence inside a Mule application. One API can have multiple implementation flows.

## Payload vs attributes

The payload is the primary data being processed. Attributes describe metadata associated with the current message, such as HTTP request information.

Changing the payload does not mean changing the request method or URI attributes.

## Variable vs payload

A variable stores information associated with the current event for later processing. The payload represents the primary current data.

Do not use variables as a replacement for a durable database or queue.

## Flow vs subflow

A flow can have an event source and complete event-processing behavior. A subflow is commonly used for reusable synchronous processing and does not act as an independent event source.

Choose based on execution and reuse requirements, not just visual preference.

## APIkit vs API Manager

APIkit is used around implementation/routing from an API specification. API Manager is concerned with managing and governing APIs and applying policies according to the platform architecture.

They solve different problems and can be used together.

## RAML vs implementation

RAML describes an API contract. It does not automatically implement the complete business behavior of the API.

## Authentication vs authorization

Authentication answers: "Who are you?"

Authorization answers: "What are you allowed to do?"

A valid identity does not automatically mean access to every operation.

## TLS vs authentication

TLS protects the transport channel and can provide server/client identity depending on configuration. Application authentication determines how the application identifies and authorizes clients.

They are related security layers, not interchangeable concepts.

## Retry vs timeout

A timeout limits how long an operation waits. A retry repeats an operation after a failure or timeout according to a policy.

Retries without bounded timeouts can increase resource consumption.

## Idempotency vs duplicate detection

Idempotency is a business behavior: repeating the same operation should not create an unintended additional effect.

Duplicate detection is one mechanism that can help implement that behavior.

## Synchronous vs asynchronous

Synchronous processing keeps the caller waiting for a response. Asynchronous processing separates submission from later processing.

Asynchronous design does not automatically mean faster; it changes timing, reliability and consumer expectations.

## Queue vs database

A queue transports work/messages. A database stores durable structured state. A queue is not a general-purpose replacement for relational data storage.

## Object Store vs database

Object Store is useful for application state such as lightweight persisted values, idempotency records or state required by a supported application pattern. A relational database is intended for structured durable business data and querying.

Choose according to durability, query requirements, consistency and ownership.

## Batch vs For Each

For Each processes items in the current event context. Batch is designed for processing larger datasets through a batch-oriented execution model with batch-specific behavior.

The choice depends on dataset size, execution model, failure handling and operational requirements.

## Scatter-Gather vs Parallel For Each

Scatter-Gather runs multiple routes and combines their results. Parallel For Each processes collection items concurrently.

One is route-oriented; the other is collection-oriented.

## Error type vs HTTP status

An internal Mule error type describes a failure within Mule's error model. An HTTP status is a protocol-level response code.

A service should map internal failures to an appropriate external error contract rather than exposing internal implementation details.

## 4xx vs 5xx

4xx generally indicates that the request cannot be fulfilled because of client-side request conditions. 5xx generally indicates that the server or a server-side dependency could not successfully process an otherwise acceptable request.

The exact status should reflect the API contract and actual failure condition.

## Connection pool vs thread pool

A connection pool manages reusable connections to an external resource such as a database. A thread pool manages execution threads.

They are different resources and can become different bottlenecks.

## Logging vs monitoring

Logging records detailed events or diagnostic information. Monitoring uses metrics, dashboards and alerts to understand system behavior and detect conditions that require attention.

Both are useful and neither replaces the other.

## Deployment vs release

Deployment puts an application artifact into an environment. A release is the controlled delivery of a version/change, including testing, configuration, communication, approval and recovery considerations where applicable.

## The final rule

Whenever two MuleSoft terms seem similar, compare them by asking:

1. What problem does each solve?
2. When does each execute?
3. What state does it own?
4. What happens when it fails?
5. What are the operational consequences?

That method is more useful than memorizing definitions.
