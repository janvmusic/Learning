# Chapter 2: Data Models and Query Languages
<img src="img/ch2.png" width="300px">

_The limit of my language mean the limits of my world._

**Data models** define how the software is written and how we think about the problem we are solving.

Many apps are build by layering one data model on top of another.

Each application can define it's own path for data layers. They go from the top level(UI) to the bottom(Hardware)

The basic idea behind is: **_each layer hides the complexity of the layers below it by providing a clean data model._**

**Important**: There are many kinds of data models, and every data model embodies assumptions about how it is going to be used

Its imperative to choose the appropriate data model to the application

## Relational Model vs Document Model
**SQL** => Data is organized based on the relations
  - Relations are called tables
  - Each relation is an unordered collection of tuples (rows)
  - The problem that it solves: _store and query_ data with some kind of regular structure
  - The roots of SQL lies in _business data_ processing. Typically transaction processing & batch processing

**Important** The goal of the relational model was to hide implementation detail(Internal data representation) behind a cleaner interface

## The birth of NoSQL
There's a variety of forces behind the adoption of NoSQL dbs:
- A need for greater scalability (large datasets & very high write throughput)
- A preference for Free and open source software
- Frustration with the restrictiveness of relational schemas.
- Specialized query operations

Applications have different requirements, and the best choice of technology for one use case may well be different from the best choice for another use case

**Polyglot persistence** => A mix between data stores, relational and non-sql

## The Object-Relational Mismatch
**Impedance mismatch** => _if data is stored in relational tables, an awkward translation layer is required between the objects in the application and the db models of tables, rows and columns_

**ORM** frameworks **can't completely hide** the differences between the two models.

MongoDB, RethinkDB, CouchDB & Espresso support JSON as data model.

JSON data representation works better with **Tree structure**. For SQL this would mean to have multiple joins.

In JSON data representation, all the relevant information is in one place, and one query is sufficient.

## Many-to-One and Many-to-Many
Using IDs in relationships between tables, gives you simplicity, everything you need to know is in one place

Using this ids to reference other tables is known as **Normalization**

In relational dbs is normal to use _many-to-one_ relationships. Since JOIN queries are common.

For **document models JOINs are not needed** for _one-to-many_ and support for JOINs is usually weak. You move JOIN implementation from DB to Application.

SQL => Strict and impedance mismatch
NoSQL => Flexible but no JOIN support (code repetition)

## Are Document Databases repeating history?
### Network Model
The CODASYL model was a **generalization of the hierarchical model.** In the hierarchical model, each record have one parent. Meanwhile in the network model, each record could have more than one.

Records were accessed via `access path`, which means to follow a path from a root record along the chains of links. 

In a good case `access path` resembles to linked lists, but in _many-to-many_ relations it meant: **several different paths can lead to the same record**

It was like navigating a _n-dimensional_ space. This network model was difficult to use and to adapt to change.

## The relational model
In contrast the relational model offered data in  simply collection of tuples. No labyrinthine nested structures

Uses references to other tables such as _foreign keys_ or _document reference_

## Relational vs Document databases today
The main arguments in favor of document data model are: `schema flexibility` & `better performance` (due to locality)

The main arguments in favor of relational data model are: `support for joins` & `n-to-m` relations

## Which data model leads to simpler application code?
If your data behaves like documents, then NoSQL. Basically _trees of one-to-many_

**Shredding** => Splitting a document-like structure into multiple tables can lead to overly complicated schema

Limitations of document schema
- You cannot refer directly to a nested item within a document.
- Poor support for Joins

If your app uses several _many-to-many_ relationships. Document-like schemas sounds less appealing. 

If you denormalize you will need mechanisms to keep data consistent

Joins can be moved to the apps, however they usually are slower.

**TL;DR** It depends on the kinds of relationships that exists between data items, to determine which data model will lead to simpler code.

## Schema flexibility in the document model
Most document-like db **do not enforce any schema**

`No schema` means that arbitrary keys and values can be added to a document, and when reading clients have no guarantees as to what fields the documents may contain

Prefer _schema on read_ or _schema-on-write_ than _schemaless_

Schema on read  => The structure of the data is implicit and only interpreted when data is read (runtime)
Schema on write => Schema is explicit and db ensures all written data conforms to it (static)

Schema on read is **advantageous** if the items in the collections **are not heterogenous**

## Data locality for queries
A document is usually stored as a single continuous string. Usually encoded as JSON, XML or any other format.

