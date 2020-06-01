## Paths and Operations
- In API terms: 
  - **Paths** are endpoints(resources). In example: `/users` or `/reports/summary`
  - **Operations** are HTTP methods. In example: GET, POST, etc.

### Paths
- Paths and operations are defined in `paths` section of the API specification
```yaml
paths:
  /ping:
    ...
  
  /users:
    ...

  /users/{id}
    ...
```
- All paths are relative to API server URL
- **Global servers** can be overridden at `paths` level
- `paths` might have an optional summary and description can be longer

### Path Templating
- To declare variables in the path, you can use **curly braces** `{}`
```yaml
/users/{id}
  ...

/organizations/{orgId}/members/{memberId}
  ...

/report.{format}
  ...
```
- Just as _Rails_ the url needs to be called passing the argument. For example `/users/5` or `/report.xml`

### Operations
- For each `path` you will need to add a `HTTP` operation
- OpenAPI 3.0 supports following operation
  - get
  - post
  - put
  - patch
  - delete
  - head
  - options
  - trace
- One `path` can support multiple operations
- OpenAPI defines that to use multiple operations needs to be a different `key -> value`
```yaml
paths:
  /users/{id}:
    get:
      tags:
        - Users
      summary: Gets a user by ID
      description: Brief description
      operationId: getUserById
      parameters:
        - name: id
          in: path
          description: User id
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
      externalDocs:
        description: Learn more
        url: http://example.com
```

