import Chai from 'chai';
const expect = Chai.expect;
import processInlineStyles from '../../../src/utils/processInlineStyles';
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



describe('processInlineStyles', function () {

  it('should order blocks correctly', function() {
    let html = processInlineStyles(inlineTagMap, {}, {}, overlappingInlineStyles);

    expect(html).to.equal('Here\'s some <strong>text, it\'s <em>useful</em></strong>');
  });

});
