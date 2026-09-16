# 70 — Repository Quality & Release

## Before every content release

- [ ] Every new document has a clear purpose.
- [ ] No placeholder-only content.
- [ ] Examples include input and expected output where applicable.
- [ ] Links point to canonical documents.
- [ ] Version-sensitive claims are identified.
- [ ] Security examples do not expose real credentials or personal data.
- [ ] Labs include validation and failure handling.
- [ ] Production procedures include rollback/recovery considerations.
- [ ] UI links are mapped to real repository documents.
- [ ] Duplicate explanations are avoided.

## Portal validation

Verify:

- Roadmap renders.
- Topic search works.
- Category filters work.
- Lab cards open their documents.
- Interview links work.
- Capstone link works.
- Command palette opens and searches.
- Theme switch works.
- Local progress persists.
- Reset progress works.
- Login remains backend-free.
- Relative document links are routed correctly for the static portal.
- PWA/service-worker registration does not prevent normal page loading.

## Content integrity

A document should be useful without requiring the reader to guess:

```text
Goal → Prerequisites → Explanation → Example → Practice
     → Failure → Troubleshooting → Security → Production → Review
```

## No secrets

Never commit:

- passwords
- API keys
- access tokens
- private certificates
- production connection strings
- customer PII
- confidential incident data

Use synthetic examples and clearly marked placeholders.

## Release evidence

Record the commit SHA, changed areas, validation performed, known limitations and next planned maintenance item.
