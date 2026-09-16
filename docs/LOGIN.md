# MuleJourney local login

The learning portal uses an intentionally **backend-free login/profile layer**.

## What it does

- asks for a display name and a local password
- stores only a local browser session in `localStorage`
- shows the learner name in the portal
- provides Logout
- requires no database
- requires no API
- requires no server-side authentication
- works on static hosting such as GitHub Pages

## Important limitation

This is **not real security/authentication**. A static browser application cannot securely authenticate a user without a trusted server or identity provider. The password is not sent to a backend, and it is not used to protect private data.

Use this only for:

- demo login UX
- local learner profiles
- local progress/personalization

Do not use it for:

- production account security
- payment data
- private documents
- administrator access
- authorization of protected APIs

## Storage

The portal uses these browser keys:

- `mulejourney.local.session.v1` — local profile/session
- `mulejourney.completed.v1` — learning progress
- `mulejourney.theme` — UI theme

Clearing browser site data removes the local profile and progress.

## Flow

```text
Login page
   │
   │ name + local password
   ▼
Browser localStorage
   │
   ▼
MuleJourney portal
   │
   ├── local progress
   ├── local theme
   └── local profile

NO BACKEND
NO DATABASE
NO API CALL
NO PASSWORD TRANSMISSION
```
