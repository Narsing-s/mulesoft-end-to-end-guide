# Mule 4 Cheat Sheet

## Event
`event = message + variables`

## Message
`message = payload + attributes`

## Common selectors
```dw
payload.customer.name
attributes.queryParams.accountNumber
vars.customerId
```

## Common transformations
```dw
%dw 2.0
output application/json
---
payload map ((item) -> {
  id: item.id,
  name: item.name
})
```

## Common functions
`map`, `filter`, `reduce`, `distinctBy`, `groupBy`, `orderBy`, `flatten`, `flatMap`, `mapObject`, `pluck`, `sizeOf`, `isEmpty`, `upper`, `lower`, `trim`, `replace`, `now`, date/time functions.

## Routing
- Choice: choose one route.
- Scatter-Gather: execute routes and aggregate results.
- For Each: process each item sequentially.
- Parallel For Each: process items concurrently.
- Until Successful: retry until success or retry limit.
- Async: run work independently of the current response path.

## Error handling
- `on-error-propagate`: error remains an error.
- `on-error-continue`: handled path completes successfully.
- `raise-error`: create a controlled application error.

## HTTP
Request contains method, path, headers, query parameters and body. Response should have intentional status, headers and body.

## Production rule
Never expose raw stack traces, credentials, tokens or internal SQL to API consumers.
