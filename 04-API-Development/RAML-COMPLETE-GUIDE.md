# RAML Complete Guide — Beginner to Production

## 1. What is RAML?

**RAML (RESTful API Modeling Language)** is a specification language used to describe a REST API contract.

Think of RAML as the **blueprint of an API**.

Before developers build the Mule flows, RAML can describe:

- API title and version
- base URI
- resources/endpoints
- HTTP methods
- URI parameters
- query parameters
- headers
- request bodies
- response bodies
- HTTP status codes
- data types
- examples
- reusable libraries and traits
- security requirements

### Simple analogy

```text
Building construction
---------------------
Blueprint  -> tells us what to build
Construction -> builds the actual building

MuleSoft API
------------
RAML       -> defines the API contract
Mule flows -> implement the contract
APIkit     -> helps route the contract to Mule flows
```

RAML does **not** by itself execute business logic. The Mule application implements the behavior described by the contract.

---

## 2. Why do we use RAML?

Without a contract, a frontend developer, backend developer and tester may make different assumptions about the API.

For example:

```text
Frontend expects:
POST /accounts
{
  "fullName": "Priya Kumar",
  "email": "priya@example.test"
}

Backend implements:
POST /customer
{
  "name": "Priya Kumar"
}
```

The systems do not agree.

With RAML, the expected interface is defined first:

```text
RAML Contract
     |
     +--> Developers
     +--> Testers
     +--> Frontend team
     +--> APIkit
     +--> API documentation
```

This is called **contract-first API development**.

---

## 3. RAML vs Mule flow

A beginner should keep these concepts separate:

| RAML | Mule implementation |
|---|---|
| Defines what the API accepts | Implements what the API does |
| Defines endpoint | HTTP Listener receives request |
| Defines method | Flow handles method |
| Defines request structure | DataWeave/validation processes request |
| Defines response contract | Transform Message creates response |
| Defines status codes | Error handling/flow returns status |
| Defines examples | MUnit/Postman can test against contract |

Example:

```text
RAML:
POST /accounts

        |
        v
APIkit Router
        |
        v
post:\accounts:application\json:api-config
        |
        v
Validate -> DataWeave -> DB -> Response
```

---

## 4. RAML 1.0 file structure

A minimal RAML file:

```raml
#%RAML 1.0

title: Customer API
version: v1
baseUri: https://api.example.com/api/v1
mediaType: application/json

/customers:
  get:
    description: Get customers
    responses:
      200:
        body:
          application/json:
            example:
              - id: "C1001"
                name: "Priya Kumar"
```

### Line-by-line explanation

```raml
#%RAML 1.0
```

Identifies the document as a RAML 1.0 specification.

```raml
title: Customer API
```

Human-readable API name.

```raml
version: v1
```

API version exposed in the contract.

```raml
baseUri: https://api.example.com/api/v1
```

Base address used as the foundation for resource paths.

```raml
mediaType: application/json
```

Default request/response media type.

```raml
/customers:
```

Defines a resource.

```raml
get:
```

Defines the HTTP GET operation for that resource.

```raml
responses:
```

Defines possible HTTP responses.

```raml
200:
```

Defines the successful HTTP status.

---

## 5. Resource, method and endpoint

Consider:

```raml
/accounts:
  get:
```

The resource is `/accounts` and the method is `GET`.

The full endpoint is:

```text
GET /accounts
```

Nested resources are possible:

```raml
/accounts:
  /{accountNumber}:
    get:
```

This represents:

```text
GET /accounts/{accountNumber}
```

A concrete request could be:

```text
GET /accounts/DEMO00000001
```

---

## 6. URI parameters

URI parameters are values embedded in the URL.

```raml
/accounts:
  /{accountNumber}:
    uriParameters:
      accountNumber:
        type: string
        required: true
```

Request:

```text
GET /accounts/DEMO00000001
```

In Mule, the value is available as an attribute, for example:

```text
attributes.uriParams.accountNumber
```

Do not confuse URI parameters with query parameters.

```text
URI parameter:
GET /accounts/DEMO00000001

Query parameter:
GET /accounts?bankName=SBI
```

---

## 7. Query parameters

Query parameters normally filter, search, sort or modify a request.

```raml
/accounts:
  get:
    queryParameters:
      bankName:
        type: string
        required: false
      status:
        type: string
        required: false
```

Example:

```text
GET /accounts?bankName=SBI&status=ACTIVE
```

In Mule:

