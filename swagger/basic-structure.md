### Basic Structure (API 3.0)
- Remember you can specify structure using **JSON** or **YAML**
```yaml
openapi: 3.0.0
info:
  title: Sample API
  description: Just an example
  version: 0.1.9

servers:
  - url: http://api.example.com/v1
    description: Optional server description, e.g. Main (production) server
  - url: http://staging-api.example.com
    description: Optional server description, e.g. Internal staging server for testing

paths:
  /users:
    get:
      summary: Returns a list of users
      description: some dummy description here
      responses:
        '200': # status code
          description: A JSON array of user names
          content:
            application/json:
              schema:
                type: array
                items: 
                  type: string
```
- **IMPORTANT** Remember all keywords are case-sensitive
- You need to start your file specifying the `swagger version`. In previous example: `openapi: 3.0.0`

#### **Metadata**
- `info` section contains basic information of our new API
  - `title` => API name 
  - `description` supports CommonMark dialect and it's multiline
  - `version` => your API version

#### **Servers**
- `servers` specifies API server and base URL. You can define several URLs such as PROD or QA/Sandbox
  - All `paths` are relatives to this URL.
  - Previous example: http://api.example.com/v1/users

#### **Paths**
- `paths` section defines all available individual endpoints
  - You could add elements such as:
    - request body
    - possible response status codes
    - response contents

#### **Parameters**
- You can have operations that use following types of parameters
  - URL paths: `/users/{userId}`
  - Query Strings: `/users?role=admin`
  - Headers: `(X-CustomHeader: Value)`
  - Cookies: `Cookie: debug=0`
- You can define parameters as __optionals__ or __required__
```yaml
paths:
  /users/{userId}:
    get:
      summary: Returns a user by ID
      parameters:
        - name: userId
          in: path
          required: true
          description: Parameter description
          schema:
            type: integer
            format: int64
            minimum: 1
      responses:
        '200':
          description: OK
```

#### **Request Body**
```yaml
paths:
  /users:
    post:
      summary: Creates a new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                username:
                  type: string
      responses:
        '200':
          description: OK
```

#### **Responses**
- For each **operation** you can define status and schema for the response `schema`
- Schemas can be defined inline or via `$ref`
```yaml
paths:
  /users/{userId}:
    get:
      summary: Returns a user by ID
      parameters:
        - name: userId
          in: path
          required: true
          description: Parameter description
          schema:
            type: integer
            format: int64
            minimum: 1
      responses:
        '200':
          description: A user object.
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: integer
                    format: int64
                    example: 4
                  name:
                    type: string
                    example: Jessica Smith
        '400':
          description: The specified user ID is invalid
        '404':
          description: User not found
        default:
          description: Unexpected error
```
- note that status codes needs to be enclosed with quotes, in 2.0 this is not required

#### **Input and Output models**
- The global `components/schemas` section let's you define common data structures used in your API (DRY)
- These `component/schemas` can be referenced using `$ref`.
- `$ref` can be used in 
  - Parameters
  - Responses
  - Request bodies
```yaml
components:
  schemas:
    User:
      properties:
        id:
          type: integer
          example: 1
        name:
          type: string
          example: Jessica Smith
      required:
        - id
        - name
```
- Then it can be referenced via `$ref`:
```yaml
paths:
  /users/:
    post:
      summary: Creates a new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                username:
                  type: string
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'

  /users/{userId}:
    get:
      summary: Returns a user by ID
      parameters:
        - name: userId
          in: path
          required: true
          description: Parameter description
          schema:
            type: integer
            format: int64
            minimum: 1
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
```

#### **Authentication**
- `securitySchemes` and `security` are used to describe authentication methods for your API
- Supported authentication methods are:
  - HTTP: Basic, bearer and so...
  - API Key or query parameter or in cookies
  - OAUTH2
  - OpenID Connect Discovery
```yaml
components:
  securitySchemes:
    BasicAuth:
      type: http
      scheme: basic

security:
  - BasicAuth
```

### Tools
- [Swagger validator](https:/:w
/editor.swagger.io/)
