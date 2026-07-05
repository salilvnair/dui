import type { CSSProperties } from 'react';
import { AccordionGroupView, type AccordionGroupItem } from './AccordionGroupView';

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

export interface FaqAccordionViewProps {
  faqs: FaqEntry[];
  /** Allow multiple questions open at once. Default false. */
  multiple?: boolean;
  accentColor?: string;
  className?: string;
  style?: CSSProperties;
}

/** Pre-styled Q&A accordion, built directly on `AccordionGroupView`/`CollapsibleSectionView`. */
export function FaqAccordionView({
  faqs,
  multiple = false,
  accentColor,
  className = '',
  style,
}: FaqAccordionViewProps) {
  const items: AccordionGroupItem[] = faqs.map(f => ({
    id: f.id,
    title: f.question,
    children: <p style={{ margin: 0, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{f.answer}</p>,
  }));

  return <AccordionGroupView items={items} multiple={multiple} accentColor={accentColor} className={className} style={style} />;
}
