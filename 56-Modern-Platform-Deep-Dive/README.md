# 56 — Modern Platform Deep Dive

This chapter fills the remaining platform-level topics that are easy to miss when learning only Mule flows and connectors.

## 1. Anypoint Code Builder

Anypoint Code Builder supports API design, implementation and integration development from VS Code-based tooling. Current MuleSoft documentation describes workflows including API specification design, mocking, source control, Exchange publication and scaffolding for supported API specifications. citeturn1search1turn1search4

### Learning path

```text
API Requirement
      ↓
RAML / OAS / AsyncAPI / GraphQL
      ↓
Design + Mock
      ↓
Publish / Reuse in Exchange
      ↓
Scaffold implementation
      ↓
Build Mule flows
      ↓
DataWeave + Connectors
      ↓
Test
      ↓
Deploy
```

### Beginner exercise
Create a tiny customer API specification, mock the contract, scaffold the interface, implement one operation and run a local test.

### Production considerations
- source control
- Maven settings
- permissions
- organization/control-plane selection
- project workspace structure
- exact runtime/Java versions
- reproducible builds

## 2. API Gateway / Flex Gateway

MuleSoft documentation currently describes Flex Gateway as an API gateway that can be managed through Anypoint Platform or declarative configuration, with deployment options including containers and Kubernetes. citeturn1search7turn1search19

> Note: current MuleSoft documentation is beginning to use the **Omni Gateway** name for the product formally known as Flex Gateway. Version-sensitive chapters must identify the terminology used by the target environment. citeturn1search11

### Architecture

```text
Client
  │
  ▼
API Gateway
  │
  ├── TLS
  ├── Authentication
  ├── Authorization / Policies
  ├── Rate controls
  ├── Observability
  └── Routing
  │
  ▼
Mule API / Backend
```

### Learn both operating models

- managed gateway
- self-managed gateway
- connected mode
- local/declarative configuration
- Docker/container deployment
- Kubernetes deployment
- replicas and high availability
- TLS/mTLS
- policy automation
- CI/CD integration

## 3. Anypoint Monitoring

Anypoint Monitoring provides visibility into Mule flows and components through metrics, dashboards, alerts and log aggregation. Feature availability depends on the control plane and platform package. citeturn1search3

### Operations flow

```text
Mule Application
      │
 ┌────┼─────┐
 ▼    ▼     ▼
Logs Metrics Traces
 │     │     │
 └─────┼─────┘
       ▼
Dashboards / Alerts
       ▼
Incident
       ▼
Mitigation → RCA → Prevention
```

### Exercises
1. Define an error-rate alert.
2. Define a latency dashboard.
3. Search logs using a correlation identifier.
4. Create an incident timeline from metrics + logs.
5. Write a runbook for a recurring alert.

## 4. CloudHub 2.0 Private Spaces

Private Spaces are virtual, private and isolated areas in CloudHub 2.0. Current documentation covers private networks, VPN/transit-gateway connectivity, TLS contexts, firewall rules and environment/business-group association. citeturn0search0turn0search5

### Network representation

```text
Corporate Network
       │
   VPN / Transit
       │
       ▼
┌──────────────────────────┐
│ CloudHub 2.0 Private     │
│ Space                    │
│                          │
│  Firewall + TLS          │
│       │                  │
│   ┌───┴────┐             │
│   ▼        ▼             │
│ App A    App B            │
│ replicas replicas         │
└──────────────────────────┘
```

### Topics to master

- CIDR planning
- DNS
- ingress/egress
- firewall rules
- VPN
- transit gateway
- private connectivity
- TLS contexts
- internal endpoints
- environment association
- region selection
- replicas
- horizontal scaling
- application lifecycle

CloudHub 2.0 documentation also exposes APIs for private-space infrastructure and VPC endpoints, so advanced learners should understand both UI operations and automation concepts. citeturn0search6

## 5. CloudHub 2.0 scaling and deployment lifecycle

A deployment is more than uploading a JAR.

```text
Artifact
   ↓
Expected application state
   ↓
Replica provisioning
   ↓
Resource assignment
   ↓
Replica STARTING
   ↓
Application loaded
   ↓
Replica STARTED
   ↓
Smoke test
   ↓
Observe
```

