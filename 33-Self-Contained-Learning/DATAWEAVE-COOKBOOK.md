# DataWeave Cookbook — Learn by Example

This is an internal cookbook. Each example has input, transformation and expected output.

## 1. Rename fields

Input:

```json
{"firstName":"Ravi","age":30}
```

```dataweave
%dw 2.0
output application/json
---
{
  name: payload.firstName,
  age: payload.age
}
```

Output:

```json
{"name":"Ravi","age":30}
```

## 2. Map an array

```dataweave
%dw 2.0
output application/json
---
payload map {
  name: $.name,
  adult: $.age >= 18
}
```

## 3. Filter records

```dataweave
%dw 2.0
output application/json
---
payload filter ($.status == "ACTIVE")
```

## 4. Filter then map

```dataweave
%dw 2.0
output application/json
---
(payload filter ($.balance > 10000)) map {
  customer: $.name,
  balance: $.balance
}
```

## 5. Default missing values

```dataweave
%dw 2.0
output application/json
---
{
  name: payload.name default "Unknown",
  email: payload.email default "not-provided"
}
```

## 6. Safe navigation

```dataweave
payload.customer?.address?.city
```

## 7. Conditional output

```dataweave
%dw 2.0
output application/json
---
{
  name: payload.name,
  category: if (payload.balance >= 100000) "PREMIUM" else "STANDARD"
}
```

## 8. Group records

```dataweave
%dw 2.0
output application/json
---
payload groupBy $.bankName
```

## 9. Remove duplicate records

```dataweave
%dw 2.0
output application/json
---
payload distinctBy $.accountNumber
```

## 10. Sort

```dataweave
%dw 2.0
output application/json
---
payload orderBy $.balance
```

## 11. Reduce to a total

```dataweave
%dw 2.0
output application/json
---
{
  total: payload reduce ((item, total = 0) -> total + item.amount)
}
```

## 12. Convert strings to numbers

```dataweave
%dw 2.0
output application/json
---
{
  amount: payload.amount as Number
}
```

## 13. Date formatting

```dataweave
%dw 2.0
output application/json
---
{
  formatted: payload.date as Date {format: "yyyy-MM-dd"}
}
```

## 14. JSON to XML

```dataweave
%dw 2.0
output application/xml
---
customer: {
  name: payload.name,
  email: payload.email
}
```

## 15. XML to JSON

```dataweave
%dw 2.0
output application/json
---
{
  name: payload.customer.name,
  city: payload.customer.address.city
}
```

## 16. Dynamic object keys

```dataweave
%dw 2.0
output application/json
---
(payload map ((item) -> {(item.code): item.value})) reduce ((item, result = {}) -> result ++ item)
```

## 17. Reusable function

```dataweave
%dw 2.0
output application/json
fun maskAccount(value) = "****" ++ (value[-4 to -1] default "")
---
{account: maskAccount(payload.accountNumber)}
```

## 18. Banking transformation

Input:

```json
{
  "customer": {"name":"Ravi","mobile":"9999999999"},
  "account": {"number":"123456789012","balance":55000}
}
```

Output:

```dataweave
%dw 2.0
output application/json
---
{
  customerName: payload.customer.name,
  mobile: payload.customer.mobile,
  account: {
    maskedNumber: "********" ++ payload.account.number[-4 to -1],
    balance: payload.account.balance
  }
}
```

## Practice ladder

- Beginner: rename, default, map, filter.
- Intermediate: groupBy, reduce, dates, XML, reusable functions.
- Advanced: dynamic keys, modules, typed functions, streaming-aware transformations, large-payload performance.
- Production: never expose sensitive account data just because it exists in the source payload; deliberately select the response fields.
