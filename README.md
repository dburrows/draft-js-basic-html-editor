# draft-js-BasicHtmlEditor
Basic HTML editor using draft.js - html in, html out

Proof of concept currently, not production ready! PR's welcome.

Extends the Rich example from the Draft repo to accept html as its input format, and return html to an `onChange` handler.

### Tag Support

Block tags: `<p> <h1> <h2> <blockquote> <ul> <ol> <code>`

Inline tags: `<strong> <em> <u> <code> <del>`

### Install

`$ npm install draft-js-basic-html-editor`

Note: You'll also need to install `react` and `react-dom` if you don't already have them

#### Webpack

The component is built without `react` or `react-dom` so you'll need to make sure that Webpack can resolve copies of both those modules. Either add your projects `node_modules` as fallback path:

```
resolve: {
  fallback:  path.resolve('./node_modules')
}

```

or create an alias for just those 2 modules

```
resolve: {
  alias: {
    'react': path.resolve('./node_modules/react'),
    'react-dom': path.resolve('./node_modules/react-dom'),
  }
```

### Usage 

```js

import BasicHtmlEditor from 'draft-js-basic-html-editor';

const MyEditor = () => {
  const initialHtml = 'hello, <b>World</b>';
  const onChange = html => console.log('updated', html);

  return (
    <BasicHtmlEditor
      value={ initialHtml }
      onChange={ onChange }
      debounce={ 500 }
    />
  )
}
```
### Usage 
https://www.w3schools.com/html/

### Demo

http://dburrows.github.io/draft-js-basic-html-editor/example-dist/

#### Development

    $ npm install
    $ webpack-dev-server

#### To Do

* Block support ✔️
* Inline tag support ✔️
* Handle Lists with more than one element ✔️
* Tests ✔️
* Links ✔️
* Images
* Prod build ✔️
