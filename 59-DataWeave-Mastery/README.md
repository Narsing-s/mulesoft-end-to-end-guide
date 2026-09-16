# 59 — DataWeave Mastery

A dedicated DataWeave engineering track from first transformation to production-grade transformation design.

## 1. Learning sequence

```text
Syntax
  ↓
Types + literals
  ↓
Selectors
  ↓
Operators
  ↓
Functions
  ↓
map / filter / reduce
  ↓
mapObject / filterObject
  ↓
flatten / flatMap / groupBy / orderBy
  ↓
Objects + arrays + null handling
  ↓
Strings / dates / numbers
  ↓
CSV / XML / JSON / Java
  ↓
Modules + reusable functions
  ↓
Performance + streaming
  ↓
Testing + debugging
  ↓
Production transformations
```

## 2. Standard problem format

Every exercise should contain:

1. Business requirement
2. Input
3. Expected output
4. DataWeave code
5. Explanation line by line
6. Alternative solution when useful
7. Edge cases
8. Test cases
9. Performance note
10. Interview question

## 3. Core transformation patterns

Study and practice:

- field rename
- field selection
- nested selectors
- conditional fields
- default values
- null/empty handling
- map
- filter
- reduce
- distinctBy
- groupBy
- orderBy
- pluck
- mapObject
- filterObject
- flatten
- flatMap
- zip
- recursive functions
- dynamic keys
- type coercion
- date/time formatting
- string parsing
- numeric calculations
- lookup tables
- joins and correlation
- aggregation
- hierarchical JSON/XML conversion

## 4. Example

### Input

```json
[
  {"id":1,"name":"A","active":true,"salary":50000},
  {"id":2,"name":"B","active":false,"salary":60000},
  {"id":3,"name":"C","active":true,"salary":70000}
]
```

### Requirement
Return only active employees and expose a calculated annual bonus of 10%.

### DataWeave

```dataweave
%dw 2.0
output application/json
---
payload
  filter $.active
  map {
    id: $.id,
    name: $.name,
    bonus: $.salary * 0.10
  }
```

### Output

```json
[
  {"id":1,"name":"A","bonus":5000},
  {"id":3,"name":"C","bonus":7000}
]
```

## 5. Production engineering

Learn how to avoid unnecessary repeated traversals, preserve streaming where applicable, control memory usage, isolate reusable functions, validate input types and write deterministic transformations.

Never hide business-critical assumptions inside a complex one-line expression when a clearer function or intermediate variable improves maintainability.

## 6. Debugging checklist

When output is wrong:

- inspect the actual input shape
- verify the current payload type
- check selectors against arrays vs objects
- inspect null values
- verify type coercion
- isolate the smallest failing expression
- test with one record first
- add representative edge cases
- compare actual and expected output

## 7. Practice ladder

### Easy
Simple mapping, filtering, defaults and field selection.

### Medium
Nested transformations, grouping, aggregation, object operations and date handling.

### Advanced
Dynamic keys, reusable modules, recursive transformations, XML namespaces, streaming considerations and complex joins.

### Production
Large payloads, malformed input, backward-compatible contracts, performance constraints, testability and operational debugging.

## Completion gate

Given an unfamiliar input and exact expected output, explain the shape, choose the appropriate DataWeave operators, implement the transformation, test edge cases and explain the performance and maintainability trade-offs.