import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  CompositeDecorator,
  Modifier
} from 'draft-js/lib/Draft';

import htmlToContent from './utils/htmlToContent';
import draftRawToHtml from './utils/draftRawToHtml';

import Link from './components/Link';
import EntityControls from './components/EntityControls';
import InlineStyleControls from './components/InlineStyleControls';
import BlockStyleControls from './components/BlockStyleControls';
import findEntities from './utils/findEntities';
import { INLINE_STYLES, BLOCK_TYPES, ENTITY_CONTROLS } from './config/constants';

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

const getBlockStyle = block => {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
};


const decorator = new CompositeDecorator([
  {
    strategy: findEntities,
    component: Link
  }
]);

export default class BasicHtmlEditor extends Component {
  constructor(props) {
    super(props);
    const { value } = props;
    this.focus = () => this.refs.editor.focus();
    this.ENTITY_CONTROLS = ENTITY_CONTROLS.map(control => {
      control.action = this[control.actionName];
      return control;
    });
    this.INLINE_STYLES = INLINE_STYLES;
    this.BLOCK_TYPES = BLOCK_TYPES;
    const contentState = htmlToContent(value);
    this.state = {
      editorState: EditorState.createWithContent(contentState, decorator)
    };

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.handleReturn = (e) => this._handleReturn(e);
  }

  componentWillUpdate(nextProps, nextState) {
    // only emit html when content changes
    const previousContent = this.state.editorState.getCurrentContent();
    if( previousContent !== nextState.editorState.getCurrentContent() ) {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.emitHTML(nextState.editorState), nextProps.debounce);
    }
  }

  emitHTML = (editorState) => () => {
    const raw = convertToRaw( editorState.getCurrentContent() );
    const html = draftRawToHtml(raw);
    this.props.onChange(html);
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _handleReturn(e) {
    if (e.metaKey === true) {
      return this._addLineBreak();
    } else {
      return false;
    }
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  onChange = (editorState) => {
    this.setState({editorState});
  };

  _addLineBreak(/* e */) {
    let newContent, newEditorState;
    const {editorState} = this.state;
    const content = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const block = content.getBlockForKey(selection.getStartKey());

    // console.log(content.toJS(), selection.toJS(), block.toJS());

    if (block.type === 'code-block') {
      newContent = Modifier.insertText(content, selection, '\n');
      newEditorState = EditorState.push(editorState, newContent, 'add-new-line');
      this.onChange(newEditorState);
      return true;
    } else {
      return false;
    }
  }

  addLink = (/* e */) => {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const url = window.prompt('Enter a URL');
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        'LINK',
        'MUTABLE',
        {url}
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      this.onChange(RichUtils.toggleLink(editorState, selection, entityKey));
    }
  }

  removeLink = (/* e */) => {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      return;
    }
    this.onChange( RichUtils.toggleLink(editorState, selection, null));
  }

  render() {
    const {editorState} = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="RichEditor-root draftjs-bhe">
        <BlockStyleControls
          editorState={editorState}
          blockTypes={this.BLOCK_TYPES}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
          inlineStyles={this.INLINE_STYLES}
        />
        <EntityControls
          editorState={editorState}
          entityControls={this.ENTITY_CONTROLS}
        />
        <div className={className} onClick={this.focus} >
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            handleReturn={this.handleReturn}
            onChange={this.onChange}
            placeholder="Tell a story..."
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}
