# 05 — API-Led Connectivity

API-led connectivity is an architectural approach that separates reusable access to systems from business orchestration and consumer-specific experience needs.

## Three common layers

### System API (SAPI)
Provides controlled access to a system of record such as a database, CRM or core service.

### Process API (PAPI)
Combines and applies business rules across one or more systems.

### Experience API (EAPI)
Shapes data and interaction for a particular consumer such as web, mobile or partner applications.

## Example

```text
Mobile Banking App
       |
       v
EAPI: mobile-friendly response
       |
       v
PAPI: account + customer + transaction rules
       |
       +------> Customer SAPI
       +------> Account SAPI
       +------> Payment SAPI
```

## Why separate them?
The layers can evolve independently. A customer system integration can be reused by multiple business processes instead of every consumer connecting directly to the system.

## What not to do
Do not automatically create three APIs for every tiny integration. Architecture should follow actual reuse, ownership, security and business boundaries.

## Practical exercise
Build a banking balance journey:
1. EAPI accepts account request.
2. PAPI validates and orchestrates.
3. Account SAPI retrieves account data.
4. PAPI applies response rules.
5. EAPI returns only consumer-safe fields.

## Advanced design questions
- Where should validation live?
- Where should business rules live?
- Which system owns the source of truth?
- Which data should never leave the backend?
- How should errors be normalized?
- How should APIs be versioned?
