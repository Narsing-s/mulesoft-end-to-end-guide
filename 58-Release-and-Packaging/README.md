# 58 — Release, Packaging & Distribution

This track defines how to turn the repository into a reproducible, reviewable learning release.

## Release artifacts

Every release should contain:

```text
mulesoft-end-to-end-guide-vX.Y.Z.zip
mulesoft-end-to-end-guide-vX.Y.Z.zip.sha256
RELEASE-NOTES.md
```

The ZIP contains the repository learning content and portal, while excluding Git metadata and local/developer caches.

## Release checklist

- [ ] README and navigation links work.
- [ ] All referenced lesson paths exist.
- [ ] No accidental secrets, credentials or production data.
- [ ] Version-sensitive claims identify the tested date/environment.
- [ ] Portal loads from GitHub Pages.
- [ ] Internal lesson links resolve.
- [ ] Markdown code blocks are valid.
- [ ] Synthetic banking data only.
- [ ] Release notes describe additions/fixes.
- [ ] ZIP checksum is generated.
- [ ] Tag follows `vMAJOR.MINOR.PATCH`.

## Semantic versioning for this guide

- **MAJOR** — navigation/content structure breaks or a major learning-system redesign.
- **MINOR** — new learning tracks, labs, platform coverage or substantial examples.
- **PATCH** — corrections, broken links, wording fixes and small examples.

## Reproducible package

The repository includes `.github/workflows/release-package.yml`. When a `v*` tag is pushed, GitHub Actions builds a clean ZIP, generates a SHA-256 checksum and publishes the package as a GitHub Release asset.

Manual workflow execution can also build a package artifact for validation before tagging a release.

## Package exclusions

The release package must not include:

- `.git/`
- local IDE state
- operating-system metadata
- build caches
- dependency caches
- secrets or `.env` files
- generated temporary files

## Release evidence

A release is complete when a user can:

```text
Download release
      ↓
Unzip
      ↓
Open README.md
      ↓
Open docs/index.html
      ↓
Follow Start Here
      ↓
Open every major learning track
      ↓
Run labs
      ↓
Use the assessment/project ladder
```

## Package verification

After downloading:

```bash
sha256sum -c mulesoft-end-to-end-guide-vX.Y.Z.zip.sha256
```

On Windows PowerShell:

```powershell
Get-FileHash .\mulesoft-end-to-end-guide-vX.Y.Z.zip -Algorithm SHA256
```

Compare the resulting digest with the published checksum.

## Release notes template

```markdown
# MuleSoft End-to-End Guide vX.Y.Z

## Added
- ...

## Improved
- ...

## Fixed
- ...

## Version-sensitive updates
- Tested runtime/platform assumptions: ...

## Verification
- Portal: passed
- Link audit: passed
- Content audit: passed
- Package checksum: generated
```
