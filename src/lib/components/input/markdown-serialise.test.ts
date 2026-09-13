/**
 * What the editor escapes on its way out to Markdown.
 *
 * The bug these exist for: `#` was escaped anywhere at the start of a line, so
 * `#14` was written as `\#14`. That renders as `#14` and looks perfectly
 * correct — which is why nobody caught it — while GitHub quietly stopped
 * linking it to issue 14. A reference typed into a comment box arrived dead on
 * github.com and dead in the app that wrote it.
 *
 * The rule is CommonMark's: a marker is only markup when it is followed by a
 * space. Escaping more than that corrupts ordinary text while looking fine.
 */
import { describe, it, expect } from 'vitest';
import { escapeText } from './markdown-serialise';

/* The rule itself, which is pure — htmlToMarkdown needs a DOM and would only
   add a jsdom dependency between the test and the thing being tested. */
const md = (html: string) => escapeText(
  html.replace(/^<p>|<\/p>$/g, '').replace(/&gt;/g, '>').replace(/&lt;/g, '<'),
);

describe('hashes', () => {
  it('leaves an issue reference alone', () => {
    expect(md('<p>#14</p>')).toBe('#14');
  });

  it('leaves one mid-sentence alone, which was never at risk', () => {
    expect(md('<p>duplicate of #14</p>')).toBe('duplicate of #14');
  });

  it('leaves a cross-repository reference alone', () => {
    expect(md('<p>acme/app#14</p>')).toBe('acme/app#14');
  });

  it('still escapes a real heading, which would otherwise change the document', () => {
    expect(md('<p># Title</p>')).toBe('\\# Title');
  });

  it('escapes every heading level', () => {
    expect(md('<p>### Three</p>')).toBe('\\### Three');
  });

  it('leaves seven hashes alone — past six it is not a heading', () => {
    expect(md('<p>####### nope</p>')).toBe('####### nope');
  });

  it('escapes a lone hash, which is an empty heading', () => {
    expect(md('<p>#</p>')).toBe('\\#');
  });

  it('leaves a hex colour alone', () => {
    expect(md('<p>#1133aa is the brand</p>')).toBe('#1133aa is the brand');
  });
});

describe('list markers', () => {
  it('escapes a real bullet', () => {
    expect(md('<p>- item</p>')).toBe('\\- item');
  });

  it('leaves a negative number alone', () => {
    /* `-5` was written `\-5`, which is the same class of quiet corruption. */
    expect(md('<p>-5 degrees</p>')).toBe('-5 degrees');
  });

  it('leaves a hyphenated word at the start alone', () => {
    expect(md('<p>-ish, at best</p>')).toBe('-ish, at best');
  });

  it('escapes a real ordered list', () => {
    expect(md('<p>1. first</p>')).toBe('1\\. first');
  });

  it('leaves a version number alone', () => {
    expect(md('<p>1.0 shipped</p>')).toBe('1.0 shipped');
  });
});

describe('blockquotes', () => {
  it('escapes the marker, which needs no space after it', () => {
    expect(md('<p>&gt; quoted</p>')).toBe('\\> quoted');
  });

  it('escapes it without a space too', () => {
    expect(md('<p>&gt;quoted</p>')).toBe('\\>quoted');
  });
});

describe('the characters that are always markup', () => {
  it('still escapes emphasis and code marks wherever they appear', () => {
    expect(md('<p>a * b _ c ` d</p>')).toBe('a \\* b \\_ c \\` d');
  });

  it('still escapes brackets, which would otherwise start a link', () => {
    expect(md('<p>[not a link]</p>')).toBe('\\[not a link\\]');
  });
});
