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

## RAML — API contract and blueprint

**RAML (RESTful API Modeling Language)** is a language for describing a REST API contract. Think of RAML as the blueprint of the API: it defines what resources, methods, parameters, request/response structures, examples and status codes the API exposes. The Mule flows contain the actual business implementation.

```text
Requirement
    ↓
RAML API Contract
    ↓
APIkit Router
    ↓
Mule Implementation Flows
    ↓
DataWeave / DB / MQ / Downstream APIs
    ↓
API Response
```

### Simple example

```raml
#%RAML 1.0

title: Customer API
version: v1
baseUri: https://api.example.com/api/v1
mediaType: application/json

/customers/{customerId}:
  get:
    uriParameters:
      customerId:
        type: string
    responses:
      200:
        body:
          application/json:
            example:
              customerId: "C1001"
              name: "Priya Kumar"
      404:
        body:
          application/json:
            example:
              code: "CUSTOMER_NOT_FOUND"
              message: "Customer was not found"
```

This tells consumers and implementation teams:

- the API is RAML 1.0
- the resource is `/customers/{customerId}`
- the operation is `GET`
- `customerId` is a URI parameter
- success returns HTTP 200
- a missing customer can return HTTP 404
- responses use JSON

**RAML does not perform the database lookup.** The Mule implementation does that work.

### RAML and APIkit

APIkit can use the RAML contract to scaffold routing and implementation structure. An incoming method/path is matched against the contract and routed to the corresponding Mule flow. Contract mismatches can surface as errors such as 404, 405, 406 or 415.

### Learn RAML completely

See [`RAML-COMPLETE-GUIDE.md`](./RAML-COMPLETE-GUIDE.md) for a beginner-to-production explanation covering:

- RAML 1.0 syntax, resources and methods
- URI/query parameters and headers
- request/response bodies
- data types and reusable models
- examples and status codes
- traits, resource types and libraries
- security documentation
- RAML + APIkit + Mule flows
- contract-first vs code-first
- banking API examples
- APIkit 404/405/406/415 troubleshooting
- hands-on labs and interview questions
- production RAML checklist

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

The complete synthetic banking RAML is available under `17-Real-World-Project/raml/banking-api.raml` and is used as a practical example of contract-first API design.

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
- RAML/OAS contract reviewed against the actual implementation

## Hands-on
Create the RAML/OAS contract, scaffold with APIkit, implement one endpoint, test success and failure paths in Postman, and document every expected status code.

### Recommended learning sequence

```text
REST basics
   ↓
RAML syntax
   ↓
Resources + methods
   ↓
URI/query parameters
   ↓
Request/response bodies
   ↓
Types + examples
   ↓
Errors + validation
   ↓
Traits + reusable components
   ↓
Security + pagination + idempotency
   ↓
APIkit
   ↓
Mule implementation
   ↓
MUnit + contract testing
   ↓
Deployment + API governance
```
