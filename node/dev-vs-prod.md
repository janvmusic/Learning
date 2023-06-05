## the difference between development and production

- Node assumes that it's always running using `development` as environment
- It uses `NODE_ENV` to check which environment it's running on
- `NODE_ENV` can be set to `production` via:

```
export NODE_ENV=production
```

- Do this through a configuration file.

- Setting the environment to `production` will:

  - Logging is kept to a minimum, essential level
  - More caching occurs
