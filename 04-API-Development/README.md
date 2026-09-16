# 04 — API Development

## API in simple words
An API is a defined interface that lets one program ask another program to perform an operation or return data.

Example:

```text
GET /accounts/A1001
```

The client asks for account A1001. The implementation decides how to obtain the data.

## REST basics
Understand resources, HTTP methods, headers, query parameters, URI parameters, request body, response body, status codes and content types.

Typical methods:
- GET — retrieve
- POST — create/process
- PUT — replace
- PATCH — partially update
- DELETE — remove

## RAML and OpenAPI
An API specification describes the API contract before or alongside implementation. RAML and OpenAPI are common specification approaches. A contract documents paths, methods, parameters, request/response structures and examples.

## APIkit
APIkit can use an API specification to scaffold routing and implementation structure. Understand how an incoming method/path is matched to the generated flow and how unsupported methods/media types become errors.

## Practical banking API
Design:

```text
POST   /accounts
GET    /accounts/{accountNumber}
PATCH  /accounts/{accountNumber}
DELETE /accounts/{accountNumber}
GET    /accounts/{accountNumber}/balance
POST   /transfers
```

Never expose sensitive account information unnecessarily. Use synthetic data in learning exercises.

## Query and URI parameters
Example:

```text
GET /customers?city=Hyderabad
GET /customers/C1001
```

## HTTP status codes
Learn the meaning and correct use of 2xx, 4xx and 5xx responses. Do not return 200 for every failure.

## Validation
Validate required fields, formats, ranges and allowed values at the correct layer. Return a consistent error structure.

## Pagination
For large collections, use a documented pagination contract such as page/size or cursor-based pagination. Define metadata and stable ordering.

## API design checklist
- meaningful resource names
- correct HTTP methods
- documented request/response examples
- consistent errors
- versioning strategy
- security requirements
- timeouts
- pagination
- idempotency where needed
- observability

## Hands-on
Create the RAML/OAS contract, scaffold with APIkit, implement one endpoint, test success and failure paths in Postman, and document every expected status code.
