# 11 — API Management

API management controls and governs APIs after they are designed and implemented.

## API lifecycle
A practical lifecycle is:

```text
Design -> Develop -> Test -> Secure -> Deploy -> Manage -> Monitor -> Version/Retire
```

## API Manager
Use API management capabilities to apply policies, manage consumers and contracts, and observe API usage.

## Policies
Examples include client application enforcement, authentication/authorization, rate limiting and other traffic/security controls. Exact policy availability depends on the MuleSoft platform/runtime setup.

## Client applications and contracts
Consumers may register applications and receive credentials or access through a defined contract. Document ownership and access expectations.

## SLA
A service-level agreement defines measurable expectations such as availability, throughput or response-time objectives. Do not confuse an SLA with an implementation guarantee.

## Versioning
Plan how breaking and non-breaking changes are released. Keep compatibility in mind before changing field names, response structures or required parameters.

## Analytics
Use API analytics/monitoring to understand traffic, errors, latency and consumption patterns. Treat observability data as sensitive when it contains request information.

## Practical exercise
Take the banking EAPI and document:
1. owner
2. consumers
3. authentication
4. policy requirements
5. rate limits
6. SLA expectations
7. versioning strategy
8. retirement process
