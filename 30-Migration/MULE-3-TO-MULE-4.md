# Mule 3 to Mule 4 Migration Notes

Mule 4 changed the programming model significantly.

## Major changes

### MEL -> DataWeave
DataWeave became the default expression language.

### Message model
Mule 4 uses a simplified event/message model:

```text
Event
├── Message
│   ├── Payload
│   └── Attributes
└── Variables
```

### Error model
Mule 4 has a structured error type system and scoped/global error handlers.

### Connectors
Connector operations and configuration patterns changed. Re-check connector versions and XML rather than copying Mule 3 configuration blindly.

### Properties
Configuration property handling and secure property practices changed.

## Migration checklist
1. Inventory Mule 3 flows and connectors.
2. Identify MEL expressions.
3. Convert expressions to DataWeave.
4. Review payload/attribute assumptions.
5. Redesign error handling.
6. Review transactions.
7. Review connector versions.
8. Review property/secret handling.
9. Add MUnit tests before migration.
10. Test performance and large payload behavior.
11. Validate deployment target and Java/runtime compatibility.
12. Run end-to-end tests against representative dependencies.

Use the official MuleSoft migration documentation for exact version-specific changes.
