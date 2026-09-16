# Release Checklist

Use this checklist before publishing any version.

## 1. Content

- [ ] `00-START-HERE.md` works as the beginner entry point.
- [ ] `TOPIC-INDEX.md` is current.
- [ ] Every new lesson has explanation, example, practice, failure and production sections.
- [ ] DataWeave examples show input and expected output.
- [ ] Interview material is clearly separated from canonical technical explanations.
- [ ] Version-sensitive material identifies the tested environment/date.

## 2. Portal

- [ ] `docs/index.html` loads.
- [ ] Roadmap navigation works.
- [ ] Topic search works.
- [ ] Filters work.
- [ ] Lab links open real documents.
- [ ] Interview links open real documents.
- [ ] Command palette works.
- [ ] Theme switch works.
- [ ] Local progress works.
- [ ] Backend-free login does not block learning.

## 3. Security

- [ ] No passwords.
- [ ] No API keys/tokens.
- [ ] No private certificates.
- [ ] No production connection strings.
- [ ] No real customer/financial data.
- [ ] Banking examples use synthetic data only.

## 4. Release metadata

- [ ] Version follows `vMAJOR.MINOR.PATCH`.
- [ ] Release notes exist.
- [ ] Release manifest exists.
- [ ] Changed areas are documented.
- [ ] Known limitations are documented.

## 5. Package

- [ ] Clean ZIP is generated from the tagged source.
- [ ] `.git/` is excluded.
- [ ] workflow files are excluded from the learner ZIP unless intentionally required.
- [ ] IDE/cache/log files are excluded.
- [ ] `.env*` files are excluded.
- [ ] SHA-256 checksum is generated.
- [ ] ZIP can be extracted successfully.
- [ ] `README.md` opens after extraction.
- [ ] `docs/index.html` opens after extraction.

## 6. Release publication

```text
Validate
   ↓
Tag vX.Y.Z
   ↓
GitHub Actions
   ↓
Build ZIP
   ↓
Generate SHA-256
   ↓
Create GitHub Release
   ↓
Attach ZIP + checksum
   ↓
Verify published assets
```

GitHub supports creating releases from semantic tags and attaching release assets; GitHub Actions workflows are stored under `.github/workflows`. See the official GitHub release and Actions documentation for platform behavior. citeturn0search0turn0search1turn0search8

## 7. Final learner test

A fresh user should be able to:

1. Download the release.
2. Verify the checksum.
3. Extract it.
4. Open `README.md`.
5. Follow `00-START-HERE.md`.
6. Learn a topic without external prerequisites.
7. Run an exercise/lab.
8. Practice interview questions.
9. Complete the project ladder.
10. Explain a complete MuleSoft project end-to-end.

If any of these fails, the release is not ready.