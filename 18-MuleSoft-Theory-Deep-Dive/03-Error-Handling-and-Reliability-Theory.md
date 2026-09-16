# Error Handling and Reliability Theory

## Why failures must be designed

Every integration depends on something that can fail: a caller, network, database, queue, downstream API, certificate, file server or runtime resource.

Production-quality integration therefore treats failure behavior as part of the normal design.

## Failure categories

### Validation failure
The input does not satisfy the API or application contract.

### Business failure
The request is valid but the business rule does not allow the operation. Examples include insufficient balance or an operation that is not permitted for the current state.

### Dependency failure
A downstream service, database, queue or external system is unavailable, slow or returns an unexpected response.

### Application failure
The Mule application encounters an unexpected condition such as a transformation error or configuration problem.

### Infrastructure failure
The host, runtime, network, certificate infrastructure or deployment platform has a problem.

Classifying the failure first makes the response strategy clearer.

## Error propagation

An error carries information about what failed. Error handling should convert internal failure information into a controlled application response.

`On Error Propagate` is appropriate when the operation should remain unsuccessful after the error handler completes.

`On Error Continue` is appropriate only when the business behavior explicitly considers the handled path successful from the enclosing scope's perspective.

Do not use `On Error Continue` merely to hide failures.

## Global versus local handling

A global error strategy can provide consistent application-wide behavior. A local handler is useful when one operation has special recovery requirements.

Use the smallest appropriate scope for special behavior, while keeping the public error contract consistent.

## Retry theory

A retry asks a failed operation to run again. Retrying is useful for transient failures but harmful when the failure is permanent or the operation is not safely repeatable.

Before adding a retry, answer:

1. What type of failure is retryable?
2. How many attempts are allowed?
3. How long should the application wait?
4. Is the operation idempotent?
5. Can repeated attempts overload the dependency?
6. What happens after the final failure?

## Timeout theory

A timeout limits how long an application waits for an operation. Without reasonable limits, slow dependencies can consume resources and create a chain reaction of waiting requests.

A timeout should reflect business expectations and downstream behavior rather than an arbitrary number.

## Circuit protection

When a dependency is repeatedly failing, continuously sending traffic to it can make recovery harder and waste local resources. Circuit-style protection patterns can reduce unnecessary calls during sustained dependency failure.

## Dead-letter handling

In asynchronous processing, some messages cannot be successfully processed after the allowed attempts. A dead-letter mechanism provides a controlled place for those messages so the main processing path can continue.

Dead-letter handling is incomplete without an operational process for investigation, correction and replay where appropriate.

## Poison messages

A poison message is a message that repeatedly causes processing failure. Common causes include invalid data, incompatible schema, missing reference data or an application bug.

A retry policy that retries forever can turn one bad message into a permanent queue backlog.

## Idempotency and duplicates

A message may be delivered more than once depending on the messaging and failure model. A business operation should define how duplicate requests are recognized.

For example, a payment request can carry a unique business transaction identifier. The system can use that identifier to determine whether the logical operation has already been processed.

## Compensation

Some distributed operations cannot be rolled back with one technical transaction. In such cases, a compensating action may be required.

Compensation is a business-level correction, not the same thing as database rollback.

## Partial failure

Suppose one request requires three independent downstream calls and one fails. The application must decide whether to fail the complete request, return partial information, use a fallback, or continue without the optional result.

This decision must be defined by business requirements before implementation.

## Reliability checklist

For every important flow, document:

- expected failure types;
- retryable failures;
- non-retryable failures;
- timeout behavior;
- duplicate behavior;
- error response contract;
- dead-letter behavior if asynchronous;
- logging and correlation information;
- alert conditions;
- recovery procedure;
- test cases proving the behavior.
