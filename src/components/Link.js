import React from 'react';
import { Entity } from 'draft-js';

export default function Link(props) {
  const {href} = Entity.get(props.entityKey).getData();
  return (
    <a href={href} className="drafjs-bhe_link">
      {props.children}
    </a>
  );
}
