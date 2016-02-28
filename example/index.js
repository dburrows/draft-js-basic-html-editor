import React from 'react';
import ReactDOM from 'react-dom';

import BasicHtmlEditor from '../src/BasicHtmlEditor';


let html = `
  <h1>This is a Title</h1>
  <p>Here's some text, it's useful</p>
  <p>More text, some inline <strong>styling</strong> for <em>some</em> elements</p>
`;

class BasicHtmlEditorExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: props.html
    };
  }

  updateHtml(html) {
    console.log('HTML change: ', html);
    this.setState({
      html
    });
  }

  render() {
    return (
      <div>
        <BasicHtmlEditor value={ this.state.html } onChange={ (html) => this.updateHtml(html) }/>
        <div style={{ margin: '30px 10px 10px 10px' }}>
          <code>Exported HTML</code>
          <hr/>
          <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
        </div>
      </div>
    );
  }

}

ReactDOM.render(
  <BasicHtmlEditorExample html={html}/>,
  document.getElementById('app')
);
