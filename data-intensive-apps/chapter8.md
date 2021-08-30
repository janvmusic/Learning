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

#### Network faults in practice
No body is immune to network problems!

> Network partition => When one part of the network is cut off from the rest due to a network fault.

Even if network faults are not common in your environment, that doesn't exclude the responsibility of your code performing well under a network fault.

If the error handling of a network fault is not defined and tested, arbitrarily bad things could happen.

Handling network faults does not necessarily mean _tolerate them_

**Important** You do need to know how your software reacts to network problems and ensure that the system can recover from them

#### Detecting faults
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

## Concepts
**Partial Failure** => Some parts of the system are broken, even though other parts of the system are working fine.

**Geographically distributed deployment** => Keeping data geographically close to your users to reduce access latency.

**Shared-nothing System** => The network is the only thing that communicate them. 