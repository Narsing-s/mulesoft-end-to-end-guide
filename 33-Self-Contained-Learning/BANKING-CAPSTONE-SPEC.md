# Banking Capstone — Internal Specification

## Purpose

Build a synthetic banking platform that teaches integration from API design through production operations.

## Services

```text
                Mobile / Web / Partner
                         |
                         v
                 Experience API
                         |
                         v
                   Process API
             +-----------+-----------+
             |           |           |
             v           v           v
        Customer API  Account API  Payment API
             |           |           |
             +-----------+-----------+
                         |
                    System layer
                    /     |     \
                   v      v      v
                  DB      MQ    External service
```

## Customer operations

- create customer
- get customer
- update customer
- deactivate customer
- duplicate validation

## Account operations

- create account
- retrieve account
- balance inquiry
- account status
- account update

Sensitive account identifiers should be masked in responses and logs unless there is a clear business requirement to expose them.

## Payment operations

- create beneficiary
- validate beneficiary
- initiate transfer
- check transfer status
- transaction history
- notification event

## Transaction safety

For a transfer:

```text
Validate request
      ↓
Validate beneficiary
      ↓
Check balance
      ↓
Create transaction/idempotency record
      ↓
Debit source
      ↓
Credit destination
      ↓
Publish notification event
      ↓
Return transaction status
```

If a step can be repeated, define how duplicate requests are detected before implementation.

## Example API response

```json
{
  "transactionId":"TXN-10001",
  "status":"COMPLETED",
  "amount":2500,
  "currency":"INR",
  "message":"Transfer completed"
}
```

## Error model

```json
{
  "code":"BANK-ACCOUNT-NOT-FOUND",
  "message":"The requested account was not found",
  "correlationId":"generated-or-propagated-id",
  "timestamp":"2026-01-01T10:00:00Z"
}
```

Do not return stack traces, SQL statements, passwords, tokens or internal hostnames to clients.

## Required learning stages

1. Design contract.
2. Create API project.
3. Implement customer flow.
4. Add database.
5. Add account flow.
6. Add error handling.
7. Add API-led layers.
8. Add payment workflow.
9. Add messaging.
10. Add security.
11. Add MUnit.
12. Add CI/CD.
13. Deploy to a non-production environment.
14. Add monitoring.
15. Simulate failures.
16. Perform incident investigation.
17. Write RCA.

## Capstone acceptance criteria

The learner must be able to explain every processor used, demonstrate successful and failed requests, show tests, explain security decisions, and troubleshoot at least five intentionally introduced failures.