```text
attributes.queryParams.bankName
attributes.queryParams.status
```

---

## 8. HTTP methods in RAML

Common methods:

```text
GET     retrieve data
POST    create/process a request
PUT     replace a resource
PATCH   partially update a resource
DELETE  remove a resource
```

Example:

```raml
/accounts:
  post:
    description: Create account

/accounts/{accountNumber}:
  get:
    description: Retrieve account
  patch:
    description: Update selected fields
  delete:
    description: Delete account
```

---

## 9. Request body

A POST or PATCH request commonly contains a body.

```raml
/accounts:
  post:
    body:
      application/json:
        example:
          fullName: "Priya Kumar"
          dateOfBirth: "1995-04-12"
          mobileNumber: "9999999999"
          email: "priya@example.test"
          address: "Hyderabad"
```

The client sends JSON such as:

```json
{
  "fullName": "Priya Kumar",
  "dateOfBirth": "1995-04-12",
  "mobileNumber": "9999999999",
  "email": "priya@example.test",
  "address": "Hyderabad"
}
```

In Mule, the request body is normally available as:

```text
payload
```

---

## 10. Data types

RAML can define reusable types instead of repeating field definitions.

```raml
types:
  Account:
    type: object
    properties:
      fullName: string
      dateOfBirth: date-only
      mobileNumber: string
      email: string
      address: string
```

Use the type in an endpoint:

```raml
/accounts:
  post:
    body:
      application/json:
        type: Account
```

This gives the API contract a defined structure.

---

## 11. Required and optional fields

```raml
types:
  Customer:
    type: object
    properties:
      fullName: string
      email: string
      address?: string
```

Here:

- `fullName` is required by the type definition.
- `email` is required by the type definition.
- `address?` is optional.

Explicit requirements can also be documented with `required` where appropriate.

Always make the contract agree with the actual implementation and validation rules.

---

## 12. Examples

Examples show clients what valid data looks like.

```raml
example:
  fullName: "Priya Kumar"
  email: "priya@example.test"
```

For collections:

```raml
example:
  - accountNumber: "DEMO00000001"
    fullName: "Priya Kumar"
  - accountNumber: "DEMO00000002"
    fullName: "Ravi Kumar"
```

Use synthetic data in public learning repositories.

---

## 13. Response definitions

A production contract should document success and meaningful failure responses.

```raml
responses:
  200:
    body:
      application/json:
        example:
          accountNumber: "DEMO00000001"
          fullName: "Priya Kumar"
          balance: 12500.50

  404:
    body:
      application/json:
        example:
          code: "ACCOUNT_NOT_FOUND"
          message: "Account was not found"
```

Common status codes:

```text
200 OK
201 Created
202 Accepted
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
405 Method Not Allowed
406 Not Acceptable
415 Unsupported Media Type
422 Unprocessable Content
429 Too Many Requests
500 Internal Server Error
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
```

Do not document statuses that the implementation cannot actually produce.

---

## 14. Headers

Headers can be part of the API contract.

Example:

```raml
/transfers:
  post:
    headers:
      Idempotency-Key:
        type: string
        required: true
```

The client must provide:

```text
Idempotency-Key: 7b2c-demo-request-001
```

This is useful for operations where retrying the same request must not accidentally create duplicate business actions.

---

## 15. Traits and reusable design

Traits allow common behavior to be reused across resources.

Example:

```raml
traits:
  paginated:
    queryParameters:
      page:
        type: integer
        required: false
      pageSize:
        type: integer
        required: false
```

Apply it:

```raml
/accounts:
  get:
    is: [ paginated ]
```

This avoids copying the same pagination definition into many endpoints.

Other reusable concerns can include standard headers, correlation IDs or common request behavior.

---

## 16. Resource types and libraries

For larger APIs, split reusable definitions into separate files.

Example structure:

```text
api/
├── banking-api.raml
├── types/
│   ├── account.raml
│   ├── transfer.raml
│   └── error.raml
├── examples/
│   ├── account.json
│   └── transfer.json
└── libraries/
    └── common-library.raml
```

This makes large API contracts easier to maintain.

---

## 17. Security in RAML

An API contract can describe authentication/security requirements.

The exact security design depends on the platform and API implementation.

Conceptually:

```text
Client
  |
  | Authorization
  v
API Gateway / Mule API
  |
  v
Business implementation
```

Document security requirements clearly and never put real secrets, passwords, access tokens or production credentials into RAML examples.

---

## 18. RAML + APIkit in MuleSoft