NoSQL DBs usually load the whole document even when only one small portion of it is required & on an update the whole document needs to be rewritten. 

**It's recommended to keep documents small.**

## Convergence of document and relational database
Seems that document dbs and relational dbs are now more similar and this is good, means that they compliment each other.

## Query Languages for data.
SQL -> declarative query language
CODASYL -> Imperative code language (most common)

An **imperative** language **tells** the computer to perform certain **operations** in certain order.

Meanwhile, in **declarative** you specify the **pattern of the data you want** (what conditions the result must meet), but not the _how_ to achieve the goal.

A `Declarative language` is usually more attractive and easy to work than imperative APIs

**TL;DR**: Imperative _how_ to do something. Declarative _what_ I need from you

**Declarative languages** often lend themselves to parallel execution, because specifies _what_ instead of _how_

**Imperative** code is hard to parallelize across multiple cores and multiple machines because it specifies instructions in certain order

## Declarative Queries on the Web
Declarative query languages are not limited just to databases. CSS, XPath or Graphql are examples of this.

## MapReduce Querying
`MapReduce` is a programming model for processing large amounts of data in bulk across many machines.
It is neither declarative nor imperative but... somewhere in between.

`MapReduce` query logic is expressed with **snippets of code**, which are **called repeatedly** by the processing framework. It's based on `map & reduce` functions

To be able to use `MapReduce` you need to use _pure functions_. `MapReduce` is fairly low-level programming model for distributed execution.

The downside of using `MapReduce` is that it needs coordination between 2 Javascript functions, which is harder than write a single query.

**Pure functions** => Data is used as input, they don't have side effects.

MongoDB added support for a declarative query language, called _aggregation pipeline_

The moral of the story is that NoSQL system may find itself accidentally reinventing SQL, albeit in disguise

## Graph-like data models
As the connections within your data become more complex(many-to-many relations), it becomes more natural to start modeling your data as a graph.

A **Graph** consists in 2 kinds of objects: `vertices` (nodes or entities) and `edges` (relationships or arcs)

**Graphs** tend to be _homogeneous_ however its not a limitation.

## Property Graph Model
Each _vertex_ consists of:
- Unique identifier
- Set of outgoing edges
- Set of incoming edges
- Collection of properties (key-value pairs)

Each edge consists of:
- Unique identifier
- Start vertex
- End vertex
- Label to describe relation
- Collection of properties

you can think of `graph store` as 2 relational tables (vertices & edges)

i.e: **vertex** are people and **edges** indicate which people know each other

Important aspects of this model:
1. Each vertex can point to other vertex
2. Given any vertex, you can find its incoming/outgoing edges (efficiently traverse)
3. By using different labels for different kinds of relationships, you can store several different kind of information in a single graph

**Important:** Graphs are good for _evolvability_

## Cypher query language
Cypher is a declarative query language for property graph.

Important aspects of this approach:
- Each vertex has a meaningful name
- Needs al the vertices 
- You can _traverse_ in any way

**Declarative languages** hide details and they choose the _best way_ to get what you want.

## Graph Queries in SQL
Q: Is it possible to have Graph queries in relational dbs?

A:Yes, with some difficulties. SQL:1999 added _recursive common table expressions_

## Triple-stores and SPARQL
It's the same as graph model. Each piece of information is stored in a form of a very simple statement
> _(subject, predicate, object)_ # i.e (Jim, likes, bananas)

Graph Data Model vs Triple-Stores
vertex => subject

## The semantic web
Its fundamentally a simple and reasonable idea: _websites already publish information as text and pictures for humans to read, why don't they publish information as machine-readable?_

**RDF** => Resource Description Framework (RDF) mechanism to publish data in a consistent format, allowing data from different websites to be automatically combined into a web of data.

## The SPARQL query language
triple stores + RDF. Its parent of Cypher

## The Foundation: Datalog
Provides the foundation that later query languages build upon. It's similar to triple-store model

Datalog uses predicate(subject, object)


## Summary
- Historically data started out being represented as one big tree, but wasn't good with _many-to-many_
- _many-to-many_ was worked with relational dbs
- New devs now use NoSQL
  - Document => Data comes self-contained (JSON) and relationships between one document and another are rare
  - Graph => Targeting use cases where anything is potentially related to everything
- Data models can be represented in other data model (with an awkward result)
- Documents & Graphs models don't enforce schema
- Each data model comes with it's own query language