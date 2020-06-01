## Media Types
- It's a format of a request/response
- Most commons are XML, JSON and images
```yaml
paths:
  /employees:
    get:
      summary: list of employees
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: integer
                  name:
                    type: string
                  fullTime:
                    type: boolean
                example:
                  id: 1
                  name: Jessica Right
                  fullTime: True
```     
- Under `responses` we have the definition individual responses
- Each `response` has a http code
- `content` keyword is used to define the actual response
- `content` could have more than one child.
- Each media type must include one `schema`, this keyword will describe the response

### Media Type names
- Here's a list of media type names
```
application/json
application/xml
application/x-www-form-urlencoded
multipart/form-data
text/plain; charset=utf-8
text/html
application/pdf
image/png
```
- Also could be vendor specific
```
application/vnd.mycompany.myapp.v2+json
application/vnd.ms-excel
application/vnd.openstreetmap.data+xml
application/vnd.github-issue.text+json
application/vnd.github.v3.diff
image/vnd.djvu
```

### Multiple media types
- As described before we could have different response types
```yaml
paths:
  /employees:
    get:
      summary: Returns a list of employees.
      responses:
        '200':      # Response
          description: OK
          content:  # Response body
            application/json:   # One of media types
              schema:
                type: object
                properties:
                  id:
                    type: integer
                  name:
                    type: string
                  fullTime: 
                    type: boolean
            application/xml:    # Another media types
              schema:
                type: object
                properties:
                  id:
                    type: integer
                  name:
                    type: string
                  fullTime: 
                    type: boolean
```
- Just as other elements, we can use `$ref` and `components` to apply DRY
```yaml
paths:
  /employee:
    get:
      responses
        '200':
          description: OK
          content:
            content:
              application/json:
                schema:
                  $ref: '#/components/schemas/Employee'
              application/xml:
                schema:
                  $ref: '#/components/schemas/Employee'
components:
  schemas:
    Employee:
      type: object                                                                      
      properties:                                                                             
        id:
          type: integer                                                                       
        name:
          type: string                                                                        
        fullTime: 
          type: boolean 
```
- To define same media type for multiple elements you can use: `application/*`, `image/*`, `*/*`, etc
```
paths:
  /info/logo:
    get:
      responses:
        '200':
          description: OK
          content:
            image/*:
              schema:
                type: string
                format: binary
```
- Do not confuse `image/*` with HTTP `Accept` or `Content-Type`

