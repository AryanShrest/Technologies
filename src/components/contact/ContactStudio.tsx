'use client'

import type { FormEvent } from 'react'
import { useRef, useState } from 'react'

import { Reveal, StaggerGroup } from '@/components/motion'
import { Button, SectionHeading } from '@/components/ui'
import { siteSettings } from '@/content/site'

const inquiryTypes = [
  'New website or redesign',
  'Custom software',
  'Mobile application',
  'Digital growth',
  'Cloud and hosting',
  'Something else',
] as const

type Brief = {
  budget: string
  email: string
  inquiry: string
  message: string
  name: string
}

const budgetRanges = [
  'Not sure yet',
  'Let’s discuss',
  'Under NPR 100,000',
  'NPR 100,000–300,000',
  'NPR 300,000–750,000',
  'NPR 750,000+',
] as const

const emptyBrief: Brief = {
  budget: '',
  email: '',
  inquiry: inquiryTypes[0],
  message: '',
  name: '',
}

type SubmissionState = 'error' | 'idle' | 'sending' | 'success'

function MailIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      <path
        d="m3 7 7.8 5.2a2.2 2.2 0 0 0 2.4 0L21 7M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M8.5 3.5 11 8 8.7 9.8a15.5 15.5 0 0 0 5.5 5.5L16 13l4.5 2.5v3a2 2 0 0 1-2 2A15 15 0 0 1 3.5 5.5a2 2 0 0 1 2-2h3Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
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

