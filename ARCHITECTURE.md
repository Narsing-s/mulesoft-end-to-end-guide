# Enterprise Architecture Reference

## End-to-end request

```text
Consumer
  |
  v
Experience API
  |
  v
Process API
  |
  +------> System API ------> CRM
  |
  +------> System API ------> Database
  |
  +------> System API ------> MQ / External service
```

## Responsibilities

### Experience layer
Consumer-friendly contract, presentation-specific shaping and consumer concerns.

### Process layer
Business orchestration and rules that combine capabilities.

### System layer
Controlled access to systems of record and technical integration details.

## Cross-cutting concerns
Security, logging, correlation IDs, error handling, monitoring, configuration, testing and deployment apply across the layers.

## Design questions
Before building, ask:
1. What is the source of truth?
2. Who owns this API?
3. Is this capability reusable?
4. Is the operation synchronous or asynchronous?
5. What happens when a dependency is unavailable?
6. Can the request safely be retried?
7. What data must be protected or excluded?
8. How will we test and monitor it?
