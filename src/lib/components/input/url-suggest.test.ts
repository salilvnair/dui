import { describe, it, expect } from 'vitest';
import { suggestFor, prefixAt, matchRank } from './url-suggest';

const HISTORY = [
  'https://azp.prod.com/xyz/abc',
  'http://localhost:8080/api',
  'http://localhost:3000',
  'https://api.github.com/repos',
];

describe('suggesting while the field is being edited', () => {
  it('matches on what is left of the caret, not the whole value', () => {
    /*
      The bug. Caret after `http`, the rest of a real URL still to the right.
      The old filter looked for a history entry containing the entire string
      and found none, so a field mid-edit showed nothing at all.
    */
    const value = 'http://azp.prod.com/xyz/abc';
    const { matches } = suggestFor(value, 4, HISTORY);
    expect(matches).toContain('http://localhost:8080/api');
    expect(matches).toContain('http://localhost:3000');
  });

  it('puts what starts with the prefix ahead of what merely contains it', () => {
    const { matches } = suggestFor('localhost', 9, HISTORY);
    // Nothing STARTS with `localhost`, so both contain-matches still show.
    expect(matches).toEqual(['http://localhost:8080/api', 'http://localhost:3000']);

    const ordered = suggestFor('http://l', 8, [
      'https://elsewhere.com/http://localhost',
      'http://localhost:3000',
    ]);
    expect(ordered.matches[0]).toBe('http://localhost:3000');
  });

  it('still lists recent URLs when the field is empty', () => {
    expect(suggestFor('', 0, HISTORY).matches).toEqual(HISTORY);
    expect(suggestFor('   ', 3, HISTORY).matches).toEqual(HISTORY);
  });

  it('offers nothing for a URL already typed in full', () => {
    const { matches, ghost } = suggestFor('http://localhost:3000', 21, HISTORY);
    expect(matches).not.toContain('http://localhost:3000');
    expect(ghost).toBe('');
  });

  it('caps the list', () => {
    const many = Array.from({ length: 30 }, (_, i) => `http://h${i}.test`);
    expect(suggestFor('http', 4, many).matches).toHaveLength(8);
    expect(suggestFor('http', 4, many, 3).matches).toHaveLength(3);
  });

  it('de-duplicates history', () => {
    expect(suggestFor('http', 4, ['http://a', 'http://a', '']).matches).toEqual(['http://a']);
  });

  it('copes with no history at all', () => {
    expect(suggestFor('http', 4, [])).toEqual({ ghost: '', matches: [] });
  });
});

describe('the greyed completion', () => {
  it('completes what is being typed', () => {
    expect(suggestFor('http://localhost:8', 18, HISTORY).ghost).toBe('080/api');
  });

  it('is the tail of the first prefix match, so it can only produce a known URL', () => {
    const { ghost, matches } = suggestFor('http://local', 12, HISTORY);
    expect(matches[0]).toBe('http://localhost:8080/api');
    expect('http://local' + ghost).toBe(matches[0]);
  });

  it('stays away when the caret is not at the end', () => {
    // It is drawn at the end of the line, so mid-string it would appear past
    // a tail the reader can still see.
    const value = 'http://localhost:3';
    expect(suggestFor(value, value.length, HISTORY).ghost).toBe('000');
    expect(suggestFor(value, 4, HISTORY).ghost).toBe('');
  });

  it('stays away from a value holding a variable', () => {
    // The editor draws {{host}} as a chip and the measuring copy draws it as
    // plain text — the ghost would land off the caret.
    const hist = ['{{host}}/api/v1'];
    expect(suggestFor('{{host}}/api', 12, hist).ghost).toBe('');
    expect(suggestFor('{{host}}/api', 12, hist).matches).toEqual(['{{host}}/api/v1']);
  });

  it('is empty when nothing starts that way, even though the list is not', () => {
    const { ghost, matches } = suggestFor('localhost', 9, HISTORY);
    expect(ghost).toBe('');
    expect(matches.length).toBeGreaterThan(0);
  });

  it('ignores case when matching but completes with the stored casing', () => {
    expect(suggestFor('HTTP://LOCAL', 12, ['http://localhost:3000']).ghost).toBe('host:3000');
  });
});

describe('the pieces', () => {
  it('reads the prefix, clamped to the value', () => {
    expect(prefixAt('abcdef', 3)).toBe('abc');
    expect(prefixAt('abc', 99)).toBe('abc');
    expect(prefixAt('abc', -1)).toBe('');
  });

  it('ranks prefix above substring above no match', () => {
    expect(matchRank('http://a', 'http')).toBe(0);
    expect(matchRank('x/http://a', 'http')).toBe(1);
    expect(matchRank('nope', 'http')).toBe(-1);
  });
});
