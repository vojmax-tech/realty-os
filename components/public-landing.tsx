"use client";

import Link from "next/link";
import Image from "next/image";
import { Logo } from "./logo";
import { mono } from "./landing-fonts";
import s from "./public-landing.module.css";

/*
 * The public face of RealtyOS.
 *
 * RealtyOS is a concept product built by Invocrea8: a working build that no
 * brokerage runs yet. The page used to read like an established SaaS, with
 * conversion figures, a customer count, CRM integrations and a pricing table,
 * none of which existed. Everything below describes what the code does today,
 * and the strip at the top says what the product is.
 */

const INVOCREA8_CASE = "https://invocrea8.com/work/realty-os/";
const INVOCREA8_CONTACT = "https://invocrea8.com/contact/";

/* One enquiry, from first message to booked viewing. The first three lines are the widget's own demo script. */
const HERO_CHAT = [
  { from: "buyer", text: "Hi, I'm looking for a 3-bedroom home in Austin." },
  { from: "sloane", text: "Great choice! Austin's market is moving fast. What's your approximate budget range?" },
  { from: "buyer", text: "Around $450,000" },
  { from: "sloane", text: "I have three that fit. Want to see the first one this Saturday at 10am?" },
  { from: "buyer", text: "Yes please" },
];

/* "A lot", itemised: the work that lands on an agent, and what the build does with it. */
const LEDGER = [
  {
    load: "The enquiry that lands at midnight.",
    answer: "Sloane, the assistant on every public page, replies straight away and keeps the conversation going until someone is in the office.",
  },
  {
    load: "The budget nobody asked about.",
    answer: "The qualifier works through budget, timeline, location and property type, and notes which of the four are still missing.",
  },
  {
    load: "Ten new leads and no idea which to call first.",
    answer: "Every lead gets a confidence score from 0 to 100 and tags like #HighIntent or #Relocation, so the hot ones sit at the top.",
  },
  {
    load: "The viewing arranged by phone tag.",
    answer: "When a lead is ready, the system proposes a slot and generates the calendar link. The agent sees it booked.",
  },
  {
    load: "“Any update on my search?”",
    answer: "Buyers get their own portal: saved homes, requested tours and a message thread with their agent.",
  },
];

const FLOW = [
  { step: "01", title: "Enquiry", text: "A multi-step form or a chat with Sloane captures who they are and what they want." },
  { step: "02", title: "Qualify", text: "Each message is scored on urgency, specificity and intent, alongside the four facts that matter." },
  { step: "03", title: "Tag & rank", text: "The lead is tagged and ranked hot, warm or cold in the agent's live feed." },
  { step: "04", title: "Book", text: "Qualified leads are offered a viewing slot with a Cal.com or Google Calendar link." },
];

const SURFACES = [
  {
    img: "/property-2.png",
    label: "Public site",
    title: "Where the enquiry starts",
    text: "Marketing pages, the multi-step property enquiry, and Sloane in the corner of every page.",
    href: "/inquiry",
    cta: "Send a test enquiry",
  },
  {
    img: "/property-3.png",
    label: "Agent workspace",
    title: "Where the team works",
    text: "Live lead feed, pipeline with filters and CSV export, analytics, schedule, and listings management.",
    href: "/showcase",
    cta: "Open the demo workspace",
  },
  {
    img: "/property-4.png",
    label: "Client portal",
    title: "Where the buyer checks in",
    text: "Saved homes, tour requests and direct messages, behind the buyer's own sign-in.",
    href: "/portal/login",
    cta: "See the portal sign-in",
  },
];

const STACK = ["Next.js App Router", "TypeScript", "Postgres + Prisma", "Supabase Auth", "OpenAI, with a rule-based fallback"];

