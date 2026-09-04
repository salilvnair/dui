import { describe, it, expect } from 'vitest';
import { splitPath } from './PathBreadcrumbView';

describe('splitPath', () => {
  it('gives every segment a path that addresses a real directory', () => {
    // The point of the split: each label is a jump target, so its path has to
    // be the absolute prefix up to and including it — not the segment alone.
    expect(splitPath('/var/lib/app')).toEqual([
      { label: '/', path: '/' },
      { label: 'var', path: '/var' },
      { label: 'lib', path: '/var/lib' },
      { label: 'app', path: '/var/lib/app' },
    ]);
  });

  it('gives the root a single segment', () => {
    expect(splitPath('/')).toEqual([{ label: '/', path: '/' }]);
  });

  it('ignores a trailing slash rather than emitting an empty segment', () => {
    // `/var/lib/` and `/var/lib` are the same directory, and an empty crumb
    // between two chevrons is a control that navigates nowhere.
    expect(splitPath('/var/lib/')).toEqual(splitPath('/var/lib'));
  });

  it('collapses repeated slashes, which a typed path often has', () => {
    expect(splitPath('/var//lib')).toEqual(splitPath('/var/lib'));
  });

  it('takes a root label without changing where the root points', () => {
    // A share or drive name is a display concern; the path stays `/`.
    const [root] = splitPath('/data', 'pvc');
    expect(root).toEqual({ label: 'pvc', path: '/' });
  });

  it('keeps a segment containing a space intact', () => {
    const segs = splitPath('/data/quarterly report');
    expect(segs[segs.length - 1]).toEqual({
      label: 'quarterly report', path: '/data/quarterly report',
    });
  });
});
