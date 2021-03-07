# Query Interface
## 15 Scopes 
Scoping allows you to **specify commonly-used queries** which can be references as method calls on the association objects or models.

**What problem solves?** Avoid having duplication, exposed common queries and can be used in other models.

They use a `name` & `lambda`

- Within scopes you can use `where`, `joins` & `includes`
- All scope bodies **MUST** return an `ActiveRecord::Relation` or `nil`
- To keep it simple: Define scope -> `run it like query`
- This is at class level, not instance
```ruby
class Book < ApplictionRecord
  scope :out_of_print, -> { where(out_of_print: true)}
end

# Then we can call it like:
Book.out_of_print
author = Author.first
author.books.out_of_print
```
- Scopes are **chainable**
```ruby
class Book < ApplictionRecord
  scope :out_of_print, -> { where(out_of_print: true)}
  scope :out_of_print_and_expensive, -> { out_of_print.where("price > 500") }
end
```

### 15.1 Passing in arguments
Your scope can take arguments
```ruby
class Book < ApplictionRecord
  scope :cost_more_than, -> (amount) { where("price > ?", amount)}
end

# or
class Book < ApplictionRecord
  def self.cost_more_than(amount)
    where ("price > ?", amount)
  end
end
```

### 15.2 Using conditionals
Your scope can utilize conditionals
```ruby
class Order < ApplicationRecord
  scope :created_before, -> (time) { where ("created_at < ?", time if time.present?)}
end
```

- **Important:** There's one more important caveat: _a scope will always return an `ActiveRecord::Relation` even when conditional return `false`_

If chained returning `nil` could lead to `NoMethodError`

### 15.3 Applying a default scope
This scope will be applied to all queries for a model
```ruby
class Book < ApplicationRecord
  default_scope { where(out_of_print: false) }
end

# This will create this SQL query
# SELECT * FROM books WHERE (out_of_print = false)
```

- It can also be defined at class level
- `default_scope` applies as well to creating/building, when arguments are passed as `Hash` however, this is different for `Update`

### 15.4 Merging of Scopes
Just like `WHERE` clauses, you can merge/combine 2 scopes with `AND`

```ruby
class Boook < ApplicationRecord
  scope :in_print, -> { where(out_of_print: false) }
  scope :out_of_print, -> { where(out_of_print: true) }

  scope :recent -> { where('year_published >= ?', Date.current.year - 50) }
  scope :old -> { where('year_published < ?', Date.current.year - 50) }
end

Book.out_of_print.old
# SELECT books.* FROM books WHERE books.out_of_print = 'true' AND books.year_published < 1969

# It's possible to mix scopes and WHERE clauses
Book.in_print.where('price < 100')
# SELECT books.* FROM books WHERE books.out_of_print = 'false' AND books.price < 100
```

- **Important:** `default_scope` takes precedence in queries

### 15.5 Removing all scoping
Use `unscoped` method

```ruby
Book.unscoped.load
Book.where(out_of_print: true).unscoped.all
```
- If you need you can add `blocks`

