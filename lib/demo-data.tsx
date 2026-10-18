"use client";

import { createContext, ReactNode, useContext, useMemo } from "react";
import type { LeadRecord } from "@/lib/types";
import type { AdminMetrics } from "@/lib/use-admin-data";

/*
 * Fictional data for the public /showcase walkthrough.
 *
 * The admin screens are behind Supabase auth and read the live database. The
 * showcase renders the same components without either: when this context holds
 * leads, useAdminData and AdminShell use them instead of calling the API. Every
 * person here is invented (example.com addresses, 555-01xx numbers), and the
 * page around it says so.
 */

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

function at(msAgo: number) {
  return new Date(Date.now() - msAgo).toISOString();
}

function inDays(days: number, hour: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

function chat(msAgo: number, lines: [ "user" | "assistant", string ][]) {
  return lines.map(([role, content], i) => ({
    id: `m-${msAgo}-${i}`,
    role,
    content,
    timestamp: at(msAgo - i * 20_000)
  }));
}

function buildLeads(): LeadRecord[] {
  return [
    {
      id: "demo-amara",
      name: "Amara Okafor",
      email: "amara.okafor@example.com",
      phone: "(512) 555-0147",
      source: "chatbot",
      createdAt: at(26 * MIN),
      updatedAt: at(4 * MIN),
      status: "booked",
      tags: ["#HighIntent", "#PreApproved", "#3Bed"],
      qualification: { budget: "$450,000", timeline: "Within 60 days", location: "East Austin", propertyType: "Single family", confidence: 94, missingFields: [] },
      conversation: chat(26 * MIN, [
        ["user", "Hi, I'm looking for a 3-bedroom home in Austin."],
        ["assistant", "Great choice. What's your approximate budget range?"],
        ["user", "Around $450,000. We're pre-approved."],
        ["assistant", "I have three that fit. Want to see the first one this Saturday at 10am?"],
        ["user", "Yes please"]
      ]),
      appointment: { id: "appt-amara", slot: inDays(1, 10), calendarLink: "#", bookedAt: at(4 * MIN) }
    },
    {
      id: "demo-daniel",
      name: "Daniel Reyes",
      email: "d.reyes@example.com",
      phone: "(512) 555-0182",
      source: "website-form",
      createdAt: at(48 * MIN),
      updatedAt: at(12 * MIN),
      status: "qualified",
      tags: ["#Relocation", "#Condo"],
      qualification: { budget: "$380,000", timeline: "1-3 months", location: "Downtown", propertyType: "Condo", confidence: 81, missingFields: [] },
      conversation: chat(48 * MIN, [
        ["user", "Relocating for work in March. Looking at condos downtown."],
        ["assistant", "Welcome to Austin. Do you have a budget in mind?"],
        ["user", "Up to $380k."]
      ])
    },
    {
      id: "demo-priya",
      name: "Priya Shah",
      email: "priya.shah@example.com",
      phone: "(512) 555-0119",
      source: "zillow",
      createdAt: at(2 * HOUR),
      updatedAt: at(35 * MIN),
      status: "qualifying",
      tags: ["#FirstTimeBuyer", "#Townhouse"],
      qualification: { budget: "$320,000", location: "Mueller", propertyType: "Townhouse", confidence: 62, missingFields: ["timeline"] },
      conversation: chat(2 * HOUR, [
        ["user", "Is the Mueller townhouse still available?"],
        ["assistant", "It is. When are you hoping to move?"]
      ])
    },
    {
      id: "demo-marcus",
      name: "Marcus Bell",
      email: "marcus.bell@example.com",
      phone: "(512) 555-0163",
      source: "referral",
      createdAt: at(3 * HOUR),
      updatedAt: at(80 * MIN),
      status: "booked",
      tags: ["#Seller", "#HighIntent"],
      qualification: { budget: "$720,000", timeline: "ASAP", location: "Travis Heights", propertyType: "Single family", confidence: 88, missingFields: [] },
      conversation: chat(3 * HOUR, [
        ["user", "Thinking of selling and buying bigger in Travis Heights."],
        ["assistant", "I can set up a valuation and a viewing in one visit. Thursday at 2pm?"],
        ["user", "Works for me."]
      ]),
      appointment: { id: "appt-marcus", slot: inDays(2, 14), calendarLink: "#", bookedAt: at(80 * MIN) }
    },
    {
      id: "demo-lena",
      name: "Lena Fischer",
      email: "lena.f@example.com",
      phone: "(512) 555-0134",
      source: "instagram",
      createdAt: at(5 * HOUR),
      updatedAt: at(3 * HOUR),
      status: "new",
      tags: ["#Browsing"],
      qualification: { location: "South Congress", confidence: 34, missingFields: ["budget", "timeline", "propertyType"] },
      conversation: chat(5 * HOUR, [["user", "Love the South Congress listing you posted!"]])
    },
    {
      id: "demo-tomas",
      name: "Tomás Herrera",
      email: "tomas.h@example.com",
      phone: "(512) 555-0171",
      source: "google",
      createdAt: at(9 * HOUR),
      updatedAt: at(6 * HOUR),
      status: "qualified",
      tags: ["#Investor", "#MultiFamily"],
      qualification: { budget: "$1.1M", timeline: "3-6 months", location: "Riverside", propertyType: "Multi-family", confidence: 76, missingFields: [] },
      conversation: chat(9 * HOUR, [["user", "Looking for a duplex or fourplex with rental history."]])
    },
    {
      id: "demo-grace",
      name: "Grace Liu",
      email: "grace.liu@example.com",
      phone: "(512) 555-0158",
      source: "website-form",
      createdAt: at(1 * DAY),
      updatedAt: at(20 * HOUR),
      status: "booked",
      tags: ["#Family", "#Schools"],
      qualification: { budget: "$560,000", timeline: "Within 60 days", location: "Circle C", propertyType: "Single family", confidence: 90, missingFields: [] },
      conversation: chat(1 * DAY, [["user", "We need 4 bedrooms near a good elementary school."]]),
      appointment: { id: "appt-grace", slot: inDays(3, 11), calendarLink: "#", bookedAt: at(20 * HOUR) }
    },
    {
      id: "demo-owen",
      name: "Owen Price",
      email: "owen.price@example.com",
      phone: "(512) 555-0126",
      source: "facebook",
      createdAt: at(2 * DAY),
      updatedAt: at(1 * DAY),
      status: "disqualified",
      tags: ["#Renter"],
      qualification: { budget: "$1,800/mo", timeline: "Next month", location: "North Loop", propertyType: "Apartment rental", confidence: 18, missingFields: [] },
      conversation: chat(2 * DAY, [["user", "Do you have any 1-bed rentals?"]])
    },
    {
      id: "demo-sofia",
      name: "Sofia Martins",
      email: "sofia.m@example.com",
      phone: "(512) 555-0190",
      source: "chatbot",
      createdAt: at(2 * DAY + 3 * HOUR),
      updatedAt: at(2 * DAY),
      status: "qualifying",
      tags: ["#Downsizing"],
      qualification: { timeline: "6+ months", location: "Westlake", propertyType: "Townhouse", confidence: 51, missingFields: ["budget"] },
      conversation: chat(2 * DAY + 3 * HOUR, [["user", "Our kids have moved out, so we're thinking smaller."]])
    }
  ];
}

const DEMO_METRICS: AdminMetrics = {
  processedMessages: 64,
  averageResponseTimeMs: 2400,
  maxResponseTimeMs: 4100,
  underThreeSecondsRate: 83 // a percentage, as /api/metrics returns it
};

interface DemoData {
  leads: LeadRecord[];
  metrics: AdminMetrics;
}

const DemoDataContext = createContext<DemoData | null>(null);

export function DemoDataProvider({ children }: { children: ReactNode }) {
  // Built on the client so the relative times ("4 mins ago") are true at view time.
  const value = useMemo(() => ({ leads: buildLeads(), metrics: DEMO_METRICS }), []);
  return <DemoDataContext.Provider value={value}>{children}</DemoDataContext.Provider>;
}

/** The showcase's fictional data, or null on the real, authenticated screens. */
export function useDemoData() {
  return useContext(DemoDataContext);
}

/** Links between admin screens stay inside /showcase when the demo is running,
    rather than dropping a visitor on the sign-in page. */
export function useAdminHref() {
  const demo = useContext(DemoDataContext);
  return (path: string) => (demo ? path.replace(/^\/admin/, "/showcase") : path);
}
