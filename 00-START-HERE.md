# 00 — Start Here: MuleSoft from Zero

If you have never used MuleSoft before, start here. Do **not** skip the vocabulary.

## 1. What is MuleSoft?

MuleSoft is an integration platform. In simple words, a Mule application sits between systems and moves, validates, transforms, or routes information between them.

```text
Mobile App → REST API → Mule → Database
                         ↓
                         MQ
                         ↓
                       Email
```

A Mule application can receive a request, validate it, transform data with DataWeave, call another system, handle failures, and return a response.

## 2. Minimum vocabulary

| Term | Beginner meaning |
|---|---|
| API | A defined way for software to communicate |
| HTTP | A common protocol used for web/API requests |
| Request | Information sent to an API |
| Response | Information returned by an API |
| Mule Runtime | The engine that executes a Mule application |
| Mule application | The integration program you build |
| Flow | A sequence of processors that handles an event |
| Event | Information moving through a Mule flow |
| Payload | The main data being processed |
| Attributes | Metadata about the message, such as HTTP method or headers |
| Variable (`vars`) | Temporary named data kept in the Mule event |
| Connector | A component that communicates with another system |
| DataWeave | MuleSoft's transformation/programming language |
| RAML/OAS | API contract/specification formats |
| APIkit | Tooling that scaffolds and routes APIs from contracts |
| MUnit | MuleSoft testing framework |
| Runtime Manager | Platform UI used to deploy/manage supported Mule runtimes |

## 3. The five questions behind every integration

1. **How does data enter?** HTTP, scheduler, file, queue, etc.
2. **What does the data look like?** JSON, XML, CSV, binary, Java object.
3. **What should happen?** Validate, transform, route, call systems, store, publish.
4. **What if it fails?** Error type, retry, timeout, fallback, DLQ, response.
5. **How will we operate it?** Logs, metrics, alerts, security, deployment, recovery.

## 4. Your first API

Create a Mule project in Anypoint Studio.

Add:

- HTTP Listener
- Transform Message
- optional Logger

Conceptual flow:

```text
HTTP Listener
      ↓
Transform Message
      ↓
JSON Response
```

Example response:

```json
{
  "message": "Hello from MuleSoft",
  "status": "SUCCESS"
}
```

## 5. Learn HTTP before memorising Mule components

Know these first:

- `GET` — retrieve information
- `POST` — create/process information
- `PUT` — replace a resource
- `PATCH` — partially update a resource
- `DELETE` — remove a resource
- `200` — successful request
- `201` — resource created
- `204` — success with no response body
- `400` — invalid request
- `401` — authentication required/failed
- `403` — authenticated but not allowed
- `404` — resource/route not found
- `405` — method not allowed
- `415` — unsupported media type
- `500` — server-side failure
- `502/503/504` — upstream/gateway/service availability failures

Also understand headers, query parameters, path parameters, request body, response body and `Content-Type`.

## 6. Then learn the Mule event

Use this beginner model:

```text
Mule Event
├── Message
│   ├── Payload
│   └── Attributes
└── Variables
```

Do not treat `payload`, `attributes`, and `vars` as interchangeable. Learn when each is appropriate.

## 7. Then learn DataWeave

Start with:

1. objects and arrays
2. selectors
3. `map`
4. `filter`
5. `reduce`
6. `if/else`
7. variables
8. functions
9. null handling
10. type coercion
11. modules
12. performance

Example:

```dataweave
%dw 2.0
output application/json
---
{
  greeting: "Hello " ++ (payload.name default "User"),
  active: payload.active default false
}
```

## 8. Then build APIs with contracts

Learn RAML or OpenAPI before relying on implementation-first endpoints. Understand resources, methods, parameters, request bodies, response schemas, examples, traits/components, versioning and validation.

Then learn APIkit:

```text
Contract → Scaffold → Route → Implement → Test
```

## 9. Your learning order

```text
00 Start Here
  ↓
01 Mule Fundamentals
  ↓
02 HTTP & APIs
  ↓
03 DataWeave
  ↓
04 API Development
  ↓
05 API-Led Connectivity
  ↓
06 Error Handling
  ↓
08 Database / 09 Enterprise Integration
  ↓
Security + MUnit
  ↓
Deployment + DevOps
  ↓
Troubleshooting + Performance
  ↓
Architecture + Banking Capstone
```

## 10. Beginner rule

Do not copy XML blindly. For every component ask:

> What enters here? What changes here? What leaves here? What happens when it fails?

## 11. First exercises

### Exercise A — Hello API
Return a JSON response from an HTTP endpoint.

### Exercise B — Echo API
Accept a JSON body and return it with an added status field.

### Exercise C — DataWeave
Receive five customers and return only active customers.

### Exercise D — Error
Return a controlled `400` response when a required field is missing.

### Exercise E — Database
Read a record with a parameterized query. Never build SQL by string concatenation from user input.

### Exercise F — MUnit
Mock the database and test both found and not-found scenarios.

## 12. Production readiness checkpoint

Before moving to advanced architecture, you should be able to explain:

- Mule event structure
- synchronous vs asynchronous processing
- API contracts
- DataWeave transformations
- connector configuration
- error types and scopes
- retries and timeouts
- idempotency
- secure configuration
- MUnit tests
- deployment environments
- logs and correlation IDs
- monitoring and alerts
- database transactions
- messaging acknowledgements and DLQ
- API policies and authentication
- performance bottlenecks

Continue with the [learning map](docs/LEARNING-MAP.md), then use the interactive portal under `docs/`.
