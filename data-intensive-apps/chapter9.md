# Chapter 9: Consistency and Consensus
<img tag="chapter 9 map" src="img/ch9.png" width="300px">

_Is it better to be alive and wrong or right and dead>_

Lot of things can go wrong. The simplest way of handling such faults is to simply let the entire service fail, and show the user an error message.

If just an error it's not a good solution, then we need to find ways of tolerating faults.

> Tolerating faults => Keeping the service functioning correctly even if some internal component is faulty

The best way of building fault-tolerant systems is to find some **general-purpose abstractions with useful guarantees**, implement them once, and then **let applications rely on those guarantees**

This is the same approach as transactions:

> Atomicity -> Pretend that there are no crashes

> Isolation -> Nobody else is concurrently accessing the db

> Durability -> That storage devices are completely reliable

**Transaction** abstraction hides those problems so that the application doesn't need to worry about them.

**Remember** Seek abstractions that can allow an application to ignore some of the problems with distributed systems

**Important** In some situations, it's possible for the system to tolerate faults and continue working; In other situations that is not possible.

## Consistency Guarantees
> Replication lag: if you look at 2 database nodes at the same moment in time, you're likely to see different data on the two nodes, **because write requests arrive on different nodes at different times**

Most replicated dbs provide at least **Eventual Consistency**; In other words, the inconsistency is temporary, and eventually resolves itself.

We expect that all replicas **converge** to the same value _eventually_

However, this is a weak guarantee, it does not say anything about _when_ the replicas will converge.

Until that happens replicas could return `nil` or `nothing`

When working with a db that provides only weak guarantees, you need to be constantly aware of its limitations and not accidentally assume too much.

_Remember ~~Devil~~ Bugs are on the details_

There's a trade off here: _stronger guarantees may have worse performance or be less fault-tolerant_

Isolation guarantees overlap with transaction guarantees, however, they are different. For example:

**Transaction isolation** is primarily about avoiding race conditions due to concurrently executing transactions

**Distributed consistency** is mostly about coordinating the state of replicas in the face of delays and faults.

## Linearizability
The basic idea is to make a system appear as if there were only one copy of the data, and all operations on it are atomic.

In a linearizable system, as soon as one client successfully completes a write, all clients reading from the db must be able to see the value just written.

A query that returns a stale result is a violation of linearizability. 

### What makes a System linearizable?
The basic idea behind linearizability is simple: to make a system appear as if there is only a single copy of the data.

The requirement of linearizability is that the lines joining up the operation markers always move forward in time, never backward.

Once a new value has been written or read, all subsequent reads see the value that was written, until is overwritten again.

On this algorithm, clients take an actual role of update values if they see the most updated version.

<img tag="Linearizability" src="img/ch9-linearizability.png" width="300px">

> Serializability != Linearizability

A DB must provide linearizability and serializability to guarantee: `Strict serializability` or `strong one-copy serializability` 

[Additionally you can look at this video for more details](https://www.youtube.com/watch?v=noUNH3jDLC0)

### Relying on Linearizability
#### **Locking & leader election**
One way of electing a leader (and avoid a _split brain_) is to use a lock: Every node that starts up tries to acquire and the one that succeeds becomes the leader.

No matter how the lock is implemented, **it needs to be linearizable.** All nodes needs to agree which node owns the lock; Otherwise is useless.

#### **Constraints and uniqueness guarantees**
Through Linearizability, you can guarantee the uniqueness of a value, for example a `username`, `the balance of an account that never should go below 0` or `your store inventory`

A hard uniqueness constraint, such as the one you typically find in relation dbs, requires linearizability.

#### **Cross-channel timing dependencies** 
Linearizability violation was noticed due to `user a` telling `user b` that there's a most updated version of the data. Meaning, that there's an additional communication channel in the system.

<img tag="chapter 9 map" src="img/ch9-image-resizer.png" width="400px">

This is a good example of multiple communication channels, which one of them is faster (message broker) & the other slower (image uploader). Creating a **race condition** on the image resizer, which might see an old version of the image.

Linearizability is not the only option to avoid this race condition, however, it's the simplest to understand.

### Implementing Linearizable Systems
The simplest approach to have a Linearizable system would be: _have the data in just one node_

However, this is not fault tolerant. If the node dies, then... **Game Over**

The most common approach to making a system fault-tolerant is to use replication.

- **Single-leader replication** (potentially linearizable) => By design this could be `potentially linearizable`, however, if the db uses `snapshot isolation`, then it is not possible. Using leader for reads leads to a problem where **we need to know who is the leader**. We might have problem where 2 nodes think they are the leader or with synchronous replication, we could have lose committed writes.

- **Consensus Algorithms** (linearizable) => Resembles to single-leader replication. However, this consensus contains protocols to **prevent split brain & stale replicas**

- **Multi-leader replication** (no linearizable) => Systems with multiple leader replication are generally not linearizable. The reason: _They write concurrently on multiple nodes and asynchronously replicate them to other nodes_. This consensus requires **conflict resolution**

- **Leaderless replication** (probably not linearizable) => There's a discussion that claims that it's possible but in reality, it may be a sloppy quorum.

#### **Linearizability and Quorums**
It is possible to have a race condition in `strict quorum`. This may be the case due to **network delays**

Although, it's possible to _force_ linearizability in Dynamo-style quorums (w + r > n) it reduces the performance because it uses _Read repair & Anti-entropy_ processes.

It is safest to assume that a leaderless system does not provide linearizability

### The cost of linearizability
In cases where we have multiple data-centers, if the application requires linearizable reads and writes, the network interruption causes the application to become unavailable in the data-center that cannot contact the leader.

### The CAP Theorem
Network interruption issues is not limited only to single-leader and multi-leader replication: _Any linearizable db has this problem, no matter how it is implemented_

The issue isn't specific to multi-datacenter deployments, but can occur on any unreliable network. The trade-off is as follows:

- If your application **requires** _linearizability_ and replicas are disconnected due to a network problem then they are unavailable.

- If your application **does not requires** _linearizability_, and there's a network problem, then replicas will respond with some stale information. This behavior is not linearizable.

In conclusion: _Applications that don't require linearizability can be more tolerant of network problems_

The CAP Theorem is presented as: `Consistency`, `Availability`, `Partition Tolerance`. Pick 2 out of 3.

However, since network faults are unavoidable, it's better to present it as: Either Consistent or Available when Partitioned

By Consistent / Consistency we mean **Linearizability**

## Concepts
**Eventual Consistency** => If you stop writing to a DB and wait for some unspecified length of time, then eventually all read requests will return the same value

**Serializability** => isolation property of transactions, where every transaction may read and write multiple objects. It guarantees that transactions have been executed in some serial order.

**Linearizability** => it's a recency guarantee on reads and writes of a register (object). Does not prevent problems such as _write skews_

**Split brain** =>  distributed system that acknowledge 2 nodes as leaders

**Single-leader replication (Potentially Linearizable)** => The leader has the primary copy of the data that is used for writes, followers have backup data.

**Read repair*** => When a client finds a _stale_ response, it will update the _stale_ replica with latest version. This approach is good for `frequently read` systems

**Anti-entropy process** => background process that constantly looks for differences in the data between replicas