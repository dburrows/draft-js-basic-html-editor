import Chai from 'chai';
const expect = Chai.expect;
import processInlineStylesAndEntities from '../../../src/utils/processInlineStylesAndEntities';
import { inlineTagMap } from '../../../src/config/tagMaps';

let overlappingInlineStyles = {
  "key": "67tdi",
  "text": "Here's some text, it's useful",
  "type": "unstyled",
  "depth": 0,
  "inlineStyleRanges": [
    {
      "offset": 12,
      "length": 17,
      "style": "BOLD"
    },
    {
      "offset": 23,
      "length": 6,
      "style": "ITALIC"
    }
  ],
  "entityRanges": []
};

let overlappingInlineStyles2 = {
  "key": "d21l",
  "text": "Here's some text, it's useful",
  "type": "unstyled",
  "depth": 0,
  "inlineStyleRanges": [
    {
      "offset": 18,
      "length": 11,
      "style": "BOLD"
    },
    {
      "offset": 7,
      "length": 22,
      "style": "ITALIC"
    }
  ],
  "entityRanges": []
};


describe('processInlineStylesAndEntities', function () {

  it('should order blocks correctly', function() {
    let html = processInlineStylesAndEntities(inlineTagMap, {}, {}, overlappingInlineStyles);

    expect(html).to.equal('Here\'s some <strong>text, it\'s <em>useful</em></strong>');
  });

  it('should order blocks correctly', function() {
    let html = processInlineStylesAndEntities(inlineTagMap, {}, {}, overlappingInlineStyles2);

    expect(html).to.equal(`Here's <em>some text, <strong>it's useful</strong></em>`);
  });

});
