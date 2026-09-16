# 10 — API Security

Security means protecting data, identities, credentials and API behavior.

## HTTPS/TLS
HTTPS encrypts HTTP traffic in transit. TLS configuration involves certificates, trust and key material. Learn keystores, truststores, certificate chains and hostname verification.

## Client ID and Client Secret
A client application can authenticate to an API using credentials issued through an API management system. Never put secrets in source code.

## OAuth 2.0
OAuth 2.0 is an authorization framework. Learn resource owner/client concepts, access tokens, scopes and the difference between authentication and authorization.

## JWT
A JSON Web Token can carry signed claims. Learn signature validation, issuer/audience checks, expiration and key management. A JWT should not be treated as encrypted merely because it is encoded.

## Basic authentication
Username/password authentication is simple but must be protected by TLS and appropriate credential management.

## Secure properties
Store environment-specific secrets using secure configuration mechanisms rather than committing plaintext secrets to Git.

## CORS
CORS is a browser security mechanism controlling which web origins can call resources. It is not a replacement for API authentication.

## Rate limiting and threat protection
Policies can limit abusive traffic and protect APIs. Understand limits, client identity, burst behavior and what happens when a limit is exceeded.

## Security exercise
Secure the banking API with HTTPS and an appropriate API authentication mechanism, then test:
- missing credentials
- invalid credentials
- expired token
- insufficient scope
- excessive requests

## Security rules
Never log passwords, tokens, full card data, private keys or unnecessary personal information. Minimize data returned by APIs and apply least privilege.
