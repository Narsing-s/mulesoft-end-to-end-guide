# 13 — Deployment

Deployment means moving a tested Mule application into an environment where users or other systems can use it.

## Environments
Typical separation:

```text
Development -> Test/QA -> UAT -> Production
```

Each environment may have different URLs, credentials, database endpoints and policy configuration.

## CloudHub
CloudHub is a MuleSoft-managed deployment environment. Learn application deployment, runtime selection, workers/replicas where applicable, properties, logs and monitoring.

## CloudHub 2.0
Learn its application deployment model, runtime configuration, replicas, networking and operational controls.

## Runtime Manager
Use Runtime Manager capabilities to deploy/manage applications and inspect operational information depending on the target runtime.

## On-premises
On-premises Mule runtimes are operated by the organization. You must understand server capacity, networking, certificates, JVM/runtime configuration, logs, deployment process and operational ownership.

## Runtime Fabric
Runtime Fabric provides a way to run Mule applications in a Kubernetes-based infrastructure managed by the organization/cloud environment. Learn architecture, prerequisites and operational responsibilities.

## Deployment checklist
- build succeeds
- MUnit passes
- dependency versions are known
- properties are environment-specific
- secrets are not in Git
- API endpoints are correct
- TLS certificates are valid
- database/MQ connectivity is tested
- rollback procedure exists
- monitoring and alerts are ready

## Practical exercise
Package the banking application with Maven, deploy to a non-production environment, verify health, run API tests, inspect logs, then document rollback steps.
