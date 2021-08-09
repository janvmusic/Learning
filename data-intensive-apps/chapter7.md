# Chapter 7: Transactions
<img tag="chapter 6 map" src="img/ch7.png" width="300px">

_Some authors have claimed that general two-phase commit is too expensive to support, because of the performance or availability problems that brings. We believe it is better to have application programmers deal with performance problems due to overuse of transactions as bottlenecks arise, rather than always coding around the lack of transactions_ 

In **harsh reality of data systems** many things can go wrong:
- The db or hardware fails at any time
- The app could crash anytime
- Network interruptions
- Several clients may write (at the same time) to the db and override other's change
- Race conditions
- Clients might read partially updated data

In order to be reliable, a system has to deal with these faults and ensure that they don't cause catastrophic failure of the entire system.

> transaction => is a way for an application to group several reads & writes together into a logical unit.

For decades, `transactions` have been the mechanism of choice for simplifying these issues.

If a transaction `succeeds => commit` or it `fails => abort/rollback`.

With transactions handling errors becomes much simpler for an app, because it **does not need to worry** about **partial failure**.

**What is the purpose of a transaction?**

Simplify the programming model for apps accessing a database. Transactions offer _safety guarantees_ like not dealing with certain errors or concurrency issues

**Remember** Not every application needs transactions, and sometimes there are advantages to weakening transactional guarantees

## The Slippery concept of a transaction
Like any other technical design choice, transactions have advantages and limitations.

### The meaning of ACID
> ACID => Atomicity, Consistency, Isolation & Durability
> BASE => Basically Available, Soft state and eventual Consistency

**ACID** is a term to express a precise **terminology for fault-tolerance** mechanisms in DBs

Databases that don't accomplish **ACID** usually perform in a `BASE` state.

`ACID` differs from one DB to another. Specially in `Isolation`, today's ACID compliant is ambiguous.

#### Atomicity
In general, **_Atomic_** refers to something that cannot be broken down in smaller parts.

In **multi-thread programming** means that one thread cannot see an unfinished or half-finished product from another thread. 

In **ACID context** describes what happens if a client wants to make several writes, but a fault occurs after some of the writes have been processed.

> Atomicity => A transaction cannot be committed unless all operations succeed. If a fault occurs, then rollback

**Important**: Atomicity simplifies this problem: If a transaction was aborted, the app can be sure that it didn't change anything, so it can be safely be retried.

#### Consistency
This word is overused in computer science and system designs. For example
- _Replica consistency & Eventual Consistency_ => Asynchronously replicated systems
- _Consistent hashing_ is an approach to solve partition rebalancing
- CAP theorem means also _linearizability_

However, in **ACID** context means a database being in a "good state"

> Invariant => statements about your data

`ACID consistency` is that you have _invariants_ that must always be true. For example:
- Final balance of an accounting app

**Important**: `Consistency` is not something that the DB can guarantee, it's the app that needs to check that _invariants_ are ok.

`Atomicity`, `Isolation`, `Durability` are properties of the DB, `Consistency` is a property of the application.

#### Isolation
Most DBs are accessed by several clients at the same time

If clients are reading or writing different parts of the db, then there's no concurrency problem. 

However, if they are accessing the same data we can incur in a `Race Condition`

> Race condition => Concurrency problem of several clients trying to modify [and|or] read the same data.

**Isolation** in `ACID` context means that concurrently executing transactions are isolated from each other.

_They cannot step on each other's toes_

> Serializability => Each transaction can pretend that it is the only transaction running on the entire DB.

In practice, serializable isolation is rarely used, because it carries a performance penalty.

#### Durability
In `ACID` context **Durability** means that you will have a safe place to store your data without feat of losing it.

**Durability** is the promise that once a transaction has committed `successfully`, any data it has written will not be forgotten, even if there's a hardware fault or the db crashes.

> Durability in Single-node => Data has been written to a non volatile storage

> Durability in Replicated DB => data has been successfully copied to some number of nodes.

### Single-Object and Multi-Object operations
To recap:

> Atomicity => How the DB will handle an error when a write fails

> Isolation => Concurrently running transactions shouldn't interfere with each other.

`Atomicity` & `Isolation` describe what the db should do if a client makes several writes within the same transaction

`Multi-object transactions` are often needed if several pieces of data need to be kept in sync.

`Multi-object transactions` require some way of determining which read and write operations belong to the same transaction:
- Typically done by using client's TCP connection, remember `[BEGIN -> TRANSACTION -> COMMIT]` is considered a transaction
- Many nonrelational DBs don't have such a way of grouping operations together.

