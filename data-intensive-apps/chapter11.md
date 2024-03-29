## Stream processing
_A complex system that works is invariably found to have evolved from a simple system that works._

_The inverse proposition also appears to be true: A complex system designed from scratch never works and cannot be made to work._

<img tag="chapter 11 map" src="img/ch11.png" width="300px">

In chapter 10 we discussed _batch processing_ and how it transform input in _derived data_

However, for batch processing the assumption is that the input is _bounded_. So the batch job knows when its complete/done

Another important concept it's that its **sequential**. You can start one job without finishing the previous step.

However, in real life, a lot of data is unbounded because it arrives gradually over time. The dataset is never complete.

This means that data is produced on a daily based and batch processors needs to make a _cut_ of the data

The problem with daily batch processes is that changes in the input are only reflected in the output a day later. Which may be too slow for users

How do we solve this problem?
Run the process more often, which leads to have streams

A `stream` refers to data that is incrementally made available over time.
- `stdin` / `stdout`
- TCP
- Lazy lists
- Filesystem APIs

In this chapter we will learn about _event streams_.

### Transmitting event streams
In a stream processing context, a record is more commonly known as **event**.

An **Event** is a small, self-contained immutable object containing the details of something that happened at some point of time

An event usually contains a timestamp indicating when it happened according to a time-of-day clock.

An event may be encoded as a text string, or JSON, or perhaps in some binary form. This encoding allows you to store an event or send it over the network.

In stream processing a event is generated once by a **Producer** and then potentially processed by multiple **Consumers**

In streaming system, related events are usually are grouped together into a _topic_ or stream.

_How it works?_ The general idea is that a **producer writes** every event that it generates to the datastore, and each **consumer periodically polls** the datastore to check for events that have appeared since it last ran.

**Important** Continual Processing with low delays.

The task that needs to be particularly fast is **polling** which needs to be connected to a datastore that it's designed for this kind of usage.

The more often you poll, the lower the percentage of request that return new events and thus the higher the overheads become.

It's better for consumer to be **notified when new events appear**.

But traditional relational dbs are not suited for this task.

### Messaging Systems
A producer sends a message containing the event, which is then pushed to the consumers.

With this _publish/subscribe_ model, there are different approaches. To differentiate the systems, it's particularly helpful to ask the following two questions:

- What happens if the producer sends messages faster than the consumers can process them?
  - Drop messages
  - Buffer messages into a queue -> Important to understand what happens if the queue grows. Does the system crash if the queue no longer fits in memory, or does it write messages to disk?
  - _Backpressure_ 

- What happens if nodes crash or temporarily go offline, are any message lost?
  - As in DBs, durability requires a combination of writing to disk and/or replication.

Whether message loss is acceptable depends very much on the application.

#### **Direct messaging from producers to consumers**
A number of messaging systems use direct network communication between producers and consumers without intermediaries.
- UDP multicast is used by financial industry
- `Brokerless` messaging such as ZeroMQ uses publish/subscribe over TCP or IP multicast
- StatsD & Brubeck use unreliable UDP
- If the consumer exposes a service over the network, producers can make a direct HTTP or RPC request to push the event to the consumer

Even if the protocols detect and retransmit packets that are lost in the network, the generally assume that producers and consumers are constantly online.

So the app needs to have code to be aware of the possibility of message loss

#### **Message Brokers**
> Message broker == message queue

A `Message broker` is essentially a kind of database that is optimized for handling message streams.

Runs as a server, having producers and consumers as `clients`
- Producer => writes to Broker
- Consumer => reads from broker

Centralizing data via `Message Brokers` the data in the broker, these system can more easily tolerate clients that come and go, and the question of durability is moved to the broker instead.

Some Brokers keep messages in memory, while others write them to disk so that they are not lost in case of a broker crash.

Brokers allow **unbounded queueing** which allows them to be _asynchronous_ which means:

> When a producer sends a message, it normally only waits for the broker to confirm that i has buffered the message and does not wait for the message to be processed by consumers

The delivery of a message will happen at some undetermined future point in time

#### **Message brokers compared to databases**
Some message brokers can even participate in two-phase commit protocols. What's the difference between brokers and DBs?
- Databases usually keep data until it is explicitly deleted, meanwhile brokers automatically delete a message when it has been successfully delivered to its consumers.
- Most message brokers assume that their working set is fairly small. Queues needs to be small otherwise the overall throughput may degrade
- While DBs have support for indexes and various ways of searching, message brokers often support some way of subscribing to a subset of topics. 
- When querying a database, the result is is typically based on a point-in-time snapshot of the data; By contrast, message brokers do not support arbitrary queries, but they notify clients when data changes

