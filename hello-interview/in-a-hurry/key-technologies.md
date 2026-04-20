# Key Technologies

## Databases

Almost all system design problems requires you to think in a way to store data. Here we have 2 options
**SQL/Relational vs NoSQL**

If you interview focuses on a product, this means that its a good match for a **Relational Database** (such as Postgres)

If you interview focuses on infrastructure design, then a **NoSQL** would be a good match

> [!TIP]
> Most interviewers are not willing to know why SQL vs NoSQL. Remember that this is a rabbit hole.
> Instead talk about how the DB you selected will help you to solve the problem
> "I'm using Postgres because of ACID properties and how allows me to maintain data integrity"

## Relational Databases

They are often used for transactional data (user, records, user records). These databases store your data in tables, which are composed by Rows and Columns.

```text
Row => Record
Column => Property
```

To retrieve this data is used a SQL to query these tables

### Tools

**SQL Joins**: Joins are a way to combine data from multiple tables. They are a potential bottle neck when retrieving data. Minimize them as possible

**Indexes**: They are a way of storing data in a way that makes faster to query. They are often implemented using a BTree or a Hash Table

**Transactions**: They are a way to group multiple operations together into a single atomic operation.

## NoSQL Databases

They can take different forms such as:

- Key-value
- Column-family
- Documents
- Graph Formats

These type of DBs are not tied to table like structure, they are considered schema-less. This property allows them to handle a large volumes of data (unstructured, semi-structured or structured)

### When to use?

- **Flexible data models**: Your data model is evolving or you need to store different types of data structures without a fixed schema
- **Scalability**: You app needs to scale horizontally
- **Big Data and/or Real-time web apps**: You app deals with large volumes of data, specially unstructured data.

> [!TIP]
> The places where NoSQL Dbs excel are not necessarily places where relational dbs fail

### Important Knowledge

- **Data Models**: key-value, graph, column-family or document
- **Consistency models**: Ranges from strong consistency to eventual consistency
- **Indexing**: Similar to relational
- **Scalability**: Scale horizontally by using consisten hashing and/or sharding to distribute data across many servers
