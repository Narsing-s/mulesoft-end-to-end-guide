# Reference Implementations

These examples are intentionally small. Copy the idea into Anypoint Studio and then extend it.

## Example 1 — HTTP JSON API

Conceptual flow:

```text
HTTP Listener
  -> Set Variable
  -> Transform Message
  -> HTTP Response
```

Example XML shape:

```xml
<flow name="hello-api">
    <http:listener config-ref="HTTP_Listener_config" path="/hello"/>
    <ee:transform>
        <ee:message>
            <ee:set-payload><![CDATA[%dw 2.0
output application/json
---
{
  message: "Hello from MuleSoft",
  timestamp: now()
}]]></ee:set-payload>
        </ee:message>
    </ee:transform>
</flow>
```

The namespace declarations and connector versions depend on your Mule application/runtime.

## Example 2 — Read query parameter

```dw
%dw 2.0
output application/json
---
{
  accountNumber: attributes.queryParams.accountNumber default "not-provided"
}
```

## Example 3 — Controlled error response

Use an error handler to convert internal failures into a stable consumer response. Do not expose stack traces.

```dw
%dw 2.0
output application/json
---
{
  error: "REQUEST_FAILED",
  message: "The request could not be completed",
  correlationId: correlationId default null
}
```

## Example 4 — Parameterized DB query

Use connector parameters rather than string concatenation:

```sql
SELECT id, full_name, email
FROM customer
WHERE account_number = :accountNumber
```

Bind `accountNumber` through the DB connector parameter map.

## Example 5 — DataWeave customer mapping

```dw
%dw 2.0
output application/json
---
payload map (customer) -> {
  id: customer.id,
  name: customer.fullName,
  contact: {
    email: customer.email,
    mobile: customer.mobile
  }
}
```

## Example 6 — Safe filtering

```dw
%dw 2.0
output application/json
---
payload filter ((item) -> lower(item.name default "") contains "ravi")
```

## Important
Examples are teaching references, not production-ready applications. Add validation, security, observability, tests and environment configuration before production use.