#### **Multiple consumers**
A broker may have several consumers on the same topic. There are 2 main patterns of messaging:
- Load balancing => Each message is delivered to **one** of the consumers, so the consumers can share the work of processing the messages in the topic. This pattern is useful when the messages are expensive to process

- Fan-out => Each message is delivered to **all** consumers. Allows several independent consumers to each "tune in" to the same broadcast of messages without affecting each other.

**Important** These patterns can be combined

<img tag="chapter 11 map" src="img/ch11-producers-consumers.png" width="500px">

#### **Acknowledgements and redelivery**
Consumers may crash at any time. It could happen that a broker delivers a message to a consumer but the consumer never process it or partially process it before crash.

Message brokers use `acknowledgments` to ensure the message is not lost.

**Important** It could happen that the message actually was fully processed, but the acknowledgment was lost in the network.

Handling this requires **atomic commit protocol**.

The combination of load balancing with redelivery inevitably leads to messages being reordered.

<img tag="chapter 11 crash of consumer 2" src="img/ch11-consumers-crash.png" width="500px">

To avoid this issue you can use a separate queue per consumer. 

Message reordering is not a problem if messages a completely independent of each other, but it can be important if there are causal dependencies between messages.

### Partitioned Logs
Sending a packet over a network or making a request to a network service is normally a transient operation that leaves no permanent trace.

**Important** Messages are _supposed_ to be transient.

Meanwhile, DBs and Filesystems are the opposite: _Everything that is written to a db or file is normally expected to be permanently recorded.

AMQP/JMS differs from batch processing because, while batch processing expects that the input remains, in stream processing receive a message is destructive if the acknowledgement causes it to be deleted from the broker.

**Important** New consumers cannot access/read/process previous messages. 

Why can't we have a hybrid between db and messages?

There's an option called _log-based message brokers_

#### **Using logs for message storage**
A log is a simply an append-only sequence of records on disk.

The same structure can be used for message brokers:
1. A producer sends a message by appending it to the end of a log
2. A consumer receives messages by reading the log sequentially
3. If a consumer reaches the end of the log, then waits.

If you want to scale then you can use _partitioned log_ distributed through different machines.

A topic can then be defined as a group of partitions that all carry messages of the same type.

Within each partition, the broker assigns a monotonically increasing sequence number, or **offset**

Messages within a partition are totally ordered. Meanwhile there is not order guarantee across different partitions.

<img tag="chapter 11 log partition" src="img/ch11-log-partition.png" width="500px">

#### **Logs compared to traditional messaging**
The log-based approach trivially supports fan-out messaging, because several consumers can independently read the log without affecting each other.

Reading a message does not delete it from the log.

To achieve load balancing across a group of consumers, instead of assigning individual messages to consumer clients, the broker can assign entire partitions to nodes in the consumer group

Then each client consumes all the messages in the partitions it has been assigned.

Typically, each consumer reads the messages in the partition **sequentially**

_What are the downsides of this approach?_
- The number of nodes sharing the work of consuming a topic can be at most the number of log partitions in that topic
- If a single message is slow to process, it holds up the processing of subsequent messages in that partition.

In situations where messages may be expensive to process and you want to parallelize processing on a message-by-message basis

Where message ordering is not so important the JMS/AMPQ style of message broker is preferable.

For a situation with high message throughput, each message is fast to process and where ordering is important, use log-based approach

In a log-based remember that all messages that need to be ordered consistently need to be routed to the same partition.

#### **Consumer offsets**
Consuming a partition sequentially makes it easy to tell which messages have been processed: _all messages with an offset less than the consumer's current offset._

_Messages with a greater offset than customer's offset means that they have not been processed._

In log-based systems, Brokers don't need acknowledgment for every message. It only needs to check the log and compare it with consumers offsets.

The `offset` is similar to a _log sequence number_. The message broker behaves like a _leader db_, and the consumer like a _follower_

If a consumer node fails, a new consumer gets assigned to that partition and starts at the last recorded offset.

#### **Disk space usage**
If you only append to the log, eventually you will run out of disk space

The log is actually divided into segments, and from time to time old segments are deleted or archived.

