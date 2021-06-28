# Chapter 4: Encoding and evolution
_Everything changes and nothing stands still._
<img tag="chapter 4 map" src="img/ch4.png" width="300px">

Applications inevitably change over time.
  - Features added
  - User requirements added or modified
  - or... Business situation changes

We (as developers) should aim to build systems that make it easy to adapt to change.

In most changes... `app change means that data will change`

Relational dbs generally assume that all data conforms **one schema**

Meanwhile in NO-SQL there's no schema

> _Rolling upgrade also known as Staged rollout_ => Rolling out the update/feature not to all nodes

With **server-side** apps you depend on `Staged rollout`

With **Client-side** you depend on the user to install the update

> Backwards compatibility => newer code read data that was written by older code
> Forward compatibility   => Older code can read data that was written by newer code

It's easy to acquire _backwards compatibility_ but _forward compatibility_ it's tricker, since we need to ignore changes or data that we do not recognize (Tripadvisor Fusion + Flow)

## Formats and Encoding data
Applications usually work with data in 2 ways:
  - In memory: data is kept in objects (structs, lists, arrays, hash tables, tree and so on...)
  - Data to a file or over the network (i.e JSON)

> Encoding/Serialization => translate from _in memory_ data to a _byte sequence_
> Decoding/Parsing => !(Encoding)

### Language specific formats
Encoding is usually tied to the language and reading the data in another language is very difficult

In order to restore data in the same object types, the decoding process needs to be able to instantiate arbitrary classes.

Usually, language specific formats _do not handle well/ignore_ backward and forward compatibilities

Most of them are **not efficient**

**Important | TL;DR** Do not use your language built-in encoding.

### JSON, XML & Binary Variants
JSON, XML & CSV are textual formats, somewhat **human-readable**

> Binary string => sequence of bytes without a character encoding

Downsides of these encodings:
  - Unable to parse correctly Numbers, Floats & Strings (Specially XML with strings and numbers)
  - JSON and XML support unicode character strings but they don't support binary strings
  - XML uses schemas (not mandatory) and JSON/CSV does not bother about it. 

Despite these flaws these languages solves one of the main problems: _Sending data from one organization to other_

### Binary encoding
For internal data within your organization, it's good to use _Binary encoding_

JSON is less verbose than XML, but both still use a lot of space compared to binary formats.

Some of the binary formats extend the set of datatypes (ints vs floats or support for binary strings), although they are not so popular.

## Thrift and protocol buffers
Both are binary encoding libraries on the same principle

Both require a schema for any data that is encoded.
```thrift
struct Person {
  1: required string       user_name      userName
  2: optional int64        favorite_numer favoriteNumber
  3: optional list<string> interests      interests
}
```

Both come with a code generation tool, that takes a schema definition and produces classes that implement the schema in various programming languages.

### Field tags and schema evolution
> schema evolution -> schemas inevitably need to change over time.

> Forward compatibility: old code can read records that were written by new code

**How do they handle schema evolution?**
tags because they are considered immutable, once declared they should remain. Names can change

**new data**? Well old code ignores it, new code can read it

**delete data**? Well only delete optionals and never use the same tag, since old code might be reading it

### Datatypes and schema evolution
What about changing the data type?
Be careful because you can take up to the challenge of int32 & int64 read

Avro uses something like APS & Fusion, _writer_ and _reader_ schema

## Code generation dynamically typed languages
Thrift and Protocol Buffer rely on code generation: after a schema has been defined, you can generate code that implements this schema in a programming language of your choice. Quite useful with Java, C++ or C#

In dynamically typed programming languages (JS, Ruby, Python) there's not much point in generating code since they don't compile the code.

## The merits of schemas
Protocol buffers, `avro` and thrift all of them relies on schemas to describe a binary encoding format.

These schemas support validation and are simpler than XML or JSON schemas

But what are the advantages of these _binary encoding_ options?
- Compact than various `bson`
- The schema is a valuable form of documentation. No _type_ surprises
- Keeping a db of schemas allows you to check forward and backward compatibility
- Code generation on statically typed programming.

## Modes of Dataflow
Whenever you want to **send some data** to **another process** with which you **don't share memory**, **you need to encode** it as a sequence of bytes

Forward and backward compatibility are important for evolvability

> Compatibility => its a relationship between one process that encodes the data, and another process that decodes it.

## Dataflow through databases
When a process writes, the data is encoded

When a process reads, the data is decoded

If it's the same process to _write & read_ backwards compatibility is required.

In general, there are several different processes accessing a db at the same time. 

It's likely that  some processes accessing the db will be running new code and some will be running older code

The db might be written by a _newer_ version of the code, and subsequently read by an _older_ version of the code that is still running (forward compatibility)

> preservation of unknown fields -> Keep the records that I don't recognize intact.

### Different values written at different times
A database generally allows any value to be updated at any time.

> Data outlives the code

Rewriting (also known as _migrating_) data into a new schema is possible, tho, is an expensive task. Avoid if possible!

Schema evolution thus allows the entire database to appear as if it was encoded with a single schema, but in fact it's built on historical changes

## Dataflow through services: REST & RPC
The most common way to communicate over a networks is: _client_ and _server_

**Important:** Server exposes it's services (API)

The API consists of a standardized set of protocols and data formats (HTTP, URLs, SSL/TLS, HTML, etc...)

