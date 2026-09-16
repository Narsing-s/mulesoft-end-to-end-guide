# Releases & Packages

MuleJourney publishes versioned GitHub Releases after the learning-site deployment succeeds.

## What users receive

Every successful release provides:

1. **Source package (`.zip`)** — a versioned snapshot of the repository.
2. **Release notes (`RELEASE-NOTES.md`)** — what was included and which commit was packaged.
3. **Release manifest (`RELEASE-MANIFEST.md`)** — package provenance, source commit, successful Pages run and generated timestamp.
4. **Checksum (`.sha256`)** — SHA-256 integrity verification for the ZIP package.
5. **GitHub source archives** — GitHub also provides source ZIP and tar.gz archives for the release tag.
6. **Workflow artifact** — the package, checksum and manifest are retained in the Actions run for 30 days as a second download/verification path.

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
workflow_run receives successful run
     ↓
Checkout exact successful commit
     ↓
Build package + manifest
     ↓
Validate ZIP + SHA-256
     ↓
Upload workflow artifact
     ↓
Generate release notes
     ↓
Create version tag
     ↓
Publish GitHub Release
     ↓
ZIP + checksum + manifest + notes
     ↓
Release Center displays published assets
```

## Where releases appear

Open the repository's **Releases** page or use the **Releases & Packages** link in the MuleJourney portal. The portal's Release Center reads the public GitHub Releases API and displays published versions and their downloadable assets.

## Package verification

After downloading a ZIP package, compare its SHA-256 digest with the matching `.sha256` release asset.

Example:

```bash
sha256sum mulejourney-v0.1.X.zip
```

Compare the resulting digest with the value in the matching `.sha256` file.

The release workflow also performs `unzip -t` and `sha256sum -c` before publishing. A failed validation stops the release from being created.

## Workflow artifacts

The Actions workflow retains a release package artifact for 30 days. It contains:

- versioned ZIP package
- SHA-256 checksum
- release manifest

This gives maintainers a second copy of the generated package even if a release-publishing step needs investigation.

## Release readiness

A release is not created merely because code was pushed. The release workflow listens for the **Deploy learning site** workflow and continues only when that workflow reports `success`. It then checks out the exact successful Pages commit before packaging it.

This keeps the published package aligned with the documentation snapshot that actually passed the site deployment workflow.

## Versioning

Automated releases currently use a monotonically increasing CI run number in the form:

```text
v0.1.<release-run-number>
```

This keeps every generated package uniquely addressable while the project is in its automated learning-platform phase.

## Important

MuleJourney is an independent educational project and is not an official MuleSoft website.
