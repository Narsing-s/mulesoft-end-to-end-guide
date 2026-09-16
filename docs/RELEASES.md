# Releases & Packages

MuleJourney publishes versioned GitHub Releases after the learning-site deployment succeeds.

## What users receive

Every successful release provides:

1. **Source package (`.zip`)** — a versioned snapshot of the repository.
2. **Release notes (`RELEASE-NOTES.md`)** — what was included and which commit was packaged.
3. **Checksum (`.sha256`)** — integrity verification for the ZIP package.
4. **GitHub source archives** — GitHub also provides source ZIP and tar.gz archives for the release tag.

## Release lifecycle

```text
Push to main
     ↓
Deploy learning site
     ↓
Pages validation
     ↓
Pages deployment succeeds
     ↓
Package repository
     ↓
Generate release notes
     ↓
Create version tag
     ↓
Publish GitHub Release
     ↓
ZIP + checksum + release notes
```

## Where releases appear

Open the repository's **Releases** page. The latest release can be reached from GitHub's `releases/latest` URL.

The repository's learning portal should also link users to this release area so documentation, source packages and learning content are easy to discover.

## Package verification

After downloading a ZIP package, compare its SHA-256 digest with the `.sha256` release asset.

Example:

```bash
sha256sum mulejourney-v0.1.X.zip
```

Compare the resulting digest with the value in the matching `.sha256` file.

## Release readiness

A release is not created merely because code was pushed. The release workflow waits for the **Deploy learning site** workflow to complete successfully. This makes the release package correspond to a successfully deployed documentation snapshot.

## Versioning

Automated releases currently use a monotonically increasing CI run number in the form:

```text
v0.1.<release-run-number>
```

This keeps every generated package uniquely addressable while the project is in its automated learning-platform phase.

## Important

MuleJourney is an independent educational project and is not an official MuleSoft website.
