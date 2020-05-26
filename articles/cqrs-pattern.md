## Command and Query Responsibility Segregation 
- Separates read and update operations for a data store
- Helps to improve performance, scalability and security
- Helps to prevent update commands from causing merge conflicts at the domain level

### The problem
- In traditional architectures, it's common to query and update a database
- That's basic for CRUD.
- For more complex applications this could become unwieldy (Query and update operations in one place)
- For `read` operation, the problem comes when we have several types of DTOs; Different DTOs shapes
- For `query`, the problem comes when we have complex validations and business logic
- `Read/Write` operations are often asymmetrical with different performance scale requirements

### Negative aspects of this
- There's often a mismatch between `read/write` representation of the data (Different columns for each operation)
- **Data contention** could occur when operations are executed in parallel on the same data set
- Can have a negative effect on performance due to load on the data store and data access layer.
- Complexity of queries to retrieve information
- Complex manage for permissions, which might expose data in the wrong context

### Solution
- CQRS separates concerns for read/write into different models.
- **Commands** to update data
  - Commands should be _task based_. IE: "Book hotel room" instead of "Set reservationStatus to Reserved"
  - Commands may be placed on a queue for asynchronous processing, rather than synchronously
- **Queries** to read data
  - Queries never modify data in the DB
  - Returns a DTO that does not encapsulate any domain logic
```
  validation       |                   |
  commands         |\   Write  Read   /|  Queries
  domain logic     |/   Model  Model  \|  DTO Model
  data persistance |___________________| 
                         Data Store
```
- Having separated `read` & `write` operations simplifies the design and implementation
- However no scaffolding is available
- If required you could have 2 stores, one for read and other for write; Each store optimized for it's operation
- Stores could be even different type. `Read` could be document based and `Write` could be relational
- If separated operations are required, then a `sync` tasks needs to be implemented
- `read` store could be a replica from `write` store
- Some implementations of **CQRS** use a `Event sourcing pattern`; This means `events` represent change on the data
- `Event sourcing pattern` uses a current state and if a change occurs then `notifies` other components of the change

### Advantages
- Independent scaling
  - Allows read/write workloads to scale independently
  - Fewer lock contentions
- Optimized data schemas for each operation
- Security
  - Ensures that only the right domain entities are performing writes on data
- Separation of concerns
  - Maintainable
  - Flexible
- Simpler queries

### Implementation issues and considerations
- Complexity
  - Could get complex while it grows, specially if uses `Event sourcing pattern`
- Messaging 
  - It's common to use messaging to process commands and publish update events. In this case `message failures` and `duplicated messages` needs to be addressed
- Eventual consistency
  - Read store my become `stale`
  - **Stale** means: _not fresh_
  - It can be difficult to detect when a user has issued a request based on stale read data

### When to use this pattern?
- With a collaborative domains where many users access the same data in parallel
- When you have a complex task based process with different validations (logic, input, business)
- You need to _tune_ read queries, separated from data writes. Specially if `reads` > `writes` by a huge number
- When you want to separate developers in read / write task
- Where business rules change regularly
- Where the temporal failure on one subsystem does not affect the availability of others

### When not to use this pattern?
- Domain or business rules are simple
- When you have a simple CRUD-style user interfaces and data access operations are sufficient 

### Event Sourcing and CQRS
- When used together, the store of events is the write model, it's the _source of truth_
- The read model provides a materialized views of the data
- These `read models` are tailored for displays in our application
- Using streams for `write events` is helpful to avoid **update conflicts** 
- Please consider the following:
  - Data is `eventually` consistent; There's delay on sync stores
  - Code complexity increments due handle of events
  - Update of `read` objects is costly, specially if calculation is required. A good approach to solve this is to have `snapshots` often

### Source
[Command and Query Responsibility Segregation (CQRS) pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs)

