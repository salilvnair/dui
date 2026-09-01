/**
 * The path a cursor position resolves to.
 *
 * Every case here is one someone will hit in a real response body, and most of
 * them are the reason a naive implementation gets it wrong: keys that look
 * like values, arrays of arrays, a comma that ends one member without starting
 * a named one, and a document that is half-typed.
 */
import { describe, it, expect } from 'vitest';
import { jsonPathAt, xPathAt } from './doc-path';

/** Path at the first occurrence of `needle`, which is how it reads on screen. */
const atJson = (text: string, needle: string, offset = 1) =>
  jsonPathAt(text, text.indexOf(needle) + offset);
const atXml = (text: string, needle: string, offset = 1) =>
  xPathAt(text, text.indexOf(needle) + offset);

describe('jsonPathAt', () => {
  const body = `{
  "status": "ok",
  "data": {
    "items": [
      { "id": 11, "tags": ["a", "b"] },
      { "id": 22, "name": "second" }
    ],
    "total": 2
  }
}`;

  it('names a top-level key', () => {
    expect(atJson(body, '"status"')).toBe('$.status');
  });

  it('names a nested key', () => {
    expect(atJson(body, '"total"')).toBe('$.data.total');
  });

  /*
    The case the feature exists for. Counting which element you are in is the
    part nobody wants to do by eye.
  */
  it('indexes the element of an array', () => {
    expect(atJson(body, '"id": 22')).toBe('$.data.items[1].id');
  });

  it('indexes the first element too', () => {
    expect(atJson(body, '"id": 11')).toBe('$.data.items[0].id');
  });

  it('handles an array inside an array element', () => {
    expect(atJson(body, '"b"')).toBe('$.data.items[0].tags[1]');
  });

  it('reports the value, not just the key, at the same path', () => {
    // A path is for selecting a value, so standing on either half of a member
    // has to give the same answer.
    expect(atJson(body, '"second"')).toBe('$.data.items[1].name');
  });

  it('gives the container when between members', () => {
    // Just after a comma, no member has been named yet.
    const i = body.indexOf('"total"') - 2;
    expect(jsonPathAt(body, i)).toBe('$.data');
  });

  it('quotes a key that is not an identifier', () => {
    expect(atJson('{ "content-type": "x" }', '"content-type"'))
      .toBe('$["content-type"]');
  });

  it('handles a root-level array', () => {
    expect(atJson('[{ "a": 1 }, { "a": 2 }]', '"a": 2')).toBe('$[1].a');
  });

  /*
    A brace inside a string is not a brace. Getting this wrong pushes a frame
    that never pops and every path below it is wrong.
  */
  it('is not fooled by braces and brackets inside strings', () => {
    const t = '{ "q": "a{b[c", "real": 1 }';
    expect(atJson(t, '"real"')).toBe('$.real');
  });

  it('is not fooled by an escaped quote', () => {
    const t = '{ "q": "he said \\"hi\\"", "real": 1 }';
    expect(atJson(t, '"real"')).toBe('$.real');
  });

  it('is not fooled by a colon inside a string value', () => {
    const t = '{ "url": "http://x/y", "real": 1 }';
    expect(atJson(t, '"real"')).toBe('$.real');
  });

  /*
    A body being edited is malformed for as long as you are typing it. A path
    feature that only works on valid JSON is one you cannot use while writing
    a request.
  */
  it('still answers inside an unclosed document', () => {
    expect(atJson('{ "a": { "b": [1, 2', '2')).toBe('$.a.b[1]');
  });

  it('still answers with an unterminated string', () => {
    expect(atJson('{ "a": { "b": "unfinis', 'unfinis')).toBe('$.a.b');
  });

  it('gives the root for an empty document', () => {
    expect(jsonPathAt('', 0)).toBeUndefined();
    expect(jsonPathAt('{}', 1)).toBe('$');
  });

  it('clamps an offset past the end', () => {
    expect(jsonPathAt('{ "a": 1 }', 9999)).toBe('$');
  });
});

describe('xPathAt', () => {
  const xml = `<?xml version="1.0"?>
<order id="9">
  <items>
    <item sku="A"><qty>1</qty></item>
    <item sku="B"><qty>7</qty></item>
  </items>
  <total>2</total>
</order>`;

  it('names the root', () => {
    expect(atXml(xml, '<order')).toBe('/order');
  });

  it('names a nested element', () => {
    expect(atXml(xml, '<total>')).toBe('/order/total');
  });

  /*
    The same counting problem as JSON arrays: which <item> is this one.
  */
  it('indexes repeated siblings', () => {
    expect(atXml(xml, '<qty>7')).toBe('/order/items/item[2]/qty');
  });

  it('leaves the first sibling unindexed', () => {
    // `/a/b` and `/a/b[1]` select the same node; the index is noise until
    // there is a second one to tell apart.
    expect(atXml(xml, '<qty>1')).toBe('/order/items/item/qty');
  });

  it('resolves an attribute to its element', () => {
    expect(atXml(xml, 'sku="B"')).toBe('/order/items/item[2]');
  });

  it('resolves text to its element', () => {
    expect(atXml(xml, '7</qty>')).toBe('/order/items/item[2]/qty');
  });

  it('skips the xml declaration', () => {
    // A declaration counted as an element would put every path under it.
    expect(atXml(xml, '<items>')).toBe('/order/items');
  });

  it('skips comments', () => {
    const t = '<a><!-- <ghost> --><b>1</b></a>';
    expect(atXml(t, '<b>')).toBe('/a/b');
  });

  /*
    CDATA is the one that matters: it legitimately contains '<', and reading
    that as a tag pushes frames that never pop.
  */
  it('skips CDATA containing tags', () => {
    const t = '<a><![CDATA[ <fake><fake> ]]><b>1</b></a>';
    expect(atXml(t, '<b>')).toBe('/a/b');
  });

  it('does not descend into a self-closing element', () => {
    const t = '<a><br/><b>1</b></a>';
    expect(atXml(t, '<b>')).toBe('/a/b');
  });

  it('counts a self-closing element as a sibling', () => {
    const t = '<a><i/><i/><i>3</i></a>';
    expect(atXml(t, '3')).toBe('/a/i[3]');
  });

  it('reports the element for its closing tag', () => {
    expect(atXml('<a><b>1</b></a>', '</b>')).toBe('/a/b');
  });

  it('still answers inside a tag being typed', () => {
    const t = '<a><b><c';
    expect(xPathAt(t, t.length)).toBe('/a/b');
  });

  it('counts separate roots in a fragment', () => {
    const t = '<row>1</row><row>2</row>';
    expect(atXml(t, '2')).toBe('/row[2]');
  });

  /*
    Scan state must not survive the call. Sharing it would count the first
    root of the second document as the second occurrence.
  */
  it('does not carry counts between documents', () => {
    const t = '<row>1</row>';
    expect(atXml(t, '1')).toBe('/row');
    expect(atXml(t, '1')).toBe('/row');
    expect(atXml(t, '1')).toBe('/row');
  });

  it('gives nothing outside any element', () => {
    expect(xPathAt('', 0)).toBeUndefined();
    expect(xPathAt('<a></a>', 7)).toBeUndefined();
  });
});
