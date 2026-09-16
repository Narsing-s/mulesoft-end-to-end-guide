# API and HTTP Theory

## API meaning

An API is a defined interface through which one software system can request data or an operation from another system. A good API hides unnecessary implementation details and gives consumers a predictable contract.

## Request anatomy

An HTTP request can contain a method, URI, headers, query parameters, URI parameters and a body.

Each has a different purpose.

- Method describes the requested operation semantics.
- URI identifies the resource or operation endpoint.
- Headers carry metadata such as content type or authorization information.
- Query parameters commonly control filtering, searching, sorting or optional behavior.
- URI parameters commonly identify a particular resource.
- Body carries request data when the operation needs one.

## Response anatomy

A response has a status code, headers and usually a body.

The status code is part of the API contract. Consumers use it to distinguish success from client-side problems and server-side failures.

## Resource design

REST-style APIs commonly model business resources rather than exposing database tables directly. A database table may contain implementation-specific columns that should never become public API fields.

For example, an account API should expose the account information required by consumers rather than automatically exposing every database column.

## Contract-first thinking

A contract should answer:

- Which endpoint exists?
- Which HTTP methods are supported?
- Which inputs are required?
- What formats are accepted?
- What does a successful response look like?
- Which errors are possible?
- Which security requirements apply?

This allows consumers and implementation teams to work from a shared agreement.

## RAML and OpenAPI

RAML and OpenAPI are API description formats. They describe the interface; they are not the business implementation itself.

A specification can contain reusable data types, examples, parameters, responses and security information. APIkit can use a specification to support contract-driven routing and implementation.

## APIkit request matching

When APIkit receives a request, think about matching in layers:

1. Is the base path correct?
2. Does the resource path match?
3. Does the HTTP method match?
4. Is the request content type supported?
5. Is the request valid according to the contract?
6. If routing succeeds, did the implementation fail?

This model helps diagnose common 404, 405, 406 and 415 problems.

## 405 Method Not Allowed

A 405 commonly means the resource exists but the requested HTTP method is not supported by the contract or route. For example, sending OPTIONS or DELETE to a path that only defines GET can produce a method-related error depending on the configuration.

## 415 Unsupported Media Type

A 415 commonly indicates that the server does not accept the request's media type for that operation. Check the `Content-Type` header, request body and contract.

## 406 Not Acceptable

A 406 can occur when the requested response representation cannot be produced according to the accepted media types and configured API behavior.

## CORS and OPTIONS

Browsers can send a CORS preflight OPTIONS request before the actual request. This is browser behavior and is separate from the business API operation.

If the server does not handle the preflight correctly, the browser may block the actual request even when the API itself works in Postman.

## Validation

Validation belongs at the appropriate boundary. Basic contract validation should happen close to the API boundary so invalid requests are rejected before expensive downstream work.

Business validation can require downstream data, so it may occur later.

## API errors

Use a consistent error contract. A useful error response normally includes a machine-readable error code, a human-readable message and a correlation identifier when appropriate.

Do not return stack traces, credentials, SQL text or internal infrastructure details to public consumers.

## Idempotency

For operations that may be retried, define how duplicate requests are recognized. This is especially important for financial or order-creation operations.

## Pagination

A collection endpoint should not assume that returning every record is always safe. Pagination controls response size and processing cost. Document page size, limits, ordering and continuation behavior clearly.

## Versioning

API versioning protects consumers when incompatible contract changes are necessary. Before creating a new version, determine whether the proposed change is actually backward incompatible.

## Production checklist

Before exposing an API, verify:

- contract is documented;
- validation is defined;
- errors are consistent;
- security is defined;
- timeouts are bounded;
- sensitive fields are protected;
- logs do not expose secrets;
- dependencies have failure handling;
- tests cover positive and negative cases;
- deployment configuration is externalized.