The log implements a bounded-size bugger that discards old messages when it gets full. This is known as _circular bugger_ or _ring buffer_

In practice, log buffers can keep several days' or even weeks worth of messages

Compared with other types of message systems, it remains consistent even if writes to the disk

On the other hand the throughput of systems that keep messages in memory can be fast when the queue is small, but it degrades if the queue is long.

#### **When consumers cannot keep up with producers**
The log-based uses a buffer to keep as much messages as possible, it tries to not drop messages or apply backpressure.

If a consumer falls so far behind that the messages it requires don't exist anymore, the consumer wont be able to read missing messages.

As the buffer is large, there is enough time for a human operator to fix the slow consumer and allow it to catch up before it starts missing messages

If a consumer falls behind, it wont affect other consumers.

An advantage of this type of system is that: _you can experimentally consume a production log for development, testing or debugging purposes, without having to worry much about disrupting production services

If a consumer crashes, the only thing that remains is the consumer offset

#### **Replaying old messages**
Within AMQP and JMS messages get destroyed once processed.

Within log-based systems is more like reading from a file. Messages wont be destroyed.

The only side effect is that the offset of the consumer moves forward.

You also can manipulate the offset, so you can reuse the consumer to process another topic/queue

## Databases and Streams
Databases can also include elements of streams, for example `events` which in a DB could mean: _write to database_

This even can be captured stored, and processed.

### Keeping Systems in Sync
As we have seen throughout this book, there is no single system that can satisfy all data storage, querying, and processing needs.

In practice, most nontrivial apps need to combine several different technologies in order to satisfy their requirements.

It's important to keep in mind that data across these systems, needs to be similar and optimized for their purposes.

In `BI/data warehouse` this process(data sync) is usually performed by ETL processes.

If periodic full database dumps are too slow, an alternative that is sometimes used is _dual writes_

However, with `dual writes` there are serious problems with race conditions. One value will simply silently overwrite another value.

Another problem with _dual writes_ is that one write could fail while the other will succeed. This is a fault-tolerant problem and will lead to a system inconsistency.

### Change data capture
The problem with most dbs replication logs is that they have long been considered to be an internal implementation detail of the db, not a public API

Clients are supposed to query the db through its data model and query language, not parse the replication logs and try to extract data from them.

`Change Data Capture` or `CDC` is the process of observing all data changes written to a db and extracting them in a form in which they can be replicated to other systems

CDC can be implemented to use streams. If changes are made they are placed into a queue to be processed

<img tag="chapter 11 CDC" src="img/ch11-cdc.png" width="500px">

#### **Implementing change data capture**
We can call the log consumer as `derived data`

The data stored in the search index or the data warehouse is **just another view onto the data** in the system of record.

**Change data capture** is a mechanism for ensuring all the changes made in the db records are reflected in the derived data

Essentially, change data capture makes one db the leader(where changes are captured) and turns the other into followers

A **log-based message broker** is perfect for transporting the change events from the source db to the derived system, since it preserves the ordering of the messages.

Triggers can do this work as well, however, they are error prone and they have a significant performance overhead.

Parsing the replication log can be a more robust approach. Although it also comes with challenges, such as handling schema changes.

CDC tends to be **async**

#### **Initial Snapshot**
If you have the log of all changes that were ever made to a db, you can reconstruct the entire state of the db, by replaying the log.

However, it will take space and time to restore the entire db so this `change log` gets truncated.

Then... what to do?
- If you don't have the entire log history, you need to start with a **consistent snapshot**!
- This snapshot must correspond to a known position or offset in the change log.

#### **Log Compaction**
The principle is simple: _The storage engine_ periodically looks for records with the same key, **throws** away any duplicates, and keeps only the **most recent update** for each key.

In log-structured engines, an update with a null value (tombstone) indicates that the record will be removed in the next log compaction

TL;DR => Records will be keep if they have the latests value, otherwise they will be removed.

For CDC every change has a **primary key**, and every update for a key replaces the previous value for that key, then it's sufficient to keep the most recent write for a particular key

You can use the log compacted to obtain a full copy of the db

#### **API Support for change streams**
Increasingly, dbs are beginning to support change streams as a first-class interface.

### Event Sourcing
**Event sourcing**, although its similar (in concept) to stream systems, it has subtle differences. 

Similarly to change data capture, **Event sourcing** involves storing all changes to the app state as a log of change events.

The difference between data capture and **Event Sourcing** is that event sourcing applies the idea at a different level of abstraction.

