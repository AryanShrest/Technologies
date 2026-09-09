'use client'

import { Container } from '@/components/layout'
import { AnimatedCounter } from '@/components/motion'
import { Button } from '@/components/ui'
import { fallbackHomeContent } from '@/content/home-content'
import type { HeroMedia } from '@/types/home-content'
import { useEffect, useState } from 'react'

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M5 12h14m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

export default function Hero({
  slides = fallbackHomeContent.heroSlides,
}: { slides?: HeroMedia[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 10000)
    return () => clearInterval(timer)
  }, [slides.length])

  function goTo(idx: number) {
    if (idx === current) return
    setCurrent(idx)
  }

  const nextIdx = (current + 1) % slides.length

  return (
    <section
      aria-label="CoreCraft introduction"
      className="relative isolate overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #eef0ff 0%, #e8eaff 30%, #ede8ff 60%, #f0eeff 100%)',
      }}
    >
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #818cf8 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 size-[40rem] rounded-full bg-indigo-400/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-20 size-[30rem] rounded-full bg-indigo-300/15 blur-3xl"
      />

      <Container className="relative py-10 sm:py-12 lg:py-14">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── LEFT COLUMN ── */}
          <div className="max-w-xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm backdrop-blur">
              <span className="size-2 rounded-full bg-indigo-500 animate-pulse" />
              Nepal&apos;s Digital Growth Partner
            </span>

            <h1 className="text-[clamp(2rem,4.5vw,3.4rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-900">
              We build software that <span className="text-indigo-600">moves your business</span>{' '}
              forward.
            </h1>

            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg max-w-lg">
              CoreCraft is a full-service digital agency in Kathmandu. We design and build custom
              web apps, mobile apps, and e-commerce platforms that help businesses in Nepal and
              beyond scale with confidence.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                className="bg-indigo-600 text-white shadow-lg shadow-indigo-300/40 hover:bg-indigo-700"
                endIcon={<ArrowIcon />}
                href="/contact"
                size="large"
              >
                Get a Free Consultation
              </Button>
              <Button
                className="border border-slate-200 bg-white text-slate-800 shadow-sm hover:bg-slate-50 whitespace-nowrap"
                href="/#portfolio"
                size="large"
                startIcon={<PlayIcon />}
                variant="secondary"
              >
                View Our Work
              </Button>
            </div>
          </div>

          {/* ── RIGHT COLUMN — Dual Image Slideshow ── */}
          <div className="relative mx-auto w-full max-w-[32rem] h-[400px] lg:h-[440px]">
            {/* Card 1 — large, top-left */}
            <div className="absolute left-0 top-0 w-[80%] h-[75%] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border-4 border-white">
              {slides.map((slide, i) => (
                <div
                  key={slide.id}
                  className="absolute inset-0"
                  style={{
                    opacity: i === current ? 1 : 0,
                    transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1)',
                    zIndex: i === current ? 1 : 0,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.imageUrl}
                    alt={slide.altText}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              ))}
              <div className="absolute bottom-3 left-3 z-10 rounded-xl bg-white/90 backdrop-blur px-3 py-2 shadow">
                <div
                  className="text-xs font-bold text-slate-800"
                  style={{ transition: 'opacity 0.4s' }}
                >
                  {slides[current].title}
                </div>
                <div className="text-[10px] text-slate-500">{slides[current].subtitle}</div>
              </div>
            </div>

            {/* Card 2 — small, bottom-right, shows next slide */}
            <div className="absolute bottom-0 right-0 w-[62%] h-[58%] rounded-2xl overflow-hidden shadow-2xl shadow-black/15 border-4 border-white">
              {slides.map((slide, i) => (
                <div
                  key={slide.id}
                  className="absolute inset-0"
                  style={{
                    opacity: i === nextIdx ? 1 : 0,
                    transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1)',
                    zIndex: i === nextIdx ? 1 : 0,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.imageUrl}
                    alt={slide.altText}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              ))}
              <div className="absolute bottom-3 left-3 z-10 rounded-xl bg-white/90 backdrop-blur px-3 py-2 shadow">
                <div className="text-[10px] font-bold text-slate-800">{slides[nextIdx].title}</div>
                <div className="text-[9px] text-slate-500">{slides[nextIdx].subtitle}</div>
              </div>
            </div>

            {/* Stat badge — top right */}
            <div className="absolute -right-4 top-4 z-20 rounded-2xl border border-indigo-100 bg-white px-4 py-3 shadow-xl">
              <div className="text-[11px] text-slate-500 mb-0.5">Projects Done</div>
              <div className="text-lg font-extrabold text-slate-900 leading-none">
                <AnimatedCounter value={120} suffix="+" duration={1400} />
              </div>
              <div className="text-[10px] text-indigo-500 mt-0.5 font-medium">
                Delivered on time
              </div>
            </div>

            {/* Stat badge — bottom left */}
            <div className="absolute -left-4 bottom-12 z-20 rounded-2xl border border-green-100 bg-white px-4 py-3 shadow-xl">
              <div className="text-[11px] text-slate-500 mb-0.5">Client Retention</div>
              <div className="text-lg font-extrabold text-slate-900 leading-none">
                <AnimatedCounter value={98} suffix="%" duration={1400} />
              </div>
              <div className="text-[10px] text-green-500 mt-0.5 font-medium">
                Clients keep coming back
              </div>
            </div>

            {/* Dot indicators */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => goTo(i)}
                  type="button"
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-6 h-2 bg-indigo-600'
                      : 'w-2 h-2 bg-indigo-200 hover:bg-indigo-400'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── STATS BAR ── */}
        <div className="mt-14 grid grid-cols-2 gap-6 rounded-2xl border border-indigo-100 bg-white/60 px-8 py-8 shadow-sm backdrop-blur md:grid-cols-4">
          {[
            { value: 120, suffix: '+', label: 'Projects Delivered' },
            { value: 45, suffix: '+', label: 'Happy Clients' },
            { value: 6, suffix: '', label: 'Years in Business' },
            { value: 15, suffix: '', label: 'Team Members' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold leading-none tracking-tight text-indigo-600">
                <AnimatedCounter duration={1600} suffix={stat.suffix} value={stat.value} />
              </div>
              <div className="mt-2 text-sm font-medium text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
