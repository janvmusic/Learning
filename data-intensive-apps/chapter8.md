# Chapter 8: The trouble with Distributed Systems
<img tag="chapter 8 map" src="img/ch8.png" width="300px">

_In the end, our task as engineers is to build systems that do their job_

## Faults and Partial failures
When writing a program on a single computer, it normally behaves in a fairly predictable way: _either it works or it doesn't_

Having to reboot a system alleviates temporarily an issue, but not the root cause. 

Having to reboot is a consequence of badly written software.

> Deterministic => When the hardware is working correctly, then it an operation produces the same result.

A choice in the design of computer: _If an internal fault occurs, we prefer a computer to crash completely, rather than returning a wrong result, because wrong results are difficult to deal with_

When you are writing software that runs on several computers, connected by a network, the situation is fundamentally different.

With distributed systems, we have to face the reality and how things can and will go wrong.

> Partial Failure => Some parts of the system are broken, even though other parts of the system are working fine.

The difficult part of a _partial failure_ is that they are _nondeterministic_

The nondeterminism and possibility of partial failures is what makes distributed systems hard to work with.

### Cloud computing and supercomputing
> HPC => High performance computing

**Supercomputers** are usually like a single-node computers. If something fails, then the whole system stops and then resumes once the problem is repaired

On the other hand **Cloud computing** is often associated with: _multi-tenant_, _datacenters_ _commodity computers connected with an IP network_, _elastic/on-demand resource allocation, and _metered billing_

Many internet-related applications are _online_, in the sense that they need to be able to serve users with low latency at any time. Making the service unavailable is not acceptable.

Nodes in cloud services are built from **commodity** machines, which can provide equivalent performance at lower cost.

**Important** The bigger a system gets, the more likely it is that one of its components is broken. 

In large systems, it is reasonable to assume that something is always broken.

The **goal** is to create system that can tolerate failed nodes and still keep working as a whole.

> Geographically distributed deployment => Keeping data geographically close to your users to reduce access latency.

In geographically distributed deployment, communication most likely goes over the internet, which is slow and unreliable (compared with local network).

If we want to make distributed system works, we need to **be in peace with the possibility of partial failure** and build fault-tolerance mechanisms into the software.

**Important** We need to build reliable systems from unreliable components

**Fault handling** must be part of the software design, and we need to **know what behavior to expect** from the software in the case of a **fault**.

Consider a wide range of faults, then artificially create them in our environments. We need to be able to understand how the system will behave in these **faulty scenarios**

_In distributed systems, suspicion, pessimism, and paranoia pay off_

In **Asynchronous packet networks** one node can send a message to another node, but the network gives no guarantee as to when it will arrive or whether it will arrive at all

What could go wrong while sending a message over the network?
- Your request gets lost
- Your request gets into a queue and will be resolved later.
- The remote node failed
- The remote node temporary stopped responding
- The remote node processed your request, but the response got lost 

The sender can't even differentiate between, an error, failure or if the response was lost.

The usual way to handle this is via a _timeout_ and assume that the response is not going to arrive.

#### **Network faults in practice**
No body is immune to network problems!

> Network partition => When one part of the network is cut off from the rest due to a network fault.

Even if network faults are not common in your environment, that doesn't exclude the responsibility of your code performing well under a network fault.

If the error handling of a network fault is not defined and tested, arbitrarily bad things could happen.

Handling network faults does not necessarily mean _tolerate them_

**Important** You do need to know how your software reacts to network problems and ensure that the system can recover from them

#### **Detecting faults**
Many systems need to automatically detect faulty nodes. Example: a load balancer needs to redirect the traffic

There are some clues on how to track if a node is down:
- You can connect to the node, but the destination port is off
- A script can notify if any crash has happened
- Hardware level check
- Unaccessible node

Still, rapid feedback is quite useful, however, it is 100% accurate

## Unreliable Networks
Why are we using **Shared-nothing Systems**?
- Cheap, because does not require specialized software
- It can make use of commoditized cloud computing services
- It can achieve high reliability through redundancy across multiple geographically distributed datacenters

### Timeouts and Unbounded Delays
A long timeout means a long wait until declare a node dead.

A short timeout detects faults faster, but carries a higher risk of incorrectly declaring a node dead.

When a node is declared dead prematurely, it can become a problem, because another node needs to take over the dead node. Even can re-process the same task.

If the system is already struggling with high load, declaring nodes dead prematurely can make the problem worse.

A reasonable amount of time would be `timeout = 2d + r`
> d => Maximum delay for packets, delivery never takes longer than d

> r => time for a node to deliver a response

Unfortunately this is not 100% trustworthy. Because asynchronous systems might have network _unbounded delays_

If your timeout is low, it only takes a transient spike in round-trip times to throw the system off-balance.

#### **Network congestion and queueing**
**Network Congestion** is that if several different nodes simultaneously try to send packets to the same destination, the network switch must queue them up, then feed them into the destination, **one by one**. 

On a busy network, a request might have to wait until a node is clear. 

If the network queue is full, some packages might even get drop.

Another issue might that the destination machine's CPU might be full, meaning that the request will be queued. Depending on the load on the machine, this may take an arbitrary length of time.

And last but not least, on virtualized environments, are often paused while other machine uses de CPU core.

> TCP Flow control / Backpressure => Limit the rate of request sending on a node, to avoid overloading the network.