#### Single-Object Writes
`Atomicity` & `Isolation` also apply when a single object is being changed. 

Most db storages aim to provide atomicity and isolation on the level of a single object on one node.

> Atomicity => can be implemented using a log for crash recovery

> Isolation => can be implemented using a lock on each object.

> Lock => allowing only one thread to access an object at any one time

> Increment operation => Removes the need for a read-modify-write cycle

> Compare-and-set operation => allows a write to happen only if the value has not been concurrently changed by someone else

A `transaction` is usually understood as a mechanism for grouping multiple operations on multiple objects into one unit of execution

#### Handling errors and aborts
A key feature of a transaction is that it can be aborted and safely retried if an error occurred.

**Important** If the DB is in danger of violating its guarantee of `atomicity`, `isolation`, or `durability`, it would rather abandon the transaction entirely than allow it to remain half finished.

> Best effort => The db will do as much as it can, and if it runs into an error, it won't do anything it has already done

For leaderless replication, they work on a "best effort". **Its app responsibility to recover from errors.**

What are the disadvantages or transaction retry?
- If network fails but transaction succeeds, clients might retry the insert. Unless you have an app mechanism to dedup
- If the problem is due to overload... retrying might get this problem to a worse state. Remember to limit retries.
- Its only worth retrying after transient errors (deadlock, isolation violation, network interruption and failover)
- If the transaction has side effects outside of the transaction, then those side effects might get executed even when transaction was aborted.
- If client fails during a retry... **Good Game hahaha**

## Weak Isolation Levels
If two transactions do not touch the same data, they can be run in parallel, because neither depends on the other.

Concurrency issues (race conditions) only come into play when one transaction reads data that is concurrently modified by another transaction or when 2 transactions try simultaneously modify the same data

> Serializable isolation => The DB guarantees that the transactions have the same effect as if they ran serially.

Concurrency bugs caused by weak transaction isolation are not just a theoretical problem. They have caused:
- Substantial loss of money 
- Led to investigation by financial auditors 
- Caused customers data to be corrupted

### Read committed
Most basic level of transaction and guarantees 2 things:
1. No _dirty read_. What you read has been committed.
2. No _dirty writes_. When writing to the db, you will only override what has been committed.

#### No dirty reads
Transactions running at the read committed isolation level must prevent _dirty reads_. But how?

**Why is it useful?**
- Prevent transactions to read _partial updates_
- Prevent transactions to read _data that will be rollback later_

#### No dirty writes
Transactions running at the _read committed isolation level_ must prevent dirty writes, usually by delaying the second write until the first write's transaction has been committed or aborted

**Why is it useful?**
- Prevent bad outcomes for multi-object writes (Car + Invoice example)
- Read committed does not prevent the race condition between 2 counter increments.

#### Implementing read committed
DB prevent dirty writes by using **row level locks**

> row level lock => When a transaction wants to modify a particular object (row or document), it must first acquire a lock on that object. It must hold the lock until committed or aborted.

**How do we prevent dirty reads?**
Through the same lock, _if you want to read then lock the row, once done, release it._

The _lock_ approach does not work well in practice, one long write could slow everything

**Important** A slowdown in one part of an application can have a knock-on effect in a completely different part of the application, due to writing locks.

_Then how do we solve this issue?_

reads get the old value while a transaction is _on-going_ 

Once the transaction is committed, then the db returns the new value.

### Snapshot isolation and Repeatable read 
> read skew => reading from an unfinished transaction. Its an example of a _nonrepeatable read_

**Read skew** is considered **acceptable** under read-committed isolation

Which situations cannot tolerate such temporary inconsistency?
- Backups when the db keeps receiving writes
- Analytic queries and integrity checks

> Snapshot isolation => The idea is that each transaction reads from a consistent snapshot of the db. The transaction sees only the old data from that particular point in time.

When a transaction can see a consistent snapshot, frozen at a particular point in time, it is much easier to understand

#### Implementing snapshot isolation
Typically uses _write locks_ to prevent dirty writes.

Reads do not require any locks. Basically, _readers never block writers, and writers never block readers_

> Multi-version concurrency control(MVCC) => The db must keep several different committed versions of an object, because various in-progress transactions may need to see the state of the db at different points in time

MVCC allows db to read transactions from multiple snapshots. The example of the account and `delete_by`

#### Visibility rules for observing a consistent snapshot
When a transaction reads from the db, transaction IDs are used to decide which objects it can see and which are invisible.

An Object is visible if both of the following conditions are true:
- At the time when the reader transaction started, the transaction that created the object had already committed
- The object is not marked for deletion, or if it is, the transaction that requested deletion had not yet committed.