MuleSoft's current deployment documentation describes this replica lifecycle and supports deployment to shared or private spaces. citeturn0search8

Current release notes also document newer CloudHub 2.0 capabilities such as horizontal pod autoscaling and outbound private connectivity; because these capabilities can depend on entitlements and platform versions, treat them as version-sensitive material. citeturn0search2

## 6. Runtime Fabric / Kubernetes bridge

A Mule engineer does not need to become a Kubernetes administrator, but should understand:

- pod/container concept
- deployment/replica concept
- service/ingress concept
- namespaces
- CPU/memory requests and limits
- readiness/liveness
- node capacity
- scheduling
- logs
- networking
- upgrades
- failure domains

### Mental model

```text
Kubernetes / Runtime Fabric
          │
          ▼
   Mule Application
      ┌───┴───┐
      ▼       ▼
   Replica  Replica
      │       │
      └──┬────┘
         ▼
      Service
         ▼
      Ingress
```

The goal is not memorizing Kubernetes commands. The goal is understanding what a deployment failure, unavailable replica, resource limit or ingress problem means for a Mule application.

## 7. Platform access management and auditability

Study:

- organizations
- business groups
- environments
- roles
- permissions
- least privilege
- client applications
- connected applications
- credential lifecycle
- audit logging
- separation of duties

Current MuleSoft documentation includes audit records for actions such as application deployment/start/stop/redeploy and CloudHub 2.0 private-space changes. citeturn0search11

### Example governance boundary

```text
Developer
  │
  ├── read development
  ├── deploy development
  └── no production administration

Release Engineer
  │
  ├── promote artifact
  └── production deployment permission

Platform Admin
  │
  ├── network
  ├── access
  └── platform configuration
```

## 8. Certificate and secret rotation

Do not treat rotation as a one-time security task.

```text
Inventory
   ↓
Expiry monitoring
   ↓
Create replacement
   ↓
Validate trust chain
   ↓
Update secret / keystore
   ↓
Deploy safely
   ↓
Smoke test
   ↓
Observe
   ↓
Revoke old credential
   ↓
Document evidence
```

Practice both planned rotation and emergency rotation after suspected compromise.

## 9. API automation

Advanced learners should understand that platform work can be automated through APIs and CI/CD rather than performed manually in a UI.

Example lifecycle:

```text
Git commit
  ↓
CI build
  ↓
MUnit
  ↓
Package
  ↓
Authenticate automation client
  ↓
Deploy / configure
  ↓
Smoke test
  ↓
Collect deployment evidence
  ↓
Promote or rollback
```

## 10. Modern API contract coverage

Do not limit API learning to REST alone. The current Anypoint Code Builder documentation covers workflows involving OAS, RAML, AsyncAPI, GraphQL and gRPC in supported scenarios. citeturn1search15

The learning path should therefore compare:

| Style | Learn |
|---|---|
| REST/OAS | resource-oriented APIs |
| RAML | contract design and reusable fragments |
| AsyncAPI | event/message contracts |
| GraphQL | consumer-selected data shape |
| gRPC | strongly typed service communication |

The goal is not to use every style. The goal is to understand when a contract style fits the integration requirement.

## 11. Production exercise

Design a private production API platform:

```text
Internet / Partner
       │
       ▼
Gateway
       │
       ▼
CloudHub 2.0 Private Space
       │
 ┌─────┼─────────┐
 ▼     ▼         ▼
API  Process   System
 │      │         │
 └──────┼─────────┘
        ▼
 DB / MQ / External

Monitoring + Alerts + Audit
        │
        ▼
Incident / RCA / Recovery
```

Deliver:

1. architecture diagram
2. trust boundaries
3. network diagram
4. API contracts
5. deployment topology
6. access model
7. secret/certificate rotation plan
8. monitoring/alert plan
9. failure scenarios
10. rollback plan
11. cost/capacity assumptions
12. ADRs explaining major choices

## 12. Completion gate

You are ready to leave this chapter when you can explain the platform from **API contract → gateway → runtime → network → security → deployment → monitoring → audit → recovery**, not merely how to create a Mule flow.
