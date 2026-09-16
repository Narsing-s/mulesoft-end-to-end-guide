# Error and Debugging Playbook

## The universal debugging method

```text
Reproduce
  ↓
Identify layer
  ↓
Read error type/message
  ↓
Find failing processor
  ↓
Inspect payload/attributes/vars
  ↓
Check external dependency
  ↓
Fix root cause
  ↓
Add regression test
```

## HTTP errors

### 400 — Bad Request
Usually means the request is invalid for the API's expected input.

Check:
- JSON syntax
- required fields
- parameter types
- API contract
- content type

### 401 — Unauthorized
Check whether credentials/token are present, valid and not expired.

### 403 — Forbidden
Authentication may have succeeded but access is not permitted.

### 404 — Not Found
Check host, base path, resource path and deployed version.

### 405 — Method Not Allowed
The path exists but the HTTP method is not accepted. Check GET/POST/PATCH/DELETE and API routing.

### 406 — Not Acceptable
Check the requested response media type and what the API supports.

### 415 — Unsupported Media Type
Check `Content-Type`. A JSON body normally needs a JSON content type when the API contract requires it.

### 500 — Internal Server Error
Find the first meaningful application error, not merely the final HTTP status.

### 502 / 503 / 504
Treat these as a boundary problem until proven otherwise: gateway, application availability, dependency availability, connection or timeout.

## Database debugging

Check in order:

1. Is the DB reachable?
2. Is the driver/configuration correct?
3. Is the connection pool exhausted?
4. Is the SQL valid?
5. Are parameter names/types correct?
6. Does the table/schema exist in the target environment?
7. Is a transaction required?
8. Is a timeout occurring?
9. Are duplicate/deadlock/constraint errors handled?

Never concatenate untrusted input directly into SQL when parameters can be used.

## JMS / MQ debugging

Check:

- queue name
- connection
- credentials
- acknowledgement behavior
- message format
- redelivery count
- retry policy
- dead-letter destination
- poison-message handling
- duplicate processing
- correlation ID

## TLS debugging

Check:

- certificate validity
- hostname/SAN
- truststore
- keystore
- private key
- certificate chain
- protocol compatibility
- environment-specific certificate configuration

## DataWeave debugging

Reduce the transformation to a tiny input.

```text
Original payload
      ↓
Inspect one field
      ↓
Test selector
      ↓
Test type
      ↓
Test condition
      ↓
Rebuild transformation
```

Common problems:

- object vs array confusion
- `null` vs missing field
- string vs number
- date parsing
- incorrect selector
- unexpected XML structure
- duplicate keys
- large payload memory pressure

## Production rule

Do not fix an incident only by changing code. Capture:

- symptom
- timestamp
- affected API
- correlation ID
- error type
- root cause
- contributing factors
- immediate mitigation
- permanent fix
- regression test
- monitoring improvement

That turns an incident into reusable engineering knowledge.
