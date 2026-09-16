# 39 — Production Engineering Playbooks

Topic-wise operational playbooks for real support and production work.

## 01-Incident-Management
- severity and impact
- triage
- evidence collection
- mitigation
- escalation
- recovery
- RCA
- preventive actions

## 02-Deployment-Incident-Playbooks
- deployment failure
- startup failure
- missing properties
- dependency failure
- rollback
- smoke verification

## 03-Database-Playbooks
- connection pool exhaustion
- timeout
- slow query
- locking/deadlock concepts
- transaction failure
- credential rotation

## 04-Messaging-Playbooks
- IBM MQ/JMS connectivity
- acknowledgement/redelivery
- duplicate messages
- poison messages
- DLQ
- ordering

## 05-Security-Playbooks
- certificate expiry/rotation
- TLS handshake failures
- secret rotation
- unauthorized/forbidden responses
- unsafe logging

## 06-Performance-Playbooks
- high CPU
- memory pressure
- GC investigation
- slow downstream
- large payloads
- thread/concurrency symptoms

## 07-Observability-Playbooks
- correlation ID tracing
- Runtime Manager logs
- metrics
- dashboards
- alert investigation

## 08-Change-Management
- incident/change/request workflow
- implementation plan
- validation
- rollback plan
- evidence and closure

## 09-Production-Checklists
Every runbook should include prerequisites, commands/screens, expected evidence, decision points, rollback, validation and closure criteria.