- Change Data capture, the **app uses the db** in a mutable way, **updating and deleting records at will.** The changes are extracted from the db log. This ensures the order of the changes, avoiding race conditions.

- In event sourcing, **the app logic is explicitly built on the basis of immutable events that are written to an event log**. The event store is **append-only**, and updates or deletes are discouraged or prohibited. The events are to **reflect things that happened at the app level** rather than low-level stage changes.

Event sourcing is a powerful technique for data modeling. 

From an app point of view, it is more meaningful to record the user's actions as immutable events, rather than recording the effect of those actions on a mutable db.

Event sourcing is about recording "Why happened (Event)" instead of "What it did (Side effect)"

Event sourcing is similar to the chronicle data model, and there are also similarities between an event log and the fact table that you find in a star schema

#### **Deriving current state from the event log**
An event log by itself is not very useful, because user generally expect to see the current state of a system, no the history of modifications.

Thus, apps that use event sourcing need to take the log of events and transform it into app state that is suitable for showing to a user

This transformation needs to be **deterministic**. In this case, log compaction needs to be handled differently.

- Update events in CDC usually contains a completely new record, so the current state is derived by the last row written. Log compaction then can discard older records
- With event sourcing, events are modeled at a higher level: an event typically expresses the intent of a user action, not the result of the action. In this case, later events typically do not override prior events. So systems keep all the events and log compaction is not possible.

Apps that use event sourcing typically have some mechanisms for storing snapshots of the current state that is derived from the log of events.

This is only a performance optimization to speed up reads and recovery from crashes; 

THe intention is that the system is able to store all raw events forever and reprocess the full event log whenever required.

**Commands and events**
The event sourcing philosophy is careful to distinguish between `events` and `commands`
- When a request from a user first arrives, it is initially a **command**. At this point it **may still fail**.
- This means that it can be **validated** and **then transformed** to an event
- An event is `durable` and `immutable`
- At the point of an event is generated, it becomes a **fact**

A consumer of the event stream is not allowed to reject an event

By the time the consumers see the event, it is already an immutable part of the log, and it may have already been seen by other consumers.

**Important** Command validations needs to be synchronous! before it becomes an event

### State, Streams, and Immutability
The immutable principle is what makes event sourcing and change data capture so powerful

We normally think of db as storing the current state of the application. However, **the nature of state is that it changes.**

_How does this fit with immutability?_
Whenever you have state that changes, that state is the result of the events that mutated it over time

## Concepts
**Batch processing** => Read a set of files as input and produce a new set of output files. 

**Derived data** => The output generated by the batch processing. It's a dataset that can be recreated by running the batch process again. 

**Bounded input** => A known and finite size

**Stream** => refers to data that is incrementally made available over time

**Event stream** => The unbounded, incrementally processed counterpart to the batch data processing.

**Event** => small, self-contained immutable object containing the details of something that happened at some point of time.

**Producer** => Creates an event

**Consumer** => Takes an event and process it

**Topic** => Group of related events.

**Backpressure** => Block the producer from sending more messages.

**Message broker** => It's essentially a kind of database that is optimized for handling message streams.

**Asynchronous** => When a producer sends a message, it normally only waits for the broker to confirm that it has buffered the message and does not wait for the message to be processed by consumers

**Message Acknowledgment** => A client must explicitly tell the broker when it has finished processing a message, so the broker can remove it from the queue

**Atomic commit** => We might have the problem of a transaction that fails in some nodes but succeed on others. We have to get all the nodes to agree: _all abort/rollback_ or _all of them commit_

**Log** => An append-only sequence of records on disk.

**Monotonic** => Always increasing or always decreasing, as the value of the independent variable increases;

**Log sequence number** => In Single-leader replication, allows a follower to reconnect to a leader after if has become disconnected, and resume replication without skipping any writes.

**State machine replication** => If every message represents a write to the db, and every replica processes the same writes in the same order, the replicas will remain consistent with each other (Aside from any temporary replication lag)

**Dual Writes** => The application code, explicitly, writes to each of the systems when data changes. For example:
  - Write to db
  - Update search index
  - Invalidate cache

**Change Data Capture (CDC)** => it's the process of observing all data changes written to a db and extracting them in a form in which they can be replicated to other systems

**Write ahead log** => Basically before writing your db record, there's a write in the WAL then if something happens you restore it from here.

**Deterministic** => A process that you can run several times and the result will be the same