export default function processInlineStyles(inlineTagMap, block) {
  if (block.inlineStyleRanges.length === 0) { return block.text; }

  let html = block.text;
  let tagInsertMap = {};

  // map all the tag insertions we're going to do
  block.inlineStyleRanges.forEach(function(range) {
    let tag = inlineTagMap[range.style];

    if (!tagInsertMap[range.offset]) { tagInsertMap[range.offset] = []; }

    tagInsertMap[range.offset].push(tag[0]);
    if (tag[1]) {
      if (!tagInsertMap[range.offset+range.length] ) { tagInsertMap[range.offset+range.length] = []; }
      // add closing tags to start of array, otherwise tag nesting will be invalid
      tagInsertMap[ range.offset+range.length].unshift(tag[1]);
    }
  });

  // sort on position, as we'll need to keep track of offset
  let orderedKeys = Object.keys(tagInsertMap).sort(function(a, b) {
    if (a > b) { return 1; }
    if (a < b) { return -1; }
    return 0;
  });

  // insert tags into string, keep track of offset caused by our text insertions
  let offset = 0;
  orderedKeys.forEach(function(pos) {
    let index = Number(pos);
    tagInsertMap[pos].forEach(function(tag) {
      html = html.substr(0, offset+index) +
        tag +
        html.substr(offset+index);
      offset += tag.length;
    });
  });

  return html;
}
