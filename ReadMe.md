# Staff Server

![](https://drive.google.com/uc?export=view&id=1kfuP-yONzyhqcG_h9BTM1P8N9YuLYQhb)

## What is it?

It is a node.js server based on the idea of clean architecture and DDD best practices with event-driven architecture. This project is aimed to be executed in terms of both microservice and monolithic since each context has been separated into individual folder. Due to the fact of traffic is in low amount, monolithic is preferred in current version. However, it is easily to expand to microservice or even CQRS architecture.

## Why did I share this project in public?

The full product is still under constructing and the full product is committed to gitlab. I only share part of the use-case in order to demonstrate how I built up the staff-server.

### File Structure

- application
  - dto
    - IStaffDTO
  - mapper
    - StaffMap
  - useCase
    - createStaff
    - getStaffbyID
- domain
  - events
  - Staff.ts
  - ...
- infra
  - http
    - restful
    - graphql
  - repo
  - socket
  - streaming

## Features

- Integration Test
- Unit Test

## TechStacks

- Node.js with Express in Typescript
- WebSocket
- Apollo GraphQL Server
- Sequelize

## References

- Inspiration of structure

- [https://github.com/stemmlerjs/ddd-forum](https://github.com/stemmlerjs/ddd-forum)
