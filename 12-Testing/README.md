# 12 — Testing with MUnit and Postman

## Why test?
An integration can fail even when the happy path works. Tests should cover successful requests, validation failures, downstream failures, transformations and important edge cases.

## Postman
Use Postman for manual/API-level testing. Save requests, environments and expected scenarios in a collection.

## MUnit
MUnit is MuleSoft's testing framework for Mule applications.

A useful test structure is:

```text
Set up test data
      |
Mock external dependency
      |
Execute flow
      |
Assert result
```

## Mocking
External systems such as payment APIs should normally be mocked in unit tests so tests are deterministic and do not move real money or depend on a live third party.

## Assertions
Assert important values, status codes, errors and transformed payloads. Avoid tests that pass while the core business result is wrong.

## Error-path tests
For every important integration, test:
- invalid input
- missing required field
- downstream 4xx
- downstream 5xx
- timeout
- database failure
- authentication failure
- duplicate request where relevant

## Coverage
Coverage is useful, but high percentage alone does not prove quality. A small number of meaningful tests is better than many tests that assert nothing important.

## Practical banking tests
Create tests for:
1. account creation success
2. duplicate account rejection
3. account lookup success
4. account not found
5. transfer validation failure
6. payment dependency timeout
7. notification failure
8. DataWeave transformation

## CI rule
Run automated tests before packaging and deployment. A failed critical test should prevent promotion.
