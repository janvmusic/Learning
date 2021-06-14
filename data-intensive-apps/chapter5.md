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

