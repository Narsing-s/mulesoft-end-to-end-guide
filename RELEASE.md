# MuleSoft End-to-End Guide — Release 1.0

## Release status

**Release candidate: v1.0.0**

The repository has a successful GitHub Pages build on the current `main` commit. The learning content is organized as a self-contained beginner-to-production curriculum with a visual learning portal, labs, troubleshooting, interview practice, architecture material and a banking capstone.

## What is included

- Beginner-first MuleSoft foundations
- Mule application and runtime concepts
- DataWeave from fundamentals to advanced patterns
- REST, RAML, OAS and APIkit
- API-led connectivity
- HTTP, Database, File/SFTP, JMS/MQ, SOAP and SMTP integration concepts
- Error handling and resilience
- API security and secure configuration
- API management and governance
- MUnit and automated testing
- Maven, Git and CI/CD
- Deployment and runtime architecture
- Observability and production support
- Performance engineering
- Architecture and integration patterns
- Production troubleshooting scenarios
- Banking capstone using synthetic data
- Interview mastery and scenario-based practice
- Master topic coverage checklist
- Interactive GitHub Pages learning portal
- Login gate before the learning UI

## GitHub Pages verification

The repository's learning-site workflow has successfully completed for the current main commit. The workflow validates that the published site contains the learning UI and repository README before publishing the Pages artifact.

## Login behavior

The Pages entry point is designed as:

```text
GitHub Pages
   |
   v
Login screen
   |
   +-- existing session --> Learning portal
   |
   +-- no session --------> stay on login
```

The login is intentionally a **client-side learning-portal gate**. GitHub Pages is static hosting, so this must not be presented as secure server-side authentication. Do not use it to protect confidential material or real user credentials.

## Packaging

GitHub automatically provides the repository source as a ZIP from the repository's Code menu. A release package should contain the repository source tree, including:

- `docs/` learning portal
- all numbered learning chapters
- labs and reference implementations
- capstone material
- `.github/workflows/`
- README and contribution/security documentation

Do not include real credentials, production certificates, customer data, access tokens, or proprietary interview material in a package.

## Release checklist

- [x] Main branch builds the learning-site workflow successfully
- [x] Learning portal exists
- [x] Login gate exists
- [x] Core learning roadmap exists
- [x] Self-contained learning requirement documented
- [x] Master coverage checklist exists
- [x] Production troubleshooting content exists
- [x] Interview practice exists
- [x] Banking capstone exists
- [x] Synthetic-data warning exists
- [ ] Human review of every lesson for technical accuracy
- [ ] Manual browser test of login, logout, navigation and mobile layout
- [ ] Manual review of every internal link from the deployed Pages site
- [ ] Final release tag created in GitHub
- [ ] GitHub Release published with release notes

## Recommended release sequence

1. Open the deployed Pages site.
2. Confirm the first screen is Login.
3. Create a test learner account.
4. Sign in.
5. Verify the learning portal opens.
6. Refresh and confirm the session behavior.
7. Test logout.
8. Test direct navigation to the learning UI without a session.
9. Test desktop and mobile layouts.
10. Open several learning chapters and labs.
11. Verify internal links.
12. Download the repository ZIP from GitHub and verify the package locally.
13. Create the final `v1.0.0` tag.
14. Publish the GitHub Release with this file as the release-note source.

## Important quality statement

This release should be described as a **learning platform / educational repository**, not as an official MuleSoft product, certification course, production banking system, or security product.

External documentation is optional reference material. The core learning path is intended to remain usable from the repository itself.
