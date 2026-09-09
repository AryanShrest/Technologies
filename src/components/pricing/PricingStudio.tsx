'use client'

import { useState } from 'react'

import { Reveal, StaggerGroup } from '@/components/motion'
import { Button, SectionHeading } from '@/components/ui'
import { cn } from '@/utils/format'

type Goal = 'grow' | 'launch' | 'transform'

const goals: readonly { id: Goal; label: string; prompt: string }[] = [
  {
    id: 'launch',
    label: 'Launch something new',
    prompt: 'A focused path from idea to a confident first release.',
  },
  {
    id: 'grow',
    label: 'Grow what exists',
    prompt: 'Improve conversion, capability, performance, and reach.',
  },
  {
    id: 'transform',
    label: 'Transform operations',
    prompt: 'Connect systems and replace manual work with durable software.',
  },
]

const plans = [
  {
    accent: 'from-sky-400 to-blue-600',
    description: 'For a focused website, campaign, prototype, or first digital product.',
    features: [
      'Discovery workshop',
      'Focused scope and roadmap',
      'Design and development',
      'Launch readiness review',
    ],
    goal: 'launch' as Goal,
    id: 'launch-sprint',
    name: 'Launch Sprint',
    timeline: 'Focused delivery',
  },
  {
    accent: 'from-blue-500 to-indigo-600',
    description: 'For businesses ready to strengthen an existing platform and accelerate growth.',
    features: [
      'Experience and technical audit',
      'Prioritized growth roadmap',
      'Iterative product delivery',
      'Measurement and optimization',
    ],
    goal: 'grow' as Goal,
    id: 'growth-partnership',
    name: 'Growth Partnership',
    timeline: 'Ongoing collaboration',
  },
  {
    accent: 'from-violet-500 to-blue-700',
    description: 'For custom software, connected workflows, and complex digital transformation.',
    features: [
      'Stakeholder discovery',
      'Solution architecture',
      'Phased implementation',
      'Enablement and long-term support',
    ],
    goal: 'transform' as Goal,
    id: 'digital-transformation',
    name: 'Digital Transformation',
    timeline: 'Phased program',
  },
] as const

