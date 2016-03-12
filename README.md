# draft-js-BasicHtmlEditor
Basic HTML editor using draft.js - html in, html out

Proof of concept currently, not production ready! PR's welcome.

Extends the Rich example from the Draft repo to accept html as its input format, and return html to an `onChange` handler.

### Tag Support

Block tags: `<p> <h1> <h2> <blockquote> <ul> <ol> <code>`

Inline tags: `<strong> <em> <u> <code> <del>`

### Install & Usage

Currently this package is provided as a ES6 module only, just require from an ES6 module aware environment like Babel-compiled code.

    $ npm install draft-js-basic-html-editor

If you're using Webpack, you're probably excluding `node_modules` from your Babel loader, just add an exception

    {
      test: /node_modules\/draft-js-basic-html-editor\//,
      loaders: ["babel-loader"]
    }

### Props

* value - String of inital HTML to edit, see above for currently supported tags
* onChange - function to call onChange, will receive emitted HTML as string
* debounce - debounce delay for emitting html in ms, defaults to 0, improves performance massively when editing large documents

### Demo

http://dburrows.github.io/draft-js-basic-html-editor/example-dist/

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
