import Chai from 'chai';
const expect = Chai.expect;
import draftRawToHtml from '../../../src/utils/draftRawToHtml';

var raw = {
  "entityMap": {},
  "blocks": [
    {
      "key": "8l6bm",
      "text": "This is a Title",
      "type": "header-one",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": []
    },
    {
      "key": "4no7m",
      "text": "A",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": []
    },
    {
      "key": "12tpo",
      "text": "thing 1",
      "type": "unordered-list-item",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": []
    },
    {
      "key": "3cb4g",
      "text": "thing 2",
      "type": "unordered-list-item",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": []
    }
  ]
};


describe('processInlineStylesAndEntities', function () {

  it('should close open list tags when processed all the blocks', function () {
    var html = draftRawToHtml(raw);

    expect(html).to.equal(
      '<h1>This is a Title</h1>\n' +
      '<p>A</p>\n' +
      '<ul>\n' +
      '<li>thing 1</li>\n' +
      '<li>thing 2</li>\n' +
      '</ul>'
      );
  });

});
