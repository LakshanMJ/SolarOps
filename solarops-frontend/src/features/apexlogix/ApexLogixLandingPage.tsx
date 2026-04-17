import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Check,
  ChevronDown,
  CloudLightning,
  Database,
  Globe,
  Linkedin,
  Lock,
  Map,
  Play,
  Puzzle,
  Radar,
  Route,
  ShieldCheck,
  Twitter,
} from 'lucide-react'

import './apexlogix.tailwind.css'

type BillingCycle = 'monthly' | 'annual'

const container = 'mx-auto w-full max-w-6xl px-4'

function cn(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ')
}

function Section({
  id,
  children,
  className,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={cn('relative py-16 sm:py-20', className)}>
      <div className={container}>{children}</div>
    </section>
  )
}

function GlowDivider() {
  return (
    <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-[#00A3FF]/40 to-transparent" />
  )
}

function StatPill({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 backdrop-blur">
      <span className="grid size-8 place-items-center rounded-full bg-[#00A3FF]/10 text-[#00A3FF]">
        <Icon className="size-4" />
      </span>
      <span className="text-white/70">{label}</span>
      <span className="ml-auto font-semibold text-white">{value}</span>
    </div>
  )
}

function PrimaryButton({
  children,
  className,
  as = 'button',
  href,
}: {
  children: React.ReactNode
  className?: string
  as?: 'button' | 'a'
  href?: string
}) {
  const shared =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(0,163,255,0.35),0_10px_30px_rgba(0,163,255,0.15)] transition hover:shadow-[0_0_0_1px_rgba(0,163,255,0.6),0_16px_40px_rgba(0,163,255,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3FF]/70'
  const bg = 'bg-[#00A3FF] hover:bg-[#1bb0ff] active:bg-[#0093e6]'

  if (as === 'a') {
    return (
      <a className={cn(shared, bg, className)} href={href}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={cn(shared, bg, className)}>
      {children}
    </button>
  )
}

function GhostButton({
  children,
  href,
  className,
}: {
  children: React.ReactNode
  href: string
  className?: string
}) {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3FF]/50',
        className,
      )}
    >
      {children}
    </a>
  )
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur',
        className,
      )}
    >
      {children}
    </div>
  )
}

function MiniLineChart() {
  return (
    <svg viewBox="0 0 420 140" className="h-28 w-full">
      <defs>
        <linearGradient id="apxLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#00A3FF" stopOpacity="0.25" />
          <stop offset="0.6" stopColor="#00A3FF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#77d5ff" stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id="apxFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#00A3FF" stopOpacity="0.22" />
          <stop offset="1" stopColor="#00A3FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g opacity="0.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={i}
            x1={0}
            y1={20 + i * 20}
            x2={420}
            y2={20 + i * 20}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        ))}
      </g>
      <path
        d="M10,104 C42,62 70,88 98,72 C128,54 150,60 178,48 C210,34 246,56 280,40 C314,24 346,30 410,16 L410,140 L10,140 Z"
        fill="url(#apxFill)"
      />
      <path
        d="M10,104 C42,62 70,88 98,72 C128,54 150,60 178,48 C210,34 246,56 280,40 C314,24 346,30 410,16"
        fill="none"
        stroke="url(#apxLine)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="410" cy="16" r="4.5" fill="#00A3FF" />
    </svg>
  )
}