const comparisonRows = [
  ['Strategy and discovery', 'Focused', 'Continuous', 'Organization-wide'],
  ['Design and engineering', 'Included', 'Included', 'Included'],
  ['Delivery model', 'Defined scope', 'Iterative roadmap', 'Phased program'],
  ['Best fit', 'New launch', 'Existing platform', 'Complex operations'],
] as const

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 20 20">
      <path
        d="m4 10 4 4 8-8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 20 20">
      <path
        d="M4 10h12m-4-4 4 4-4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export function PricingStudio() {
  const [goal, setGoal] = useState<Goal>('grow')
  const [comparisonOpen, setComparisonOpen] = useState(false)
  const recommendation = plans.find((plan) => plan.goal === goal) ?? plans[1]

  return (
    <>
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-10 size-[34rem] -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl"
        />
        <div className="site-container relative">
          <Reveal>
            <SectionHeading
              align="center"
              description="Choose the kind of partnership you need. Every engagement is scoped around outcomes, complexity, and the team required—never a made-up one-size-fits-all price."
              eyebrow="Clear paths, tailored proposals"
              title="Start with the outcome, not a package price"
            />
          </Reveal>

          <Reveal className="mx-auto mt-10 max-w-4xl" delay={100}>
            <fieldset className="rounded-3xl border border-blue-100 bg-blue-50/70 p-2 shadow-sm">
              <legend className="sr-only">What are you trying to achieve?</legend>
              <div className="grid gap-2 md:grid-cols-3">
                {goals.map((option) => (
                  <label
                    className={cn(
                      'cursor-pointer rounded-2xl border px-5 py-4 transition-[border-color,background-color,box-shadow,transform] duration-[var(--motion-hover)]',
                      goal === option.id
                        ? 'border-brand bg-white shadow-lg shadow-blue-900/10'
                        : 'border-transparent hover:border-blue-200 hover:bg-white/70',
                    )}
                    key={option.id}
                  >
                    <input
                      className="sr-only"
                      name="project-goal"
                      onChange={() => setGoal(option.id)}
                      type="radio"
                      value={option.id}
                      checked={goal === option.id}
                    />
                    <span className="block font-heading text-base font-bold text-ink-heading">
                      {option.label}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-ink-body">
                      {option.prompt}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <p aria-live="polite" className="mt-4 text-center text-sm text-ink-body">
              Recommended path: <strong className="text-ink-heading">{recommendation.name}</strong>
            </p>
          </Reveal>

          <StaggerGroup className="mt-12 grid gap-6 lg:grid-cols-3" interval={100}>
            {plans.map((plan) => {
              const recommended = plan.id === recommendation.id
              return (
                <article
                  className={cn(
                    'motion-card relative flex min-h-full flex-col overflow-hidden rounded-[2rem] border bg-white p-7 shadow-sm sm:p-8',
                    recommended
                      ? 'border-brand shadow-xl shadow-blue-900/10 ring-1 ring-brand'
                      : 'border-slate-200',
                  )}
                  key={plan.id}
                >
                  <div
                    aria-hidden="true"
                    className={cn('absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r', plan.accent)}
                  />
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                        {plan.timeline}
                      </p>
                      <h2 className="mt-3 text-2xl font-extrabold text-ink-heading">{plan.name}</h2>
                    </div>
                    {recommended && (
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-brand">
                        Best fit
                      </span>
                    )}
                  </div>
                  <p className="mt-5 min-h-20 text-sm leading-7 text-ink-body">
                    {plan.description}
                  </p>
                  <div className="my-6 border-y border-slate-100 py-5">
                    <span className="block text-2xl font-extrabold text-ink-heading">
                      Custom proposal
                    </span>
                    <span className="text-sm text-ink-body">
                      Scoped after a project conversation
                    </span>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-700">
                    {plan.features.map((feature) => (
                      <li className="flex gap-3" key={feature}>
                        <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-blue-50 text-brand">
                          <CheckIcon />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-8"
                    endIcon={<ArrowIcon />}
                    fullWidth
                    href={`/contact?path=${plan.id}`}
                    variant={recommended ? 'primary' : 'secondary'}
                  >
                    Discuss this path
                  </Button>
                </article>
              )
            })}
          </StaggerGroup>

          <Reveal className="mt-12 text-center">
            <button
              aria-controls="pricing-comparison"
              aria-expanded={comparisonOpen}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-ink-heading shadow-sm transition-colors hover:border-brand hover:text-brand"
              onClick={() => setComparisonOpen((open) => !open)}
              type="button"
            >
              {comparisonOpen ? 'Hide comparison' : 'Compare engagement paths'}
              <span
                aria-hidden="true"
                className={cn('transition-transform', comparisonOpen && 'rotate-180')}
              >
                ⌄
              </span>
            </button>
          </Reveal>

          <div
            aria-hidden={!comparisonOpen}
            className={cn(
              'grid transition-[grid-template-rows,opacity] duration-[var(--motion-reveal)]',
              comparisonOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
            )}
            id="pricing-comparison"
          >
            <div className="overflow-hidden">
              <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
                  <caption className="sr-only">Comparison of CoreCraft engagement paths</caption>
                  <thead className="bg-slate-50 text-ink-heading">
                    <tr>
                      <th className="p-5">Engagement detail</th>
                      {plans.map((plan) => (
                        <th className="p-5" key={plan.id}>
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr className="border-t border-slate-100" key={row[0]}>
                        {row.map((cell, index) =>
                          index === 0 ? (
                            <th className="p-5 font-semibold text-ink-heading" key={cell}>
                              {cell}
                            </th>
                          ) : (
                            <td className="p-5 text-ink-body" key={cell}>
                              {cell}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#111f4d] py-20 text-white">
        <div aria-hidden="true" className="page-banner-grid absolute inset-0 opacity-20" />
        <Reveal className="site-container relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              Still deciding?
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Bring us the messy version of your idea.
            </h2>
            <p className="mt-4 text-blue-100/80">
              We’ll help clarify the right scope before proposing an engagement.
            </p>
          </div>
          <Button className="shrink-0" endIcon={<ArrowIcon />} href="/contact" size="large">
            Start a conversation
          </Button>
        </Reveal>
      </section>
    </>
  )
}
