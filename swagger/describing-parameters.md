## Describing Parameters
- `parameters` are defined for an **operation** or a **path**
- The basic structure of **parameters** require:
  - name
  - location: `in` by example
  - data type
  - description
  - required
```yaml
/users/{userId}
  get:
    summary: Get a user by ID
    parameters:
      - in: path
        name: userId
        schema:
          type: integer
        required: true
        description: Id of the user
```
- `parameters` is an array, each element need to be listed using a dash `-`

### Parameter types
- path parameters: `/users/{userId}`
- query parameters: `/users?role=admin`
- header parameters: `X-MyHeader: Value`
- Cookie parameters: `Cookie: debug=0; csrftoken=iqweasd1123`

### Path parameters
- Variables included in the URL
- A `path` could contain a several variables
```
GET /users/{id}
GET /cars/{carId}/drivers/{driverId}
GET /report.{format}
```
- To define this `path parameters`, it will require to be included in `parameters` section of a path
- Use `in: path` 
- Names needs to be the same as in the URL
- If a parameter is **required** remember to use the keyword `required: true`
- **Path parameters** containing arrays and objects can be serialized in different ways
  - path-style (semi-colon prefixed): `/map/point;x=5;y=7`
  - label-expansion (dot prefixed): `/color.R=100.G=200.B=150`
  - Simple-style: /users/12,34,56

### Query parameters
- Most common parameters
- Appears at the end of a request URL
- Uses a `?` to specify the beginning of a request
- Format used: `name=value`
- To include more than one, use `&`; for example `name=value&name2=value2`
- They can be required or optional
- To specify them use: `in: query`
```yaml
  /employees/department:
    get:
      summary: Get employees by department
      parameters:
        - in: query
          name: departmentId
          schema:
            type: integer
          description: Department Id
        - in: query
          name: limit
          schema:
            type: integer
          description: Maximum result size
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: integer
```
- Query parameters can be `values`, `arrays` & `objects`
- **Arrays** can be serialized using:
  - form: `/products?color=blue,green,red` or `/products?color=blue&color=green&color=red`
  - space limited: `/products?color=blue%20green%20red`
  - pipe delimited: `/products?color=blue|green|red`
- **Objects** can be serialized using:
  - form: `/points?color=R,100,G,200,B,150` or `/points?R=100&G=200&B=150`
  - deepObject: `/points?color[R]=100&color[G]=200&color[B]=150`
- For the serialization method you will need to specify `style` & `explode`

### Reserved Characters in Query Parameters
- `:/?#[]@!$&'()*+,;=`
- These are the components used in URI
- They can be encoded
- There's a way to not encode them in query params
- Use `allowReserved: true`
```yaml
  parameters:
    - in: query
      name: path
      required: true
      schema:
        type: string
      alloReserved: true
```

### Header parameters
- OpenAPI lets you define custom request headers as: `in: header`
```yaml
paths:
  /ping:
    get:
      - in: header
        name: X-Request-ID
        schema:
          type: string
          format: uuid
        required: true
```
- `Headers` can be primitives, arrays & objects. Also you can define custom headers
- `Arrays` & `objects` are serialized using the `simple` style
- `Accept`, `Content-Type` & `Authorization` are now allowed, use correct specification
  - Content-Type: `resquestBody.content.<media-type>` or `responses.<code>.content.<media-type>`
  - Accept: `responses.<code>.content.<media-type>`
  - Authorization: `securitySchemes` or `security`

### Cookie parameters
- You can pass operation values using cookies
- Example: Cookie: `name=value`
- Multiple values are set in a cookie separated by a semicolon an space
- Use `in: cookie`
```
  parameters:
    - in: cookie
      name: debug
      schema:
        type: integer
        enum: [0, 1]
        default: 0
    - in: cookie
      name: csrftoken
      schema:
        type: string
```
- Cookie parameters can be primitives, arrays & objects.
- `Arrays` & `objects` are serialized using `form` style

### Required & optional parameters
- The default behavior is non take parameters as required
- Use `required: true`
- **Path** parameters must have `required` as `true`

### Schema vs content
- To describe parameters, you can either use `schema` or `content`
- They are mutually **exclusive**
- In most cases you will use `schema`
```yaml
parameters:
  - in: query
    name: color
    schema:
      type: array
      items:
        type: string
    # Serialize as color=blue,black,brown
    style=form
    explode=false
```
- `content` is used in complex scenarios that are not covered by `style` and `explode`
- Example: If you need to use a JSON in the query parameter
```
filter={"type":"t-shirt","color":"blue"}
```
- In this case you'll need to wrap the `schema` into `content`
```yaml
parameters:
  - in: query
    name: filter

    # Wrap schema into content.<media-type>
    content:
      application/json:
        schema:
          type: object
          properties:
            type:
              type: string
            color:
              type: string
```

### Default parameter values
- Use `default: value` to specify the value for optional parameters
- This goes along with **optional** parameters
- The `default` value must be the same as specified
```yaml
parameters:
  - in: query
    name: offset
    schema:
      type: integer
      minimum: 0
      default: 0
    required: false
    description: Default description
  - in: query
    name: limit
    schema:
      type: integer
      minimum: 20
      default: 20
    required: false
    description: minimum limit for users
```

#### Default Common mistakes
- `default` + `required` is a non valid combination
- `default` is not a sample value, use `example` instead

