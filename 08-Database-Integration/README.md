# 08 — Database Integration

## What is database integration?
Mule can execute SQL against a relational database and transform the result into an API response or send it to another system.

## Core operations
- SELECT — read rows
- INSERT — create rows
- UPDATE — change rows
- DELETE — remove rows
- stored procedure — execute database-owned logic when appropriate

## Parameterized SQL
Prefer parameters rather than string concatenation.

Conceptual example:

```sql
SELECT account_number, balance
FROM accounts
WHERE customer_id = :customerId
```

The exact parameter syntax depends on the Database connector configuration.

## Practical banking example
Tables:

```text
customers
accounts
transactions
beneficiaries
```

Relationship:

```text
customer 1 ---- many accounts
account  1 ---- many transactions
account  1 ---- many beneficiaries
```

## Transactions
A transaction groups database operations so they can succeed or roll back as one logical unit, subject to the database and Mule transaction configuration. Learn local and XA/distributed transaction concepts before using them.

## Connection pooling
Pooling reuses database connections instead of opening a new connection for every operation. Configure limits and timeouts according to workload and database capacity.

## Common failures
- wrong URL/host/port
- wrong credentials
- database unavailable
- table/column does not exist
- SQL syntax error
- connection pool exhaustion
- lock/deadlock
- timeout
- transaction rollback

## Security
Do not commit passwords. Use secure configuration. Avoid exposing sensitive columns in API responses.

## Hands-on
Build customer registration and account lookup. Add duplicate detection, parameterized SQL, error handling and MUnit tests.
