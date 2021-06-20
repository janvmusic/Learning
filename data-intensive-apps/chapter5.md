# Chapter 5: Replication
<img tag="chapter 5 map" src="img/ch5.png" width="300px">

> Replication -> means keeping a copy of the same data on multiple machines that are connected via a network

Why we need replication?
- To keep data geographically closer to the users (reduce latency)
- To allow the system to keep working even if some of its parts have failed
- To scale out the number of machines that can serve read queries

## Leaders and followers
> Replica => Each node that stores a copy of the database is called a **replica**

**Question**: How do we ensure that all the data ends up on all the replicas?
Every write to the DB needs to be processed by every replica, a solution for this is called _leader-based replication_

**How it works?**
- One of the replicas is designed as **Leader**. When clients needs to write to a DB they do it first here
- **Followers** (read replicas, slaves, secondaries or hot standbys) whenever the leader writes to its local storage, it also sends the data change to all of its followers as part of the _replication log_ or _change stream_
- Each **follower** updates its local copy on the same order as the leader
- Writes are only accepted on the leader, while read can happen within the leader or the followers

<img tag="chapter 5 replica" src="img/ch5-replica.png" width="350px">

This functionality is available in several DBs (Postgres, MySQL, Oracle, SQL Sever, MongoDB). However it's not exclusive for dbs. Distributed message brokers (Kafka & RabbitMQ) also use this

## Synchronous vs Asynchronous Replication
The **advantage** of synchronous replication is that the follower is guaranteed to have an up-to-date copy of the data, that is consistent with the leader

The **disadvantage** is that if the synchronous follower does not respond, the write cannot be processed (Leader must wait until follower responds).

In practice we have:
- One leader
- One synchronous follower
- All of others followers as asynchronous

This guarantees that we have an up-to-date copy of the data at least in two nodes.

The **disadvantage** of asynchronous replication is that if the leader **crashes** all the pending writes that have not been replicated, they will be lost.

As **advantage** of asynchronous replication, the leader can continue processing writes even if all of its followers have fallen behind.

## Setting up new followers
Simply copying data file from one node to another is typically not sufficient: _Clients are constantly writing to the DB and the data is always in flux. So a standard file copy would see different parts of the db at different points in time.

> locking the db => making it unavailable for writes.

The process would look like this:
1. Take a consistent snapshot of the leader's database at some point in time
2. Copy the snapshot to the new follower node
3. The follower requests the leader all the data changes that have happened since the snapshot was taken
4. When the follower has processed the backlog of data, it has _caught up_

## Handling nodes outages
Any in the system can go down, perhaps unexpectedly due to a fault, but just as likely due to planned maintenance.

Our goal is to keep the system as a whole running despite individual node failures, and to keep the impact of a node outage as small as possible.

### Follower failure: Catch-up recovery
On its local disk, each follower keeps a log of the data changes it has received from the leader. The follower can recover quite easily from this **log**

Also the follower can request leader the list of changes (diff/delta) from its last fault/restart.

### Leader failure: Failover
If the leader fails, one of the followers needs to be promoted to be a new leader. Then point clients and followers to the new leader. This process is called _failover_

**Automatic failover usually follows these steps:**
1. Determining that the leader has failed - Usually use a timeout.
2. Choosing a new leader. Usually selected by majority or previously elected (controller node). The most suitable candidate for this is the node most up-to-date with the data changes from the old leader.
3. Reconfiguring the system to use the new leader.

