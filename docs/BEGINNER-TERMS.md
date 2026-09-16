# MuleSoft Terms in Simple English

You do not need to know Java deeply to start MuleSoft. Learn these terms first.

| Term | Simple meaning | Example |
|---|---|---|
| Mule Runtime Engine | The engine that executes a Mule application | Runs your flows |
| Mule application | A deployable integration program | Customer API |
| Flow | A sequence of processing steps | HTTP -> DB -> response |
| Event | The information moving through a flow | One API request |
| Message | Payload + attributes | JSON body + HTTP metadata |
| Payload | Main data being processed | Customer JSON |
| Attributes | Metadata about the payload | HTTP method/path |
| Variable | Extra information stored during a flow | `vars.customerId` |
| Connector | A ready-made integration component | HTTP, DB, JMS |
| Operation | An action exposed by a connector | DB Select |
| Transform Message | Component used to transform data | JSON -> XML |
| DataWeave | MuleSoft language for transformation and expressions | Map customer fields |
| RAML | API contract language | Define `/customers` |
| OAS/OpenAPI | Another API contract format | Define REST endpoints |
| APIkit | Builds/runs Mule APIs from API contracts | RAML -> flows |
| System API | API close to a backend system | Customer DB API |
| Process API | API containing business orchestration | Transfer process |
| Experience API | API designed for a consumer/channel | Mobile banking API |
| Subflow | Reusable synchronous flow section | Common validation |
| Private flow | Flow called by another flow | Internal processing |
| Scope | Container that controls processing behavior | Try, Async |
| Error handler | Defines what happens after an error | Return 500 JSON |
| On Error Propagate | Handles error and sends it upward | Fail request |
| On Error Continue | Handles error and continues successfully | Fallback response |
| Object Store | Key/value persistence | Idempotency key |
| MUnit | MuleSoft unit testing framework | Test a flow |
| Exchange | Repository for reusable assets | Publish RAML |
| API Manager | Manage, secure and govern APIs | Apply policies |
| Runtime Manager | Deploy/manage/monitor applications | Start production app |
| CloudHub | MuleSoft-managed cloud runtime option | Deploy API |
| Runtime Fabric | Kubernetes-based runtime plane | Enterprise deployment |
| Hybrid Standalone | Mule runtime hosted in infrastructure you control | On-prem server |
| Correlation ID | Identifier used to follow one transaction | Trace request across APIs |
| Idempotency | Repeating a request does not duplicate the business action | Duplicate payment protection |
| Dead-letter queue | Queue for messages that cannot be processed | Failed payment event |
| SLA | Contract describing allowed usage/performance | 1000 requests/min |
| mTLS | TLS where both sides authenticate with certificates | Bank-to-bank integration |

## Golden rule
When a new term appears, ask: **What is it? Why do I need it? Where is it used? What happens if it fails?**
