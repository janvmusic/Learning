# N+1 Queries and How to Avoid Them!
## [Source](https://medium.com/@bretdoucette/n-1-queries-and-how-to-avoid-them-a12f02345be5)

## What is a N+1 Query
**Simply stated**: A bad way to query a DB

Follow this example:
```ruby
class Article < ActiveRecord::Base
  has_many :comments
end

class Comment < ActiveRecord::Base
  belongs_to :article
end
```

Each query will generate `n` more of queries
```sql
SELECT "articles".* FROM "articles" ORDER BY "articles"."published_at" DESC LIMIT 10
SELECT "comment".* FROM "comment" INNER JOIN "posts_comment" ON "posts_comment"."tag_id" = "comment".id" WHERE "posts_comment"."post_id" = 15
SELECT "comment".* FROM "comment" INNER JOIN "posts_comment" ON "posts_comment"."tag_id" = "comment".id" WHERE "posts_comment"."post_id" = 14
SELECT "comment".* FROM "comment" INNER JOIN "posts_comment" ON "posts_comment"."tag_id" = "comment".id" WHERE "posts_comment"."post_id" = 13
SELECT "comment".* FROM "comment" INNER JOIN "posts_comment" ON "posts_comment"."tag_id" = "comment".id" WHERE "posts_comment"."post_id" = 11
SELECT "comment".* FROM "comment" INNER JOIN "posts_comment" ON "posts_comment"."tag_id" = "comment".id" WHERE "posts_comment"."post_id" = 9
SELECT "comment".* FROM "comment" INNER JOIN "posts_comment" ON "posts_comment"."tag_id" = "comment".id" WHERE "posts_comment"."post_id" = 8
SELECT "comment".* FROM "comment" INNER JOIN "posts_comment" ON "posts_comment"."tag_id" = "comment".id" WHERE "posts_comment"."post_id" = 7
SELECT "comment".* FROM "comment" INNER JOIN "posts_comment" ON "posts_comment"."tag_id" = "comment".id" WHERE "posts_comment"."post_id" = 6
SELECT "comment".* FROM "comment" INNER JOIN "posts_comment" ON "posts_comment"."tag_id" = "comment".id" WHERE "posts_comment"."post_id" = 5
SELECT "comment".* FROM "comment" INNER JOIN "posts_comment" ON "posts_comment"."tag_id" = "comment".id" WHERE "posts_comment"."post_id" = 4
```

This type of queries is **bad for performance**, due to create several subqueries

## Active Record Includes Method
Use `Includes` method to create **2nd level associations**
```ruby
class ArticlesController < ApplicationController
  def show
    @articles = Article.includes(:comments).limit(5)
  end
end
```

This will create a `IN` query which will increase the performance and reduces the number of queries

## How does the Includes method work?
- Uses **eager loading**
- In this case. loads all comments for all articles and stores it in a cache stored in memory
- ActiveRecord goes first to cache and then goes to DB

## Conclusion
In summary Active Record’s Include method is wonderful — it preloads data for you, making data retrieval in Active Record associations much faster and much more efficient!