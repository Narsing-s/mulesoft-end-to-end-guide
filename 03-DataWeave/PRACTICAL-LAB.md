# DataWeave Practical Lab

These exercises are intentionally small. Run them in Transform Message/DataWeave Playground and change the input yourself.

## Lab 1 — rename fields
Input:
```json
{"firstName":"Ravi","age":30}
```
Output:
```json
{"name":"Ravi","age":30}
```

```dw
%dw 2.0
output application/json
---
{
  name: payload.firstName,
  age: payload.age
}
```

## Lab 2 — filter
Input:
```json
{"customers":[{"name":"Priya","active":true},{"name":"Ravi","active":false}]}
```

```dw
%dw 2.0
output application/json
---
payload.customers filter ((item) -> item.active == true)
```

## Lab 3 — map
```dw
%dw 2.0
output application/json
---
payload.customers map ((item) -> {
  customerName: item.name,
  active: item.active
})
```

## Lab 4 — total with reduce
```dw
%dw 2.0
output application/json
---
{
  total: payload.transactions reduce ((item, accumulator = 0) -> accumulator + item.amount)
}
```

## Lab 5 — null-safe field
```dw
%dw 2.0
output application/json
---
{
  email: payload.email default "not-provided"
}
```

## Lab 6 — group transactions
```dw
%dw 2.0
output application/json
---
payload.transactions groupBy ((item) -> item.account)
```

## Lab 7 — JSON to XML
```dw
%dw 2.0
output application/xml
---
{
  customer: {
    name: payload.name,
    email: payload.email
  }
}
```

## Challenge
Given 20 synthetic transactions, return:
- total amount
- transaction count
- only successful transactions
- transactions grouped by account
- highest transaction

Write the expected output before running the transformation.
