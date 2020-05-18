## Swagger!
### What is Swagger?
- **Swagger.io** allows you to make API documentation that is human & machine readable
- **Swagger.io** tries to be simple, not like WADL
- Uses technologies like **JSON** or **YAML**
- **Swagger.io** is an OpenAPI specification. This specification asks you information like:
  - API operations supported
  - API calls parameters & API return types
  - Lets you set authorization
  - Contact information & API version

### What problem solves?
- API documentation
- Readable for humans and machines
- Fast code generatiopn

### What is an OpenAPI
- API description format for REST APIs. 
- Allows you to describe your entire API as:
  - Available endpoints
  - Operations on each endpoint
  - Authentication methods
  - Contact info & licences... etc
- Can be written using __JSON__ or __YAML__
- Pending to read [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md)

#### What is Swagger?
- It's a set of open-source tools that help you to design, build, document & consume REST APIs
- Available tools:
  - Editor
  - UI
  - Codegen (I believe this is used in current project)

#### Why use OpenAPI?
- Ability to APIs to describe their own structure (This is awesome)
- Design-first users
- Code generator for client libraries
- Ability to create interactive API documentation that lets you call API from browsers
- Testable

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

#### Metadata
- `info` section contains basic information of our new API
  - `title` => API name 
  - `description` supports CommonMark dialect and it's multiline
  - `version` => your API version

#### Servers
- `servers` specifies API server and base URL. You can define several URLs such as PROD or QA/Sandbox
  - All `paths` are relatives to this URL.
  - Previous example: http://api.example.com/v1/users

#### Paths
- `paths` section defines all available individual endpoints
  - You could add elements such as:
    - request body
    - possible response status codes
    - response contents

#### Parameters
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
