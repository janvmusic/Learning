# Delivery Framework

## Requirements (~5 minutes)

### Functional Requirements

Clarify functionality as if you were speaking with a product owner. Clarify statements such as:

- Clients should be able to...

For example, if you were going to design twitter, functional requirements will be:

- Clients should be able to post tweets
- Clients should be able to follow people
- Clients should be able to like tweets

> [!TIP]
> You job here is to clarify and select top 3 requirements and focus on those

### Non-Functional Requirements

These types of requirements refers to qualities on the system

> [!CAUTION]
> Most of these capabilities refers to a number

Clarify statements such as:

- The system should be highly available, prioritizing availability over consistency
- The system should scale to support 100M DAU (Daily active users)
- The system should be low latency, rendering feeds in under 200ms

#### Non-Functional Requirements Domain

- CAP Theorem: Consistency, Availability and Partition.
> [!TIP]
> Partition is a given in these type of interviews
- Environment constraints: Clarify any kind of limitation. For example: mobile device with limited memory and battery? or any limited bandwidth
- Scalability: Clarify if the system has any unique scaling requirements. For example if there is a holiday that might affect the traffic, or if any time of the day the traffic will increase
> [!TIP]
> Consider read/write ratio here, which one is important.
- Latency: Clarify how quickly the system should respond. Try to narrow it down to specific parts of the system, for example Yelp low latency for searching
- Durability: Clarify how important is the data in the system. For example social network might be tolerant to lose some data but a bank no.
- Security: Clarify what are security requirements. For example authorization and authentication
- Fault Tolerance: Clarify what kind of failures should the system consider.
> [!TIP]
> Consider here redundancy, failover, recovery mechanisms
- Compliance: Clarify if the data needs to be under a legal or if there is a regulatory agreement

## Core Entities (2~ minutes)

Identify and list the code entities of your system. Have an initial draft and clarify that more entities will be added through the interview

For example you can have a Core Entities like this (Twitter example):

- User
- Tweet
- Follow

> [!IMPORTANT]
> Ask yourself the following questions:
> What are the actors in the system? Are they overlapping?
> What are the nouns or resources necessary to satisfy the functional requirements?

## API or System Interface (~5 minutes)

This topic defines the contract between your system and the users.

Here you select the type of communication you can use:

- REST: Uses HTTP verbs (GET, POST, PUT, DELETE) to perform CRUD operations
> [!TIP]
> This is the default
