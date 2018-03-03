export const ENTITY_CONTROLS = [
  {label: 'Add Link', actionName: 'addLink' },
  {label: 'Remove Link', actionName: 'removeLink' }
];

export const INLINE_TAG_MAP = {
  'BOLD': ['<strong>','</strong>'],
  'ITALIC': ['<em>','</em>'],
  'UNDERLINE': ['<u>','</u>'],
  'CODE': ['<code>','</code>'],
  'STRIKETHROUGH': ['<del>', '</del>'],
  'default': ['<span>','</span>']
};

export const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
  {label: 'Strikethrough', style: 'STRIKETHROUGH'}
];

export const BLOCK_TYPES = [
  {label: 'P', style: 'unstyled'},
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'}
];


export const BLOCK_TAG_MAP = {
  'header-one':               ['<h1>','</h1>\n'],
  'header-two':               ['<h1>','</h1>\n'],
  'unstyled':                 ['<p>','</p>\n'],
  'code-block':               ['<pre><code>','</code></pre>\n'],
  'blockquote':               ['<blockquote>','</blockquote>\n'],
  'ordered-list-item':        ['<li>','</li>\n'],
  'unordered-list-item':      ['<li>','</li>\n'],
  'default':                  ['<p>','</p>\n']
};



export const ENTITY_TAG_MAP = {
  'LINK': ['<a href="<%= url %>" rel="noopener noreferrer" className="drafjs-bhe_link">', '</a>']
};

export const NESTED_TAG_MAP = {
  'ordered-list-item': ['<ol>', '</ol>'],
  'unordered-list-item': ['<ul>', '</ul>']
};
