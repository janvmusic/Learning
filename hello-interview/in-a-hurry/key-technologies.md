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

## Blob Storage

Sometimes you need to store a blob of data (images, videos or other files).

Remember to use S3 or Cloud Storage. Otherwise having this stored in the DB is

Usually these services are simple, you upload your blob and then you get an URL to retrieve it

> [!IMPORTANT]
> Avoid using blob storage as database, most problems focuses on having a primary db and references to blob storages

![Blob storage](./resources/blob.png "Blob")

### Use cases

Youtube => Store videos in the blob storage, in your db then store metadata
Instagram => Store images and videos in the blob storage, store metadata in the db
Dropbox => Store files in the blob storage, in your db then store metadata

### To Upload

1. The Client request the upload
2. The server returns a presigned URL. Records this in the DB
3. The client uploads the file to the presigned URL
4. The blob storage then returns the response to the server

### To Download

1. A client request a specific file from the server and are returned a presigned URL
2. The client makes a get request and downloads the file

### Blob Storage - General Knowledge

Durability: Blob storages are incredible durable. They use replication to ensure data is safe

Scalability: Services like AWS S3 can be considered infinitely scalable

Cost Efficient: They are cost effective (compared to having the blob in the db)

Security: They are built thinking about security, like encryption or access control

Upload/Download: They have specialized clients to upload/download

Chunking: Allows your file to be divided in small chunks.

## Search optimized database

Specific designed to full-text search. They use indexes, tokenization and stemming to make queries fast and efficient

They use `inverted indexes` which map words to documents

```json
{
  "word1": [doc1, doc2, doc3],
  "word2": [doc2, doc3, doc4],
  "word3": [doc1, doc3, doc5],
}
```

Examples of search optimized dbs are straightforward. Think of ticketmaster that needs to search fast in a massive list of events.

### Key Details

- **Inverted Indexes**: Maps from words to the documents that contain them. This allows you to quickly find documents that contain a given word
- **Tokenization**: Its the process of breaking a piece of text into individual words.
- **Stemming**: Reducing words to their root form. This transform the words on their most minimal elements from "running" and "runs" to "run"
- **Scaling**: Adding mroe nodes to a cluster and sharding data across those nodes
