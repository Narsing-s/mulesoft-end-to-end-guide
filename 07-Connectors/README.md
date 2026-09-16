# 07 — Connectors

A connector is the Mule component that lets an application communicate with another technology.

## HTTP
Use HTTP Listener to expose an endpoint and HTTP Request to call another HTTP service.

Practical pattern:

```text
Listener -> validate -> HTTP Request -> transform -> response
```

## File / FTP / SFTP
Learn reading, writing, moving and archiving files; understand file naming, duplicate processing, permissions and failure recovery.

## Database
Use the Database connector for SQL operations and parameterized queries. Never build SQL by concatenating untrusted input.

## JMS / IBM MQ
Messaging lets producers and consumers communicate asynchronously. Learn queues, acknowledgements, retries, poison/dead-letter messages and ordering considerations.

## Salesforce
Learn authentication, query, create/update operations, bulk considerations and API limits. Keep connector-specific details behind reusable integration logic.

## Email/SMTP
Use email for notifications, not as a substitute for durable transaction processing. Handle SMTP failures separately.

## Object Store
Object Store provides key/value persistence useful for state, idempotency and other appropriate use cases. Understand persistence scope, expiration and deployment considerations.

## Scheduler
Use Scheduler for time-based processing such as periodic reconciliation jobs.

## Connector selection exercise
For each scenario, choose the technology and explain why:
1. synchronous customer lookup
2. overnight file import
3. asynchronous payment processing
4. CRM customer synchronization
5. duplicate-message detection

## Production checklist
- authentication
- connection timeouts
- retry behavior
- pooling where supported
- secure credentials
- monitoring
- rate limits
- failure recovery
- idempotency
