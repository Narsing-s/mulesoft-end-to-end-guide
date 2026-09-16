# 02 — Mule Applications

## Mule event
A Mule event contains the data Mule is processing. The payload is the main business data; attributes describe the message; variables hold temporary values.

Example HTTP event:

```text
Payload: {"accountId":"A1001"}
Attributes: method=GET, path=/accounts/A1001, headers=...
Variables: correlationId, customerId
```

## Flow vs Subflow vs Private Flow
A **flow** has a source such as an HTTP Listener or Scheduler and processors.
A **subflow** is reusable processing invoked from another flow and does not have its own event source.
A **private flow** can be called by Flow Reference and is useful for reusable logic that needs its own error handling behavior.

## Variables
Use variables for temporary values. Do not use them as a replacement for a proper database or durable store.

## Message processors
Common processors include Logger, Transform Message, Set Payload, Set Variable, Choice, For Each and Flow Reference.

## Configuration
Keep environment-specific values such as URLs, ports and credentials outside business logic. Use property files and secure properties appropriately.

## Practical exercise
Build:

```text
GET /customer/{id}
 -> Set Variable customerId
 -> Logger
 -> Transform Message
 -> response
```

Then extract logging into reusable logic.

## Common beginner mistakes
1. Confusing payload with attributes.
2. Expecting variables to survive every separate request.
3. Hard-coding credentials.
4. Putting all logic in one enormous flow.
5. Ignoring MIME types and data formats.

## Production principle
Keep flows small enough to understand, make reusable logic explicit, and keep configuration separate from application code.
