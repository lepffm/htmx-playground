# htmx-playground
htmx study

# use static server for testing
```shell
npm -g install static-server
static-server src -p 8080 -c * -z 
```

# troubleshooting
- CORS
`hx-on="htmx:configRequest: event.detail.headers='';"`
- json handling
use client side template ( mustache )

# references
- [htmx](https://htmx.org) 
- [htmx client side template](https://htmx.org/extensions/client-side-temlates)
- [mustache](https://github.com/janl/mustache.js)
- [tailwind css](https://tailwindcss.com)
