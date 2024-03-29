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

However, since network faults are unavoidable, it's better to present the CAP theorem as: **Either Consistent or Available when Partitioned**

By Consistent / Consistency we mean **Linearizability**

#### **Linearizability and Network delays**
Although, Linearizability is a useful guarantee, surprisingly few systems are actually linearizable in practice.

The reason for dropping linearizability is _performance_, not fault tolerance.

Linearizability is slow, not only during a network fault.

## Ordering guarantees
> Linearizability => The system appears to have 1 source of truth and that operations appears to be atomic and placed in the right order.

Ordering is a recurring theme, so let's recap where other places take this in consideration
- **Order of writes** => The main purpose of the leader in a single-leader replication is to **determine the order of writes**. Otherwise, we can fall into write conflicts

- **Serializability** => It's about ensuring that transactions behave as if they were executed in some **sequential order** (lock and abort operations)

- The use of timestamps in distributed systems

It turns out that there are deep connections between ordering, linearizability & consensus.

The chains of causally dependent operations define the causal order in the system. Basically: _what happened before what?_

If a system obeys the ordering imposed by causality, we say that it is **Causally Consistent**

### Ordering and Causality
Ordering preserve causality! But what are examples of causality
- Causal dependency between _questions & answers_
- During replication, which write happened first?
- The happened before relationship between transactions
- With snapshot isolation, we read from a _consistent snapshot_ which could be translated to _consistent with causality_
- Write skews and Doctors on call!

**Important** Causality imposes an ordering on events. Cause comes before effect.

#### **The causal order is not a total order**
A **total order** allows any 2 elements to be compared. However, mathematical sets are not totally ordered.

I.E: `{A, B} compared to {B, C}` which one is greater? We say they are incomparable

The difference between total order and a partial order is reflected in DB consistency models:
- **Linearizability** => We have **Total order** of operations. We can say that one operation happened before another
- **Causality** => We have **Partial Order** Some operations are ordered with respect each other, but some are incomparable.

Based on this definition, we can conclude that there are no concurrent operations in a linearizable datastore. All operations must follow a single timeline.

Concurrency would mean that the timeline branches and merges again, in this case branches are incomparable.

#### **Linearizability is stronger than causal consistency**
What's the relationship between linearizability & causal order? Well, **linearizability implies 
causality**

**Important** Any system that is linearizable will preserve causality correctly.

THis is why **linearizability** is so appealing, however, with network delays (for example if the system is geographically distributed) the performance & availability will suffer

Causal consistency is the strongest guarantee possible, in fact this model does not slow down due network delays, and remains available in the face of network failures

**Remember** WE might think that a system requires Linearizability, however, it may only need **causal consistency**

#### **Capturing causal dependencies**
To better understand the word: _causal_ let's define it as: Which Operation **happened before** which operation.

This is called **_partial order_**

Then when a replica processes an operation, it must ensure that all causally preceding operations have already been processed.

In order to determine causal dependencies, we need some way of describing the "knowledge" of a node in the system.

To keep the system with causal consistency, it needs to track causal dependencies across the entire db, not just for a single key. Version Vectors can be generalized to do this.

The application needs to be aware of the "latest" version read by the application.

### Sequence Number Ordering
Although causality is an important theoretical concept, explicitly tracking all the data that has been read, would mean a large overhead.

However, there's another option: _timestamps_ or _sequence numbers_.

**Timestamps** needs to come from a _logical clock_, which is an algorithm to generate a sequence of numbers to identify operations, typically using counters that are incremented for every operation.

These _timestamps_ are **compact** and provide a **total order**.

Sequence numbers offers that if `operation A` happened before `operation B`, then `A` occurs before `B` in the total order. 

In DBs with a **single-leader replication**, the replication log defines a total order of write operations, that is consistent with causality.

#### Non causal sequence number generators
_What happens if we don't have a single leader? Who generates the sequence numbers?_

There are options available for this case!
- Each node can generate its own independent set of sequence numbers. (Odds and Pairs numbers)
- timestamp from clock of the day
- Preallocate blocks of sequence numbers to each node. `Node A -> [1-100]` & `Node B -> [101-200]`

These 3 options all perform better and are more scalable than pushing all operations through a single leader that increments a counter.

However, these 3 options **are not consistent with causality**

#### **Lamport timestamps**
Each node has a unique identifier, and each node keeps a counter of the number of operations it has processed.

Lamport timestamp is then simply a pair of `[counter, nodeID]`

