import React from 'react';

import StyleButton from './StyleButton';

export default function EntityControls(props) {
  let { entityControls } = props;
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {entityControls.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={type. action}
        />
      )}
    </div>
  );
}
