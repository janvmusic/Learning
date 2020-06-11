## Describing request body
- Request bodies are typically used with **crete** or **update** operations
- These operation could be `POST`, `PUT`, `PATCH`
- **Request body** usually represents the resource to be created.

### requestBody, content & Media Types
- OpenAPI 3.0 uses `requestBody` to distinguish the payload from parameters
- `requestBody` is more flexible and let's you consume data in different types
- Consists on the following elements:
  - `content`: Specifies data will be consumed
  - `description` (optional)
  - `required` (optional)
- **Request Bodies** are optional by default
- As well you can mark them as `required: true`
```yaml
  /pets:
    post:
      summary: add a new pet
      requestBody:
        description: Creates a new pet
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Pet'
          application/xml:
            schema:
              $ref: '#/components/schemas/Pet'
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PetForm'
          text/plain:
            schema:
              type: string
      responses:
        '201':
          description: Created
```
- `content` keyword allows you to have **wildcards**
  - For example: `image/*` or `*/*`
```yaml
  /avatar:
    put:
      summary: Upload an avatar
      requestBody:
        required: true
        content:
          image/*:
            schema:
              type: string
              format: binary
      responses:
        '201':
          description: Created
```

### anyOf & oneOf
- With these keywords you can alternate schemas for your request body
```yaml
  requestBody:
    description: A JSON object containing pet information
    content:
      application/json:
        schema:
          oneOf:
            - $ref: '#/components/schemas/Cat'
            - $ref: '#/components/schemas/Dog'
            - $ref: '#/components/schemas/Fish'
```

### Request body examples
- If you want to provide an example of a request body you can use the keyword: `example`
- It's not limited to 1 example, could be more than one
- `example` belongs to `requestBody.content.<media-type>
- `examples` keyword is used to declare more than one example
- Each example could have `summary` and `description`

### Reusable bodies
- Just as other components, you can declare them in `components.requestBodies` to make them reusable
- To reference them use: `$ref`
```yaml
/cars:
  post:
    summary: Add a new car specification
    requestBody:
      $ref: '#/components/requestBodies/CarRequest'
    responses:
      '201':
        description: created

/cars/{carId}:
  put:
    summary: Update a car specification
    parameters: [...]
    requestBody:
      $ref: '#/components/requestBodies/CarRequest'
    responses:
      '201': 
        description: Updated
```
### Form Data
- Refers to data submitted via HTML forms
- This term is linked to: `application/x-www-form-urlencoded` & `multipart/form-data`
  - `application/x-www-form-urlencoded`: key par values to send simple ASCII text data
  - `multipart/form-data`: allows submitting binary data, as well as multiple data types in a single message. For example Images or JSON
- `type: object` is used to represent form data
```yaml
```

