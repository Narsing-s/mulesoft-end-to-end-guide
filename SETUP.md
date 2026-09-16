# Local Setup

## Tools
Install:
- Anypoint Studio
- Java version supported by the selected Anypoint Studio/Mule runtime
- Git
- Maven if your workflow requires a local Maven installation
- Postman or another API client
- a local relational database for database exercises
- an MQ broker/client only for messaging exercises

## First project
1. Open Anypoint Studio.
2. Create a Mule 4 project.
3. Add an HTTP Listener.
4. Configure a local port.
5. Add Set Payload or Transform Message.
6. Run the application.
7. Call the endpoint from Postman.
8. Read the console/log output.

## Recommended local layout

```text
mulesoft-learning/
  hello-api/
  dataweave-labs/
  banking-eapi/
  banking-papi/
  banking-sapi/
```

## Safe configuration
Never commit passwords, private keys, access tokens or production connection strings. Use environment-specific properties and secure secret handling.

## First success criteria
You should be able to run a Mule application locally, call an HTTP endpoint, inspect the payload/attributes, transform JSON with DataWeave and intentionally create and fix one error.
