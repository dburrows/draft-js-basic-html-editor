let blockTagMap = {
  'header-one': `<h1>%content%</h1>\n`,
  'header-two': `<h1>%content%</h1>\n`,
  'unstyled': `<p>%content%</p>\n`,
  'code-block': `<code>%content%</code>\n`,
  'blockquote': `<blockquote>%content%</blockquote>\n`,
  'ordered-list-item': `<li>%content%</li>\n`,
  'unordered-list-item': `<li>%content%</li>\n`,
  'default': `<p>%content%</p>\n`
};

let inlineTagMap = {
  'BOLD': ['<strong>','</strong>'],
  'ITALIC': ['<em>','</em>'],
  'UNDERLINE': ['<u>','</u>'],
  'CODE': ['<code>','</code>'],
  'default': ['<span>','</span>']
};

let nestedTagMap = {
  'ordered-list-item': ['<ol>', '</ol>'],
  'unordered-list-item': ['<ul>', '</ul>']
};

export default function(raw) {
  let html = '';
  let nestLevel = [];

  raw.blocks.forEach(function(block) {

    // open tag if nested
    if (nestLevel.length > 0 && nestLevel[0] !== block.type) {
      let type = nestLevel.shift();
      html += nestedTagMap[type][1]; 
    }

    // close tag is note consecutive same nested
    if ( nestedTagMap[block.type] && nestLevel[0] !== block.type) {
      html += nestedTagMap[block.type][0]; 
      nestLevel.unshift(block.type);
    } 

    html += blockTagMap[block.type] ?
      blockTagMap[block.type].replace('%content%', processInlineStyles(block)) :
      blockTagMap['default'].replace('%content%', processInlineStyles(block));
  });
  return html;

}

function processInlineStyles(block) {
  if (block.inlineStyleRanges.length === 0) { return block.text; }
  
  let html = block.text;
  let tagInsertMap = [];

  // map all the tag insertions we're going to do
  block.inlineStyleRanges.forEach(function(range) {
    let tag = inlineTagMap[range.style];
    tagInsertMap.push([ range.offset, tag[0] ]);
    if (tag[1]) {
      tagInsertMap.push([ range.offset+range.length, tag[1]]);
    }
  });

  // sort on position, as we'll need to keep track of offset
  tagInsertMap.sort(function(a, b) {
    if (a[0] > b[0]) { return 1; }
    if (a[0] < b[0]) { return -1; }
    return 0;
  });

  // insert tags, keep track of offset caused by our text insertions
  let offset = 0;
  tagInsertMap.forEach(function(insertion) {
    html = html.substr(0, offset+insertion[0]) + 
      insertion[1] + 
      html.substr(offset+insertion[0]);
    offset += insertion[1].length;
  });
  
  return html;
}