function MiniBarChart() {
  const bars = [42, 60, 36, 78, 54, 88, 64]
  return (
    <div className="flex h-28 items-end gap-2">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-full rounded-md border border-white/10 bg-gradient-to-b from-[#00A3FF]/35 to-[#00A3FF]/5"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  )
}

function HeaderNav() {
  const links = [
    { label: 'Platform', href: '#platform' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Integrations', href: '#integrations' },
    { label: 'Resources', href: '#resources' },
  ]

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0E14]/70 backdrop-blur">
      <div className={cn(container, 'flex items-center justify-between py-3')}>
        <div className="flex items-center gap-8">
          <a
            href="#top"
            className="text-sm font-extrabold tracking-wide text-white"
            aria-label="ApexLogix"
          >
            Apex<span className="text-[#00A3FF]">Logix</span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-white/70 transition hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#login"
            className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/5 hover:text-white sm:inline-flex"
          >
            Login
          </a>
          <PrimaryButton as="a" href="#demo">
            Request a Demo <ArrowRight className="size-4" />
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <Section className="pt-10 sm:pt-14">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="grid items-center gap-10 lg:grid-cols-2"
      >
        <div>
          <div className="mb-5 flex flex-wrap gap-2">
            <StatPill icon={Radar} label="Forecast accuracy" value="Up to 94%" />
            <StatPill icon={ShieldCheck} label="Security posture" value="Enterprise-ready" />
          </div>

          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            <span className="bg-gradient-to-r from-white to-[#8fe4ff] bg-clip-text text-transparent">
              Master Your Supply Chain.
            </span>{' '}
            <span className="bg-gradient-to-r from-[#00A3FF] to-[#7ad9ff] bg-clip-text text-transparent">
              Anticipate Tomorrow.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/70">
            ApexLogix provides AI-powered predictive intelligence and real-time visibility, transforming your logistics
            network into a competitive advantage.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <PrimaryButton>
              Get a Custom ROI Analysis <ArrowRight className="size-4" />
            </PrimaryButton>
            <GhostButton href="#overview">
              <span className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/[0.03]">
                <Play className="size-4 text-[#00A3FF]" />
              </span>
              Watch Platform Overview
            </GhostButton>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Card className="p-4">
              <div className="text-xs font-semibold text-white/60">Lead time variance</div>
              <div className="mt-1 text-2xl font-extrabold text-white">-18%</div>
              <div className="mt-2 text-xs text-white/50">Predictive ETAs + anomaly signals</div>
            </Card>
            <Card className="p-4">
              <div className="text-xs font-semibold text-white/60">On-time delivery</div>
              <div className="mt-1 text-2xl font-extrabold text-white">+9.6%</div>
              <div className="mt-2 text-xs text-white/50">AI-driven route optimization</div>
            </Card>
            <Card className="p-4">
              <div className="text-xs font-semibold text-white/60">Inventory turns</div>
              <div className="mt-1 text-2xl font-extrabold text-white">+1.4x</div>
              <div className="mt-2 text-xs text-white/50">SKU-level optimization</div>
            </Card>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          <Card className="relative overflow-hidden p-5">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_30%_10%,rgba(0,163,255,0.18),transparent_50%),radial-gradient(500px_circle_at_90%_70%,rgba(119,213,255,0.10),transparent_55%)]" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white/60">Central Ops Dashboard</div>
                  <div className="mt-1 text-base font-bold text-white">Network Pulse</div>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1">
                    <span className="size-1.5 rounded-full bg-[#00A3FF]" />
                    Live
                  </span>
                  <span className="hidden sm:inline">Updated 2m ago</span>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Card className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-xs font-semibold text-white/60">Shipment Tracking</div>
                    <div className="text-xs text-white/45">last 24h</div>
                  </div>
                  <MiniLineChart />
                </Card>

                <Card className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-xs font-semibold text-white/60">Inventory Optimization</div>
                    <div className="text-xs text-white/45">by region</div>
                  </div>
                  <MiniBarChart />
                </Card>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <Card className="p-4 md:col-span-2">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-xl bg-[#00A3FF]/12 text-[#00A3FF]">
                      <CloudLightning className="size-5" />
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-white/60">AI Alert</div>
                      <div className="mt-0.5 text-sm font-bold text-white">
                        Predicted disruption: Weather Advisory — Atlantic Route
                      </div>
                      <div className="mt-1 text-xs text-white/55">
                        Confidence: <span className="font-semibold text-white/80">0.87</span> · Suggested action:{' '}
                        <span className="font-semibold text-white/80">Reroute via NA-East hub</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="text-xs font-semibold text-white/60">Risk index</div>
                  <div className="mt-2 flex items-end justify-between">
                    <div className="text-3xl font-extrabold text-white">72</div>
                    <div className="text-xs text-white/50">↑ 11 today</div>
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#00A3FF] to-[#7ad9ff]" />
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </Section>
  )
}

