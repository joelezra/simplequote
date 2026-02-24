import { AnimatedSection } from "@/components/AnimatedSection";
import { SignupForm } from "@/components/SignupForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useCountUp } from "@/hooks/useCountUp";
import { trpc } from "@/lib/trpc";
import {
  FileText,
  PenTool,
  Eye,
  Receipt,
  LayoutDashboard,
  Download,
  Wrench,
  Zap,
  Wind,
  Paintbrush,
  Hammer,
  Home as HomeIcon,
  HardHat,
  Building2,
  ChevronRight,
  Check,
  X,
  ArrowRight,
  Mail,
  Users,
} from "lucide-react";
import { useState, useEffect } from "react";

// ─── HEADER ────────────────────────────────────────────────
function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.14_0.02_280_/_95%)] backdrop-blur-md border-b border-[oklch(1_0_0_/_8%)] shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <button onClick={scrollToTop} className="flex items-center gap-2 group">
          <div className="size-8 rounded-lg bg-[oklch(0.7_0.19_45)] flex items-center justify-center">
            <FileText className="size-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Simple<span className="text-[oklch(0.7_0.19_45)]">Quote</span>
          </span>
        </button>
        <Button
          onClick={() => document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth" })}
          className="h-9 rounded-xl bg-[oklch(0.7_0.19_45)] text-sm font-semibold text-white hover:bg-[oklch(0.65_0.19_45)]"
        >
          Get Early Access
        </Button>
      </div>
    </header>
  );
}

// ─── 1. HERO ───────────────────────────────────────────────
function HeroSection() {
  const { data } = trpc.waitlist.count.useQuery(undefined, {
    refetchInterval: 10000,
  });
  const count = useCountUp(data?.count ?? 0, 1500);

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-[oklch(0.7_0.19_45_/_6%)] blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[oklch(0.5_0.15_280_/_8%)] blur-[100px]" />

      <div className="container relative">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.7_0.19_45_/_30%)] bg-[oklch(0.7_0.19_45_/_10%)] px-4 py-1.5 mb-6">
              <Zap className="size-3.5 text-[oklch(0.7_0.19_45)]" />
              <span className="text-xs font-medium text-[oklch(0.7_0.19_45)]">
                Early Access Now Open
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
              Quote it.{" "}
              <span className="text-[oklch(0.7_0.19_45)]">Send it.</span>{" "}
              Get paid.
            </h1>

            <p className="mt-6 text-lg md:text-xl text-[oklch(0.75_0_0)] leading-relaxed max-w-2xl mx-auto">
              The all-in-one quoting and invoicing app built for tradespeople.
              Create professional quotes in 60 seconds, get e-signatures on the
              spot, and track every dollar — all from your phone.
            </p>

            <div id="hero-form" className="mt-10 max-w-2xl mx-auto">
              <SignupForm />
            </div>

            <div className="mt-8 flex items-center justify-center gap-2">
              <Users className="size-4 text-[oklch(0.7_0.19_45)]" />
              <p className="text-sm text-[oklch(0.65_0_0)]">
                <span className="font-bold text-white count-animate">
                  {count}
                </span>{" "}
                tradespeople already signed up
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── 2. PROBLEM / SOLUTION ─────────────────────────────────
const problems = [
  "You estimate jobs from memory and forget half the materials",
  "You underbid because you didn't account for markup, travel, or disposal",
  "Customers ghost your quote because it looked like a text message",
  "You have no idea which invoices are paid and which aren't",
  "Tax season is a shoebox of receipts and guesswork",
];

const solutions = [
  "Pick a job type, adjust materials + labor, send a pro quote in 60 seconds",
  "Customer signs it right there on your phone",
  "You get a notification the second they open it",
  "One tap converts your quote into an invoice",
  "Export everything to QuickBooks or download a clean PDF for your accountant",
];

