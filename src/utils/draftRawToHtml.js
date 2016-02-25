let tagMap = {
  'header-one': `<h1>%content%</h1>\n`,
  'header-two': `<h1>%content%</h1>\n`,
  'unstyled': `<p>%content%</p>\n`,
  'code-block': `<code>%content%</code>\n`,
  'blockquote': `<blockquote>%content%</blockquote>\n`,
  'ordered-list-item': `<ol><li>%content%</li></ol>\n`,
  'unordered-list-item': `<ul><li>%content%</li></ul>\n`,
  'default': `<p>%content%</p>\n`
}

export default function(raw) {
  let content = '';
  let html = '';


  raw.blocks.forEach(function(block) {
    html += tagMap[block.type] ?
      tagMap[block.type].replace('%content%', processInlineStyles(block)) :
      tagMap['default'].replace('%content%', processInlineStyles(block));
  })
  return html;

}

function processInlineStyles(block) {
  return block.text;
}
