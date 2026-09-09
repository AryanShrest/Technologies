import { Fragment } from 'react'

const STEPS = [
  {
    num: '01',
    title: 'Discover',
    time: 'Week 1–2',
    desc: 'Deep dive into your business, user needs, and project goals to understand the problem before writing a single line of code.',
    icon: (
      <svg
        aria-hidden="true"
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Plan',
    time: 'Week 2–3',
    desc: 'Mapping out system architecture, design systems, and timelines with clear milestones so everyone stays aligned.',
    icon: (
      <svg
        aria-hidden="true"
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Develop',
    time: 'Week 3–12',
    desc: 'Built in two-week sprints with weekly demos so you can see progress and course-correct early if needed.',
    icon: (
      <svg
        aria-hidden="true"
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Deliver',
    time: 'Launch & beyond',
    desc: 'We launch, monitor, and optimise — then stay on for ongoing support, iterations, and new feature rollouts.',
    icon: (
      <svg
        aria-hidden="true"
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
]

function ArrowRight() {
  return (
    <div className="hidden lg:flex items-center justify-center flex-shrink-0 -mx-2 z-10">
      <div className="flex items-center justify-center size-8 rounded-full bg-indigo-100 border border-indigo-200">
        <svg aria-hidden="true" className="size-4 text-indigo-600" fill="none" viewBox="0 0 24 24">
          <path
            d="M5 12h14m-5-5 5 5-5 5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  )
}

export default function HowWeWork() {
  return (
    <section className="py-10 lg:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-indigo-600 text-white text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded mb-5">
            HOW WE WORK
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            A proven process, built for results
          </h2>
          <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            No surprises, no guesswork. Our four-step approach keeps you informed and involved from
            day one.
          </p>
        </div>

        {/* Cards row */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0">
          {STEPS.map((step, i) => (
            <Fragment key={step.num}>
              <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-9 flex flex-col gap-5 hover:shadow-md hover:border-indigo-200 transition-all duration-300">
                {/* Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-black text-slate-100 select-none">{step.num}</span>
                </div>

                {/* Title + time */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                  <span className="inline-block mt-1 text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                    {step.time}
                  </span>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>

              {i < STEPS.length - 1 && <ArrowRight />}
            </Fragment>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors"
          >
            Start your project today
            <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
              <path
                d="M5 12h14m-5-5 5 5-5 5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