export function PublicLanding() {
  return (
    <main className={`${s.page} ${mono.variable}`}>
      {/* ── What this is ── */}
      <p className={s.disclosure}>
        <span className={s.disclosureTag}>Concept product</span>
        <span>RealtyOS is a working demo built by Invocrea8. No brokerage runs it yet, and the leads you&rsquo;ll see are fictional.</span>
        <a href={INVOCREA8_CASE}>Read the case study</a>
      </p>

      {/* ── Header ── */}
      <header className={s.header}>
        <Link className={s.brand} href="/">
          <Logo size={26} />
          <strong>RealtyOS</strong>
        </Link>
        <nav className={s.nav} aria-label="Primary">
          <a href="#ledger">The problem</a>
          <a href="#flow">How it works</a>
          <a href="#workspace">Workspace</a>
          <a href="#surfaces">Portal</a>
        </nav>
        <div className={s.headerActions}>
          <Link className={s.linkQuiet} href="/admin/login">Agent sign-in</Link>
          <Link className={s.btnInk} href={"/showcase" as any}>Try the demo</Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className={s.hero}>
        <div className={s.heroHead}>
          <p className={s.kicker}>RealtyOS / Lead engagement for property teams</p>
          <h1 className={s.headline}>
            Real estate <br />
            is <em>a lot.</em>
          </h1>
        </div>
        <div className={s.heroSide}>
          <p className={s.lede}>
            Enquiries at 11pm. Budgets nobody asked about. Viewings booked by phone tag.
            RealtyOS answers each new lead in seconds, asks the questions an agent would,
            and hands over only the people who are ready to view.
          </p>
          <div className={s.ctaRow}>
            <Link className={s.btnOrange} href="/inquiry">Send a test enquiry</Link>
            <Link className={s.btnLine} href={"/showcase" as any}>Explore the agent workspace</Link>
          </div>
        </div>

        <div className={s.heroStage}>
          <Image
            src="/hero-bg.png"
            alt="A modern home at dusk, lit from inside, with a pool in the garden"
            fill
            priority
            sizes="100vw"
            className={s.heroPhoto}
          />
          <div
            className={s.chat}
            role="img"
            aria-label="An example conversation: a buyer asks about a three-bedroom home in Austin, Sloane asks their budget, offers a Saturday viewing, and the viewing is booked."
          >
            <div className={s.chatWho}>
              <Image src="/sloane-avatar.png" alt="" width={34} height={34} />
              <div>
                <strong>Sloane</strong>
                <span>RealtyOS assistant</span>
              </div>
            </div>
            {HERO_CHAT.map((m) => (
              <p key={m.text} className={m.from === "buyer" ? `${s.msg} ${s.msgBuyer}` : s.msg}>{m.text}</p>
            ))}
            <div className={s.booked}>
              <Image src="/property-1.png" alt="" width={64} height={50} />
              <div>
                <strong>Viewing booked</strong>
                <span>Saturday, 10:00am</span>
              </div>
              <i aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
              </i>
            </div>
          </div>
          <p className={s.caption}>Fig. 1 — One enquiry, first message to booked viewing.</p>
        </div>
      </section>

      {/* ── The ledger ── */}
      <section className={s.ledger} id="ledger">
        <div className={s.sectionHead}>
          <p className={s.kicker}>Itemised</p>
          <h2 className={s.h2}>What &ldquo;a lot&rdquo; actually means.</h2>
        </div>
        <ol className={s.ledgerList}>
          {LEDGER.map((row, i) => (
            <li key={row.load} className={s.ledgerRow}>
              <span className={s.ledgerNum}>{String(i + 1).padStart(2, "0")}</span>
              <p className={s.ledgerLoad}>{row.load}</p>
              <p className={s.ledgerAnswer}>{row.answer}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Flow ── */}
      <section className={s.flow} id="flow">
        <div className={s.sectionHead}>
          <p className={s.kicker}>How it works</p>
          <h2 className={s.h2}>One lead, start to <em>booked.</em></h2>
        </div>
        <div className={s.flowGrid}>
          {FLOW.map((f) => (
            <article key={f.step} className={s.flowCard}>
              <span className={s.flowStep}>{f.step}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Workspace ── */}
      <section className={s.workspace} id="workspace">
        <div className={s.workspaceHead}>
          <div>
            <p className={s.kickerLight}>The agent workspace</p>
            <h2 className={s.h2Light}>The hot lead is <em>always on top.</em></h2>
          </div>
          <p className={s.workspaceText}>
            A live feed ranked by qualification score, the facts behind each score, and the tags that
            explain it. Open the demo workspace to click through the real screens on fictional leads.
          </p>
        </div>
        <Link href={"/showcase" as any} className={s.screenFrame} aria-label="Open the demo workspace">
          <Image
            src="/showcase-dashboard.png"
            alt="The RealtyOS dashboard: response time, lead count and conversion cards above a live lead feed and the selected lead's qualification score, budget, timeline and tags."
            width={2880}
            height={1800}
            sizes="(max-width: 1100px) 100vw, 1100px"
          />
        </Link>
      </section>

      {/* ── Surfaces ── */}
      <section className={s.surfaces} id="surfaces">
        <div className={s.sectionHead}>
          <p className={s.kicker}>Three surfaces, one record</p>
          <h2 className={s.h2}>Buyer, agent and broker see the same lead.</h2>
        </div>
        <div className={s.surfaceGrid}>
          {SURFACES.map((x) => (
            <article key={x.label} className={s.surface}>
              <div className={s.surfaceImg}>
                <Image src={x.img} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" />
                <span>{x.label}</span>
              </div>
              <h3>{x.title}</h3>
              <p>{x.text}</p>
              <Link href={x.href as any} className={s.surfaceLink}>{x.cta} &rarr;</Link>
            </article>
          ))}
        </div>
      </section>

      {/* ── Build ── */}
      <section className={s.build}>
        <p className={s.kicker}>Under the hood</p>
        <ul className={s.stack}>
          {STACK.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <p className={s.buildNote}>
          Without an OpenAI key, Sloane and the qualifier fall back to scripted replies and rule-based
          scoring, so the demo keeps working.
        </p>
      </section>

      {/* ── CTA ── */}
      <section className={s.cta}>
        <h2 className={s.ctaTitle}>Want this for <em>your agency?</em></h2>
        <p>
          RealtyOS is a starting point. Invocrea8 builds a version around how your team handles leads today:
          your brand, your domain, your calendar.
        </p>
        <div className={s.ctaRow}>
          <a className={s.btnOrange} href={INVOCREA8_CONTACT}>Talk to Invocrea8</a>
          <a className={s.btnLineLight} href={INVOCREA8_CASE}>Read the case study</a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={s.footer}>
        <div className={s.brand}>
          <Logo size={22} />
          <strong>RealtyOS</strong>
        </div>
        <nav className={s.footerNav} aria-label="Footer">
          <Link href={"/about" as any}>About</Link>
          <Link href="/docs">Docs</Link>
          <Link href={"/help" as any}>Help</Link>
          <Link href={"/privacy" as any}>Privacy</Link>
          <Link href={"/terms" as any}>Terms</Link>
          <Link href={"/contact" as any}>Contact</Link>
        </nav>
        <p className={s.footerNote}>
          A concept product designed and built by <a href="https://invocrea8.com/">Invocrea8</a>.
        </p>
      </footer>
    </main>
  );
}
