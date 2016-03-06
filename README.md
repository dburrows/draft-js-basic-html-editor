# draft-js-BasicHtmlEditor
Basic HTML editor using draft.js - html in, html out

Proof of concept currently, not production ready! PR's welcome.

Extends the Rich example from the Draft repo to accept html as its input format, and return html to an `onChange` handler.

### Tag Support

Block tags: `<p> <h1> <h2> <blockquote> <ul> <ol> <code>`

Inline tags: `<strong> <em> <u> <code>`

#### Development

    $ npm install
    $ webpack-dev-server

#### To Do

* Block support ✔️ 
* Inline tag support ✔️
* Handle Lists with more than one element ✔️
* Tests
* Links ✔️
* Images
* Prod build
