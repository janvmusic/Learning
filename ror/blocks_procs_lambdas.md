# Blocks vs Proc vs Lambda
## In short 
Let's you pass code to a method and execute that code at a later time

## Blocks
_Blocks_ => Generally used by typing code inside `{...}` or `do...end` for multilines
```ruby
array = [1,2,3,4]
array.map! do |n|
  n * n
end

# => [1, 4, 9, 16]
```

The **magic** behind blocks is the `yield`
```
  yield => Differs the code execution of the calling method to evaluate the block. Then the results it's used by the remaining code

  Yield also accepts parameters
```

Example:
```ruby
class Array
  def map!
    self.each_with_index do | value, index |
      self[index] = yield(value)
    end
  end
end
```

One disadvantage that we can foresee it's that **blocks are disposable**

## Procs
This is a way to store functions in variables
```ruby
number_squared = Proc.new { |n| n * n }
```

By doing this we could use it like this (instead of yield)
```ruby
class Array
  def map!(proc_object)
    self.each_with_index do | value, index |
      self[index] = proc_object.call(value)
    end
  end
end
```

When a `Proc` encounters a return statement, it halts the method and returns the provided value

## Lambdas
Almost identical to Procs. There are 2 key differences
  1. Checks the number of arguments it receives (raise `ArgumentError`)
  2. Allows diminutive returns

```ruby
# Diminutive returns
def proc_math
  Proc.new { return 1 + 1 }.call
  return 2 + 2
end

def lambda_math
  lambda { return 1 + 1}.call
  return 2 + 2
end

proc_math # returns 2
lambda_math #returns 4
```