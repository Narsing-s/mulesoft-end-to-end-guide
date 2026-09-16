# 14 — Git, Maven and CI/CD

## Git
Git records source-code changes. Learn clone, branch, status, add, commit, pull, push, merge/rebase concepts and pull requests.

## Repository strategy
Keep application source, API specifications, tests and documentation versioned. Never commit secrets or generated credentials.

## Maven
Maven manages Java/Mule project builds and dependencies. Understand `pom.xml`, dependencies, plugins, packaging and environment-specific configuration.

Conceptual pipeline:

```text
Git push
  -> build
  -> unit/MUnit tests
  -> package
  -> quality checks
  -> deploy to non-prod
  -> smoke test
  -> approval/promotion
```

## CI vs CD
Continuous Integration automatically builds/tests changes. Continuous Delivery/Deployment automates or streamlines release into environments, depending on organizational controls.

## GitHub Actions / Jenkins
Learn how a pipeline checks out code, configures Java/Maven, runs tests, packages the Mule application and deploys using securely stored credentials.

## Deployment safety
Use separate credentials per environment, protected branches, approvals for production, audit logs and rollback plans.

## Practical exercise
Create a pipeline that:
1. checks out the project
2. runs Maven tests
3. fails when tests fail
4. packages the application
5. publishes an artifact
6. deploys only after the required approval

## Advanced topics
- semantic/versioned releases
- artifact repositories
- dependency management
- secrets management
- quality gates
- blue/green or rolling concepts where supported
- automated rollback
