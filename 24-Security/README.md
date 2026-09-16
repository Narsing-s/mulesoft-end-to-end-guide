# MuleSoft Security

Security has multiple layers. Protect the transport, identity, API, data and operational environment.

## TLS
HTTPS encrypts traffic between client and server. Certificates prove server identity. Learn keystores, truststores, certificate chains, expiry and hostname verification.

## mTLS
Mutual TLS adds client certificate authentication. Both sides prove their identity during the TLS handshake.

## Authentication vs authorization
- Authentication: Who are you?
- Authorization: What are you allowed to do?

## OAuth 2.0
Learn resource owner/client concepts, access tokens, scopes and token validation. Never treat possession of a token as permission for every operation.

## JWT
A signed token can carry claims. Signature validation is essential. Validate issuer, audience, expiry and relevant claims according to your security design.

## Secure configuration
Never commit passwords, private keys, client secrets or production tokens. Use secure properties/secrets management and environment-specific configuration.

## API policies
Study client ID enforcement, rate limiting, SLA-based policies, OAuth/JWT policies, CORS, threat protection and custom policies where applicable.

## Logging security
Never log passwords, authorization headers, private keys, OTPs or unnecessary sensitive customer information. Mask data before logging.

## Secure design checklist
- HTTPS everywhere for sensitive traffic.
- Least privilege.
- Strong authentication.
- Explicit authorization.
- Secrets outside source code.
- Input validation.
- Safe error responses.
- Dependency updates.
- Audit logs without secret leakage.
- Certificate expiry monitoring.
