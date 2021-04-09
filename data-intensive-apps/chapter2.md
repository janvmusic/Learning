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
