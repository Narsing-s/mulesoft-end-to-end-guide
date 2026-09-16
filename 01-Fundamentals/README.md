# 01 — MuleSoft Fundamentals

## 1. What is MuleSoft?
MuleSoft is an integration platform. Integration means making different systems exchange information and perform work together.

Example: a mobile banking app asks for an account balance. The mobile app should not directly know how the bank database works. An API can receive the request, validate it, call the required system, and return a safe response.

## 2. Important terms in plain English
- **API**: a controlled way for one software system to request something from another system.
- **Integration**: connecting systems so information or work can move between them.
- **Flow**: the sequence of processing steps in a Mule application.
- **Mule event**: the information Mule processes. Think of it as a package moving through a flow.
- **Payload**: the main data inside that package, such as JSON.
- **Attributes**: metadata about the message, such as HTTP method, path or headers.
- **Variable**: temporary information stored for later steps in the same event.
- **Connector**: a Mule component used to communicate with another technology, such as HTTP or a database.

## 3. Anypoint Platform
At a high level, Anypoint Platform provides tools for designing, building, managing, securing, testing and monitoring APIs and integrations.

## 4. Anypoint Studio
Anypoint Studio is the desktop development environment used to build Mule applications. You can drag components onto a canvas or edit the generated XML.

## 5. Your first flow
Create a Mule project, add an HTTP Listener and a Set Payload component.

Conceptual flow:

```text
HTTP request -> Listener -> Set Payload -> HTTP response
```

Set the payload to:

```text
Hello from MuleSoft
```

Call the endpoint with a browser or Postman.

## 6. What actually happens?
1. A client sends an HTTP request.
2. The Listener accepts it.
3. Mule creates a Mule event.
4. The event travels through processors.
5. Set Payload replaces the current payload.
6. The flow finishes and the response is returned.

## 7. First practical exercise
Build `/hello` and return JSON:

```json
{"message":"Hello MuleSoft"}
```

Then change it to accept `name` as a query parameter and return a greeting.

## Beginner checkpoint
Before moving on, you should be able to explain payload, attributes, variables, flow, connector and Mule event in your own words.