export function ContactStudio({ initialInquiry }: { initialInquiry?: string }) {
  const [brief, setBrief] = useState<Brief>({
    ...emptyBrief,
    inquiry: inquiryTypes.includes(initialInquiry as (typeof inquiryTypes)[number])
      ? (initialInquiry as (typeof inquiryTypes)[number])
      : emptyBrief.inquiry,
  })
  const [submission, setSubmission] = useState<SubmissionState>('idle')
  const [feedback, setFeedback] = useState('')
  const startedAt = useRef(Date.now())

  function updateBrief(field: keyof Brief, value: string) {
    setSubmission('idle')
    setFeedback('')
    setBrief((current) => ({ ...current, [field]: value }))
  }

  async function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setSubmission('sending')
    setFeedback('')

    try {
      const response = await fetch('/api/contact', {
        body: JSON.stringify({
          ...brief,
          startedAt: startedAt.current,
          website: data.get('website'),
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const result = (await response.json().catch(() => null)) as {
        message?: string
        reference?: string
      } | null
      if (!response.ok) throw new Error(result?.message || 'Your message could not be delivered.')

      setSubmission('success')
      setFeedback(
        `Thanks—your project brief is safely recorded${result?.reference ? ` as #${result.reference}` : ''}. We’ll be in touch.`,
      )
      setBrief(emptyBrief)
      startedAt.current = Date.now()
      form.reset()
    } catch (error) {
      setSubmission('error')
      setFeedback(
        error instanceof Error
          ? error.message
          : 'Your message could not be delivered. Please email or call us directly.',
      )
    }
  }

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="absolute -left-40 top-20 size-[32rem] rounded-full bg-blue-100/60 blur-3xl"
      />
      <div className="site-container relative">
        <Reveal>
          <SectionHeading
            description="Choose the quickest channel or shape your idea into a clear project brief. Your message is securely delivered to the CoreCraft team."
            eyebrow="Talk to the people who build"
            title="A good project starts with a useful conversation"
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1" interval={90}>
              <a
                className="motion-card group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                href={`mailto:${siteSettings.contact.email}`}
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-brand">
                  <MailIcon />
                </span>
                <h2 className="mt-5 text-lg font-bold text-ink-heading">Email the team</h2>
                <p className="mt-1 break-all text-sm text-ink-body">{siteSettings.contact.email}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                  Write an email <ArrowIcon />
                </span>
              </a>
              <a
                className="motion-card group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                href={siteSettings.contact.phoneHref}
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-brand">
                  <PhoneIcon />
                </span>
                <h2 className="mt-5 text-lg font-bold text-ink-heading">Call directly</h2>
                <p className="mt-1 text-sm text-ink-body">{siteSettings.contact.phoneDisplay}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                  Start a call <ArrowIcon />
                </span>
              </a>
              <div className="motion-card rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:col-span-2 lg:col-span-1">
                <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-brand">
                  <PinIcon />
                </span>
                <h2 className="mt-5 text-lg font-bold text-ink-heading">Visit or call us</h2>
                <p className="mt-1 text-sm text-ink-body">{siteSettings.contact.address}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {siteSettings.openingHours}
                </p>
              </div>
            </StaggerGroup>
          </div>

          <Reveal
            className="relative overflow-hidden rounded-[2rem] bg-[#111f4d] p-6 text-white shadow-2xl shadow-blue-950/20 sm:p-8 lg:p-10"
            delay={120}
            variant="fade-left"
          >
            <div aria-hidden="true" className="page-banner-grid absolute inset-0 opacity-15" />
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 size-64 rounded-full bg-blue-400/20 blur-3xl"
            />
            <form className="relative" onSubmit={submitBrief}>
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                    Project brief
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                    What are we building?
                  </h2>
                </div>
                <span className="w-fit rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-blue-100">
                  Takes about 2 minutes
                </span>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <label className="contact-field">
                  <span>Your name</span>
                  <input
                    autoComplete="name"
                    name="name"
                    onChange={(event) => updateBrief('name', event.target.value)}
                    placeholder="Full name"
                    required
                    value={brief.name}
                  />
                </label>
                <label className="contact-field">
                  <span>Email address</span>
                  <input
                    autoComplete="email"
                    name="email"
                    onChange={(event) => updateBrief('email', event.target.value)}
                    placeholder="you@company.com"
                    required
                    type="email"
                    value={brief.email}
                  />
                </label>
                <label className="contact-field sm:col-span-2">
                  <span>What can we help with?</span>
                  <select
                    name="inquiry"
                    onChange={(event) => updateBrief('inquiry', event.target.value)}
                    value={brief.inquiry}
                  >
                    {inquiryTypes.map((inquiry) => (
                      <option key={inquiry}>{inquiry}</option>
                    ))}
                  </select>
                </label>
                <label className="contact-field sm:col-span-2">
                  <span>
                    Approximate budget{' '}
                    <span className="font-normal text-blue-100/60">(optional)</span>
                  </span>
                  <select
                    name="budget"
                    onChange={(event) => updateBrief('budget', event.target.value)}
                    value={brief.budget}
                  >
                    <option value="">Select a range</option>
                    {budgetRanges.map((budget) => (
                      <option key={budget}>{budget}</option>
                    ))}
                  </select>
                </label>
                <label className="contact-field sm:col-span-2">
                  <span>Tell us about the outcome you need</span>
                  <textarea
                    minLength={20}
                    name="message"
                    onChange={(event) => updateBrief('message', event.target.value)}
                    placeholder="What should change for your business when this project succeeds?"
                    required
                    rows={6}
                    value={brief.message}
                  />
                </label>
              </div>

              <label className="sr-only" aria-hidden="true">
                Website
                <input autoComplete="off" name="website" tabIndex={-1} type="text" />
              </label>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button
                  endIcon={<ArrowIcon />}
                  loading={submission === 'sending'}
                  size="large"
                  type="submit"
                >
                  {submission === 'sending' ? 'Sending…' : 'Send project brief'}
                </Button>
                <p className="text-xs leading-5 text-blue-100/70">
                  Your details are used only to respond to this inquiry.
                </p>
              </div>

              <div aria-live="polite" className={feedback ? 'mt-6' : 'sr-only'}>
                {feedback && (
                  <div
                    className={`rounded-2xl border p-5 text-sm ${
                      submission === 'success'
                        ? 'border-emerald-300/40 bg-emerald-400/10 text-emerald-50'
                        : 'border-red-300/40 bg-red-400/10 text-red-50'
                    }`}
                    role={submission === 'error' ? 'alert' : 'status'}
                  >
                    {feedback}
                  </div>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
