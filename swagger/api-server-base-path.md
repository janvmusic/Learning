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
- 
