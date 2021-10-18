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


## Concepts
**Eventual Consistency** => If you stop writing to a DB and wait for some unspecified length of time, then eventually all read requests will return the same value