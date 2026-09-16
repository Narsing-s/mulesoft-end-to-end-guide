# Environment Configuration

The same Mule application should be deployable to development, test and production without editing source code for each environment.

## Separate configuration from code

Example:

```properties
http.port=8081
customer.api.basePath=/api/customers
```

Use environment-specific property files or deployment properties. Keep secrets outside Git.

## Recommended layers

```text
Source code
   +
Non-secret environment properties
   +
Secure secrets
   +
Deployment-specific settings
```

## Never commit
- passwords
- database credentials
- private keys
- client secrets
- OAuth refresh tokens
- production certificates when policy forbids repository storage

## Configuration checklist
- Is the property name consistent across environments?
- Does the application fail fast when a required property is missing?
- Are secrets encrypted/protected?
- Are production URLs different from development URLs?
- Are timeout values environment-appropriate?
- Are log levels controlled by environment?
- Can a deployment be rolled back without changing source code?
