import processInlineStylesAndEntities from './processInlineStylesAndEntities';
import { INLINE_TAG_MAP, BLOCK_TAG_MAP, ENTITY_TAG_MAP, NESTED_TAG_MAP } from '../config/constants';

export default function(raw) {
  let html = '';
  let nestLevel = [];
  let lastIndex = raw.blocks.length - 1;

  raw.blocks.forEach(function(block, index) {

    // close tag if not consecutive same nested
    if (nestLevel.length > 0 && nestLevel[0] !== block.type) {
      let type = nestLevel.shift();
      html += NESTED_TAG_MAP[type][1] + '\n';
    }

    // open tag if nested
    if ( NESTED_TAG_MAP[block.type] && nestLevel[0] !== block.type) {
      html += NESTED_TAG_MAP[block.type][0] + '\n';
      nestLevel.unshift(block.type);
    }

    let blockTag = BLOCK_TAG_MAP[block.type];
    html += blockTag ?
      blockTag[0] +
        processInlineStylesAndEntities(INLINE_TAG_MAP, ENTITY_TAG_MAP, raw.entityMap, block) +
        blockTag[1] :
      BLOCK_TAG_MAP['default'][0] +
        processInlineStylesAndEntities(INLINE_TAG_MAP, ENTITY_TAG_MAP, raw.entityMap, block) +
        BLOCK_TAG_MAP['default'][1];

    // close any unclosed blocks if we've processed all the blocks
    if ( index === lastIndex && nestLevel.length > 0 ) {
      while(nestLevel.length > 0 ) {
        html += NESTED_TAG_MAP[ nestLevel.shift() ][1];
      }
    }

  });
  return html;

}
