# Runtime and Mule Event Model

## Purpose

This lesson explains what Mule Runtime does when a request enters an application. Understanding this removes much of the confusion around payloads, attributes, variables, flows, scopes and errors.

## Mule Runtime

Mule Runtime Engine is the execution environment for Mule applications. Your XML configuration describes what the application should do; the runtime loads that configuration and executes the defined message-processing behavior.

Think of the runtime as the engine, the Mule application as the program, and a flow as one executable processing path inside that program.

## Application lifecycle

At deployment time, the runtime must load the application, resolve its configuration and dependencies, initialize required resources and start its event sources. A deployment problem can therefore happen before the first HTTP request is ever processed.

During shutdown, the runtime must stop accepting new work and release resources according to the deployment and runtime behavior.

## Mule event

A Mule event is the processing context passed through a flow. The event contains the message and variables.

The message consists primarily of payload and attributes.

### Payload

Payload is the main data currently being processed. It can be JSON, XML, Java objects, strings, binary data or other supported representations.

### Attributes

Attributes contain metadata associated with the message. With HTTP, attributes can contain method, request path, query parameters, headers and related request information.

### Variables

Variables are values created by the application and attached to the event for later processing.

## Why this matters

Suppose an HTTP request contains a JSON customer object and a query parameter called `active`.

The customer JSON belongs to the payload. The query parameter belongs to HTTP request metadata. A value calculated by your flow, such as `customerStatus`, can be stored as a variable.

Using the wrong location makes flows harder to understand and can cause expressions to read from the wrong part of the event.

## Event changes during processing

Processors may transform the payload, add or change variables, and use attributes. A Transform Message can produce an entirely new payload while preserving or changing other event information according to the operation.

Do not assume that the payload at the beginning of a flow will still be the payload at the end. Always know which processor last changed it.

## Scope and event behavior

Scopes group processing logic and can affect error handling, routing, iteration and execution behavior. When using a scope, learn both its functional purpose and what happens to the event when processing enters, leaves or fails inside it.

## Common beginner mistakes

1. Using `payload` when the required value is actually in HTTP attributes.
2. Storing every value as a variable instead of keeping the event simple.
3. Forgetting that a transformation changes the current payload.
4. Assuming an error automatically means the application is stopped everywhere.
5. Treating a connector result as if it always has the same shape.

## Troubleshooting method

When an expression returns the wrong value, inspect:

1. current payload;
2. current attributes;
3. variables;
4. MIME type and metadata;
5. the processor that last changed the value;
6. the exact error type if processing failed.

## Production perspective

A production engineer should be able to explain where important information lives at every major point in a flow. This is essential when debugging API requests, database results, message consumers and error handlers.

## Checkpoint

Explain, without looking at notes:

- what Mule Runtime does;
- what a Mule event represents;
- the difference between payload and attributes;
- why variables exist;
- why a payload can change during a flow;
- how you would investigate an unexpected payload.
