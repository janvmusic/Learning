## Systems of Record and Derived Data
Systems that can store and process data can be grouped in 2 broad categories
- **Systems of record** => _Source of truth_, hold the authoritative version of your data. Each fact is represented exactly once. The representation is usually _normalized_
- **Derived data systems** => Data in this kind of system is the result of taking some existing data from another system and transforming or processing it in some way. If you lose derived data, you can recreate it from the original source.

Technically speaking, **derived data** is _redundant_. In the sense that it duplicates existing information. 

However, it's required if we want to have a good performance in our app.

**Derived data** is usually _denormalized_ and you can derive the data based on "points of views"

# Chapter 10 - Batch Processing
<img tag="chapter 10 map" src="img/ch10.png" width="300px">

in the first section of the book we talked about `request & queries` then later we discussed about `responses & results`.

Basically, you ask for something, or you send an instruction, and then sometime later(hopefully) you get a response.

Let's describe 3 types of systems:
- **Services (Online)** => It waits for a request or instruction from a client to arrive. Then tries to process it as fast as possible and responds to the client.

- **Batch processing systems (offline)** => It takes a large amount of input data, runs a job to process it, and produces some output of data

- **Stream processing systems (near-real-time systems)** => A stream processor consumes inputs and produces outputs (rather than responding to a request). These type of systems works on _events_ whereas a job operates on a fixed set of input data. 

## The Unix Philosophy
1. Make each program do one thing well. To do a new job build a fresh rather than complicate old programs by adding new "features

2. Expect the output of a every program to become the input to another, as yet unknown, program.

3. Design and build software, even OS, to be tried early, ideally within weeks. Do not hesitate to throw away the clumsy parts and rebuild them

4. Use tools in preference to unskilled help to lighten a programming task.

Part of what makes Unix tools so successful is that they make it quite easy to see what is going on:

- The input files to Unix commands are normally treated as immutable.

- You can end the pipeline at any point.

- You can write the output of one pipeline stage to a file and use that file as input to the next stage.

## MapReduce and Distributed Filesystems
MapReduce is a bit like Unix tools, but distributed across potentially thousands of machines.

A single MapReduce job is comparable to a single Unix process: it takes one or more inputs and process one or more outputs

MapReduces respects immutability.

We can break MapReduce jobs in 4 steps:
1. Break the files into records
2. Map them to a function we want to use to extract information
3. Sort 'em
4. Reduce it, which means write your custom data.

**HDFS** consists of a daemon process running on each machine, exposing a network service that allows other nodes to access files stored on that machine.

Distributed systems continuously replicate these files on other places.

### MapReduce Job Execution
**MapReduce** is a programming framework with which you can write code to process large datasets in a distributed filesystem like HDFS.

1. Read a set of input files and break it up into _records_
2. Transform the records through a Mapper function
3. Sort all the key-value pairs available
4. Call the reducer function to iterate over the sorted key-value pairs.

To create a MapReduce job, you need to implement 2 callback functions: 
- Mapper => Called once for every input record, extracts the key and value from the input record.
- Reducer => Collects all the values belonging to the same key and calls the reducer which produces an output record.

Basically, the mapper extracts the key-value pairs and the reducer process this data.

#### **Distributed execution of MapReduce**
The main difference between Unix pipelines & MapReduce is that MapReduce can parallelize a computation across many machines, without having to write code explicitly to handle parallelism

The mapper and reducer only operate on one record at a time.

The mapper and reducer don't need to know where the input comes from or where the output goes

<img tag="chapter 10 map reduce example" src="img/ch10-hdfs-map-reduce.png" width="500px">

**Important** Within this approach we try to keep the data as close as possible to the reducer.

In most cases the **Map task** is not yet in the machine assigned to process it, so the MapReduce framework first copies the code to the appropriate machines.

The output of the mapper consists of `key -> value` pairs.

The reduce side of the computation is also partitioned. The number of reduce tasks is configured by the job author.

To ensure that all **key-value pairs** with the **same key** end up at the same reducer, the framework **uses a hash of the key** to determine which reducer should process it.

The key-value pairs must be sorted, but usually the dataset is likely to be massive. 

What to do? Sort data in stages! also known as **_shuffle_**
1. Each map task partitions its output **by reducer**
2. Once the mapper has sorted out the files based on the reducer, the scheduler then informs reducers to fetch their data
3. The reducer downloads from nodes it's data. 
4. The reducer takes the files from the mappers and merges them together, preserving the sort order.
5. The reducer starts to process each key.
6. The output of the reducer is written to a file on the distributed filesystem.

## Concepts
**HDFS** => Daemon that allows other nodes to access file stored in a machine

**MapReduce** => Framework that allows you to process data across different nodes (distributed system)

**Mapper** => Called once for every input record, extracts the key and value from the input record.

**Reducer** => Collects all the values belonging to the same key and calls the reducer which produces an output record.
