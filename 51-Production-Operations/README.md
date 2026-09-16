# 51 — Production Operations

A practical operating model for MuleSoft production support.

## Incident management
- Severity and priority
- Initial triage
- Impact assessment
- Correlation ID tracing
- Runtime Manager log analysis
- Dependency isolation
- Escalation criteria
- Communication checklist

## Common incidents
- Application unavailable
- HTTP 4xx/5xx spikes
- Timeout
- Database connection failure
- SFTP failure
- IBM MQ failure
- Authentication/certificate failure
- Memory/CPU pressure
- Scheduler failure
- Duplicate processing
- Deployment failure

## Change and maintenance
- Change request lifecycle
- Pre-checks
- Deployment checklist
- Password/secret rotation
- Certificate rotation
- Restart procedure
- Post-change validation
- Rollback

## RCA
Every RCA should contain:
- Incident summary
- Timeline
- Customer/business impact
- Detection
- Technical root cause
- Contributing factors
- Immediate recovery
- Permanent corrective action
- Preventive monitoring
- Owner and due date

## Observability
- Structured logging
- Correlation IDs
- Metrics
- Alerts
- Dashboards
- Health checks
- Dependency monitoring
- SLO/SLI concepts

## Runbook labs
- API outage
- MQ backlog
- DB outage
- certificate expiry
- secret rotation
- memory incident
- failed deployment
- scheduler incident
- downstream timeout storm