One of the most important MuleSoft workflows is:

```text
1. Design RAML
       |
       v
2. Create Mule API project
       |
       v
3. Import/use RAML
       |
       v
4. APIkit Router
       |
       v
5. Generated implementation flows
       |
       v
6. Add business logic
       |
       v
7. Test with API Console/Postman
```

APIkit uses the API contract to help route incoming requests to the appropriate Mule flow.

For example:

```text
RAML
POST /accounts
GET /accounts/{accountNumber}
PATCH /accounts/{accountNumber}
DELETE /accounts/{accountNumber}

          |
          v
     APIkit Router
          |
    +-----+----------------+
    |     |       |        |
    v     v       v        v
  POST   GET    PATCH    DELETE
  flow   flow    flow     flow
```

---

## 19. Practical banking RAML

The repository contains a synthetic banking contract at:

```text
17-Real-World-Project/raml/banking-api.raml
```

The contract demonstrates:

```text
POST   /accounts
GET    /accounts/{accountNumber}
PATCH  /accounts/{accountNumber}
DELETE /accounts/{accountNumber}
POST   /transfers
```

The account creation contract contains fields such as:

```raml
fullName
 dateOfBirth
mobileNumber
email
address
```

The transfer contract demonstrates a required `Idempotency-Key` header and an asynchronous `202 Accepted` response.

The project is intentionally synthetic. Never put real banking/customer data into this public repository.

---

## 20. RAML to Mule implementation example

### RAML

```raml
/accounts/{accountNumber}:
  get:
    responses:
      200:
        body:
          application/json:
            example:
              accountNumber: "DEMO00000001"
              fullName: "Priya Kumar"
              balance: 12500.50
```

### Request

```http
GET /api/v1/accounts/DEMO00000001
Accept: application/json
```

### Mule processing concept

```text
HTTP Listener
      |
      v
APIkit Router
      |
      v
GET account flow
      |
      +--> read attributes.uriParams.accountNumber
      |
      +--> Database Select
      |
      +--> Transform Message
      |
      v
HTTP 200 + JSON
```

### DataWeave response example

```dataweave
%dw 2.0
output application/json
---
{
  accountNumber: payload.ACCOUNTNUMBER,
  fullName: payload.FULLNAME,
  balance: payload.BALANCE
}
```

The RAML defines the expected API shape; DataWeave maps backend data into that shape.

---

## 21. Contract-first vs code-first

### Contract-first

```text
RAML/OAS
   |
   v
API design
   |
   v
Implementation
   |
   v
Testing
```

The API contract is designed before implementation.

### Code-first

```text
Implementation
   |
   v
API description generated/documented afterward
```

Both approaches exist. Contract-first is especially useful when multiple teams need to agree on an API before implementation is complete.

---

## 22. RAML validation mindset

When reviewing RAML, ask:

```text
Is every endpoint documented?
Is every method correct?
Are URI parameters defined?
Are query parameters defined?
Are required fields explicit?
Are request examples valid?
Are response examples valid?
Are error responses documented?
Are content types correct?
Is authentication documented?
Is pagination documented where needed?
Is idempotency documented where needed?
Is versioning clear?
```

Then compare the RAML against the actual Mule implementation.

A contract is only useful when implementation and documentation remain aligned.

---

## 23. Common beginner mistakes

### Mistake 1 — Confusing RAML with DataWeave

RAML defines the API contract. DataWeave transforms data and evaluates expressions.

### Mistake 2 — Thinking RAML is the business logic

RAML does not execute database queries, call downstream systems or perform account creation.

### Mistake 3 — Missing path parameters

Wrong:

```raml
/accounts:
  get:
```

when the intended API is:

```text
GET /accounts/{accountNumber}
```

Correct:

```raml
/accounts:
  /{accountNumber}:
    get:
```

### Mistake 4 — Returning undocumented errors

If the implementation can return an important 404/400/500 response, document the API error contract appropriately.

### Mistake 5 — RAML says one thing and Mule returns another

For example, RAML says `201`, while the implementation always returns `200`. Fix the contract or implementation so they agree.

### Mistake 6 — Putting secrets in examples

Use fake domains, fake account numbers and synthetic data.

---

## 24. RAML troubleshooting with APIkit

### HTTP 404

Check:

```text
RAML path
baseUri/base path
APIkit configuration
request URL
proxy/gateway base path
```

### HTTP 405 Method Not Allowed

Check whether the method exists in RAML and whether APIkit generated/mapped the expected flow.

