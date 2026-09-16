# 17 — Real-World Project: Banking Integration Platform

This project combines the concepts from the guide into one realistic but synthetic banking integration platform.

## Business requirement
A bank wants APIs for customer onboarding, accounts, balance lookup and transfers. A web/mobile client should consume a simple Experience API while backend integrations remain separated.

## Architecture

```text
                         Web / Mobile
                              |
                              v
                    +-------------------+
                    | Experience API    |
                    | /api/v1           |
                    +---------+---------+
                              |
                              v
                    +-------------------+
                    | Process API       |
                    | business rules    |
                    +----+---------+----+
                         |         |
               +---------+         +----------+
               v                              v
      +-------------------+          +-------------------+
      | Customer SAPI     |          | Account SAPI      |
      +---------+---------+          +---------+---------+
                |                              |
                +-------------+----------------+
                              v
                           Database
                              |
                              v
                     Payment / MQ SAPI
```

## Suggested API contract

```text
POST   /accounts
GET    /accounts/{accountNumber}
PATCH  /accounts/{accountNumber}
DELETE /accounts/{accountNumber}
GET    /accounts/{accountNumber}/balance
POST   /transfers
GET    /transactions/{transactionId}
```

## Build phases

### Phase 1 — Foundation
Create Mule projects, properties, logging and a health endpoint.

### Phase 2 — API contract
Create RAML/OAS and APIkit scaffolding.

### Phase 3 — Database
Create synthetic customer/account/transaction tables and implement CRUD with parameterized queries.

### Phase 4 — DataWeave
Normalize database results into stable API responses.

### Phase 5 — Error handling
Add validation, not-found errors, database errors, downstream errors and a standard error response.

### Phase 6 — Messaging
Add asynchronous payment/notification processing with JMS/IBM MQ where available.

### Phase 7 — Security
Add HTTPS and an appropriate authentication/authorization design. Store secrets securely.

### Phase 8 — Testing
Add MUnit for every important path and Postman scenarios for API-level testing.

### Phase 9 — Deployment
Package with Maven and document deployment to CloudHub/CloudHub 2.0, on-premises or Runtime Fabric according to the target environment.

### Phase 10 — Operations
Add correlation IDs, useful logs, metrics, alerts and incident runbooks.

## Banking safety
All account numbers, customers, balances and transactions in this learning project must be synthetic. Never use real customer credentials or financial data in a public repository.

## Definition of done
- API specification exists
- implementation exists
- positive and negative tests exist
- secrets are externalized
- error contract is documented
- logs are safe and useful
- deployment instructions exist
- rollback is documented
- monitoring/runbook exists
