import template from 'lodash/template';
import clone from 'lodash/clone';
import { compareObjectBy, compareNums } from './helpers';

const compareObjectByOffset = compareObjectBy({key: 'offset'});

export default function processInlineStylesAndEntities(inlineTagMap, entityTagMap, entityMap, block) {
  if (!block.inlineStyleRanges && !block.entityRanges) {
    //TODO: optimisation, exit early if length === 0 as well
    return block.text;
  }

  let html = block.text;
  let tagInsertMap = {};

  /*
   * ESCAPE CHARS
  */

  const escapeReplacements = [ ['<', '&lt;'], ['&', '&amp;']];

  escapeReplacements.forEach((arr) =>{
    for(var i=0; i<html.length;i++) {
      if (html[i] === arr[0]) {
        if (!tagInsertMap[i]) {
          tagInsertMap[i] = [];
        }
        tagInsertMap[i].push([ arr[0].length, arr[1] ]);
      }
    }
  });

  /*
   * INLINE STYLES
  */

  // important to process in order, so sort
  const sortedInlineStyleRanges = block.inlineStyleRanges.sort(compareObjectByOffset);
  // map all the tag insertions we're going to do
  sortedInlineStyleRanges.forEach(function(range) {
    const tag = inlineTagMap[range.style];

    if (!tagInsertMap[range.offset]) { tagInsertMap[range.offset] = []; }

    tagInsertMap[range.offset].push(tag[0]);
    if (tag[1]) {
      if (!tagInsertMap[range.offset+range.length] ) { tagInsertMap[range.offset+range.length] = []; }
      // add closing tags to start of array, otherwise tag nesting will be invalid
      tagInsertMap[ range.offset+range.length].unshift(tag[1]);
    }
  });


  /*
   * FIX INVALID TAG NESTING ADJUSTMENT
   */

  var tagStack = [];

  Object.keys(tagInsertMap).forEach( key => {
    const newInsertMap = [];
    const tags = tagInsertMap[key];

    if (tagStack.length === 0) {
      tags.forEach( tag => {
        tagStack.unshift(tag);
      });
    } else {
      const iterateArray = clone(tags);
      const tagsToReopen = [];

      iterateArray.forEach( tag => {
        const isCloser = tag.startsWith('</');
        const stackTag = tagStack[0];
        const closeMatch = isTagCloseMatch(stackTag, tag);


        if (!stackTag || closeMatch) {
          tagStack.shift();
          newInsertMap.push(tag);
        } else if (isCloser) {
          let i = tagStack.indexOf(toOpeningTag(tag));
          let earlyClosers = tagStack.splice(0, i+1);

          //get rid of actual tag
          earlyClosers.pop();

          // close tag, add tag to reopen stack
          earlyClosers.forEach( t => {
            newInsertMap.push(toClosingTag(t));
            tagsToReopen.push(t);
          });
          newInsertMap.push(tag);
        } else {
          tagStack.unshift(tag);
          newInsertMap.push(tag);
        }
      });

      // add tags that need re-opening to insert map, then set as new insert mat
      tagInsertMap[key] = newInsertMap.concat(tagsToReopen);
    }

  });

  function toOpeningTag(t) {
    return t.replace('/', '');
  }
  function toClosingTag(t) {
    if (!t) { return ''; }
    return '</' + t.substr(1);
  }

  function isTagCloseMatch(opener, closer) {
    if (!opener || !closer) { return false; }
    return opener.substr(1) === closer.substr(2);
  }

  /*
   * ENTITY RANGER
   */

  const sortedEntityRanges = block.entityRanges.sort(compareObjectByOffset);

  sortedEntityRanges.forEach(function(range) {
    const entity = entityMap[range.key];
    const tag = entityTagMap[entity.type];
    const compiledTag0 = template(tag[0])(entity.data);
    const compiledTag1 = template(tag[1])(entity.data);

    if (!tagInsertMap[range.offset]) { tagInsertMap[range.offset] = []; }
    tagInsertMap[range.offset].push(compiledTag0);

    if (tag[1]) {

      if (!tagInsertMap[range.offset+range.length] ) { tagInsertMap[range.offset+range.length] = []; }
      // add closing tags to start of array, otherwise tag nesting will be invalid
      tagInsertMap[ range.offset+range.length].unshift(compiledTag1);
    }
  });

  /*
   * GENERATE OUTPUT
  */

  // sort on position, as we'll need to keep track of offset
  const orderedKeys = Object.keys(tagInsertMap).sort(compareNums);

  // insert tags into string, keep track of offset caused by our text insertions
  let offset = 0;
  orderedKeys.forEach(function(pos) {
    const index = Number(pos);

    tagInsertMap[pos].forEach(function(tag) {

      if (typeof tag === 'string') {
        html = html.substr(0, offset+index) +
          tag +
          html.substr(offset+index);
        offset += tag.length;
      } else {
        let [ length, replacement] = tag;
        html = html.substr(0, offset+index) +
          replacement +
          html.substr(offset+index+length);
        offset += (replacement.length - length );
      }

    });
  });

  return html;
}
