import { convertFromHTML, ContentState } from 'draft-js';

const htmlToContent = (html) => {
  const blocksFromHTML = convertFromHTML(html);
  const contentState = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  );
  // console.log('contentState ', contentState.toJS());
  return contentState;
};

export default htmlToContent;