Example:

```text
RAML defines:
GET /accounts

Client sends:
POST /accounts
```

A method mismatch can result in 405 behavior.

### HTTP 415 Unsupported Media Type

Check:

```text
Content-Type
RAML request media type
actual request body
APIkit/media-type configuration
```

Example:

```http
Content-Type: application/json
```

### HTTP 406 Not Acceptable

Check the client's `Accept` header against the media types the API contract supports.

### OPTIONS/CORS issues

CORS preflight requests can use `OPTIONS`. If the API/gateway configuration does not correctly handle preflight behavior, clients running in browsers can fail even when the main endpoint works.

---

## 25. Interview questions

### Beginner

1. What is RAML?
2. Why is RAML used in MuleSoft?
3. What is an API contract?
4. What is the difference between a resource and a method?
5. What is a URI parameter?
6. What is a query parameter?
7. How do you define a request body?
8. How do you define a response?
9. What is RAML 1.0?
10. What is APIkit?

### Intermediate

11. RAML vs OpenAPI?
12. Contract-first vs code-first?
13. How do reusable types work?
14. What are traits?
15. How do you document standard errors?
16. How does APIkit route requests?
17. How do you troubleshoot APIkit 404/405/415 errors?
18. How do you define optional properties?
19. How do headers become part of an API contract?
20. How should pagination be documented?

### Advanced

21. How do you structure a large RAML project?
22. How do you govern reusable API fragments?
23. How do you keep contract and implementation synchronized?
24. How should breaking API changes be versioned?
25. How do security requirements fit into an API contract?
26. How do you design an idempotent POST contract?
27. How do API gateway policies relate to the RAML contract?
28. How would you design a canonical error model?
29. How would you test contract compliance in CI/CD?
30. How would you migrate a RAML API contract while maintaining backward compatibility?

---

## 26. Hands-on lab

Build a Customer API from scratch.

### Step 1 — Create RAML

Create:

```text
/customer-api.raml
```

Define:

```text
GET    /customers
GET    /customers/{customerId}
POST   /customers
PATCH  /customers/{customerId}
DELETE /customers/{customerId}
```

### Step 2 — Define types

Create a reusable `Customer` type.

### Step 3 — Add examples

Create realistic but synthetic JSON examples.

### Step 4 — Add errors

Document at least:

```text
400
404
500
```

### Step 5 — Create Mule application

Use the RAML contract with APIkit.

### Step 6 — Implement flows

Connect the generated routes to business logic.

### Step 7 — Test

Test:

```text
happy path
missing parameter
invalid body
unsupported method
unsupported media type
not found
server error
```

### Step 8 — Add MUnit

Write tests for successful and failure paths.

### Step 9 — Compare contract vs implementation

Verify that actual status codes, payload structure and media types match the RAML.

---

## 27. Production checklist

Before publishing an API contract:

- [ ] RAML version is correct
- [ ] API title is meaningful
- [ ] API versioning is defined
- [ ] base path is correct
- [ ] every resource is documented
- [ ] every HTTP method is intentional
- [ ] URI parameters are defined
- [ ] query parameters are defined
- [ ] headers are defined
- [ ] request types are reusable where appropriate
- [ ] request examples are valid
- [ ] response types/examples are valid
- [ ] success status codes are correct
- [ ] error responses are documented
- [ ] media types are correct
- [ ] security requirements are documented
- [ ] pagination/filtering/sorting behavior is documented where applicable
- [ ] idempotency is addressed where applicable
- [ ] no secrets or production data are present
- [ ] implementation matches the contract
- [ ] MUnit/contract tests cover important behavior
- [ ] version-sensitive assumptions are recorded

---

## 28. Final mental model

Remember this flow:

```text
Business requirement
        |
        v
API design
        |
        v
RAML contract
        |
        +------------------+
        |                  |
        v                  v
API consumers          MuleSoft/APIkit
                           |
                           v
                      Mule flows
                           |
                    +------+------+
                    |             |
                    v             v
                 DataWeave       DB/MQ/API
                    |             |
                    +------+------+
                           |
                           v
                     API response
```

**RAML answers:** “What does this API look like and what does it promise?”

**Mule flows answer:** “How does the application actually fulfill that contract?”

**DataWeave answers:** “How do we transform and shape the data?”

**APIkit answers:** “How do we connect the API contract's operations to Mule implementation flows?”

That distinction is one of the most important foundations for learning MuleSoft API development.
