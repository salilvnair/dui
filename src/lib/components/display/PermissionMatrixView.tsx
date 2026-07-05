import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useTableBase } from '../../core/TableBase';
import { CheckIcon } from '../../../icons';

export interface PermissionMatrixViewProps {
  roles: string[];
  permissions: string[];
  /** `matrix[roleIdx][permissionIdx]` */
  matrix: boolean[][];
  onChange: (roleIdx: number, permissionIdx: number, value: boolean) => void;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Role × permission checkbox grid. */
export function PermissionMatrixView({
  roles,
  permissions,
  matrix,
  onChange,
  size,
  color,
  className = '',
  style,
}: PermissionMatrixViewProps) {
  const base = useTableBase(size, { color });
  const accent = color ?? 'var(--color-primary)';

  return (
    <div className={className} style={{ overflowX: 'auto', ...style }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: `6px ${base.paddingX}`, fontSize: base.headerFontSize, color: 'var(--color-text-muted)', textTransform: 'uppercase' }} />
            {roles.map(r => (
              <th key={r} style={{ padding: `6px ${base.paddingX}`, fontSize: base.headerFontSize, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', textAlign: 'center' }}>{r}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {permissions.map((perm, pi) => (
            <tr key={perm}>
              <td style={{ padding: `6px ${base.paddingX}`, fontSize: base.cellFontSize, color: 'var(--color-text-primary)', borderTop: '1px solid var(--color-surface-border)' }}>{perm}</td>
              {roles.map((_, ri) => (
                <td key={ri} style={{ padding: `6px ${base.paddingX}`, textAlign: 'center', borderTop: '1px solid var(--color-surface-border)' }}>
                  <button
                    type="button"
                    onClick={() => onChange(ri, pi, !matrix[ri]?.[pi])}
                    style={{
                      width: 18, height: 18, borderRadius: 4, cursor: 'pointer', boxSizing: 'border-box',
                      border: matrix[ri]?.[pi] ? '1.5px solid transparent' : '1.5px solid var(--color-surface-border)',
                      background: matrix[ri]?.[pi] ? accent : 'transparent',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                    }}
                  >
                    {matrix[ri]?.[pi] && <CheckIcon size={11} />}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