_Rule_: If you have two timestamps, the one with a greater counter value is the greater timestamp; If the counter values are the same, the one with the greater node ID is the greater timestamp.

More details [here](https://www.youtube.com/watch?v=q_UZ532Os14)

<img tag="chapter 9 lamport" src="img/ch9-lamport.png" width="500px">

Every node and every client keeps track of the maximum counter value it has seen so far and includes that maximum on every request.

**Version vectors** can distinguish whether two operations are concurrent or whether one is causally dependent on the other, whereas **Lamport timestamps** always enforce a total ordering.

#### **Timestamps ordering is not sufficient**
The problem is that the _total order of operations_ only emerges after you have collected all of the operation

### Total Order Broadcast
Getting all nodes to agree on the same total ordering of operations is tricky. Get to an agreement with just a single node processing all the transactions/operations is easy.

However, in this case, the challenge is how to scale the system if the throughput is greater than a single leader can handle and how to handle failover if the leader fails

> Total order broadcast => protocol for exchanging messages between nodes. Needs 2 safety properties Reliable Delivery & Total Ordered Delivery

These 2 safety properties must be guaranteed even when a node fails or the network is faulty

#### **Using total order broadcast**
Consensus services such as: `ZooKeeper` & `etcd` implemented total order broadcast. There's a strong correlation between consensus & total order broadcast

Total order broadcast is exactly what you need for db replication. Using _State Machine replication_ replicas can remain consistent

An **important** aspect of total order broadcast is that the order is fixed at the time the messages are delivered.

This means: _A node is not allowed to retroactively insert a message into an earlier position._

Total broadcast bases its idea on logging. Delivering a message is like appending it to the log

It also helps with Fencing Tokens.

#### **Implementing linearizable storage using total order broadcast**
Total order broadcast is asynchronous: messages are guaranteed to be delivered reliably in a fixed order, there there's no guarantee about when a message will be delivered

While this procedure ensures linearizable writes, it doesn't guarantee linearizable reads. This procedure proves: _Sequential consistency also known as timeline consistency.

Timeline consistency is slightly weaker guarantee than linearizability

#### **Implementing total order broadcast using linearizable storage**
The algorithm is simple: for every message you want to send through total order broadcast, you increment-and-get the linearizable integer, and then attach the value you got from the register as a sequence number to the message

Unlike Lamport timestamps, the numbers you get from incrementing the linearizable register **form a sequence with no gaps**

This means: If a node has delivered _message 4_ and receives a _message 6_ the node knows that it needs to wait for _message 5_.

This is a key difference between total order broadcast and timestamp ordering

## Distributed Transactions and consensus
Consensus is one of the most important concepts in distributed systems

Informally we can define it as: _Get several nodes to agree on something_

There are several situations in which it is important for nodes to agree:
- **Leader election** => In a db with single-leader replication, all nodes need to agree on which node is the leader. Otherwise we could have a split-brain (leading to data inconsistency or data loss)

- **Atomic commit** => We might have the problem of a transaction that fails in some nodes but succeed on others. We have to get all the nodes to agree: _all abort/rollback_ or _all of them commit_

We can't assume that the whole system will work under the consensus premise. FLP Result proves that consensus will fail in asynchronous if a node(s) fails

[FLP Result](https://www.youtube.com/watch?v=rN6ma561tak) is an interesting topic

### Atomic Commit and Two-phase commit (2PC)
The main advantage of using transactions is to provide simple semantics in the case where something goes wrong in the middle of making several writes

The only two outputs available are: _commit_ or _abort_.

Atomicity prevents failed transactions from **littering** the db with half-finished results and half-updated state.

Also, Atomicity helps secondary index to stay consistent with the primary data.

#### **From single-node to distributed atomic commit**
On a single node, transaction commitment crucially depends on the order, in which data is durably written to disk.

> First the data => The commit record

**What if multiple nodes are involved in a transaction?**

Sending the commit to all nodes might not be enough, what if the commit succeeds in some nodes and fails on other nodes, this would violate the atomicity guarantee.

**What could go wrong with only one commit?**

- Some nodes may detect a constraint violation or conflict while others might succeed
- Some commits might be lost in the network (timeouts)
- Some nodes may crash before commit record is fully written

**Important** A transaction commit must be irrevocable. There's no space to say: _some nodes have it, some others don't_

Once a transaction has been committed on one node, it cannot be retracted again if it later turns out that it was aborted on another node.

A node must only commit once it is certain that all other nodes in the transaction are also going to commit.

**Important** Once data has been committed, it becomes visible to other transactions, and thus other clients may start relying on that data.

#### **Introduction to 2PC**
Two-phase commit is an algorithm for achieving atomic transaction commit across multiple nodes.

<img tag="chapter 9 map" src="img/ch9-2pc.png" width="500px">

> 2PL(Serializable isolation) !== 2PC (Atomic commit in distributed dbs)

2PC uses a component that usually does not appear in single-node transactions: **A coordinator(also known as transaction manager)**

For 2PC, the coordinator sends the _write message_ to all participants (nodes). Then, sends a **prepare** request of each participants:

- If all participants say "we good" then commit
- If any of the participants says "Nope" then abort

#### **A system of promises**
1. When the app starts a distributed transaction, it request a `transactionID` from the coordinator
2. The app starts a single-node transaction on each of the participants, using the `transactionID`. The coordinator or any of the participants can abort at any time
3. When the app is ready to commit, the coordinator sends a prepare request to all participants. If the request fails then abort!
4. When the participant receives the prepare request it ensures that it can definitely commit. Crashes or power failures are not accepted to refuse a commit.
5. When the coordinator receives all the responses, then it takes a final decision: `[commit | abort]`. 
6. If its `commit` the coordinator must retry (infinitely) until it succeeds. Coordinator promised, then it delivers.

There are 2 crucial moments in this protocol:
- When a participant says: "Yes, I'll commit no matter what"
- When the coordinator says: "Ok, I'll commit! no matter what"

If the coordinator fails before sending the prepare requests, a participant can safely abort the transaction

However, if a participant decided for `yes` then it cannot abort unilaterally. It needs to wait to hear back from the coordinator

When a participant is in this state it's called: _in doubt_ or _uncertain_

If the coordinator crashes in between the `prepare/write` phase, after it recover will read its own **transaction log** to determine the status of all _in-doubt_ transactions

**Important** Thus, the commit point of 2PC comes down to a regular single-node atomic commit on the coordinator.

#### **Three phase commit**
Two phase commits are called **Blocking atomic commit protocol** (because it can get stuck while waiting for the coordinator to restore)

3PC is an option to be _non-blocking_ however needs a perfect system: Bounded delay and nodes with bounded responses

In general, non blocking atomic commit requires a **PERFECT FAILURE DETECTOR** 

### Distributed Transactions in practice
In practice many Cloud services choose not to implement distributed transactions due to the operation problems they engender:
- Operational problems
- Killing performance
- Promising more than they can deliver

Some implementations of distributed transactions carry a heavy performance penalty. (MySQL distributed transactions are 10 times slower than single-node transactions)

But... what is a distributed transaction?
- Database-internal distributed transactions => All nodes participating in the transaction are running the same db software 
- Heterogeneous distributed transaction => In this case, there are multiple DB types, for example: different vendors or versions.

> Database-internal distributed transactions > Heterogeneous

#### **Exactly-once message processing**
By atomically committing a message and its side effects, we can ensure that the message is effectively processed exactly once, even if it requires a few retries before it succeeded.

Such a distributed transaction is only possible if all systems affected by the transaction are able to use the same atomic protocol.

XA API needs to be implemented, something similar to a Interface in Java

#### **Holding locks while in doubt**
Why do we care a lot about a transaction being stuck in doubt?

Well because, the db is _locked_ and we cannot process more transactions.

If the coordinator goes offline for 20 mins, the locks might be there for the same time as well.

#### XA transactions
XA is a protocol that assumes that your app uses a network driver or client library to communicate with the participant dbs or messaging services.

#### **Recovering from coordinator failure**
In theory, if the coordinator crashes and is restarted, it should cleanly recover its state from the log and resolve any in-doubt transaction

However, in practice **Orphaned in-doubt transactions** can occur.

Even rebooting your db servers will not fix the problem. It's a sticky situation

2PC coordinators must preserve the locks of an in-doubt nodes.

Otherwise, the only available solution would be **manually resolve** the operation.

Many XA implementations have an emergency scape hatch called:
**Heuristic decisions**

**Important** Heuristic decisions are intended only for getting out of catastrophic situations, not for regular use

#### **Limitations of distributed transactions**
XA transactions solve the real and important problem of keeping several participant data systems consistent with each other.

However, this approach has failures. For example: 
- The coordinator might become a bottle neck if its not replicated.
- We depend completely on the coordinator logs, instead of being stateless.
- There is no conflict resolution in XA
- For 2PC to successfully commit, its required a full agreement of the participants. One failure and _abort_.

Distributed transactions have the tendency of amplifying failures.

<img tag="chapter 9 consensus vs atomic commit" src="img/ch9-consensus-vs-atomic-commit.png" width="400px">

### Fault tolerant consensus
The consensus problem is normally formalized as follows:
One or more nodes may propose values, and the consensus algorithm decides on one of those values.

A consensus algorithm must satisfy the following properties:
- Uniform agreement: No two nodes decide differently
- Integrity: No node decides twice
- Validity: If a node decides value `v` then `v` was proposed by some node
- Termination: Every node that does not crash eventually decides some value

Every one decides on the same outcome, and once you have decided, you cannot change your mind.

Termination is a liveness property whereas the other three are safety properties.

This system model assumes that when a node "crashes" it never comes back. Remember the earthquake example. This satisfies the termination property

Of course, if all nodes crash there's no way to continue with the algorithm.

There's a limit to the number of failures that an algorithm can tolerate

The termination property is subject to the assumption that fewer than half of the nodes are crashed or unreachable.

Most implementations of consensus ensure that the safety properties (Agreement, integrity and validity) are always met, even if a majority of nodes fail or there is a severe network problem

**Important** A large-scale outage can stop the system from being able to process transactions, but wont corrupt the consensus system by making invalid decisions.

#### **Consensus algorithms and total order broadcast**
The best known fault-tolerant consensus algorithms are:
- Viewstamped Replication (VSR)
- Paxos
- Raft
- Zab

Most of these algorithms decide on a sequence of values. Mimic-ing Total order broadcast. 

**Remember** Total order broadcast => Deliver messages exactly once to each node. Keeping the same order.

**Important** Total order broadcast is basically several rounds of consensus.

- Due to the **agreement** property, all nodes decide to deliver the same message in the same order
- Due to **integrity** property, messages are not duplicated
- Due to the **validity** property, messages are not corrupted and not fabricated out of thin air
- Due to **termination** property, messages are not lost.

#### **Single-Leader replication and consensus**
Systems that require a manual intervention from humans do not satisfy the termination property of consensus.

#### **Epoch numbering and quorums**
All of the consensus protocols discussed so far, internally use a leader in some form or another, but they don't guarantee that the leader is unique

Within Epoch number, we can ensure that the leader is unique, but it might or not the same leader.

Every time a leader is thought to be "dead", a vote is started among the nodes, this will increase the epoch number and if the previous leader wants to write, it will need to be re-elected

So if the previous leader wants to perform an action, it will need to collect votes from the quorum

The quorum will accept the proposal if there's no other leader with a higher epoch number.

#### **Limitations of Consensus**
Consensus algorithms bring concrete safety properties (Agreement, Integrity, and Validity) to systems where everything is uncertain, and remain fault-tolerant.

Consensus provide total order broadcast, therefore they can also implement linearizable atomic operations

However, all of these benefits come with a price. The proposal voting process is kind of **async replication**

Consensus systems always require a strict majority to operate. This means you need a minimum of three nodes in order to tolerate one failure

For consensus we usually have a **fixed** number of participants, its uncommon to have a dynamic number of participants

Consensus systems generally rely on timeouts to understand that a node is out of service.

This could be a performance problem, because on networks with highly variable delay, it could lead to re-elections all the time.

Thus, nodes would spend more time than what is required voting, than doing useful tasks

### Membership and Coordination services
Projects like `ZooKeeper` and `etcd` are often described as "distributed key-value stores" or "coordination and configuration services"

They pretty much like a database (key -> value). So then why all the effort to implement a consensus algorithm?

They were designed to hold a small amount of data that can fit in memory.

That small amount of data is replicated across all the nodes using a fault-tolerant total order broadcast (deliver commits one by one on each replica. At the same rightful order)

ZooKeeper provides as well other useful set of features
- **Linearizable atomic operations** => The consensus protocol, guarantees that the operation will be atomic and linearizable, even if a node fails or the network is interrupted. Distributed locks are used for this, and it will be implemented via a lease.

- **Total ordering of operations** => When some resource is protected by a lock or a lease, you need a fencing token to prevent clients from conflicting with each other in the case of a process pause.

- **Failure detection** => Clients have long-lived sessions on ZooKeeper server. Client and server exchange heartbeats to check if the other is alive. This is also called ephemeral nodes.

- **Change notifications** => Clients can watch other clients changes. This happens through subscribing to notifications

#### **Allocation work to nodes**
Trying to perform majority votes over so many nodes would be terribly inefficient. Instead, ZooKeeper runs on a fixed number of nodes (Usually 3 to 5).

The voting happens in those nodes while supporting a potentially large number of clients.

ZooKeeper outsources some of the work of coordinating nodes.

Normally, the kind of data managed by ZooKeeper is quite slow-changing (minutes or hours):
- "Node lives on IP address 10.1.1.23 and its the leader of partition 7"

ZooKeeper must not store **runtime** data.

#### **Service Discovery**
In cloud/distributed systems, you often don't know the IP addresses of your services ahead of time

You can configure your services such that when they start up they register their network endpoints in a service registry, where they can be found by other services.

DNS is the traditional way of looking up the IP address for a service name. Although DNS lookups are not linearizable.

DNS searches are little stale. This does not represent a problem.

Service discovery does not require consensus. Leader election does

Some consensus systems allow **read-only cache replicas**. These replicas do not participate in voting, however, they receive asynchronously the change log from the decisions made.

#### Membership services
Via consensus, nodes can decide who is actually alive.

#### Summary
**Linearizability**: 
- its goal is to make replicated data appears as thought there were only a single copy, and make all operations.
- It makes the DB to behave like a single-thread. 
- It has performance issues.

**Causality**: 
- Imposes an ordering on events in the system. 
- Basically, what happened before what, based on cause and effect
- Puts all operation in a single, totally ordered timeline
- Some things can be concurrent
- Works with branching and merging
- Causal consistency might not be enough.

**Consensus**
- Deciding something in such a way that all nodes agree on what was decided and such that the decision is irrevocable.

**Linearizable compare and set registers** => The register needs to automatically decide whether to set its value, based on whether its current value equals the parameter given in the operation

**Atomic transaction commit** => A database must decide whether to commit or abort a distributed transaction

**Total order broadcast** => The system must decide on the order in which to deliver messages

**Locks and leases** => When several clients are racing to grab a lock or lease, the lock decides which one successfully acquired it

**Membership/coordination service** => Given a failure detector (i.e. timeouts) the system must decide which nodes are alive, and which should be considered dead

**Uniqueness constraint** => When several transactions concurrently try to create conflicting records with the same key, the constraint must decide which one to allow and which should fail with a constraint violation.

**Single-leader app** => All decisions are made by one single node.

In a single-leader application when the leader dies, then:
- We can wait until leader comes back, halting all operations. Accept that the system will be blocked in the mean time.
- Manually failover by human hands. It's quite common
- Use an algorithm to automatically choose a new leader. This approach requires a consensus algorithm

Tools like **ZooKeeper** play an important role in providing an _outsourced_ consensus, failure detection, and membership service that apps can use.

leaderless systems or multi-leader replication systems not necessarily require consensus.

## Concepts
**Eventual Consistency** => If you stop writing to a DB and wait for some unspecified length of time, then eventually all read requests will return the same value

**Serializability** => isolation property of transactions, where every transaction may read and write multiple objects. It guarantees that transactions have been executed in some serial order.

**Linearizability** => it's a recency guarantee on reads and writes of a register (object). Does not prevent problems such as _write skews_

**Split brain** =>  distributed system that acknowledge 2 nodes as leaders

**Single-leader replication (Potentially Linearizable)** => The leader has the primary copy of the data that is used for writes, followers have backup data.

**Read repair** => When a client finds a _stale_ response, it will update the _stale_ replica with latest version. This approach is good for `frequently read` systems

**Anti-entropy process** => background process that constantly looks for differences in the data between replicas

**Partial Order** => Concurrent operations may be processed in any order, but if one operation happened before another, they must be processed in that order on every replica.

**Timestamps** => needs to come from a _logical clock_, which is an algorithm to generate a sequence of numbers to identify operations, typically using counters that are incremented for every operation.

**Total order** => Every operation has a unique sequence number, and you can always compare two sequence number to determine which is greater

**Total order broadcast** => protocol for exchanging messages between nodes. Needs 2 safety properties Reliable Delivery & Total Ordered Delivery

**Reliable Delivery** => No messages are lost: If a message is delivered to one node, it is delivered to all nodes

**Totally Ordered Delivery** => Messages are delivered to every node in the same order.

**State machine replication** => If every message represents a write to the db, and every replica processes the same writes in the same order, the replicas will remain consistent with each other (Aside from any temporary replication lag)

**Orphaned in-doubt transactions** => Transactions for which the coordinator cannot decide the outcome for whatever reason.

**Heuristic decisions** => Allowing a participant to unilaterally decide to abort or commit an in-doubt transaction without a definitive decision from the coordinator

**Membership service** => Service that determines which nodes are currently active and live members of a cluster