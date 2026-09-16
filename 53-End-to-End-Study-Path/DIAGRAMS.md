# Diagram Handbook

Every major chapter should include at least one diagram. The purpose is not decoration: a diagram must show **data, control flow, boundaries or failure behavior**.

## 1. Basic Mule event

```text
                MULE EVENT
                    │
          ┌─────────┴─────────┐
          │                   │
       MESSAGE             VARIABLES
          │                   │
     ┌────┴────┐              │
     │         │              │
  PAYLOAD  ATTRIBUTES       vars.*
```

## 2. HTTP API request lifecycle

```text
Client
  │ HTTP request
  ▼
Load Balancer / Gateway
  │
  ▼
HTTP Listener
  │
  ▼
APIkit / Router
  │
  ▼
Validate
  │
  ▼
DataWeave
  │
  ▼
Business Logic
  │
  ├───────────────┐
  ▼               ▼
Database       Downstream API
  │               │
  └───────┬───────┘
          ▼
   Error Handler
          │
          ▼
      HTTP Response
```

## 3. API-led connectivity

```text
Consumers
   │
   ▼
Experience APIs
   │  consumer-specific experience
   ▼
Process APIs
   │  orchestration/business process
   ▼
System APIs
   │  system access/reusable boundary
   ├─────────┬─────────┐
   ▼         ▼         ▼
 DB        MQ/SaaS   Legacy
```

## 4. Error path

```text
Request
  │
  ▼
Process
  │
  ├── success ──────────────► Response 2xx
  │
  └── error
       │
       ▼
   Classify error
       │
   ┌───┼───────────────┐
   ▼   ▼               ▼
Retry  Recover       Propagate
   │    │               │
   ▼    ▼               ▼
Success Fallback     Error contract
```

## 5. Reliable messaging

```text
Producer
   │
   ▼
Queue
   │
   ▼
Consumer
   │
   ├── success ──► ACK ──► Complete
   │
   ├── transient ─► Retry ─► Queue again
   │
   └── poison ───► DLQ ───► Investigate / Replay
```

## 6. Deployment pipeline

```text
Developer
   │
   ▼
Git commit / PR
   │
   ▼
Build + Maven
   │
   ▼
MUnit + quality checks
   │
   ▼
Package artifact
   │
   ▼
DEV
   │ smoke test
   ▼
TEST / QA
   │ validation
   ▼
UAT / STAGE
   │ approval
   ▼
PRODUCTION
   │
   ▼
Observe → Verify → Rollback if required
```

## 7. Control plane vs runtime plane

```text
              ANYPOINT CONTROL PLANE
     ┌─────────────────────────────────────┐
     │ Access Management                   │
     │ Exchange / API Manager              │
     │ Runtime Manager / Platform Services │
     └──────────────────┬──────────────────┘
                        │ manage/deploy
                        ▼
                RUNTIME PLANE
     ┌─────────────────────────────────────┐
     │ CloudHub 2.0 / CloudHub             │
     │ Runtime Fabric / Hybrid             │
     │ Mule Runtime instances              │
     └─────────────────────────────────────┘
```

Runtime hosting and control-plane capabilities vary by deployment model and control plane; version-sensitive diagrams must state their assumptions.

## 8. Production observability

```text
                    Mule Application
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
           Logs          Metrics       Traces
             │             │             │
             └─────────────┼─────────────┘
                           ▼
                    Dashboard / Alert
                           │
                           ▼
                    Incident Response
                           │
                  ┌────────┴────────┐
                  ▼                 ▼
               Mitigate             RCA
                  │                 │
                  └────────┬────────┘
                           ▼
                    Prevent / Improve
```

## 9. Banking capstone

```text
                         Mobile / Web / Partner
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ Experience API  │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │  Process API    │
                         └────────┬────────┘
                                  │
                  ┌───────────────┼───────────────┐
                  ▼               ▼               ▼
          Customer SAPI     Account SAPI     Payment SAPI
                  │               │               │
                  ▼               ▼               ▼
                 DB              DB              MQ
                                                  │
                                                  ▼
                                             Notification

Security → MUnit → CI/CD → Deploy → Observe → Recover
```

## 10. Diagram rules

1. Arrows must represent actual direction.
2. Label asynchronous boundaries explicitly.
3. Label external systems separately from Mule components.
4. Show trust/security boundaries for security topics.
5. Show failure paths for reliability topics.
6. Show data transformation points.
7. Avoid diagrams that contain unexplained acronyms.
8. Prefer a simple diagram before a detailed architecture diagram.
9. Keep diagrams consistent across beginner and advanced chapters.
10. Every capstone feature should have a corresponding data-flow diagram.
