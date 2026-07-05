import { useState, type CSSProperties, type ReactNode } from 'react';
import { CollapsibleSectionView } from './CollapsibleSectionView';

export interface AccordionGroupItem {
  id: string;
  title: string;
  badge?: number;
  children: ReactNode;
}

export interface AccordionGroupViewProps {
  items: AccordionGroupItem[];
  /** Allow more than one section open at once. Default false (single-open, accordion-style). */
  multiple?: boolean;
  defaultOpen?: string[];
  accentColor?: string;
  className?: string;
  style?: CSSProperties;
}

/** Managed single/multi-open accordion group built on `CollapsibleSectionView`. */
export function AccordionGroupView({
  items,
  multiple = false,
  defaultOpen = [],
  accentColor,
  className = '',
  style,
}: AccordionGroupViewProps) {
  const [open, setOpen] = useState<Set<string>>(new Set(defaultOpen));

  const toggle = (id: string) => {
    setOpen(prev => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(id)) { if (multiple) next.delete(id); }
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
      {items.map(item => (
        <CollapsibleSectionView
          key={item.id}
          title={item.title}
          badge={item.badge}
          expanded={open.has(item.id)}
          onToggle={() => toggle(item.id)}
          accentColor={accentColor}
        >
          {item.children}
        </CollapsibleSectionView>
      ))}
    </div>
  );
}