There are different clients over the web
- Browsers
- Native apps
- Desktop computer

Usually, the response is  typically not HTML for displaying to a human, but rather an encoding for further processing by the client-side app. 

Clients and servers need to agree on transport protocols & details of that API

Also remember, a server can be as well **consumer** of another server. This approach is used to decompose a large app into smaller services by area of functionality.

Before it was defined as **SOA**, now refined and rebranded as _**microservices architecture**_ 

**Services** expose an application-specific API that only allows inputs and outputs that are predetermined by the business logic. This restriction provides **encapsulation**: services can impose fine-grained restrictions on what clients _can_ & _cannot_ do.

**Important** A key design goal of a service-oriented/microservices architecture is to make the application easier to change and maintain by making services independently deployable and evolvable.

In architectures like this, we need to **coordinate / expect** old and new `[code|servers|services]` to live together **without having to coordinate**

### Web Services
> web service => When HTTP is used as the underlying protocol for talking to the service

The main options for a web service are:
- REST
- SOAP

**REST** is not a protocol, but **rather a design philosophy** tied to the principles of HTTP. An API designed according to the principles of REST is called _RESTful_

**SOAP** is an XML-based protocol for making network API request, it aims to be **independent from HTTP** and avoids using most HTTP features.

SOAP & XML defines its schema using WSDL. _Web services description language_

SOAP is used by large applications, however its not so welcoming for small companies. This is where REST is winning

Swagger can be used to describe RESTful APIs and produce documentation.

### The problem with Remote Procedure Calls (RPC)
> Location transparency => RPC tries to call a method or function over the network and make it look as if it's in the same program

What are the main flaws over RPC?
- A network call is unpredictable, meanwhile a local function call is under control (pass or fail)
- A local function allays returns: `[result|void|throws an error]`, meanwhile a network call might return without a result due a _timeout_.
- The actual response might be incorrect, you might get an error but due network, **just the result got lost**
- A local function is **predictable** in process time. Meanwhile a network call is **wildly variable**.
- You need to **pass serialized data** when using a network call.
- With RPC we might get problems due different languages

**Important** So in conclusion, **Local function calls** & **remote procedure calls** are **fundamentally different**

### Current directions for RPC
> **futures/promises** => Used to encapsulate actions that might fail. Also allows you to simplify _joins_ from different services.

> **Service discovery** => allowing a client to find out at which IP address and port number it can find a particular service.

RPC frameworks are used on requests between services owned by the same organization, typically within the same data center. That's it's strength.

### Data encoding and evolution for RPC
For evolvability, it is important that RPC clients and servers can be changed and deployed independently.

It's expected that **servers** get the update **first**, then clients, thus...
- Backward compatibility on request
- Forward compatibility on responses

**Important**: In RPC, there's **no way to force a client to upgrade**, that's why we need to **keep compatibility all the time**.

### Message-Passing Dataflow
> REST => Usage of request/responses over HTTP

> RPC => One process sends a request over the network, other process waits for the response as fast as possible

> Database => One process writes encoded data, and another process reads it again sometime in the future

Another dataflow type is: `Async message-passing` which is the middle point between RPC and dbs

**Async message-passing** is similar to:
- RPC because is a message over the network, the message is sent to a low latency process
- DBs because a `message broker` will pick-up this message in the future.

Using a **message broker** has several advantages compared with RPC
- _Improves system reliability_: it acts as a buffer if the recipient is unavailable or overloaded.
- _Redeliver messages_: If a recipient crashes, it can redeliver the message asap
- _No need of port and IP_
- _One message can be send to several recipients_
- _Decouples the sender from the recipient_

A main different between `RPC` and `Async message-passing` is that communication usually is **one-way**

> Asynchronous: the sender does not wait for the message to be delivered. _Send and forget_

### Message brokers
> Message brokers => one process sends a message to a named queue or topic. The broker ensures that the message is deliver to one or more _consumer_ or _subscriber_

> Message consumer => as the name indicates, will take the message and consume it

There can be many producers and consumers on the same topic. It's possible to chain producers consumers.

Message brokers typically don't enforce any particular data model.

Remember to keep messages as they are, preserve unknown fields.

### Distributed actor frameworks.
> Actor model => is a programming model for concurrency in a single process. No need to deal with race conditions, locking and deadlocks

Logic is encapsulated in `actors`. Each `actor` represents one client or entity, it may contain some local state and it communicates to another actor via async messages.

A problem with this approach is that _message delivery_ is not guaranteed.

An actor processes only one message at a time.

This programming model is used to scale an application across multiple nodes.

The same message mechanism is used no matter if the actor is in the **same node** or **another node**

Location transparency works better in the actor model than in RPC, because the actor model already assumes that messages may be lost, even within a single process

A distributed actor framework essentially integrates a message broker and the actor programming model into a single framework.

## Summary
1. Many services need to support rolling upgrades, where a new version of a service is gradually deployed to a few nodes at at time. This will give you **no downtime**
2. Backward compatibility -> new code can read old data
3. Forward compatibility -> old code can read new data
4. Several encoding formats: XML, JSON, CSV

5. Data flows
    - Databases -> The same process writes and then reads in the future
    - RPC & REST APIs -> where a client encodes a request, the server decodes it and encodes a response.
    - Async message passing -> (message brokers or actors) where nodes communicate by sending each other messages that encoded by the sender and decoded by the recipient.

