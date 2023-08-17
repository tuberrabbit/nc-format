import Formatter from "../src";

describe('test', () => {
  it('formatText', () => {
    const formatter = new Formatter();
    expect(formatter.formatText('ios13')).toBe('ios 13');
  });
});
