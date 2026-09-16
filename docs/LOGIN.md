# MuleJourney local login

The learning portal uses an intentionally **backend-free login/profile layer**.

## What it does

- asks for a display name, email and local password
- stores the local profile/session in `localStorage`
- shows the learner name in the portal
- provides Logout
- provides an **Account → Delete account** option
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

## Account deletion

Signed-in users can open **Account → Delete account** from the portal.

Deletion requires typing `DELETE` to prevent accidental removal. The browser then removes every `localStorage` key beginning with `mulejourney.` and clears `sessionStorage`, which removes the local profile, session, learning progress, theme and greeting-email status stored by MuleJourney.

Because this project is hosted as a static site, deletion is **local browser deletion**, not server-side account deletion. It does not delete:

- an EmailJS account or email-provider data
- messages already delivered to an email inbox
- GitHub repository data
- browser data stored under unrelated applications/domains

After deletion, the user is returned to the login page and can create a new local profile on that browser.

## Storage

Current browser keys include:

- `mulejourney.local.session.v2` — local session
- `mulejourney.local.account.v2` — local profile
- `mulejourney.first-login.greeting.status.v2` — greeting-email status
- `mulejourney.completed.v1` — learning progress
- `mulejourney.theme` — UI theme

The delete flow intentionally removes all keys beginning with `mulejourney.` so future MuleJourney local-storage features are also covered.

## Flow

```text
Login
  │
  ▼
Browser localStorage
  │
  ├── profile
  ├── session
  ├── progress
  ├── theme
  └── email status
  │
  ▼
MuleJourney portal
  │
  ├── Account → Logout
  │
  └── Account → Delete account
              │
              ▼
       Type DELETE
              │
              ▼
    Remove MuleJourney data
              │
              ▼
          Login page

NO BACKEND
NO DATABASE
NO SERVER-SIDE ACCOUNT RECORD
```
