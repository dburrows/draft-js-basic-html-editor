import { convertFromHTML, ContentState } from 'draft-js/lib/Draft';

const htmlToContent = (html) => {
  if(!html) {
    return ContentState.createFromText('');
  }
  const blocksFromHTML = convertFromHTML(html);
  return ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  );
};

export default htmlToContent;
