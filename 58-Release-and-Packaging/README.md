# 58 — Release, Packaging & Distribution

This is the **operational release guide** for turning the MuleSoft End-to-End Guide into a clean, verifiable package that a learner can download and use immediately.

## What a release means

A release is not just a Git tag. It is a verified learning snapshot:

```text
Content
  ↓
Quality checks
  ↓
Portal validation
  ↓
Security hygiene
  ↓
Semantic version
  ↓
Clean package
  ↓
SHA-256 checksum
  ↓
GitHub Release
  ↓
Learner verification
```

GitHub supports semantic-versioned releases with release notes and attached assets, and GitHub Actions workflows can automate the build and publication process. citeturn0search0turn0search1turn0search3

## Required release assets

Every published release should provide:

```text
MuleSoft-End-to-End-Guide-vX.Y.Z.zip
MuleSoft-End-to-End-Guide-vX.Y.Z.zip.sha256
RELEASE-NOTES.md
RELEASE-MANIFEST.md
RELEASE-PACKAGING.md
PACKAGE-CONTENTS.md
```

The current automation publishes the ZIP, checksum and release documentation as GitHub Release assets when a semantic tag is pushed.

## Repository release files

- `RELEASE-MANIFEST.md` — package contract.
- `RELEASE-CHECKLIST.md` — human release checklist.
- `RELEASE-NOTES-v1.0.0.md` — current release notes.
- `PACKAGE-CONTENTS.md` — learner-facing package map.
- `.github/workflows/release-package.yml` — reproducible release automation.

## Semantic versioning

Use `vMAJOR.MINOR.PATCH`.

| Change | Version |
|---|---|
| Breaking navigation/learning-system redesign | MAJOR |
| New major tracks, labs, examples or substantial platform coverage | MINOR |
| Corrections, broken-link fixes and small improvements | PATCH |

## Before tagging

Run the complete `RELEASE-CHECKLIST.md`.

At minimum verify:

- `README.md` opens.
- `00-START-HERE.md` works.
- `docs/index.html` works.
- canonical navigation paths exist.
- interview and lab links resolve.
- no secrets/private keys are present.
- synthetic data only.
- version-sensitive content is clearly identified.
- release notes are complete.
- package manifest is complete.

## Package exclusions

Never distribute:

- `.git/`
- local IDE state
- build caches
- logs
- `.env` files
- private keys/certificates
- credentials/tokens
- customer or production data
- previous generated packages

## Automated workflow

The workflow at `.github/workflows/release-package.yml`:

1. Runs on `vX.Y.Z` tags or manually.
2. Validates the semantic version.
3. Verifies required learning/release files.
4. Performs secret-hygiene checks.
5. Creates a clean ZIP.
6. Generates SHA-256.
7. Tests ZIP integrity with `unzip -t`.
8. Checks required learner files exist inside the ZIP.
9. Publishes the package and release documentation for a tagged release.
10. Stores the package as a GitHub Actions artifact.

GitHub documents `.github/workflows` as the location for workflow YAML files and `release`/tag events as supported automation triggers. citeturn0search7turn0search8

## Manual package validation

For a local clone:

```bash
git checkout vX.Y.Z
zip -r mulesoft-end-to-end-guide-vX.Y.Z.zip . \
  -x '.git/*' '.github/workflows/*' 'dist/*' '.env' '.env.*' '*.pem' '*.key'
sha256sum mulesoft-end-to-end-guide-vX.Y.Z.zip > mulesoft-end-to-end-guide-vX.Y.Z.zip.sha256
unzip -t mulesoft-end-to-end-guide-vX.Y.Z.zip
```

## Verify a downloaded package

Linux/macOS/Git Bash:

```bash
sha256sum -c mulesoft-end-to-end-guide-vX.Y.Z.zip.sha256
```

PowerShell:

```powershell
Get-FileHash .\mulesoft-end-to-end-guide-vX.Y.Z.zip -Algorithm SHA256
```

Then extract and confirm:

```text
README.md
00-START-HERE.md
docs/index.html
59-Job-Interview-Mastery/README.md
```

## Release evidence

Record:

```text
Version:
Tag:
Commit SHA:
Release date:
Portal validation:
Content validation:
Security hygiene:
Package test:
SHA-256:
Known limitations:
Next maintenance item:
```

## v1.0.0 status

The repository is **release-automation ready**, but the GitHub Releases endpoint currently contains no published release. fileciteturn17file0L1-L12

The remaining publication action is to create/push the `v1.0.0` tag against the intended `main` commit. Once that tag reaches GitHub, the workflow creates the package and GitHub Release automatically.

## Definition of done

A release is complete only when a new user can:

```text
Download
  ↓
Verify checksum
  ↓
Extract
  ↓
Open README
  ↓
Start Here
  ↓
Learn
  ↓
Practice
  ↓
Prepare for interview
```

If the package cannot provide that experience, do not publish it.