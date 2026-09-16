# 03 — DataWeave: From Zero to Advanced

DataWeave is MuleSoft's language for reading, transforming and producing data. If JSON comes in and a different JSON/XML/CSV shape must go out, DataWeave is usually the tool.

## Basic structure

```dw
%dw 2.0
output application/json
---
payload
```

`%dw 2.0` selects the language version. `output` describes the result format. `---` separates the header from the expression that produces the result.

## Objects

```dw
%dw 2.0
output application/json
---
{
  name: payload.fullName,
  email: payload.email
}
```

## Arrays and map

```dw
%dw 2.0
output application/json
---
payload.customers map (customer) -> {
  name: customer.name,
  city: customer.city
}
```

`map` transforms each item of an array.

## filter

```dw
%dw 2.0
output application/json
---
payload.customers filter ((customer) -> customer.city == "Hyderabad")
```

`filter` keeps items that satisfy a condition.

## mapObject
Use `mapObject` when the input is an object and you want to transform its key/value pairs.

## reduce
Use `reduce` when multiple values must be accumulated into one result, such as a total.

## groupBy
Group records by a key, for example customers by city.

## flatten
Convert nested arrays into a simpler array when the business requirement calls for it.

## null handling
Real integrations contain missing fields. Learn `default`, conditional checks and safe navigation instead of assuming every field exists.

Example:

```dw
(payload.email default "not-provided")
```

## Conditional logic

```dw
if (payload.balance > 0)
  "ACTIVE"
else
  "ZERO-BALANCE"
```

## match
Use `match` when several named cases make the business rule easier to read.

## Dates
Learn how to parse, format and compare dates and DateTime values. Always be explicit about expected input format and time zone when systems cross regions.

## Reusable functions

```dw
fun maskAccount(value) =
  if (value == null) null
  else "****" ++ (value as String)[-4 to -1]
```

Use reusable modules for shared transformations.

## Format conversion
Practice:

```text
JSON -> JSON
JSON -> XML
CSV  -> JSON
XML  -> JSON
JSON -> CSV
```

## Practical project exercise
Input:

```json
{"customers":[{"name":"Priya","city":"Hyderabad","active":true},{"name":"Ravi","city":"Vizag","active":false}]}
```

Create three transformations:
1. Return only active customers.
2. Search for a supplied customer name.
3. Return a normalized customer object with selected fields.

## Advanced topics to practice
- type coercion
- overloaded functions
- modules
- custom types
- pattern matching
- update operator
- recursive transformations
- streaming considerations
- memory-efficient transformations
- error-safe transformations

## Golden rule
Do not learn DataWeave by memorizing functions. Start with the shape of the input, define the required output shape, then write the smallest transformation that connects the two.