By never updating values in place but instead creating a new version every time a value is changed, the db can provide a consistent snapshot while incurring only a small overhead

#### Indexes and Snapshot isolation
**How does indexes work in a multi-version database?**

1. One option is to have the **index simply pointing to all versions of an object** and require an index query to **filter out** any object **versions that are not visible to the current transaction**. When garbage collector removes old object versions that are no longer visible to any transaction, the corresponding index entries can also be removed

2. Another approach is to use **append-only/copy-on-write** variant that does not override pages of the tree when they are updated but instead creates a new copy of each modified page.

3. With **append-only B-trees**, every write transaction creates a new B-tree root, and a particular root is a consistent snapshot of the db at the point in time when it was created
Basically, when using B-trees writes do not filter out by transaction IDs but create new roots. This process requires a background process for compaction and garbage collection.

More details on this [Video - Isolation Levels in DBMS](https://www.youtube.com/watch?v=-gxyut1VLcs)

#### Repeatable read and naming confusion
Snapshot isolation is a useful isolation level, specially for read-only transactions
- Oracle names it as _serializable_
- Postgres & MySQL names it as _repeatable read_

Even though several dbs implement repeatable read, there are big differences in the guarantees they actually provide, despite being ostensibly standardized.

In conclusion: _nobody really knows what repeatable read means_

### Preventing Lost updates
The **read committed** & **snapshot isolation** are guarantees for read-only transactions, during concurrent transactions

The **lost update** problem can occur if an application _reads some value_ from the db, _modifies it_, and writes back the modified value (read-modify-write cycle) 

If this happens for concurrent transactions, then one update will be lost, because the second write does not include the first modification.

This problem can occur in the following scenarios:
- Increment counter (balance example)
- Making a local change to a complex value (i.e. adding an element to JSON)
- Two users editing a wiki page at the same time.

#### Atomic write operations
Most common solution, removes the need to implement _read-modify-write_ cycles

This solution depends on your code expressed in terms of these operations. Usually the best solution

> Cursor stability => Atomic operation usually are implemented using a Lock on the object when it is read, so that no other transaction can read it until the update has been applied.

Due to the nature of ORMs, it is easy to write code that performs unsafe _read-write-modify_ instead of atomic operations.

#### Explicit Locking
Basically, the app explicitly locks the objects that is going to use, then the app performs the _read-write-modify_ 

If any concurrent transaction wants to use any of the objects, then it is forced to wait until the first _read-write-modify_ has completed.

This solution works, however you need to **think carefully where locks** are required, otherwise you'll be introducing race conditions

#### Automatically detecting lost updates
**Atomic operations** and **locks** are ways of preventing lost updates by forcing _read-write-modify_ cycles to happen sequentially

An alternative is to allow the concurrent transactions to run in parallel and, if the transaction manager detects a lost update, abort the transaction and force it to retry its _read-write-modify_ cycle

An advantage is that dbs can perform this check efficiently in conjunction with snapshot isolation

Lost update detection is a great feature, because it does not require application code to use any special db feature.

#### Compare-and-set
The purpose of this operation is **to avoid lost updates** by allowing an **update to happen ONLY if the value hasn't change** since your last read.

If previous value and new one, does not match, then you will need to retry the _read-write-modify_ cycle.

#### Conflict resolution and replication
For distributed dbs, there are additional steps required to prevent lost updates. For example **Locks** and **Compare-and-set** assume that there is a single _up-to-date_ copy of the data.

A common approach  in such replicated dbs is to allow concurrent writes to create several conflicting versions of a value and use app code or special data structure to resolve and merge these versions after the fact

> Commutative => You can apply transactions in a different order on different replicas, and still get the same result.

**Atomic operations** works well in replicated context, specially if transactions are `commutative`

### Write Skew & Phantoms
_dirty writes_ and _lost updates_ are two types of race conditions.

### Phantoms causing write skew
On some cases, `write skews` follow this pattern:
1. Select query that checks something(existig name, balance, if the room is free)
2. Depending on the result of the first query, then app code decides what to do.
3. Then apply the operation (update, delete, insert)
4. The result of the previous operation, will totally change the result of step 2.

> Phantom => Where a write in one transaction changes the result of a search query in another transaction.

#### Characterizing a write skew
> write skew => it is neither a dirty write nor a lost update, because 2 transactions are updating two different objects. On Call doctor's example

<img tag="write skew" src="img/ch7-write-skew.png" width="300px">

You can think of write skew as a generalization of the lost update problem. **Write skew** can occur if two transactions read the same objects, and then update some of those objects(different transactions can update different objects)

**How we solve a Write Skew?**
- Serializable isolation level is your best option
- Atomic single-object operations don't help, as multiple objects are involved
- Also automatic detection of lost update is not helpful either, because this is not a lost update example
- Some dbs allows you to add certain constraints, which are then enforced by the db. However, most skew problems involve more than one object, making constraints insufficient.
- The second best option for this is an **explicit lock** to the rows that the transaction depends on.

> Phantom => Where a write in one transaction changes the result of a search query in another transaction.

Snapshot isolation avoids phantoms in read-only queries. For `read-write` transactions, phantoms can lead to tricky cases of write skew.

### Materializing conflicts
If the problem of phantoms is that there is no object to which we can attach the locks, perhaps we can artificially introduce a lock object into the db?

Example: calendar for meetings table.

> Materializing conflicts => it takes a phantom and turns it into a lock conflict on a concrete set of rows that exist in the db.

Since _materializing conflicts_ can be hard and error-prone. Use this as last resort.

## Serializability
**Serializable isolation** is usually regarded as the strongest isolation level. 
- It guarantees that even though transactions may execute in parallel, the end result is the ame as they had executed one at a time.
- Transactions executed _serially_ without any concurrency.
- Encures that if transactions behave correctly when run individually, the continue to be correct when run concurrently
- It prevents _all_ possible race conditions.

**So, if it's so magical, why aren't all dbs using it?** They can implement serializability in 3 ways
- Actual Serial Execution
- Two-phase locking
- Optimistic concurrency control techniques

### Actual Serial Execution
The simplest way of avoiding concurrency problem is to remove the concurrency entirely. _Execute one transaction at a time_

This is actually achievable due 2 things:
- RAM is cheap. We can keep active data set in memory
- OLTP db designers discover that transactions usually are short and only make a small number of reads and writes.
- OLAP can be run in snapshot isolation.

A system designed for single-threaded execution can sometimes perform better than a system that supports concurrency, because it can avoid the coordination overhead of locking. However the throughput is limited to that of a single CPU core.

#### Encapsulating transactions in stored procedures
Systems with a single-threaded serial transaction processing don't allow interactive multi-statement transactions (booking example where user needs to input data)

Instead, the app must submit the entire transaction code to the db ahead of time, as a stored procedure. 

**Pros and Cons of stored procedures**
- Con: Vendor specific and outdated
- Con: Code running in a db is difficult to manage
- Con: DB is often much more performance-sensitive than an application server.
- Pro: Today, most of DBs have abandoned PL/SQL
- Pro: With `in-memory` data and stored procedures, you don't need for I/O 

## Concepts
**append-only B-tree** -> _Key / Value_ Pair in documents of specific type. Sorted by hash or strings.

**ACID** -> is a term to express a precise **terminology for fault-tolerance** mechanisms in DBs
```
A -> Atomicity   -> How the transaction is encapsulated (several writes) & what happens if it fails (commit or rollback)
C -> Consistency -> Its on App side, tests that the data remains consisten after a write. Uses invariants for example: account balance
I -> Isolation   -> Describes how the DB works with concurrent transactions
D -> Durability  -> How the DB persists the committed transaction. 
``` 

**Dirty Reads** -> trying to read from an object that hasn't been committed yet
```
T1 = {
    W(A) // not committed
}

T2 = {
    R(A)
} 
```

**Dirty Writes** -> Prevent writes until previous transaction finishes

**Nonrepeatable reads** -> Inconsistent reads between transactions
```
T1 reads R(A) = 10
T2 writes W(A) as 20
T3 reads R(A) = 20

Then we can conclude that T1 & T3 are Nonrepeatable reads
```

**Phantom** -> Where a write in one transaction changes the result of a search query in another transaction.
**Phantom** -> Inconsistent result from a query due in between transactions
```
T1 reads R(A)  = 2 rows
T2 writes W(A) = 1 row inserted
T3 reads R(A)  = 3 rows

Thus we can infer that the discrepancy between T1 and T3 is a phantom phenomenon
```

**Compare-and-set operation** -> allows a write to happen only if the value has not been concurrently changed by someone else

**read skew** -> reading from an unfinished transaction. Its an example of a _nonrepeatable read_

**write skew** -> it is neither a dirty write nor a lost update, because 2 transactions are updating two different objects. On Call doctor's example

**Snapshot isolation** -> The idea is that each transaction reads from a consistent snapshot of the db. The transaction sees only the old data from that particular point in time.