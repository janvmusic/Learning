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

  **Important:** Partition is a given in these type of interviews

- Environment constraints: Clarify any kind of limitation. For example: mobile device with limited memory and battery? or any limited bandwidth
- Scalability: Clarify if the system has any unique scaling requirements. For example if there is a holiday that might affect the traffic, or if any time of the day the traffic will increase

  **Important:** Consider read/write ratio here, which one is important.

- Latency: Clarify how quickly the system should respond. Try to narrow it down to specific parts of the system, for example Yelp low latency for searching
- Durability: Clarify how important is the data in the system. For example social network might be tolerant to lose some data but a bank no.
- Security: Clarify what are security requirements. For example authorization and authentication
- Fault Tolerance: Clarify what kind of failures should the system consider.

  **Important:** Consider here redundancy, failover, recovery mechanisms

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

- **REST**: Uses HTTP verbs (GET, POST, PUT, DELETE) to perform CRUD operations. This is the default
- **GraphQL**: Used when you have clients with different needs, its used for specifying exactly the data a client wants to receive. Avoids underfetching or overfetching
- **RPC**: Action-oriented protocol, faster than REST for service-to-service communication. Use for internal APIs when performance is critical

> [!TIP]
> Dont overthink, use REST + Websockets

Example of Twitter API

```javascript
POST /v1/tweets
body: {
  "text": string
}

GET /v1/tweets/{tweetId} -> Tweet

POST /v1/follows
body: {
  "followee_id": string
}

GET /v1/feed -> Tweet[]
```

> [!TIP]
> Use plural nouns: Tweets and Follows

> [!CAUTION]
> The current user is derived from the authentication token

## Data Flow (~5 minutes)

For some backend systems, specially data-processing systems, it can be helpful to describe the high level sequence of action or processes that system performs

If not required, this step is optional. Usually a good approach would be:

- Fetch seed data
- Parse data
- Extract data
- Store data
- Repeat

## High level design (10 ~ 15 mins)

Draw arrows and boxes that represents the components in the system and how they interact.

- Servers
- Caches
- Databases
- Services

Don't overthink this step. Build a system that satisfies your API 1-to-1

> [!IMPORTANT]
> Highlight or note the complexity sections of the design. Don't dive-deep in the complexity yet

During this step, talk your thought process with your interviewer, explain how the data flows through the system.

When reaching the Persistence layer its good to document the relevant columns/fields your entities will have

> [!IMPORTANT]
> Focus on the key values not on all the details for models

## Deep Dives

Here's where you harden your design:

- Ensuring it meets all of your non-functional requirements
- Addressing edge cases
- Identifying and addressing bottlenecks
- Improve the design based on your interview prompts
