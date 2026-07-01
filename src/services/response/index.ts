const GROUP_BADGE_COLORS: Record<string, string> = {
  'TypeScript': 'var(--color-method-put)',
  'JavaScript': 'var(--color-warning)',
  'JSON':       'var(--color-success)',
  'Python':     'var(--color-method-head)',
  'JVM':        'var(--color-method-post)',
  'Systems':    'var(--color-error)',
  '.NET':       'var(--color-protocol-mqtt)',
  'Mobile':     'var(--color-method-options)',
};

export const SCHEMA_LANG_OPTIONS: Array<{
  value: string;
  label: string;
  isHeader?: boolean;
  badge?: { label: string; color: string };
}> = [
  { value: 'h-ts',             label: 'TypeScript',              isHeader: true },
  { value: 'typescript',       label: 'TypeScript / Interfaces',   badge: { label: 'TS',    color: GROUP_BADGE_COLORS['TypeScript'] } },
  { value: 'typescript-zod',   label: 'TypeScript / Zod',          badge: { label: 'ZOD',   color: GROUP_BADGE_COLORS['TypeScript'] } },
  { value: 'h-js',             label: 'JavaScript',              isHeader: true },
  { value: 'javascript',       label: 'JavaScript / JSDoc',         badge: { label: 'JS',    color: GROUP_BADGE_COLORS['JavaScript'] } },
  { value: 'h-json',           label: 'JSON',                    isHeader: true },
  { value: 'json-schema',      label: 'JSON Schema (draft-07)',     badge: { label: 'JSON',  color: GROUP_BADGE_COLORS['JSON']       } },
  { value: 'h-py',             label: 'Python',                  isHeader: true },
  { value: 'python-pydantic',  label: 'Python / Pydantic v2',       badge: { label: 'PY',    color: GROUP_BADGE_COLORS['Python']     } },
  { value: 'python-dataclass', label: 'Python / dataclass',         badge: { label: 'PY',    color: GROUP_BADGE_COLORS['Python']     } },
  { value: 'h-jvm',            label: 'JVM',                     isHeader: true },
  { value: 'java',             label: 'Java / POJO',                badge: { label: 'JAVA',  color: GROUP_BADGE_COLORS['JVM']        } },
  { value: 'kotlin',           label: 'Kotlin / data class',        badge: { label: 'KT',    color: GROUP_BADGE_COLORS['JVM']        } },
  { value: 'h-sys',            label: 'Systems',                 isHeader: true },
  { value: 'go',               label: 'Go / struct',                badge: { label: 'GO',    color: GROUP_BADGE_COLORS['Systems']    } },
  { value: 'rust',             label: 'Rust / serde',               badge: { label: 'RS',    color: GROUP_BADGE_COLORS['Systems']    } },
  { value: 'h-net',            label: '.NET',                    isHeader: true },
  { value: 'csharp',           label: 'C# / record',                badge: { label: 'CS',    color: GROUP_BADGE_COLORS['.NET']       } },
  { value: 'h-mobile',         label: 'Mobile',                  isHeader: true },
  { value: 'swift',            label: 'Swift / Codable',             badge: { label: 'SWIFT', color: GROUP_BADGE_COLORS['Mobile']     } },
];