### Enum parameters
- You can restrict the value of parameters passed using `enum`
```yaml
- in: query
  name: status
  schema:
    type: string
    enum:
      - available
      - pending
      - sold
```

### Constant parameters
- You can define a constant parameter as required parameter with only one possible value:
```yaml
  parameters:
    - in: query
      name: rel_date
      required: true
      schema:
        type: string
        enum:
          - now
```
- **Constant** value is different from **default**, `constant` parameter should be always sent by client

### Empty-valued and Nullable parameters
- **Query** string parameters may only have a name and no value
```
GET /foo?metadata
```
- For this example you'll require `allowEmptyValue`
```yaml
/countries:
  parameters:
    - in: query
      name: metadata
      schema:
        type: boolean
      allowEmptyValue: true
```
- Also nullable is permitted!
```yaml
/countries:
  parameters:
    - in: query
      name: metadata
      schema:
        type: boolean
      allowEmptyValue: true
    - in: query
      name: limit
      schema:
        type: integer
        format: int32
        nullable: true
```
- `nullable` is different from `optional`. Parameter is required, however can be **null**
- Multiple named examples!
```yaml
  /products:
    get:
      summary: Returns a list of procuts based on ids
      parameters:
        - in: query
          name: ids
          description: You can use multiple parameters here
          required: true
          schema:
            type: array
            items:
              type: integer
          style: form
          explode: false
          examples:
            oneId:
              summary: Example of single id
              value: [5] # This represents ?ids=5
            multipleIds:
              summary: Example of multiple ids
              value: [5,10,15] # this represents ?ids=5,10,15
```

### Deprecated parameters
- Use `deprecated: true` to mark a parameter as deprecated
```yaml
  - in: query
      name: format
      required: true
      schema:
        type: string
        enum: [json, xml, yaml]
      deprecated: true
      description: Deprecated, use the appropriate `Accept` header instead.
```

### Common parameters
#### Common parameters for all methods of a path
- **Common parameters** required by all operations of a path can be defined on the path level instead
- **Path-level** parameters are inherited by all operations of that path
- A typical use case are the _GET/PUT/PATCH/DELETE_ operations that manipulate a resource via a path parameter
```yaml
paths:
  /products/{productId}:
    parameters: # path level parameters
      - in: path
        name: productId
        schema:
          type: integer
        required: true
        description: Product ID used to perform operations
    get:
      ...
    put:
      ...
    patch:
      ...
    delete:
      ...
```
- Any extra parameters defined at operation level are used together with **path-level parameter**
```yaml
paths:
  /products/{productId}:
    parameters: # path level parameters                                                                 
      - in: path
        name: productId                                                                                 
        schema: 
          type: integer                                                                                 
        required: true
        description: Product ID used to perform operations                                              
    get:
      summary: get's a product by ID
      parameters:
      - in: query
        name: metadata
        schema:
          type: boolean
        required: false
        description: if true, then show extra info of product
```
- As well **specific path-level** parameters can override **operation level** parameters
```yaml
  /users/{userId}:
    parameters:
      - name: userId
        in: path
        required: true
        description: Parameter description
        schema:
          type: integer
          format: int64
          minimum: 1
    get:
      operationId: getUserById
      summary: Gets one or more users by ID.
      parameters:
        - in: path
          name: userId
          required: true
          description: A comma-separated list of user IDs.
          schema:
            type: array
            items:
              type: integer
            minItems: 1
          explode: false
          style: simple
      responses:
        '200':
          description: A user object.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '400':
          description: The specified user ID is invalid
        '404':
          description: User not found
        default:
          description: Unexpected error
      externalDocs:
        description: Learn more about user operations provided by this API
        url: http://api.example.com/docs/user-operations/
```

#### Common Parameters for various paths
- You can have **Common parameters** they are defined under `components`
- As other `components` you can reference them as `$ref`
```
components:
  parameters:
    offsetParam:  # <-- Arbitrary name for the definition that will be used to refer to it.
                  # Not necessarily the same as the parameter name.
      in: query
      name: offset
      required: false
      schema:
        type: integer
        minimum: 0
      description: The number of items to skip before starting to collect the result set.
    limitParam:
      in: query
      name: limit
      required: false
      schema:
        type: integer
        minimum: 1
        maximum: 50
        default: 20
      description: The numbers of items to return.
```

### Parameter dependencies
- OpenAPI does not support **parameter dependencies** and **mutually exclusive** parameters
- What you can do is document the restriction in the parameter description and define the logic in 400 bad request response
```
GET /report?rdate=Today
GET /report?start_date=2019-08-20&end_date=2020-06-07
```
- Endpoints
```yaml
/reports:
  get:
    parameters:
      - name: rdate
        in: query
        schema: 
          type: string
          enum:
            - today
            - Today
            - TODAY
            - lastweek
            - LastWeek
            - LASTWEEK
        description: A relative range of dates, already predefined in this enum [Today, LastWeek]
      - name: start_date
        in: query
        schema:
          type: string
          format: date
        description: >
          Initial date for report, needs to be less than `end_date`.
          Must be used together `end_date`
          Incompatible with `rdate`
      - name: end_date
        in: query
        schema:
          type: string
          format: date
        description: >
          End date for report, needs to be greater than `start_date`.
          Must be used together `start_date`
          Incompatible with `rdate`
    responses:
      '200':
        description: OK
      '400':
        description: Either `rdate` or `start_date`+`end_date` are required
```
