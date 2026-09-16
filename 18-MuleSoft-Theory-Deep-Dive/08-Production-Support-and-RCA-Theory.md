# Production Support and RCA Theory

## 1. What production support really means

Production support is not only fixing an error after a user reports it. It is the discipline of keeping an integration service available, understandable and recoverable while protecting business data.

A support engineer must be able to move from symptom to evidence to root cause to safe recovery.

## 2. Incident, problem and change

An **incident** is an interruption or degradation that requires restoration of normal service.

A **problem** is the underlying cause or recurring condition that needs deeper investigation and prevention.

A **change** is a controlled modification to the system.

These concepts are related but should not be treated as the same activity.

## 3. Start with the business impact

Before changing code, establish:

- what operation is failing;
- which consumers are affected;
- when the issue started;
- whether all or only some requests fail;
- whether data is being lost or duplicated;
- whether a workaround exists;
- whether the problem is still active.

Technical error messages are evidence, not the business impact itself.

## 4. Evidence collection

Useful evidence includes:

- timestamp;
- correlation ID;
- endpoint/operation;
- HTTP method/status;
- application and runtime version;
- environment;
- error type and message;
- downstream response;
- database/MQ symptoms;
- recent deployments or configuration changes;
- latency and throughput changes.

Never collect sensitive credentials or unnecessary personal information merely because it is available in a log.

## 5. Correlation IDs

A correlation ID connects records belonging to one business or technical request across components.

A good support process uses it to answer:

> Where did this request enter, what did it call, where did it fail, and what happened afterward?

A correlation ID is only useful if it is consistently propagated and logged.

## 6. HTTP failure investigation

### 400
Check validation and malformed request data.

### 401
Check authentication credentials or token handling.

### 403
Check authorization and policy decisions.

### 404
Check the requested resource/path and routing.

### 405
Check HTTP method support and APIkit routing, including whether the client sent an unexpected method such as OPTIONS.

### 406
Check whether the requested response media type is supported.

### 415
Check request `Content-Type` and the API's accepted media type.

### 429
Check rate limiting or traffic controls.

### 500
Determine which internal component failed rather than treating every 500 as the same problem.

### 502/503/504
Investigate the gateway/runtime/dependency path, including upstream availability, timeouts and deployment state.

The status code is the starting point for investigation, not the final diagnosis.

## 7. Slow API investigation

Separate total latency into components:

- request processing;
- DataWeave transformation;
- database time;
- external HTTP time;
- messaging time;
- queue wait;
- serialization;
- connection acquisition.

A slow API does not necessarily mean Mule itself is slow. The bottleneck may be a dependency or an exhausted resource pool.

## 8. Database incident investigation

Check:

1. Is the database reachable?
2. Are credentials valid?
3. Are connections available?
4. Are queries slow?
5. Has the database schema changed?
6. Is the connection pool exhausted?
7. Is a transaction blocking other work?
8. Did traffic change?

Avoid immediately increasing pool size without understanding the bottleneck.

## 9. Messaging incident investigation

For an MQ or queue backlog, examine:

- producer rate;
- consumer rate;
- consumer health;
- processing latency;
- retry frequency;
- dead-letter volume;
- downstream availability;
- concurrency;
- message size;
- ordering constraints.

A backlog can be a symptom rather than the root cause.

## 10. Memory problems

A memory problem can result from large payloads, inefficient transformations, excessive concurrency, retained references, dependency behavior or configuration.

Look for a change in traffic, payload size, processing pattern or deployment version before assuming the runtime simply needs more memory.

## 11. RCA method

A practical RCA should contain:

### Problem statement
What failed, for whom and when?

### Detection
How was it discovered?

### Timeline
What happened before, during and after the incident?

### Technical cause
Which component and condition produced the failure?

### Contributing factors
What allowed the issue to happen or made detection/recovery slower?

### Resolution
What restored service?

### Corrective actions
What will remove or reduce recurrence?

### Evidence
Which logs, metrics, tests or deployment records support the conclusion?

## 12. Five whys

Ask "why?" repeatedly until the investigation reaches a controllable technical or process cause.

Do not stop at statements such as "the API failed." That is the symptom.

A useful root cause might be a timeout configuration combined with an unexpected dependency latency increase, provided evidence supports that conclusion.

## 13. Safe recovery

During an active incident, prefer reversible and evidence-based actions.

Examples include restoring a known-good version, disabling a faulty optional path where a documented mechanism exists, correcting invalid configuration, or restarting a component when restart is an established recovery procedure.

Do not perform destructive database operations or replay business transactions without understanding duplicate and consistency consequences.

## 14. Support maturity

### L1-style work
Initial alert/request intake, basic validation, known-procedure checks and escalation.

### L2-style work
Application-level investigation, logs, configuration, common integration failures and controlled remediation.

### L3-style work
Deep code/runtime/dependency investigation, complex incidents, fixes and performance analysis.

### L4-style work
Product/vendor/platform engineering involvement for issues requiring deeper platform-level analysis or product changes.

Actual support boundaries vary by organization.

## 15. Production readiness questions

Before calling an integration ready, ask:

- Can failures be identified quickly?
- Can one request be traced?
- Are sensitive values protected in logs?
- Are dependency timeouts defined?
- Is retry behavior bounded?
- Are duplicate operations controlled?
- Is there a recovery procedure?
- Is rollback possible?
- Are important failure paths tested?
- Can another engineer operate the application?

## Key takeaway

Strong production support is structured investigation. Do not guess, repeatedly restart systems, or change multiple things at once. Establish impact, collect evidence, isolate the failing boundary, restore service safely, identify the cause and add prevention.
