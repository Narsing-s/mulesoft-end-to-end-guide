# 06 — Error Handling

Error handling means deciding what happens when a flow cannot complete successfully.

## Think in scenarios
Example: a transfer API calls a payment service and receives a timeout.

A production design should answer:
- Should the operation be retried?
- Is the operation safe to repeat?
- What does the client receive?
- What gets logged?
- Does an alert need to fire?

## Mule error model
Mule errors have types and useful information such as description and cause. Learn how errors are raised, propagated and handled.

## On Error Continue
Handles an error and allows the scope/flow to continue according to Mule's error semantics. Use only when the business operation can safely continue.

## On Error Propagate
Handles/logs an error and propagates failure to the caller/outer scope. This is common when a request must be reported as unsuccessful.

## Try scope
Use Try when a local group of processors needs specific error handling or transaction behavior.

## Raise Error
Use Raise Error when your business rule detects an invalid state and you need an explicit application error.

## Standard API error
A useful pattern is:

```json
{
  "code": "ACCOUNT_NOT_FOUND",
  "message": "The requested account was not found",
  "correlationId": "..."
}
```

Do not return stack traces, credentials, SQL statements or internal infrastructure details to API consumers.

## Retry vs propagate
Retry transient failures only when repeating the operation is safe. For payments and other non-idempotent operations, blindly retrying can create duplicates.

## Practical exercises
1. Build validation error handling.
2. Handle HTTP 404 from a downstream service.
3. Handle timeout separately from business validation.
4. Add a correlation ID to logs and responses.
5. Create a reusable global error strategy.

## Production checklist
- classify errors
- log enough diagnostic context
- protect sensitive data
- return stable client-facing errors
- avoid duplicate side effects
- alert on important operational failures
- test every important error path
