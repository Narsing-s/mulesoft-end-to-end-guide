# MuleJourney Release Notes

MuleJourney uses GitHub Releases to publish tested snapshots of the learning repository.

## Release contract

A release is published automatically **only after the `Deploy learning site` workflow succeeds**.

Each release contains:

- a versioned ZIP package of the repository
- release notes
- a SHA-256 checksum file
- the exact source commit used for the package
- the release notes as a downloadable document

## Package contents

The package contains the learning repository and its documentation portal, excluding Git metadata, generated Pages output and dependency folders.

## Verification

Before treating a release as ready for use:

1. Confirm the Pages deployment workflow succeeded.
2. Open the release and verify its source commit.
3. Download the ZIP package.
4. Verify the SHA-256 checksum.
5. Open `docs/index.html` locally or use the published Pages site.
6. Verify that the documentation links and learning portal load correctly.

## Important

MuleJourney is an independent educational project and is not an official MuleSoft product or website.