function ProblemSolutionSection() {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="container relative">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.7_0.19_45)] mb-3">
              The Problem & The Fix
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              We get it. We've been there.
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <AnimatedSection delay={100}>
            <div className="rounded-2xl border border-[oklch(0.65_0.2_25_/_20%)] bg-[oklch(0.65_0.2_25_/_8%)] p-6 md:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-xl bg-[oklch(0.65_0.2_25_/_20%)] flex items-center justify-center">
                  <X className="size-5 text-[oklch(0.7_0.22_25)]" />
                </div>
                <h3 className="text-xl font-bold text-white">Sound familiar?</h3>
              </div>
              <ul className="space-y-4">
                {problems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1.5 size-1.5 rounded-full bg-[oklch(0.7_0.22_25)] shrink-0" />
                    <span className="text-[oklch(0.78_0_0)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="rounded-2xl border border-[oklch(0.6_0.17_145_/_20%)] bg-[oklch(0.6_0.17_145_/_8%)] p-6 md:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-xl bg-[oklch(0.6_0.17_145_/_20%)] flex items-center justify-center">
                  <Check className="size-5 text-[oklch(0.7_0.18_145)]" />
                </div>
                <h3 className="text-xl font-bold text-white">Now imagine this.</h3>
              </div>
              <ul className="space-y-4">
                {solutions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1.5 size-1.5 rounded-full bg-[oklch(0.7_0.18_145)] shrink-0" />
                    <span className="text-[oklch(0.78_0_0)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── 3. HOW IT WORKS ───────────────────────────────────────
const steps = [
  {
    icon: FileText,
    title: "Build Your Quote",
    description:
      "Pick from trade-specific templates — plumbing, electrical, HVAC, painting, carpentry. Add materials, labor hours, markup, tax. Done in 60 seconds.",
  },
  {
    icon: ArrowRight,
    title: "Send & Track",
    description:
      'Email or text a professional PDF quote. Know exactly when the client opens it. No more "did you get my estimate?"',
  },
  {
    icon: PenTool,
    title: "Get It Signed",
    description:
      "Client e-signs right from their phone. No printing, no scanning, no chasing. The job is locked in.",
  },
  {
    icon: Receipt,
    title: "Invoice & Get Paid",
    description:
      "Convert any signed quote to an invoice in one tap. Track payment status at a glance — pending, paid, overdue. Export to QuickBooks or download PDF reports.",
  },
];

function HowItWorksSection() {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="container relative">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.7_0.19_45)] mb-3">
              How It Works
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Four steps. That's it.
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="relative rounded-2xl border border-[oklch(1_0_0_/_8%)] bg-[oklch(0.2_0.015_280)] p-6 h-full group hover:border-[oklch(0.7_0.19_45_/_30%)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-10 rounded-xl bg-[oklch(0.7_0.19_45_/_15%)] flex items-center justify-center group-hover:bg-[oklch(0.7_0.19_45_/_25%)] transition-colors">
                    <step.icon className="size-5 text-[oklch(0.7_0.19_45)]" />
                  </div>
                  <span className="text-xs font-bold text-[oklch(0.7_0.19_45)] uppercase tracking-wider">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-[oklch(0.7_0_0)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. FEATURES GRID ──────────────────────────────────────
const features = [
  {
    icon: FileText,
    title: "Smart Estimates",
    description:
      "Trade-specific templates with built-in material + labor calculators. Stop guessing, start pricing accurately.",
  },
  {
    icon: PenTool,
    title: "E-Signatures",
    description:
      "Clients sign on the spot or remotely. Legally binding. No paper, no delays.",
  },
  {
    icon: Eye,
    title: "Live Tracking",
    description:
      "Know the second a client opens your quote. See read receipts, signature status, and payment state in real time.",
  },
  {
    icon: Receipt,
    title: "Pro Invoicing",
    description:
      "One-tap quote-to-invoice conversion. Branded with your logo and license number. Looks like you have a back office.",
  },
  {
    icon: LayoutDashboard,
    title: "Payment Dashboard",
    description:
      "See every job at a glance: quoted, signed, invoiced, paid, overdue. Know exactly where your money is.",
  },
  {
    icon: Download,
    title: "Export & Integrate",
    description:
      "QuickBooks sync. CSV export. PDF reports. Your accountant will think you hired an assistant.",
  },
];

function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="container relative">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.7_0.19_45)] mb-3">
              Features
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Everything you need. Nothing you don't.
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <AnimatedSection key={i} delay={i * 80}>
              <div className="rounded-2xl border border-[oklch(1_0_0_/_8%)] bg-[oklch(0.2_0.015_280)] p-6 h-full group hover:border-[oklch(0.7_0.19_45_/_25%)] transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.7_0.19_45_/_8%)]">
                <div className="size-12 rounded-xl bg-[oklch(0.7_0.19_45_/_12%)] flex items-center justify-center mb-4 group-hover:bg-[oklch(0.7_0.19_45_/_20%)] transition-colors">
                  <feature.icon className="size-6 text-[oklch(0.7_0.19_45)]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[oklch(0.7_0_0)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5. TRADES WE SERVE ────────────────────────────────────
const trades = [
  { icon: Wrench, label: "Plumbing" },
  { icon: Zap, label: "Electrical" },
  { icon: Wind, label: "HVAC" },
  { icon: Paintbrush, label: "Painting" },
  { icon: Hammer, label: "Carpentry" },
  { icon: HomeIcon, label: "Roofing" },
  { icon: HardHat, label: "Handyman" },
  { icon: Building2, label: "General Contracting" },
];

