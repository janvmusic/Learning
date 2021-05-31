# Chapter 4: Encoding and evolution
_Everything changes and nothing stands still._
<img tag="chapter 4 map" src="img/ch4.png" width="300px">

Applications inevitably change over time.
  - Features added
  - User requirements added or modified
  - or... Business situation changes

We (as developers) should aim to build systems that make it easy to adapt to change.

In most changes... `app change means that data will change`

Relational dbs generally assume that all data conforms **one schema**

Meanwhile in NO-SQL there's no schema

> _Rolling upgrade also known as Staged rollout_ => Rolling out the update/feature not to all nodes

With **server-side** apps you depend on `Staged rollout`

With **Client-side** you depend on the user to install the update

> Backwards compatibility => newer code read data that was written by older code
> Forward compatibility   => Older code can read data that was written by newer code

It's easy to acquire _backwards compatibility_ but _forward compatibility_ it's tricker, since we need to ignore changes or data that we do not recognize (Tripadvisor Fusion + Flow)

## Formats and Encoding data
Applications usually work with data in 2 ways:
  - In memory: data is kept in objects (structs, lists, arrays, hash tables, tree and so on...)
  - Data to a file or over the network (i.e JSON)

> Encoding/Serialization => translate from _in memory_ data to a _byte sequence_
> Decoding/Parsing => !(Encoding)

### Language specific formats
Encoding is usually tied to the language and reading the data in another language is very difficult

In order to restore data in the same object types, the decoding process needs to be able to instantiate arbitrary classes.

Usually, language specific formats _do not handle well/ignore_ backward and forward compatibilities

Most of them are **not efficient**

**Important | TL;DR** Do not use your language built-in encoding.

### JSON, XML & Binary Variants
JSON, XML & CSV are textual formats, somewhat **human-readable**

> Binary string => sequence of bytes without a character encoding

Downsides of these encodings:
  - Unable to parse correctly Numbers, Floats & Strings (Specially XML with strings and numbers)
  - JSON and XML support unicode character strings but they don't support binary strings
  - XML uses schemas (not mandatory) and JSON/CSV does not bother about it. 

Despite these flaws these languages solves one of the main problems: _Sending data from one organization to other_

### Binary encoding
For internal data within your organization, it's good to use _Binary encoding_

JSON is less verbose than XML, but both still use a lot of space compared to binary formats.

Some of the binary formats extend the set of datatypes (ints vs floats or support for binary strings), although they are not so popular.

## Thrift and protocol buffers
Both are binary encoding libraries on the same principle

Both require a schema for any data that is encoded.
```thrift
struct Person {
  1: required string       user_name      userName
  2: optional int64        favorite_numer favoriteNumber
  3: optional list<string> interests      interests
}
```

Both come with a code generation tool, that takes a schema definition and produces classes that implement the schema in various programming languages.

### Field tags and schema evolution
> schema evolution -> schemas inevitably need to change over time.

> Forward compatibility: old code can read records that were written by new code

**How do they handle schema evolution?**
tags because they are considered immutable, once declared they should remain. Names can change

**new data**? Well old code ignores it, new code can read it

**delete data**? Well only delete optionals and never use the same tag, since old code might be reading it

### Datatypes and schema evolution
What about changing the data type?
Be careful because you can take up to the challenge of int32 & int64 read

Avro uses something like APS & Fusion, _writer_ and _reader_ schema

## Code generation dynamically typed languages
Thrift and Protocol Buffer rely on code generation: after a schema has been defined, you can generate code that implements this schema in a programming language of your choice. Quite useful with Java, C++ or C#

In dynamically typed programming languages (JS, Ruby, Python) there's not much point in generating code since they don't compile the code.

## The merits of schemas
Protocol buffers, avro and thrift all of them relies on schemas to describe a binary encoding format.

These schemas support validation and are simpler than XML or JSON schemas

But what are the advantages of these _binary encoding_ options?
- Compact than various bson
- The schema is a valuable form of documentation. No _type_ surprises
- Keeping a db of schemas allows you to check forward and backward compatibility
- Code generation on statically typed programming.

## Modes of Dataflow
Whenever you want to **send some data** to **another process** with which you **don't share memory**, **you need to encode** it as a sequence of bytes

Forward and backward compatibility are important for evolvability

> Compatibility => its a relationship between one process that encodes the data, and another process that decodes it.

## Dataflow through databases


