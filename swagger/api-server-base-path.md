### API Server and Base URL
- All API endpoints are relative to the base URL.
```
https://api.example.com/v1/users?role=admin&status=active
\________________________/\____/ \______________________/
         server URL       endpoint    query parameters
                            path
```
- In 3.0, use `servers` array to specify one or more base URLs for your API
- `servers` replaces the `host`, `basePath` and `schemes` used in 2.0
- Each server has an `url` and an optional `description`
```yaml
servers: 
  - url: https://api.example.com/v1 # Prefix of all API elements
```
- You can have multiple servers, for prod and sandboxes
```yaml
servers:
  - url: https://api.example.com/v1 # Prefix of all API elements
    description: Prod server
  - url: https://sandbox-api.example.com:8443/v1
    description: Testing server
```

#### **Server URL Format**
- Usually follow this structure: `scheme://host[:port][/path]
```
https://api.example.com
https://api.example.com:8443/v1/reports
http://localhost:3025/v1
http://10.0.81.36/v1
ws://api.example.com/v1
wss://api.example.com/v1
/v1/reports
/
//api.example.com
```
- **Server URLs** must not include query string parameters
- If **server URL** is relative, it's resolved against the server where the given OpenAPI file is located
```
// This is invalid
https://api.example.com/v1?route=
```
- If `servers` array is not provided, then defaults to `/`

#### **Sever templating**
- Any part of servers URL - scheme or its part, port subpath - can be parameterized using variables
- Variables are indicated via `{}` in the server url
```
servers:
  url: https://{customerId}.example.com:{port}/v2
  variables:
    customerId:
      default: demo
      description: Customer ID assigned by the service provider
    port:
      enum:
        - '443'
        - '8443'
      default: '443'
```
- Unline `path parameters`, server variables do not use a `schema`. Instead they are assumed to be string
- **Variables** can be arbitrary values or can be restricted to an `enum`
- In the case of **Variables** linked to `enum`, _default_ value is required
- **Variables** could have a description, it's actually optional
- Common uses of server templating:
  - Specify multiple protocols (HTTP & HTTPS)
  - Subdomains
  - Regional servers
  - SaaS
```yaml
servers:
  - url: '{protocol}://api.example.com'
    variables:
      protocols:
        enum:
          - http
          - https
        default: https
```
- Production, development, staging
```yaml
servers:
  - url: 'https://{environment}.example.com/v2'
    variables:
      environment:
        default: api # prod server
        enum:
          - api
          - api.dev
          - api.staging
```
- Saas and On-Premise
```yaml
servers:
  - url: 'https://{server}/v2'
    variables:
      server:
        default: https://api.example.com # SaaS server
```
- Regional endpoints for different geographical areas
```yaml
servers:
  - url: https://{region}.api.example.com
    variables:
      region:
        default: westus
        enum:
          - westus
          - eastus2
          - westcentraulus
          - westeurope
          - southeastasia
```

#### **Overriding Servers**
- Global `servers` can be overridden on the path level or operation level
- It's useful for:
  - Different base URLs for file upload or download operations
  - Deprecated but still functional endpoints
```yaml
paths:
  /files:
    description: File upload and download
    servers:
      - url: https://files.example.com
        description: Override base path for all operations with the /files paths

  /ping:
    get:
      servers:
        - url: https:echo.example.com
          description: Override base path for the Get /ping operation
      responses:
        '200':
```

#### **Relative URLs**
- The URLs in `servers` can be relative.
- This URLs will be accomplished using the `server` paths
```
info: 
  versions: 1.0.0
  title: test
  termsOfService: /terms-of-use # Relative url

externalDocs:
  url: /docs
  description: Find more info here

components
  securitySchemes:
    oauth2:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: /oauth/dialog
          tokenUrl: /oauth/token
```
