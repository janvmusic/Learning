## Parameter Serialization
- **Serialization** means transform an object or data structure into a format that can be transmitted and then reconstructed later
- OpenAPI 3.0 lets you use `objects` and `arrays` in operation parameters(path, query, header & cookie)
- Serialization method is defined in `style` and `explode` keywords
  - `style`: defines how multiple values are going to be delimited. Possible styles depend on parameter location (path, query, header or cookie)
  - `explode`: **true/false** specifies whether arrays and objects should generate separate parameters for each array item or object property

### Path parameters
- **Path parameters** supports following `style` values
  - simple: _comma-separated_ values. Corresponds to the `{param_name}` URI template
  - label: _dot-prefixed_ corresponds to the `{.param_name}
  - matrix: _semi-colon_ prefix. Corresponds to the `{;param_name}`
- Default is `style: simple` and `explode: false`

### Query parameters
- Query params supports following methods:
  - form: It's the default way to work on. Uses `&` to concatenate values. Corresponds to `{?param1&param2}`
  - spaceDelimited: Has only effect for **non-exploded** arrays. Corresponds to `array=a b c`
  - `pipeDelimited`: Has only effect for **non-exploded** arrays. Corresponds to `array=a|b|c`
  - deepObject: Applies to object only. It's a simple way to render nested objects using parameters
- **default**: `style: form` and `explode: true`

### Header parameters
- Header parameters always use `simple` style
- It's always **comma separated**
- This corresponds to: `{param_name}`
- The **default** is `style: simple` & `explode: false`

### Cookie parameters
- Cookie parameters always use **form** style
- An additional **explode** keyword controls the array and object serialization
- the **default** value for this is: `style: form` & `explode: true`

### Other serialization methods
- Use `content` keyword

#### **Additional Sources**
[Serialization Examples](https://swagger.io/docs/specification/serialization/)

