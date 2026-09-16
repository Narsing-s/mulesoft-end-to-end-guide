# 45 — Anypoint Platform Architecture

This section fills the platform-level gap between application development and production architecture.

## 1. Platform fundamentals
- Anypoint Platform components and responsibilities
- Control plane vs runtime plane
- Organizations, business groups and environments
- Cloud/control-plane selection and data residency
- Access Management, roles, permissions and client credentials
- Design Center, Exchange, API Manager and Runtime Manager
- Anypoint Studio and Anypoint Code Builder
- Asset lifecycle: design → publish → consume → deploy → operate

## 2. Runtime hosting models
- CloudHub 2.0
- CloudHub
- Runtime Fabric
- Hybrid Standalone runtimes
- On-Premises runtimes
- Private Cloud Edition
- Hosting-model decision criteria
- Shared responsibility model

## 3. CloudHub 2.0 architecture
- Applications, replicas and workers/compute concepts
- Private Spaces
- Ingress and egress
- VPC/VPN/PrivateLink concepts
- DNS and endpoint design
- Horizontal autoscaling
- High availability and replica strategy
- Application Manager API and CloudHub 2.0 API
- Deployment and rollback strategy

## 4. Runtime Fabric architecture
- Kubernetes/container concepts required for Mule engineers
- Runtime Fabric components
- Ingress, replicas and resource sizing
- Networking and firewall requirements
- HA and failover
- Monitoring and troubleshooting
- Upgrade and operational considerations

## 5. Architecture exercises
- Choose a hosting model for five business scenarios
- Design dev/test/prod environments
- Design a private API architecture
- Design an HA integration platform
- Design a multi-region API/integration topology
- Produce an ADR for every major architecture decision

## Definition of done
For every topic, explain the architecture, identify trade-offs, implement a small example where possible, describe failure modes, and document security, observability, cost and operational implications.
