import { CarouselView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

function slideBox(text: string, bg: string) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: bg, color: '#fff', fontSize: 14, fontWeight: 700, borderRadius: 8 }}>
      {text}
    </div>
  );
}

export function CarouselViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Basic Carousel"
        description="Swipe or drag to navigate between slides; dot indicators show position"
        code={`<CarouselView slides={[<div key="1">Slide 1</div>, <div key="2">Slide 2</div>]} autoplay />`}
      >
        <CarouselView
          slides={[
            slideBox('Slide 1', 'var(--color-primary)'),
            slideBox('Slide 2', 'var(--color-info)'),
            slideBox('Slide 3', 'var(--color-success)'),
          ]}
          height={140}
        />
      </ExampleCard>

      <ExampleCard
        title="Autoplay (pauses on hover)"
        description="Set autoplay to cycle through slides automatically; hovering pauses the timer"
        code={`<CarouselView
  slides={[<div key="1">Feature A</div>, <div key="2">Feature B</div>, <div key="3">Feature C</div>]}
  autoplay
  autoplayInterval={2500}
  color="var(--color-warning)"
/>`}
      >
        <CarouselView
          slides={[
            slideBox('Feature A', 'var(--color-warning)'),
            slideBox('Feature B', '#a855f7'),
            slideBox('Feature C', 'var(--color-error)'),
          ]}
          autoplay
          autoplayInterval={2500}
          color="var(--color-warning)"
          height={140}
        />
      </ExampleCard>

      <ExampleCard
        title="Onboarding Tips Carousel (domain use case)"
        description="Walk a new user through key API-testing features on first login"
        code={`<CarouselView
  slides={[
    <div key="1">💡 Create your first collection to group related requests.</div>,
    <div key="2">🔑 Add environments to swap base URLs and secrets per stage.</div>,
    <div key="3">🔔 Set up webhook mocks to test event-driven flows locally.</div>,
  ]}
  autoplay
  autoplayInterval={4000}
/>`}
      >
        <CarouselView
          slides={[
            <div key="1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 16, textAlign: 'center', fontSize: 13, color: 'var(--color-text-primary)', background: 'var(--color-surface)', border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>Create your first collection to group related requests.</div>,
            <div key="2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 16, textAlign: 'center', fontSize: 13, color: 'var(--color-text-primary)', background: 'var(--color-surface)', border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>Add environments to swap base URLs and secrets per stage.</div>,
            <div key="3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 16, textAlign: 'center', fontSize: 13, color: 'var(--color-text-primary)', background: 'var(--color-surface)', border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>Set up webhook mocks to test event-driven flows locally.</div>,
          ]}
          autoplay
          autoplayInterval={4000}
          height={110}
        />
      </ExampleCard>

      <ExampleCard
        title="Custom Height"
        description="Tune the slide track height for banner-style or compact contexts"
        code={`<CarouselView slides={slides} height={90} />`}
      >
        <CarouselView slides={[slideBox('Compact A', 'var(--color-protocol-graphql)'), slideBox('Compact B', 'var(--color-protocol-grpc)')]} height={90} />
      </ExampleCard>

      <ExampleCard
        title="Single Slide (edge case)"
        description="With only one slide, dot indicators are hidden entirely and swiping has no effect"
        code={`<CarouselView slides={[<div key="1">Only slide</div>]} />`}
      >
        <CarouselView slides={[slideBox('Only slide', 'var(--color-text-muted)')]} height={100} />
      </ExampleCard>
    </div>
  );
}