TCP considers a packet to be lost if its now acknowledge within some timeout. Lost packets are retransmitted automatically

Although, the app does not _see_ the `packet loss and retransmit`, it suffers the resulting delay. 

Queueing delays have an specially wide range when a system is close to its maximum capacity: _A system with a plenty of spare capacity can easily drain queues, whereas in a busy system, long queues can build up VERY QUICKLY_

On cloud computing environments, you can only choose timeouts **experimentally**; Measure the distribution of network round-trip times over an extended period, and over many machines to determine the expected variability of delays.

### Synchronous vs Asynchronous Networks
Distributed systems would be a lot simpler if we could rely on the network to deliver packets with some fixed maximum delay, and not drop packets.

> Synchronous => even as data passes through several routers, it does not suffer from queueing. On synchronous calls, a circuit is reserved from the beginning, from end to end. Nobody else can use this channel.

> Bounded delay => When the maximum end-to-end latency of the network is fixed

On TCP, the packets transmitted use the network bandwidth opportunistically. While TPC is idle, does not use any bandwidth.

Ethernet and IP are packet-switched protocols, this means that suffer from queueing and thus varying delays in the network. These protocols does not have a concept of a circuit

**Important** On audio or video calls, we have a expected rate of bytes to transmit. So we can create a circuit. While on TCP, its optimized for bursty traffic. This means that requesting a web, sending an email, or transferring a file does not have any particular bandwidth requirement.

**Important** On TCP, we just to complete the request as quickly as possible

The internet shares network bandwidth _dynamically_, this approach has the downside of queueing but the advantage is that it maximizes utilization of the wire.

## Unreliable Clocks
Clocks and time are important. Apps depend on clocks in various ways to answer questions like:
- Has the request timed out yet?
- What's the  99th percentile response time of this service?
- How many queries per second did  this  service handle on average?
- How long did the user spend on our site?
- When was this article published?
- When does this cache entry expire?

In distributed system, time is a tricky business, because communication is not instantaneous.
- It takes time for a message to travel to the destiny
- We do not know how much delay exists between sender and receiver

**Important** This is why is difficult to determine the  order in which things happened when multiple machines are involved

In distributed systems, each machine has its own clock. It is possible (to certain degree) to synchronize different clocks via NTP.

Nowadays computers have 2 types of clocks:
- Time of the day clock
- Monotonic clock

### Monotonic vs Time-of-day clocks
Most of modern computers have 2 types of clocks: `time-of-day` & `monotonic`

#### ****Time of day clock**
It returns date and time accordingly to some calendar

Usually synchronized with NTP

#### ****Monotonic clock**
Suitable for **measuring a duration**, such as timeouts or service response

They have two values something likes `start/end`

The difference between `start & end` tells you how much time have elapsed between the two checks.

**Important** The absolute value of the clock is meaningless. It makes no sense to compare monotonic clock values from 2 different computers. Basically, they don't mean the same thing.

> Slewing the clock => NTP may adjust the frequency at which the monotonic clock moves forward. If it detects that the computer's local quarts is moving faster or slower than the NTP server.

On most systems monotonic clocks can measure time intervals in microseconds or less.

Using monotonic clocks in a distributed system is usually good. Mostly, because it does not assume any synchronization between different node's clocks and its not sensitive to slight inaccuracies of measurement

### Clock Synchronization and accuracy
- Monotonic -> Does not need synchronization
- Time-of-day -> requires sync with NTP

**Important** computer clocks are not reliable because..
- Quarts can _drift_ (run faster or slower)
- If a clock differs too much, NTP refuses to sync
- By misconfiguration, you can block NTP synchronization
- Network delays
- NTP might be wrong or misconfigured!
- Leap seconds result in an inaccurate minute (59s or 61s)
- Virtual machines virtualize the hardware clock. Pauses to use the CPU between virtual machines
- Devices that have manually changed their time

If you need accuracy (for example financial markets) you can use `PTP` **Precision Time Protocol** which depends on GPS receivers. However, it requires expertise and significant effort

### Relying on Synchronized clocks
The main problem on clocks is that they look simple and reliable. However, they have plenty of pitfalls.
- A day might not have exactly 86,400s
- time-of-day may move backward in time
- Difference between clock nodes

**Important** Although clocks work quite well most of the time, robust software needs to be prepared to deal with incorrect clocks.

Part of the problem is that incorrect clocks easily go unnoticed. 

**Important** If some piece of the software is relying on an accurately synchronized clock, the result is more likely to be silent and subtle data loss than a dramatic crash.

If your software needs to trust in clocks, it's important to monitor the clock offsets. Any node that drift too much from others, then it should be declared as dead and removed from the cluster
## Concepts
**Partial Failure** => Some parts of the system are broken, even though other parts of the system are working fine.

**Geographically distributed deployment** => Keeping data geographically close to your users to reduce access latency.

**Shared-nothing System** => The network is the only thing that communicate them. 

**Unbounded delay** => System tries to deliver packets as quickly as possible, but there's no upper limit on the time it may take for a packet to arrive

**Synchronous** => even as data passes through several routers, it does not suffer from queueing. On synchronous calls, a circuit is reserved from the beginning, from end to end.

**NTP** => Network Time Protocol

**Smearing** => The best way of handling leap seconds may be to make NTP servers "lie", by performing the leap second adjustment gradually over the course of the day.