function TradesSection() {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="container relative">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.7_0.19_45)] mb-3">
              Built For Your Trade
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Trades we serve
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {trades.map((trade, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 rounded-2xl border border-[oklch(1_0_0_/_8%)] bg-[oklch(0.2_0.015_280)] p-5 hover:border-[oklch(0.7_0.19_45_/_25%)] transition-all duration-300 group"
              >
                <div className="size-12 rounded-xl bg-[oklch(0.7_0.19_45_/_12%)] flex items-center justify-center group-hover:bg-[oklch(0.7_0.19_45_/_20%)] transition-colors">
                  <trade.icon className="size-5 text-[oklch(0.7_0.19_45)]" />
                </div>
                <span className="text-xs font-semibold text-[oklch(0.8_0_0)] text-center leading-tight">
                  {trade.label}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <p className="text-center mt-8 text-sm text-[oklch(0.6_0_0)]">
            Don't see your trade? We're adding more every week.{" "}
            <button
              onClick={() => document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth" })}
              className="text-[oklch(0.7_0.19_45)] font-semibold hover:underline"
            >
              Request yours.
            </button>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── 6. PRICING TEASER ─────────────────────────────────────
function PricingSection() {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="container relative">
        <AnimatedSection>
          <div className="max-w-lg mx-auto">
            <div className="rounded-2xl border border-[oklch(0.7_0.19_45_/_25%)] bg-[oklch(0.2_0.015_280)] p-8 md:p-10 text-center relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-40 bg-[oklch(0.7_0.19_45_/_12%)] rounded-full blur-[80px]" />

              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.7_0.19_45)] mb-4">
                  Early Bird Pricing
                </p>

                <div className="flex items-baseline justify-center gap-3 mb-2">
                  <span className="text-2xl text-[oklch(0.5_0_0)] line-through">
                    $9.99/mo
                  </span>
                  <span className="text-5xl md:text-6xl font-black text-white">
                    $4.99
                  </span>
                  <span className="text-lg text-[oklch(0.6_0_0)]">/mo</span>
                </div>

                <p className="text-[oklch(0.7_0.19_45)] font-semibold mb-6">
                  Locked In Forever
                </p>

                <ul className="space-y-3 text-left max-w-xs mx-auto mb-8">
                  {[
                    "Unlimited quotes & invoices",
                    "E-signatures",
                    "Live tracking",
                    "QuickBooks export",
                    "PDF reports",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="size-4 text-[oklch(0.7_0.18_145)] shrink-0" />
                      <span className="text-sm text-[oklch(0.8_0_0)]">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="rounded-xl bg-[oklch(0.7_0.19_45_/_10%)] border border-[oklch(0.7_0.19_45_/_20%)] px-4 py-3 mb-6">
                  <p className="text-sm font-semibold text-[oklch(0.7_0.19_45)]">
                    First 500 signups get this rate permanently.
                  </p>
                </div>

                <Button
                  onClick={() => document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full h-12 rounded-xl bg-[oklch(0.7_0.19_45)] text-base font-bold text-white hover:bg-[oklch(0.65_0.19_45)] cta-pulse"
                >
                  Get Early Access — Free
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── 7. TESTIMONIALS ───────────────────────────────────────
const testimonials = [
  {
    quote:
      "I used to lose $500+ per job because I'd forget materials. SimpleQuote caught everything.",
    name: "Mike R.",
    trade: "Plumber",
    location: "Tampa FL",
  },
  {
    quote:
      "My customers started taking me more seriously when I showed up with a real quote instead of a number on a napkin.",
    name: "Sarah K.",
    trade: "Electrician",
    location: "Denver CO",
  },
  {
    quote:
      "I converted a quote to an invoice in literally one tap. My wife thought I hired a bookkeeper.",
    name: "Carlos M.",
    trade: "HVAC Tech",
    location: "Houston TX",
  },
];

function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="container relative">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.7_0.19_45)] mb-3">
              What Beta Testers Say
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Real feedback from real tradespeople
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="rounded-2xl border border-[oklch(1_0_0_/_8%)] bg-[oklch(0.2_0.015_280)] p-6 h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className="size-4 text-[oklch(0.7_0.19_45)]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-[oklch(0.82_0_0)] leading-relaxed flex-1 italic">
                  "{t.quote}"
                </blockquote>

                <div className="mt-5 pt-4 border-t border-[oklch(1_0_0_/_8%)]">
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-[oklch(0.6_0_0)]">
                    {t.trade}, {t.location}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={300}>
          <p className="text-center mt-8 text-xs text-[oklch(0.5_0_0)] italic">
            Testimonials from early beta testers during our pilot program.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── 8. FAQ ────────────────────────────────────────────────
const faqs = [
  {
    question: "What trades does SimpleQuote support?",
    answer:
      "Plumbing, electrical, HVAC, painting, carpentry, roofing, handyman, and general contracting at launch. We're adding more based on demand — tell us your trade when you sign up.",
  },
  {
    question: "Is it really 60 seconds to create a quote?",
    answer:
      "Yes. Pick a template, adjust quantities and rates, hit send. We've timed it.",
  },
  {
    question: "Does it work offline?",
    answer:
      "Yes. Create and save quotes with no signal. They send automatically when you're back online. Built for basements and rural job sites.",
  },
  {
    question: "Is the e-signature legally binding?",
    answer:
      "Yes. Our e-signatures comply with the ESIGN Act and UETA. Same legal standing as a wet signature.",
  },
  {
    question: "Can I use it with QuickBooks?",
    answer:
      "Yes. Sync your invoices and payment data directly. Also supports CSV and PDF export for any accounting software.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Bank-level encryption (AES-256), secure cloud backup, and we never sell your data. Your client info stays yours.",
  },
  {
    question: "When does it launch?",
    answer:
      "We're in early access now. Sign up to lock in early bird pricing and be first in line.",
  },
];

function FAQSection() {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="container relative">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.7_0.19_45)] mb-3">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Got questions? We've got answers.
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-xl border border-[oklch(1_0_0_/_8%)] bg-[oklch(0.2_0.015_280)] px-6 overflow-hidden"
                >
                  <AccordionTrigger className="text-white text-left font-semibold hover:no-underline py-5 text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[oklch(0.72_0_0)] leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── 9. FINAL CTA ──────────────────────────────────────────
function FinalCTASection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Dark overlay with glow */}
      <div className="absolute inset-0 bg-[oklch(0.12_0.02_280)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[oklch(0.7_0.19_45_/_10%)] rounded-full blur-[120px]" />

      <div className="container relative">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Stop leaving money on the table.
            </h2>
            <p className="text-[oklch(0.72_0_0)] leading-relaxed mb-10 text-lg">
              Every job you underbid is money out of your pocket. Every quote
              that looks unprofessional is a customer who picks someone else.
              Every invoice you forget to follow up on is cash you earned but
              never collected. SimpleQuote fixes all of it.
            </p>

            <Button
              onClick={() => document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth" })}
              size="lg"
              className="h-14 rounded-xl bg-[oklch(0.7_0.19_45)] px-8 text-lg font-bold text-white hover:bg-[oklch(0.65_0.19_45)] cta-pulse"
            >
              Get Early Access — $4.99/mo locked in forever
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── 10. FOOTER ────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-[oklch(1_0_0_/_8%)] py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-[oklch(0.7_0.19_45)] flex items-center justify-center">
                <FileText className="size-3.5 text-white" />
              </div>
              <span className="text-base font-bold text-white">
                Simple<span className="text-[oklch(0.7_0.19_45)]">Quote</span>
              </span>
            </div>
            <p className="text-xs text-[oklch(0.5_0_0)]">
              Quote it. Send it. Get paid.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* Instagram */}
            <a
              href="#"
              className="text-[oklch(0.5_0_0)] hover:text-[oklch(0.7_0.19_45)] transition-colors"
              aria-label="Instagram"
            >
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            {/* TikTok */}
            <a
              href="#"
              className="text-[oklch(0.5_0_0)] hover:text-[oklch(0.7_0.19_45)] transition-colors"
              aria-label="TikTok"
            >
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </a>
            {/* Email */}
            <a
              href="mailto:hello@simplequote.app"
              className="text-[oklch(0.5_0_0)] hover:text-[oklch(0.7_0.19_45)] transition-colors"
              aria-label="Email"
            >
              <Mail className="size-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[oklch(1_0_0_/_6%)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[oklch(0.45_0_0)]">
            Built for tradespeople, by tradespeople.
          </p>
          <p className="text-xs text-[oklch(0.4_0_0)]">
            &copy; 2026 SimpleQuote. All rights reserved.{" "}
            <a href="#" className="hover:text-[oklch(0.6_0_0)] transition-colors">
              Privacy
            </a>{" "}
            |{" "}
            <a href="#" className="hover:text-[oklch(0.6_0_0)] transition-colors">
              Terms
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ──────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyHeader />
      <main>
        <HeroSection />
        <ProblemSolutionSection />
        <HowItWorksSection />
        <FeaturesSection />
        <TradesSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