function LogoMarquee() {
  const logos = ['NEXUS CORP', 'PIONEER LOGISTICS', 'STRATA SUPPLY', 'ORBITAL FREIGHT', 'VANTAGE GROUP', 'NORTHSTAR']
  const repeated = [...logos, ...logos]

  return (
    <Section className="py-10">
      <div className="mb-4 text-center text-xs font-semibold tracking-widest text-white/50">
        Trusted By Global Leaders
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0B0E14] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0B0E14] to-transparent" />

        <div className="animate-[apxMarquee_22s_linear_infinite] whitespace-nowrap py-4">
          {repeated.map((name, idx) => (
            <span
              key={`${name}-${idx}`}
              className="mx-6 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white/35"
            >
              <span className="size-2 rounded-full bg-white/10" />
              {name}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes apxMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </Section>
  )
}

function CapabilityCard({
  icon: Icon,
  title,
  copy,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  copy: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="h-full"
    >
      <Card className="group h-full p-6 transition hover:border-[#00A3FF]/35 hover:bg-white/[0.05]">
        <div className="flex items-start gap-4">
          <span className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-[#00A3FF] shadow-[0_0_0_1px_rgba(0,163,255,0.18)]">
            <Icon className="size-5" />
          </span>
          <div>
            <div className="text-base font-bold text-white">{title}</div>
            <p className="mt-2 text-sm leading-relaxed text-white/65">{copy}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function Capabilities() {
  return (
    <Section id="platform" className="pb-0">
      <div className="mb-10">
        <div className="text-xs font-semibold tracking-widest text-white/50">Key Platform Capabilities</div>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white">
          Predictive supply chain intelligence, built for operators
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
          Minimal, data-driven modules designed to improve service levels while reducing cost-to-serve across your
          network.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <CapabilityCard
          icon={Map}
          title="Real-Time Network Visibility"
          copy="Track every shipment, order, and SKU across your global network in real time."
        />
        <CapabilityCard
          icon={BrainCircuit}
          title="Predictive Disruption Management"
          copy="Anticipate weather delays, port congestion, and supply shortages before they impact your customers."
        />
        <CapabilityCard
          icon={Route}
          title="Advanced Route Optimization"
          copy="Reduce fuel costs and delivery times with dynamic, AI-optimized route planning."
        />
      </div>

      <div className="relative mt-12">
        <GlowDivider />
      </div>
    </Section>
  )
}

function Pricing() {
  const [cycle, setCycle] = useState<BillingCycle>('monthly')

  const plans = useMemo(() => {
    const annual = cycle === 'annual'
    const price = (m: number) => (annual ? Math.round(m * 10.2) : m)
    const suffix = annual ? '/yr' : '/mo'

    return [
      {
        name: 'Growth',
        price: price(1490),
        suffix,
        highlight: false,
        features: ['Shipment visibility dashboards', 'Basic alerting & rules', 'Standard integrations (CSV/API)'],
      },
      {
        name: 'Enterprise',
        price: price(3990),
        suffix,
        highlight: true,
        tag: 'Most Popular',
        features: ['Predictive disruption intelligence', 'Route optimization engine', 'SSO + role-based controls'],
      },
      {
        name: 'Global',
        price: price(7490),
        suffix,
        highlight: false,
        features: ['Multi-region optimization', 'Dedicated success program', 'Custom data models + SLAs'],
      },
    ] as const
  }, [cycle])

  return (
    <Section id="solutions">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <div className="text-xs font-semibold tracking-widest text-white/50">Pricing</div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white">
            Scalable Solutions for Global Networks.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
            Simple tiers that map to operational maturity—from visibility to full predictive optimization.
          </p>
        </div>

        <div className="relative inline-flex items-center rounded-2xl border border-white/10 bg-white/[0.04] p-1">
          <button
            type="button"
            onClick={() => setCycle('monthly')}
            className={cn(
              'relative z-10 rounded-xl px-4 py-2 text-sm font-semibold transition',
              cycle === 'monthly' ? 'text-white' : 'text-white/55 hover:text-white/80',
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setCycle('annual')}
            className={cn(
              'relative z-10 rounded-xl px-4 py-2 text-sm font-semibold transition',
              cycle === 'annual' ? 'text-white' : 'text-white/55 hover:text-white/80',
            )}
          >
            Annual
          </button>
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 480, damping: 34 }}
            className={cn(
              'absolute inset-y-1 w-[calc(50%-4px)] rounded-xl bg-white/5 shadow-[0_0_0_1px_rgba(0,163,255,0.22)]',
              cycle === 'monthly' ? 'left-1' : 'left-[calc(50%+2px)]',
            )}
          />
        </div>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {plans.map((p) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full"
          >
            <Card
              className={cn(
                'relative h-full p-6',
                p.highlight && 'border-[#00A3FF]/45 shadow-[0_0_0_1px_rgba(0,163,255,0.2),0_30px_70px_rgba(0,163,255,0.08)]',
              )}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-6 inline-flex items-center gap-2 rounded-full border border-[#00A3FF]/35 bg-[#00A3FF]/10 px-3 py-1 text-xs font-semibold text-[#7ad9ff]">
                  <span className="size-1.5 rounded-full bg-[#00A3FF]" />
                  {p.tag}
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-white">{p.name}</div>
                <Globe className="size-4 text-white/35" />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <div className="text-4xl font-extrabold tracking-tight text-white">${p.price.toLocaleString()}</div>
                <div className="text-sm font-semibold text-white/50">{p.suffix}</div>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-white/70">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-0.5 grid size-5 place-items-center rounded-md bg-[#00A3FF]/10 text-[#00A3FF]">
                      <Check className="size-4" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <PrimaryButton className="w-full">
                  Request a Demo <ArrowRight className="size-4" />
                </PrimaryButton>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function FAQ() {
  const items = [
    {
      q: 'How fast can we onboard data sources?',
      a: 'Most teams connect core ERP/WMS/TMS and carrier feeds in 2–6 weeks. We support API, SFTP, and file-based ingestion with validation and monitoring.',
    },
    {
      q: 'How do you handle data security and access control?',
      a: 'ApexLogix is designed for enterprise security: role-based access, audit trails, encryption in transit and at rest, and SSO options depending on tier.',
    },
    {
      q: 'Will your AI recommendations be explainable to our operators?',
      a: 'Yes. Each alert and recommendation includes confidence signals and the contributing factors so teams can make fast, defensible decisions.',
    },
  ] as const

  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <Section id="resources" className="pb-0">
      <div className="mb-10">
        <div className="text-xs font-semibold tracking-widest text-white/50">FAQ</div>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white">Answers for enterprise teams</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
          Straightforward onboarding, secure by design, and built for operational adoption.
        </p>
      </div>

      <div className="space-y-3">
        {items.map((it, idx) => {
          const open = openIdx === idx
          return (
            <Card key={it.q} className="overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIdx(open ? null : idx)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <div className="text-sm font-bold text-white">{it.q}</div>
                <ChevronDown
                  className={cn('size-5 text-white/50 transition', open && 'rotate-180 text-[#00A3FF]')}
                />
              </button>
              <motion.div
                initial={false}
                animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 text-sm leading-relaxed text-white/65">{it.a}</div>
              </motion.div>
            </Card>
          )
        })}
      </div>

      <div className="relative mt-14">
        <GlowDivider />
      </div>
    </Section>
  )
}

function FinalCTA() {
  return (
    <Section id="demo" className="pt-14">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="relative overflow-hidden rounded-3xl border border-[#00A3FF]/25 bg-white/[0.04] p-8 backdrop-blur">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_20%_0%,rgba(0,163,255,0.18),transparent_55%),radial-gradient(700px_circle_at_90%_80%,rgba(122,217,255,0.12),transparent_60%)]" />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="text-xs font-semibold tracking-widest text-white/55">Next step</div>
              <div className="mt-2 text-2xl font-extrabold tracking-tight text-white">
                Ready to optimize your operations?
              </div>
              <div className="mt-2 max-w-xl text-sm leading-relaxed text-white/65">
                Schedule a platform tour tailored to your lanes, nodes, and service level targets.
              </div>
            </div>
            <PrimaryButton>
              Schedule a Platform Tour <ArrowRight className="size-4" />
            </PrimaryButton>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B0E14]">
      <div className={cn(container, 'py-12')}>
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-3">
            <div className="text-sm font-extrabold tracking-wide text-white">
              Apex<span className="text-[#00A3FF]">Logix</span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Predictive supply chain intelligence for enterprise logistics networks.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#twitter"
                className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-white/60 transition hover:border-[#00A3FF]/35 hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="size-4" />
              </a>
              <a
                href="#linkedin"
                className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-white/60 transition hover:border-[#00A3FF]/35 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-4" />
              </a>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="text-xs font-semibold tracking-widest text-white/50">Company</div>
            <a href="#about" className="block text-white/60 hover:text-white">
              About
            </a>
            <a href="#careers" className="block text-white/60 hover:text-white">
              Careers
            </a>
            <a href="#contact" className="block text-white/60 hover:text-white">
              Contact
            </a>
          </div>

          <div className="space-y-2 text-sm" id="integrations">
            <div className="text-xs font-semibold tracking-widest text-white/50">Integrations</div>
            <div className="flex items-center gap-2 text-white/60">
              <Database className="size-4 text-white/40" /> ERP / WMS / TMS
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Puzzle className="size-4 text-white/40" /> Carrier networks
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Activity className="size-4 text-white/40" /> Real-time telemetry
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="text-xs font-semibold tracking-widest text-white/50">Legal</div>
            <a href="#privacy" className="block text-white/60 hover:text-white">
              Privacy Policy
            </a>
            <a href="#terms" className="block text-white/60 hover:text-white">
              Terms of Service
            </a>
            <div className="mt-4 flex items-center gap-2 text-white/55">
              <Lock className="size-4 text-white/40" /> SOC2-ready controls
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} ApexLogix. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4" />
            Enterprise-grade performance
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function ApexLogixLandingPage() {
  return (
    <div id="top" className="min-h-screen bg-[#0B0E14] text-white [font-family:Inter,system-ui,sans-serif]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(0,163,255,0.12),transparent_55%),radial-gradient(700px_circle_at_90%_70%,rgba(122,217,255,0.08),transparent_60%)]" />
      <HeaderNav />
      <main className="relative">
        <Hero />
        <LogoMarquee />
        <Capabilities />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

