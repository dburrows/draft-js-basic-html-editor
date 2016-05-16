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

// <strong>aa<em>aaaaaa</strong>aa</em>
let badlyNestedTags1 = {
  "key": "d21l",
  "text": "aaaaaaaaaa",
  "type": "unstyled",
  "depth": 0,
  "inlineStyleRanges": [
    {
      "offset": 0,
      "length": 8,
      "style": "BOLD"
    },
    {
      "offset": 2,
      "length": 8,
      "style": "ITALIC"
    }
  ],
  "entityRanges": []
};

let badlyNestedTags2 = {
  "key": "d21l",
  "text": "Here's some text, it's useful but it's quote long this time",
  "type": "unstyled",
  "depth": 0,
  "inlineStyleRanges": [
    {
      "offset": 2,
      "length": 20,
      "style": "BOLD"
    },
    {
      "offset": 2,
      "length": 2,
      "style": "ITALIC"
    },
    {
      "offset": 7,
      "length": 30,
      "style": "ITALIC"
    },
    {
      "offset": 50,
      "length": 4,
      "style": "BOLD"
    }
  ],
  "entityRanges": []
};

// In this case, the editor generates:

// The <strong>quick brown fox <em>jumps over</strong> the lazy</em> dog.
// Instead of:

// The <strong>quick brown fox <em>jumps over</em></strong><em> the lazy</em> dog.


describe('processInlineStylesAndEntities', function () {

  it('should order blocks correctly: test case 1', function() {
    let html = processInlineStylesAndEntities(inlineTagMap, {}, {}, overlappingInlineStyles);

    expect(html).to.equal('Here\'s some <strong>text, it\'s <em>useful</em></strong>');
  });

  it('should order blocks correctly: test case 2', function() {
    let html = processInlineStylesAndEntities(inlineTagMap, {}, {}, overlappingInlineStyles2);

    expect(html).to.equal(`Here's <em>some text, <strong>it's useful</strong></em>`);
  });

  it('should close/open nested inline tags properly: test case 1', function () {
    let html = processInlineStylesAndEntities(inlineTagMap, {}, {}, badlyNestedTags1);

    expect(html).to.equal(
      `<strong>aa<em>aaaaaa</em></strong><em>aa</em>`);

  });

  it('should close/open tags properly: test case 2', function () {
    let html = processInlineStylesAndEntities(inlineTagMap, {}, {}, badlyNestedTags2);

    expect(html).to.equal(
      `He<strong><em>re</em>'s <em>some text, it's</em></strong><em> useful but it'</em>s quote long <strong>this</strong> time`);

  });

});
