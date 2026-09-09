'use client'

import { useState } from 'react'

import { cn } from '@/utils/format'

export type AccordionItem = {
  answer: string
  id: string
  question: string
}

type AccordionProps = {
  allowMultiple?: boolean
  className?: string
  defaultOpenIds?: readonly string[]
  items: readonly AccordionItem[]
}

export function Accordion({
  allowMultiple = false,
  className,
  defaultOpenIds = [],
  items,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState(() => new Set(defaultOpenIds))

  function toggleItem(id: string) {
    setOpenIds((current) => {
      if (current.has(id)) {
        const next = new Set(current)
        next.delete(id)
        return next
      }

      return allowMultiple ? new Set([...current, id]) : new Set([id])
    })
  }

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item) => {
        const open = openIds.has(item.id)
        const buttonId = `accordion-button-${item.id}`
        const panelId = `accordion-panel-${item.id}`

        return (
          <div
            className={cn(
              'overflow-hidden rounded-xl border transition-[border-color,background-color,box-shadow] duration-[var(--motion-hover)]',
              open
                ? 'border-brand bg-brand text-white shadow-lg shadow-blue-200/60'
                : 'border-[var(--color-border)] bg-white text-ink-heading',
            )}
            key={item.id}
          >
            <h3>
              <button
                aria-controls={panelId}
                aria-expanded={open}
                className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-heading text-base font-semibold"
                id={buttonId}
                onClick={() => toggleItem(item.id)}
                type="button"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'grid size-8 shrink-0 place-items-center rounded-full transition-[color,background-color,transform] duration-[var(--motion-hover)]',
                    open ? 'rotate-45 bg-white/20 text-white' : 'bg-blue-50 text-brand',
                  )}
                >
                  <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
              </button>
            </h3>

            <section
              aria-hidden={!open}
              aria-labelledby={buttonId}
              className={cn(
                'grid transition-[grid-template-rows] duration-[var(--motion-reveal)] ease-[var(--ease-standard)]',
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
              id={panelId}
            >
              <div className="overflow-hidden">
                <p
                  className={cn(
                    'px-5 pb-5 text-sm leading-7',
                    open ? 'text-white/90' : 'text-ink-body',
                  )}
                >
                  {item.answer}
                </p>
              </div>
            </section>
          </div>
        )
      })}
    </div>
  )
}
