# Active Record
## 1. What is it?
- It's the `M` in **MVC**
- Represents the business data and logic
- Basically: Objects -> persists -> Storage
- It's a ORM

### 1.1 Active record pattern
- Objects carry both persistent data and behavior (fat models)
- Opinion: This is the message that we want to transmit, _how we should use objects & data_

### 1.2 Object relational Mapping
- **What problem solves?** Connects rich objects to database tables
- **The idea**: Objects <-> Tables
- Using ORMs objects can be easily stored and retrieved from the database without writing SQL.

### 1.3 Active record as an ORM
- Gives us following capabilities
  - Represent models & their data
  - Represent associations between these models
  - Represent inheritance hierarchies through related models
  - Validate models before they get persisted to the db
  - Database operation using Object-oriented fashion

## 2. Convention over Configuration
- **ORMs** may require **lot of configuration**
- Rails offer a `solution` based on it's guidelines
- **The idea** is that if you **configure** your apps in the very same way most the time then this should be the default
- Rails -> Active record -> Less configuration

### 2.1 Naming conventions
- Rails: **Singular**
- Active Record: **Plural**
- Example
  - `Book` object     -> `books` table 
  - `LineItem` object -> `line_item` table
- Convention: Use _camel case_ for objects and _snake case_ for tables

### 2.2 Schema conventions
- **Foreign keys**: Use `{singularized_table_name}_id`
- **Primary Keys**: Active record by default uses `id`
- **{table_name}_count**: Used to cache the number of belonging objects on associations
- **created_at**: Record created
- **updated_at**: Record updated
- **type**: Specifies that model uses `Single Table Inheritance`
- **lock_version**: Adds optimistic locking
- **{association_name}_type**: Stores polymorphic associations

## 3. Creating active record models
- For inheritance you use `<`
```ruby
class Product < ApplicationRecord
end
```
- This will create `Product model and map it to `products` table
- Previous snippet _might_ create something like this:
```sql
CREATE TABLE products(
    id int(11) NOT NULL auto_increment
    name varchar(255)
    PRIMARY KEY (id)
);
```
- We then can use:
```ruby
product = Product.new
product.name = "Name"
puts product.name # Some book
```

## 4. Overriding naming conventions
- If you need to use something that it's not the convention. Active records allows you to use the following:
```ruby
class Product < ApplicationRecord
  self.table_name = "my_products"
end
```
- You can also use overrides to specify a different primary key
```ruby
class Product < ApplicationRecord
  # Active record does not support using non-primary key columns named id
  self.primary_key = "product_id"
end
```

## 5. CRUD: Reading and writing data
- Active record provides (**by default**) CRUD operations in it's models

### 5.1 Create
- Active record objects can be created from a hash, a block, or have their attributes manually set after created
```ruby
# Example 1
user = User.create(name: "Jorge", occupation: "Code Artits")

# Example 2
user = User.new
user.name = "Matt"
user.occupation = "Software dev"

# Example 3: Block
user = User.new do |u|
  u.name = "Alejandro"
  u.occupation = "Sports"
end
```
- Calling `user.save` will commit the record to the DB

### 5.2 Read
- Active record provides a rich API to read data from `models <> database`
```ruby
  users = User.all # select *...
  user  = User.first # returns first
  david = User.find_by(name: 'Jorge')
  users = User.where(name: 'Matt', occupation: 'Sports').order(created_at: :desc)
```

### 5.3 Update
- Once an object has been created and retrieved, it can be **updated**
```ruby
user = User.find_by(name: 'David')
user.update(name: 'Dave')
```
- You can also batch update using `update_all`

### 5.4 Delete
- Like updates, objects/records can be destroyed
```ruby
user = User.find_by(name: 'David')
user.destroy
```
- You can do `bulk` operation using: `destroy_by` or `destroy_all`
```ruby
User.destroy_by(name: 'David')
User.destroy_all
```

## 6. Validations
- Active record allows you to validate the state of the object before it gets written in the DB
- You can validate the model against:
  - is not empty
  - is unique
  - Not in the db
  - etc
- Validations are performed before: `save` & `update`
- `save!` & `update!` raise an exception when a validation is not met (ActiveRecord::RecordInvalid)
```ruby
class User < ApplicationRecord
  validates :name, presence: true
end
```

## 7. Callbacks
-  You can attach code to certain events in the life-cycle of your model

## 8. Migrations
- Rails uses a domain-specific language to manage database schema called migrations
- Migrations are stored in files and `rake` executes them against a db
- Rails keeps a track of which migrations are in the db and you can perform rollbacks

# Notes
- **Single Table Inheritance**: Stores the name of the class in a column called type. If no `type` is included in the table, then no single-inheritance will be triggered.
```ruby
class Company < ActiveRecord::Base; end
class Firm < Company; end
class Client < Company; end
class PriorityClient < Client; end

Firm.create(name: "37signals")
Company.where(name: '37signals').first
```

- **Optimistic locking**: allows multiple users to access the same record for edits, and assumes a minimum of conflicts with the data.