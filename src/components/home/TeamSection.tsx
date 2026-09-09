'use client'

import { useEffect, useRef } from 'react'

const TEAM = [
  {
    name: 'Aagosh Upreti',
    title: 'Founder & Director',
    bio: "CEO and Director leading CoreCraft's strategic direction, driving business growth, fostering innovation, and building a strong foundation for long-term success.",
    img: '/images/team/Aagosh Upreti .jpeg',
  },
  {
    name: 'Ro Heet',
    title: 'Co-Founder & CEO',
    bio: "Visionary leader driving CoreCraft's mission to deliver world-class digital solutions with a passion for innovation.",
    img: '/images/team/roheet.jpg',
  },
  {
    name: 'Raj Shrestha',
    title: 'Lead Developer',
    bio: 'Full-stack expert who architects robust, scalable web applications with clean code and modern technologies.',
    img: '/images/team/raj.jpg',
  },
  {
    name: 'Aaryan Shrestha',
    title: 'AI Engineer',
    bio: 'Designing intelligent systems with machine learning, LLMs, and AI-driven automation.',
    img: '/images/team/Aaryan.jpg',
  },
]

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.team-card')
    if (!cards) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="team" className="py-10 lg:py-14" style={{ background: 'var(--color-surface-light)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block bg-orange-500 text-white text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 mb-5">
            OUR TEAM
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5" style={{ color: 'var(--color-navy)' }}>
            Our Team
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--color-body)' }}>
            Meet the people behind our work. Our dedicated team brings creativity, expertise, and passion to everything we do.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {TEAM.map((member, i) => (
            <div
              key={member.name}
              className="team-card bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center w-full max-w-sm"
              style={{ transitionDelay: `${(i % 3) * 120}ms`, border: '1px solid var(--color-border)' }}
            >
              <div className="w-36 h-36 rounded-xl overflow-hidden mb-5" style={{ border: '3px solid var(--color-border)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="text-sm font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--color-brand-primary)' }}>
                {member.title}
              </span>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-navy)' }}>{member.name}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-body)' }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