**What could go wrong then?**
1. The new leader might be missing some writes from the old leader (usually old leader's writes are discarded)
2. Discarding writes is especially dangerous if other storage systems outside of the DB need to be coordinated with database content.
3. It could happen that two nodes both believe that they are the leader. (split brain)
4. What is the right timeout to declare a leader as _dead_? 

For these reasons, teams prefer to do a **manual** failover instead of an automatic

## Implementation of replication logs
How does leader-based replication work under the hood?

### Statement-based replication
The leader logs every **write request (INSERT, UPDATE, DELETE)** and sends the log to replicas. Thus they use the log to execute write requests as if a client had requested it.

> statement => A write request

**Downsides**:
1. Any nondeterministic function such as `NOW()` or `RAND()`, each replica will have their own value
2. Each statement must be executed in the same order otherwise they may have a different effect.
3. Statements might have side effects (Triggers or Stored procedures) and may result in an undesired outcome in each replica

The most common is that for any _nondeterministic_ value in a statement, the DB will use a row-base replication

### WAL(Write ahead log) Shipping
Usually the leader sends the WAL to replicas. The downside is that WAL contains exact directions or positions in the disk sector. That's why this method is coupled to the DB system.

If the replication protocol does not allow _version mismatch_ then with WAL it will be required a downtime.

### Logical (row-based) log replication
> logical log => Distinguish from storage engine's data representation.

A **logical log** if usually a sequence of records describing writes to the db tables at the granularity of a row
- Insert -> new values of all columns
- Delete -> Contains enough information to uniquely identify the row that was deleted (PK or values of all columns)
- Update -> Contains enough information to uniquely identify the row that was updated

A transaction that modifies several records, creates several **logical logs** and one additional log to state that the transaction was **committed**

Since logical log is decoupled from the storage engine, then it's feasible to have different versions in the leader and the follower.

A logical log format is also easier for external apps to parse.

### Trigger-based replication
Previously mentioned replication approaches are built in the db system. In many cases this is the **best option**

However, an alternative (in relational dbs) is to use _triggers_ and _stored procedures_ and move replication to the application layer.

A trigger lets you register custom application code that automatically is executed when data changes. The trigger has the ability to write in another table, from which the external process will get its input.

Later in the process the external app. will replicate to followers.

This replication style has a greater overhead and it's prune to bugs. But its flexibility is greater as well.

## Problems with replication Lag
Leader-based replication requires all writes to go through a single node, but read-only queries can go to any replica

For workloads with _**High** number of reads and **Small** number of writes_ (common for web applications) there's an attractive option: Distribute read requests across followers (load balance)

This removes the load from the leader and read requests are handled by **nearby replicas**

In _read-scaling_ architectures a synchronous approach would only lead to problems. Its better to use asynchronous approach since delivering the data to replicas would perform better.

> eventual consistency => When the replicas/followers are not _up to date_ but they eventually will catch-up with the leader

The term "eventually" is deliberately vague: in general there is no limit to how far a replica can fall behind. This is also know as **replication lag**

Usually _replication lag_ is 1 or 2 seconds, but when the data gets outdated with a big difference this might be an actual problem

### Reading your own writes
When the data is submitted, it must be sent to the leader, but when the user views the data, it can be read from a follower. (Change your profile picture example)

**Problem**: if the user tries to read from one replica, this could lead to _eventual consistency_ because the replica might not have the change that the user just submitted. How can we help to solve this problem

**Read-after-write** consistency also known as **_read your own writes_** this guarantees that the user will the the latests submitted data, however It cannot guarantee that others users will see the latests.

**How can we implement _read-after-write_ in a system with leader-based replication?**
- Read a user writes, then read from the leader; Otherwise read from a replica (user profile example)
- For apps with lot of editable info, _Time base it_ for 1min read from the leader, after that read it from a replica. Also you could prevent reads from a follower when the replication lag goes beyond 1min
- Use a _logical timestamp_ where the client can remember the timestamp of its most recent write. Avoid reading or wait reading if the replica does not match with the timestamp.
- If your replicas are geographically distributed then route the read to the datacenter that contains the leader.

What about **cross-device** reads? There are additional problems
- Using timestamp would become a trouble! due different devices
- Routing to the same datacenter would be a pain.

### Monotonic reads
> moving backwards in time => effect that the user experiences when reading info from different replicas. They see most updated data and sometimes outdated data. I.E. when the user refreshes the site several times

Its a guarantee that prevents _moving backwards in time_ to happen, its lesser than strong consistency, but a stronger guarantee that eventual consistency

A way to achieve this is to **assign** a read replica to the user, this can be achieved using a hash of the user. If the replica fails it will need to be reassigned.

### Consistent prefix reads
> Violation of causality => The idea that someone answers something before was asked

This guarantee says that if a sequence of writes happens in a certain order, then anyone reading those writes will see them appear in the same order.

This problem is common in `sharded` (partitioned) databases.

One solution to this problem is that any writes that are causally related to each other are written to the same partition. Not something easy to implement.

### Solutions for replication lag
While working with an eventually consistent system, it is worth thinking about how the app behaves if the replication lag increases to several minutes or even hours.

**Important**: _Pretending that replication is synchronous when in fact it is asynchronous is a recipe for problems down the line_ 

Databases abstract the complexity of _do the right thing_ and with **transactions** helps to make the application easier for the developer.

## Multi-leader replication
Although, Single-leader replication is the most common approach, it has one mayor downside... There is only one leader, and all the writes **MUST** got through them

The natural answer for this is a `master-master` also known as `multi-leader` replication. The process remains the same, each node that processes a write must forward that data change to all the other nodes.

> active/active or master/master => Each leader simultaneously act as a leader and follower

### Use cases for Multi-leader replication
**Important**: It rarely makes sense to use multi-leader replication with a single data center. Because the benefits rarely outweigh the added complexity.

#### Multi-datacenter operation
With a leader in each datacenter, the replication happens like:
1. Gets writes
2. Propagates to followers
3. Updates other leaders
4. Resolve conflicts

<img tag="Multi leader architecture" src="img/multi-leader.png" width="300px">

#### Advantages
Performance => Removes latency because the "local" datacenter processes the write and then proceeds the replication

Tolerance of datacenter outages => If a datacenter fails, then app can work as normally because each datacenter has its own leader. Avoids a _failover_ procedure

Tolerance of network problems => A temporary network interruption does not prevent writes being processed

#### Disadvantages
The same data may be concurrently modified in two different datacenters, and those write conflicts must be resolved.

The consistency between autoincrementing keys, triggers and integrity constraints can be problematic. 

