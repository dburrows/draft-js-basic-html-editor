# draft-js-BasicHtmlEditor
Basic HTML editor using draft.js - html in, html out

Proof of concept currently, not production ready! PR's welcome.

Extends the Rich example from the Draft repo to accept html as its input format, and return html to an `onChange` handler.

### Tag Support

Block tags: `<p> <h1> <h2> <blockquote> <ul> <ol> <code>`

Inline tags: `<strong> <em> <u> <code> <del>`

### Install & Usage

`$ npm install draft-js-basic-html-editor`

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
