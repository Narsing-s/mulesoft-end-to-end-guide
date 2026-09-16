# 57 — Modern Platform, AI & Agentic MuleSoft Engineering

This track closes the modern-platform gap in the guide. It covers the current development experience, cloud networking, gateways, AI-assisted engineering and governed agentic integration.

## 1. Anypoint Code Builder

Anypoint Code Builder is MuleSoft's VS Code-based development experience for API design, implementation and integration development. Current documentation covers RAML, OAS, AsyncAPI, GraphQL and gRPC API implementation/scaffolding, source control, DataWeave and deployment workflows.

```text
API requirement
   ↓
API spec: RAML / OAS / AsyncAPI / GraphQL / gRPC
   ↓
Design + mock + validate
   ↓
Scaffold implementation
   ↓
Mule flows + DataWeave + connectors
   ↓
MUnit / integration tests
   ↓
Exchange / source control
   ↓
CloudHub 2.0 / Runtime Fabric / other target
```

### Learning checklist
- Install Anypoint Extension Pack in VS Code.
- Sign in to the correct Anypoint Platform control plane.
- Create/import an API specification.
- Use the API Console and mocking service.
- Scaffold the API into a Mule project.
- Implement flows and error handling.
- Run tests and debug locally.
- Commit through Git and publish/reuse assets through Exchange.

## 2. API technology breadth

Do not learn REST only. Understand when each contract style fits:

| Technology | Typical use |
|---|---|
| RAML | MuleSoft/API-led REST contract design |
| OpenAPI | Broad REST ecosystem compatibility |
| AsyncAPI | Event/message contracts |
| GraphQL | Consumer-driven graph queries |
| gRPC | High-performance service-to-service RPC |

```text
Synchronous REST  → HTTP/API request
AsyncAPI           → event/message contract
GraphQL            → graph query contract
 gRPC              → protobuf/RPC contract
```

## 3. CloudHub 2.0 private networking

Private Spaces are isolated logical spaces for CloudHub 2.0 applications. The learning model should include private networks, VPN/transit-gateway connectivity, TLS contexts, firewall rules, internal/external endpoints and log forwarding.

```text
Enterprise network
      │
 VPN / Transit Gateway
      │
      ▼
CloudHub 2.0 Private Space
 ┌──────────────────────────┐
 │ Private Network           │
 │   ┌───────┐  ┌───────┐  │
 │   │ Mule  │  │ Mule  │  │
 │   │ replica│ │ replica│  │
 │   └───────┘  └───────┘  │
 │ Firewall + TLS + DNS     │
 └──────────────────────────┘
```

### Production questions
- Does the API need an external endpoint or only an internal endpoint?
- What CIDR range and DNS design are used?
- Which firewall rules are required?
- Where does TLS terminate?
- How will certificates be rotated?
- What happens when a dependency is unreachable?
- Where are logs forwarded?
- What is the recovery plan for network failure?

## 4. CloudHub 2.0 autoscaling and networking changes

Version-sensitive CloudHub 2.0 material must be checked against release notes. The 2026 release notes include Horizontal Pod Autoscaling availability for eligible Enterprise License Agreement organizations and Outbound Private Link for supported AWS services through private spaces.

Never teach these as universal availability: record organization entitlements, region, runtime and date tested.

## 5. Gateway engineering

MuleSoft documentation now uses **Omni Gateway** as the current gateway product name and identifies it as formerly Flex Gateway. Existing Flex Gateway material remains useful for architecture and deployment concepts.

```text
Client
  ↓
API Gateway / Omni Gateway
  ├── authentication
  ├── authorization
  ├── rate limiting
  ├── threat protection
  ├── routing
  └── telemetry
        ↓
Mule application / service
```

Learn both managed and self-managed gateway deployment, including Docker/Kubernetes concepts and CI/CD integration.

## 6. MuleSoft MCP and agentic integration

MuleSoft now documents MCP servers for governed AI-assisted access to MuleSoft products and services. The DX MCP Server supports lifecycle activities such as API design, application configuration, Exchange publication, deployment and security. The Platform MCP Server provides governed discovery, policy and monitoring across APIs, agents, MCP servers and LLMs.

```text
AI assistant / IDE
        ↓
   MCP protocol
        ↓
MuleSoft MCP Server
        ↓
Permission-scoped platform actions
        ↓
APIs / agents / apps / policies / monitoring
```

### Safety model
1. Authenticate the caller.
2. Apply least-privilege permissions.
3. Expose only required tools/actions.
4. Validate parameters before execution.
5. Keep audit records.
6. Separate development from production access.
7. Require human approval for destructive or high-impact actions where appropriate.
8. Never place secrets in prompts, examples or public repositories.

## 7. AI-assisted MuleSoft engineering workflow

```text
Requirement
 ↓
AI-assisted design draft
 ↓
Human API review
 ↓
Contract validation
 ↓
Implementation
 ↓
Generated/tested DataWeave
 ↓
MUnit + negative tests
 ↓
Security review
 ↓
Deployment
 ↓
Observability
 ↓
Human-reviewed production operation
```

AI can accelerate drafting, explanation and troubleshooting; it does not replace contract review, security review, testing or production controls.

## 8. Hands-on labs

### Lab A — Code Builder API
Build a small customer API from RAML or OAS, scaffold it, implement GET/POST, add DataWeave and MUnit, then deploy it to a non-production target.

### Lab B — Private Space design
Draw the network, CIDR, DNS, firewall, TLS, internal endpoint and dependency path for a synthetic banking application.

### Lab C — Gateway
Put a synthetic API behind a gateway and document authentication, rate limiting, logging and failure behavior.

### Lab D — MCP governance
Design an MCP tool catalog with read-only discovery tools first. Define permissions, audit requirements and human approval points before allowing writes.

## Interview questions
1. What is Anypoint Code Builder and how is it different from Anypoint Studio?
2. Why would you choose AsyncAPI instead of REST for an event contract?
3. What is a CloudHub 2.0 Private Space?
4. What is the difference between an external and internal endpoint in a Private Space?
5. What is Omni Gateway/Flex Gateway used for?
6. What does an MCP server add to an AI-assisted MuleSoft workflow?
7. How would you secure an AI tool that can deploy an application?
8. How would you prevent an AI-generated Mule flow from reaching production without review?

## Definition of done
A learner completes this track when they can design, implement, secure, test and operate a MuleSoft integration using a modern development workflow and can explain the security and governance boundaries around AI-assisted platform automation.
