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

#### TOPIC
content

#### TOPIC2
content

#### SOURCE Link
[Link Title](http://example.com)

