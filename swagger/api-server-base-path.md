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

#### Server URL Format
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

#### Sever templating
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
