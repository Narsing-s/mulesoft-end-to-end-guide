# Postman test plan

Use synthetic data only.

## Health
`GET /health`

Expected: HTTP 200 and a simple health response.

## Create account
`POST /accounts`

Headers:
```text
Content-Type: application/json
```

Body:
```json
{
  "fullName": "Ravi Kumar",
  "dateOfBirth": "1992-01-10",
  "mobileNumber": "9000000000",
  "email": "ravi@example.test",
  "address": "Vizag"
}
```

## Lookup
`GET /accounts/DEMO00000001`

Verify the response contains only fields intended for the consumer.

## Not found
`GET /accounts/DOES-NOT-EXIST`

Expected: HTTP 404 with the documented error structure.

## Transfer
`POST /transfers`

Header:
```text
Idempotency-Key: demo-key-001
```

Body:
```json
{
  "fromAccount": "DEMO00000001",
  "toAccount": "DEMO00000002",
  "amount": 1000,
  "currency": "INR"
}
```

For learning, this must not move real money.

## Negative tests
- missing Content-Type
- malformed JSON
- missing required field
- invalid amount
- duplicate idempotency key
- nonexistent account
- simulated downstream timeout
