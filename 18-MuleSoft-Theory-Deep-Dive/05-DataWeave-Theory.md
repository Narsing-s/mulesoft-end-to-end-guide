# DataWeave Theory — How Transformations Really Work

## 1. What DataWeave is

DataWeave is MuleSoft's expression and transformation language. It is used to read data, calculate values, select fields, change structures, validate content and produce a new representation.

The most important idea is this:

> DataWeave does not exist to make JSON look pretty. It exists to express the business transformation between an input data model and an output data model.

For example, a database may return a customer record with technical column names while an API contract requires a different public representation. DataWeave is the layer where that difference can be expressed clearly.

## 2. The input/output mental model

Before writing DataWeave, answer four questions:

1. What is the input type?
2. What is the input structure?
3. What exact output structure is required?
4. Which business rules change the input into the output?

A transformation should be designed from the required output backward to the available input.

## 3. DataWeave header and body

```dw
%dw 2.0
output application/json
---
{
  message: "Hello"
}
```

The header declares the language version and output configuration. The `---` separates declarations from the expression that produces the result.

The expression after `---` is the important part: it evaluates to the value that becomes the transformation result.

## 4. Objects and arrays

An object is a collection of named fields:

```json
{
  "name": "Ravi",
  "city": "Vizag"
}
```

An array is an ordered collection:

```json
[
  {"name":"Ravi"},
  {"name":"Priya"}
]
```

This distinction matters because different operators work on different shapes. `map` is designed for arrays, while `mapObject` works with object key/value pairs.

## 5. Selectors

A selector retrieves data from the current value.

```dw
payload.name
payload.customer.email
payload.customers[0].name
```

When selectors are chained, each step depends on the previous structure. Therefore, a selector that works for one payload shape may fail for another.

## 6. map

Use `map` when an array must become another array.

```dw
payload.customers map (customer) -> {
  fullName: customer.name,
  location: customer.city
}
```

If five customers are supplied, the expression evaluates the mapping function for each customer and produces five output objects.

## 7. filter

Use `filter` when the requirement is to keep only records satisfying a condition.

```dw
payload.customers filter ((customer) -> customer.active == true)
```

`filter` does not normally redesign the records. Its primary job is selection.

## 8. mapObject

Use `mapObject` when the input itself is an object and the requirement concerns its keys and values.

Do not choose `mapObject` simply because the word "object" appears in the business requirement. First inspect the actual input type.

## 9. reduce

`reduce` is useful when many values must be accumulated into one result.

Typical uses include totals, counters and custom accumulation rules.

The important mental model is:

> Start with an accumulator, process one item, produce a new accumulator, then continue.

## 10. Null handling

Real integration data is incomplete. A field can be missing, explicitly null, empty, malformed or present with an unexpected type.

A default can provide a controlled fallback:

```dw
payload.email default "not-provided"
```

However, defaults should not hide invalid business data. If email is mandatory for customer creation, silently replacing a missing email with a placeholder may be incorrect. Validation belongs at the appropriate business boundary.

## 11. Type coercion

Mule integrations frequently cross type boundaries. A database may provide a numeric value while an API contract expects text, or a string may need to become a Date.

Explicit conversion is easier to reason about than relying on accidental coercion.

```dw
payload.accountId as String
```

For dates, always understand the incoming format before converting it.

## 12. Functions

Functions allow repeated transformation logic to be named and reused.

```dw
fun normalizeName(value) =
    upper((value default "") trim)
```

Then:

```dw
{
  name: normalizeName(payload.name)
}
```

A good function has one clear responsibility. A giant function containing unrelated business rules becomes difficult to test and maintain.

## 13. Conditional logic

For a small two-way decision:

```dw
if (payload.balance > 0)
  "ACTIVE"
else
  "ZERO"
```

For multiple named cases, `match` can make the intent clearer.

## 14. Dates and time zones

Dates are a common integration failure point because systems can disagree about format, time zone and precision.

Do not treat a date string as automatically meaningful. Document:

- expected input format;
- whether a time is included;
- whether the value represents a local time or an instant;
- required output format;
- required time zone.

For cross-region systems, a correct transformation must preserve the intended instant, not merely change the appearance of the string.

## 15. JSON, XML and CSV

DataWeave can transform between common representations.

The transformation logic should focus on meaning rather than simply copying syntax.

For CSV, think about headers and rows. For XML, think about hierarchy and namespaces. For JSON, think about objects and arrays.

## 16. MIME type and metadata

A transformation can be logically correct but still fail if the runtime interprets the data using the wrong media type or metadata.

When troubleshooting a transformation, inspect both:

- the actual value;
- the metadata/type information available to the runtime.

Do not assume that text resembling JSON is necessarily being treated as JSON.

## 17. Streaming and memory

Large payloads change the engineering problem. A transformation that is comfortable for a 10 KB payload may behave differently for a very large dataset.

When working with large data, ask:

- Does the operation require the whole collection in memory?
- Can the source and target support streaming?
- Are there repeated transformations?
- Is the data unnecessarily copied?
- Can the business requirement be processed incrementally?

Performance is not only about writing shorter DataWeave expressions; it is about controlling data volume and memory behavior.

## 18. Common DataWeave mistakes

### Mistake: using `map` on an object

First determine whether the value is an array or object.

### Mistake: assuming a field exists

Production payloads contain missing values. Use validation or controlled null handling.

### Mistake: comparing different types

A number and a numeric string may not behave as expected in every expression. Make the intended type explicit.

### Mistake: mixing transformation and unrelated orchestration

DataWeave should transform data. Database calls, network calls and retries belong to the appropriate Mule components and scopes.

### Mistake: hiding business errors with defaults

A default is not a substitute for validation.

## 19. Debugging a failed transformation

Use this order:

1. Capture the exact input.
2. Identify the input type.
3. Inspect the failing selector or operator.
4. Check for null or missing fields.
5. Check the actual array/object shape.
6. Check type coercion.
7. Test the smallest failing expression.
8. Add the remaining transformation logic incrementally.
9. Add a regression test for the failure.

This approach is faster than changing many expressions at once.

## 20. Production design rules

A production transformation should be:

- understandable by another engineer;
- deterministic for the same valid input;
- explicit about required fields;
- safe with null and unexpected data;
- covered by automated tests;
- appropriate for the expected payload size;
- free from unnecessary sensitive-data exposure in logs.

## 21. Practice sequence

### Beginner
Transform one JSON object into another.

### Intermediate
Filter an array, rename fields, calculate a derived field and handle missing values.

### Advanced
Transform nested customer/account/transaction data, group records, calculate totals and produce a stable API response.

### Production challenge
Design a transformation for a large transaction dataset. Explain what happens if one optional field is missing, one record has the wrong type, and the input becomes much larger than expected.

## 22. Interview understanding

You should be able to explain:

- why DataWeave is used;
- the difference between payload and attributes;
- object versus array;
- `map` versus `mapObject`;
- `filter` versus transformation;
- null handling;
- type coercion;
- functions and modules;
- date/time handling;
- MIME type problems;
- streaming considerations;
- how to debug a transformation failure.

## Key takeaway

Strong DataWeave skills come from understanding data shape first and syntax second. If you can clearly describe the input, required output and business rules, the correct transformation becomes much easier to design and test.
