let blockTagMap = {
  'header-one': `<h1>%content%</h1>\n`,
  'header-two': `<h1>%content%</h1>\n`,
  'unstyled': `<p>%content%</p>\n`,
  'code-block': `<code>%content%</code>\n`,
  'blockquote': `<blockquote>%content%</blockquote>\n`,
  'ordered-list-item': `<ol><li>%content%</li></ol>\n`,
  'unordered-list-item': `<ul><li>%content%</li></ul>\n`,
  'default': `<p>%content%</p>\n`
};

let inlineTagMap = {
  'BOLD': ['<strong>','</strong>'],
  'ITALIC': ['<em>','</em>'],
  'UNDERLINE': ['<u>','</u>'],
  'CODE': ['<code>','</code>'],
  'default': ['<span>','</span>']
};

export default function(raw) {
  let content = '';
  let html = '';


  raw.blocks.forEach(function(block) {
    html += blockTagMap[block.type] ?
      blockTagMap[block.type].replace('%content%', processInlineStyles(block)) :
      blockTagMap['default'].replace('%content%', processInlineStyles(block));
  })
  return html;

}

function processInlineStyles(block) {
  if (block.inlineStyleRanges.length === 0) { return block.text }
  
  let html = block.text
  let tagInsertMap = [] 

  // map all the tag insertions we're going to do
  block.inlineStyleRanges.forEach(function(range) {
    let tag = inlineTagMap[range.style];
    tagInsertMap.push([ range.offset, tag[0] ])
    if (tag[1]) {
      tagInsertMap.push([ range.offset+range.length, tag[1]])
    }
  })

  // sort on position, as we'll need to keep track of offset
  tagInsertMap.sort(function(a, b) {
    if (a[0] > b[0]) { return 1; };
    if (a[0] < b[0]) { return -1; };
    return 0;
  })

  // insert tags, keep track of offset caused by our text insertions
  let offset = 0;
  tagInsertMap.forEach(function(insertion) {
    console.log(insertion)
    html = html.substr(0, offset+insertion[0]) + 
      insertion[1] + 
      html.substr(offset+insertion[0]);
    offset += insertion[1].length;
  })
  return html;
}


// "inlineStyleRanges": [
//         {
//           "offset": 23,
//           "length": 7,
//           "style": "BOLD"
//         },
//         {
//           "offset": 5,
//           "length": 4,
//           "style": "ITALIC"
//         },
//         {
//           "offset": 35,
//           "length": 4,
//           "style": "ITALIC"
//         }
//       ],
