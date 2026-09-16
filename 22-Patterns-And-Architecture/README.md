# Integration Patterns and Architecture

This section teaches how to choose an integration design, not only how to drag components into Studio.

## Core patterns

### Request-response
Client waits for a result.

`Mobile -> Experience API -> Process API -> System API -> DB -> response`

Use for account lookup and customer details.

### Fire-and-forget
The sender does not wait for business completion.

`API -> queue -> worker -> notification`

Use when work can finish later.

### Retry
Try a temporary failure again. Only retry failures that are likely temporary. Never blindly retry a non-idempotent payment operation.

### Idempotent consumer
Store a unique business/request key and reject or safely replay duplicates.

### Circuit-breaker concept
Stop repeatedly calling an unhealthy dependency. Return a controlled response and recover when the dependency becomes healthy.

### Scatter-Gather
Call independent systems in parallel and combine results. Define behavior when one route fails.

### Aggregator
Collect several messages/results into one business response.

### Content-based routing
Choose a route based on business data.

### Dead-letter handling
Move repeatedly failed messages to a controlled destination for investigation/replay.

### Canonical data model
Use a common internal representation when many systems use different formats. Do not create a canonical model automatically; use it when the reduced coupling is worth the extra mapping.

## API-led architecture

```text
                    Consumers
               /       |       \
          Mobile     Web     Partners
                \      |      /
                Experience APIs
                       |
                 Process APIs
                       |
                  System APIs
                 /      |      \
              DB       MQ      SaaS
```

### System API
Hides system-specific details such as SQL, legacy endpoints or queue formats.

### Process API
Owns orchestration and business workflow.

### Experience API
Shapes data for a particular consumer experience.

## Design questions
Before implementing, answer:
1. Who owns the data?
2. Which system is the source of truth?
3. Is the interaction synchronous or asynchronous?
4. What is the expected latency?
5. Can the operation safely be retried?
6. What happens after a partial failure?
7. How is the request traced?
8. How is authentication performed?
9. What data must never appear in logs?
10. How will the application scale?
11. What is the timeout budget?
12. How will failed messages be replayed?

## Anti-patterns
- One giant flow doing every business function.
- SQL embedded in an Experience API.
- Logging passwords, tokens or sensitive customer data.
- Retrying payments without idempotency.
- Calling five downstream systems sequentially when they are independent.
- Returning raw backend errors to consumers.
- Hard-coding environment URLs and credentials.
- Using global variables as an uncontrolled shared state.
