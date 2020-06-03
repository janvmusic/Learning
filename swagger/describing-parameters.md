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

