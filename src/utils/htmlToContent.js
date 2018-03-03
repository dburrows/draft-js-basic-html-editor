import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';

const { processHTML } = DraftPasteProcessor;

export default function(html) {
  return processHTML(html);
}
