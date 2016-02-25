import React from 'react';
import ReactDOM from 'react-dom';

import RichTextEditor from '../src/RichTextEditor';


let initialHtml = `
  <h1>This is a Title</h1>
  <p>Here's some text, it's useful</p>
  <p>More text, some inline <strong>styling</strong> for <em>some</em> elements</p>
`

ReactDOM.render(
  <RichTextEditor value={ initialHtml }/>,
  document.getElementById('rich-text-editor')
);
