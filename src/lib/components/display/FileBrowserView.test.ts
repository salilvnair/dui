import { describe, it, expect } from 'vitest';
import { formatSize } from './FileBrowserView';

describe('formatSize', () => {
  it('keeps bytes whole, because a fraction of a byte is not a thing', () => {
    expect(formatSize(0)).toBe('0 B');
    expect(formatSize(812)).toBe('812 B');
  });

  it('holds three significant figures, so a column lines up', () => {
    /*
      The reason for the `< 10` branch: `4.2 MB` and `142 MB` are both three
      figures and the same width, while `4.20 MB` next to `142.00 MB` is a
      ragged column that has to be read rather than scanned.
    */
    expect(formatSize(4404019)).toBe('4.2 MB');
    expect(formatSize(148 * 1024 * 1024)).toBe('148 MB');
  });

  it('climbs units rather than printing an unreadable number', () => {
    expect(formatSize(1024)).toBe('1.0 KB');
    expect(formatSize(1.4 * 1024 ** 3)).toBe('1.4 GB');
    expect(formatSize(3 * 1024 ** 4)).toBe('3.0 TB');
  });

  it('says nothing when there is nothing to say', () => {
    // A folder has no meaningful size, and `0 B` would be a claim.
    expect(formatSize(undefined)).toBe('—');
  });

  it('stops at the largest unit it knows instead of running off the end', () => {
    expect(formatSize(5 * 1024 ** 5)).toMatch(/TB$/);
  });
});
