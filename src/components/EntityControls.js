import React from 'react';
import {  RichUtils } from 'draft-js';
import StyleButton from './StyleButton';
import { ENTITY_CONTROLS } from '../config/constants';

const addLinkLabel = ENTITY_CONTROLS[0].label;

export default function EntityControls(props) {
  const { entityControls, editorState } = props;
  const isLink = RichUtils.currentBlockContainsLink(editorState);
  return (
    <div className="RichEditor-controls">
      {entityControls.map(type =>
        <StyleButton
          key={type.label}
          active={isLink && type.label !== addLinkLabel}
          label={type.label}
          onToggle={type. action}
        />
      )}
    </div>
  );
}
