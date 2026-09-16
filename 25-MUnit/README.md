# MUnit — Practical Testing

MUnit is MuleSoft's testing framework for Mule applications.

## What to test
1. Happy path.
2. Validation failure.
3. Downstream timeout.
4. Downstream 4xx/5xx.
5. DataWeave edge cases.
6. Database failure.
7. Retry behavior.
8. Error response mapping.
9. Sensitive-data masking.

## Test structure
A useful test normally has:
- Set up input and variables.
- Mock external systems.
- Execute the flow.
- Verify calls and behavior.
- Assert the payload/attributes/errors.

## Example thinking
If a customer flow calls a database, the unit test should not require the real production database. Mock the DB operation and verify that the flow sends the expected SQL parameters and maps the result correctly.

## Important assertions
Check both result and side effects:
- response status
- response body
- error type
- DB operation called once
- queue publish called once
- notification not sent after failure

## Coverage is not correctness
100% line coverage does not guarantee correct behavior. Test business rules and failure paths.

## CI
Run MUnit from Maven in CI. Fail the build when tests fail. Keep test data deterministic and never depend on real production credentials.
