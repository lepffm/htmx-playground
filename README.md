# htmx-playground
htmx study

# use static server for testing
```shell
npm -g install static-server
static-server docs -p 8080 -c * -z 
```

# troubleshooting
- CORS
 - `hx-on:htmx:config-equest="event.detail.headers='';"`
- json handling
  - template : mustache plugin
  - json encoding : json-enc extensions 
    ```
        <script src="https://unpkg.com/htmx.org/dist/ext/json-enc.js"></script>
        <div hx-ext="json-enc">
    ```  
- tailwind cdn warning
  - ues jit-cdn

# references
- [htmx](https://htmx.org)
  - [htmx client side template](https://htmx.org/extensions/client-side-templates)
  - [htmx extension](https://htmx.org/attributes/hx-ext/)
  - [mustache](https://github.com/janl/mustache.js)
  - [htmx in action[(https://hypermedia.systems/htmx-in-action/)
- style 
  - [tailwind css](https://tailwindcss.com)
  - [daisy ui](https://daisyui.com/)
  - [github markdown css](https://github.com/sindresorhus/github-markdown-css)
- markdown to html convert [monaco-editor](https://microsoft.github.io/monaco-editor/)
