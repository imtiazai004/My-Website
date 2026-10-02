// Blog post queue for the daily auto-publisher (api/publish-post.ts).
// One post is published per day, in array order. Doc ID = slug.

export const POSTS = [
  {
    slug: 'digital-khata-udhaar-notebook',
    title: "A Shopkeeper's Biggest Thief Is His Own Credit Notebook",
    excerpt:
      'Udhaar written in paper notebooks evaporates through carry-forward errors and forgotten entries. A digital khata with automatic WhatsApp reminders fixes it.',
    tags: ['Small Business', 'Retail', 'AI Automation'],
    content: `Walk into any karyana store in Pakistan and ask about udhaar. You'll be shown a notebook — one page per customer, entries in a hurry, repayments scribbled in the margins.

It works until it doesn't. When a page fills up, the balance is carried forward by hand — and every carry-forward is a chance for error. The error always goes against the shopkeeper, because nobody argues with a balance that came out too low. Pages get lost. Entries get forgotten. Money quietly evaporates.

The fix isn't "stop giving credit." It's a digital khata:

:::demo khatabook:::

Every entry timestamped. Balances updating themselves. Partial payments tracked per entry, so you always know exactly how much of each bill is still outstanding. Anyone late gets an automatic WhatsApp reminder — the shopkeeper never has to remember, and never has to make the awkward call.

Your money belongs in a system, not in a notebook.

*Run a shop? DM me "KHATA" — I'll show you what this looks like with your own customers.*`,
  },
  {
    slug: 'whatsapp-ai-restaurant-ordering',
    title: 'Missed the Call at Rush Hour? The Order Went to Your Competitor',
    excerpt:
      'One phone line, a busy counter, peak hours — restaurants lose orders every single day. A WhatsApp AI bot takes orders 24/7.',
    tags: ['Restaurants', 'AI Chatbots', 'Automation'],
    content: `One phone line. A busy counter. Peak hours.

Calls get missed. Items get written down wrong. Customers hang up on hold and order from somewhere else. Every missed call is a lost order, and every wrong order is a remake plus a refund.

Now imagine a WhatsApp AI bot taking orders on your number, 24/7:

:::demo foodbot:::

The customer types "menu," picks items, customizes them, and checks out — the order goes straight to the kitchen with a confirmation and ETA. Ten customers at once. Zero missed calls. Zero wrong items.

AI doesn't mean robots. It means your counter is never busy.

*Run a restaurant or dhaba? DM me "ORDER" — I'll show you how this looks on your menu.*`,
  },
  {
    slug: 'tiktok-shop-dispatch-penalty',
    title: 'Going Viral on TikTok Shop Can Be a Punishment, Not a Celebration',
    excerpt:
      '500 to 2,000 orders in a day, processed manually — and a missed 48-hour dispatch window means suppressed payouts and killed reach.',
    tags: ['E-commerce', 'TikTok Shop', 'Automation'],
    content: `A viral video. 500 to 2,000 orders in a single day. All processed manually.

Then the weekend dispatch window gets missed — and TikTok penalizes the brand: payouts held, FYP reach cut. The 48-hour dispatch window doesn't care that you went viral. A manual system cannot survive a spike.

The fix is auto-fulfillment:

:::demo tikfulfill:::

Orders flow into one queue with a live countdown on every dispatch deadline. One click prints labels in bulk. At-risk orders get flagged before the window closes, couriers get assigned, and exceptions get their own queue instead of exploding in your inbox.

The platform will give you the orders. Handling them is your system's job.

*TikTok Shop seller? DM me "SPIKE" — I'll review your fulfillment workflow for free.*`,
  },
  {
    slug: 'wismo-most-expensive-sentence',
    title: "The Most Expensive Sentence in E-commerce: 'Where Is My Order?'",
    excerpt:
      'It sounds harmless. Behind it: doubt, friction, and hours your team should have spent packing.',
    tags: ['E-commerce', 'AI Chatbots', 'Customer Support'],
    content: `"Hi, just wondering where my order is?"

It sounds harmless. Polite, even. But behind that sentence is friction. Doubt. A small crack in trust. And the hour your team should have spent packing went into the inbox instead.

It's the most common ticket in e-commerce — and the answer is data you already have.

The fix has two parts:

:::demo supportai:::

An AI support bot wired to live order and carrier data answers instantly, 24/7 — with real tracking, not guesses. And proactive SMS at every stage (dispatched, in-transit, delivered) means the question never arises in the first place.

Support isn't about putting out fires. It's about preventing them.

*Run an online store? DM me — I'll tell you how many of your tickets can be automated.*`,
  },
  {
    slug: 'salon-empty-chair',
    title: 'An Empty Chair Earns Zero',
    excerpt:
      'Double bookings, no-shows, forgotten clients — the paper register is quietly costing salons real money every week.',
    tags: ['Small Business', 'Salons', 'Automation'],
    content: `The salon register: double-booked slots lead to walkouts. No reminders means clients forget — and an empty chair earns zero for an hour that never comes back. No client history means nobody knows what she got last time, so the upsell opportunity dies quietly.

The fix is a booking system that does the remembering for you:

:::demo salonbook:::

Slots lock, so double booking becomes impossible. WhatsApp reminders go out automatically — 24 hours and 2 hours before. Client history is saved, so repeat visits get personal: "you had a hair spa last time, it's due."

The cure for an empty chair isn't new clients. It's reminding the old ones.

*Run a salon or parlour? DM me "CHAIR".*`,
  },
  {
    slug: 'unconfirmed-cod-orders',
    title: 'The Biggest Enemy of Pakistani Online Sellers: The Unconfirmed COD Order',
    excerpt:
      'Refused parcels, two-way courier charges, stock stuck in transit — one unconfirmed order costs money, time, and stock.',
    tags: ['E-commerce', 'Pakistan', 'Automation'],
    content: `The order arrives. It ships without confirmation. The customer refuses it at the door.

Now the courier charges both ways are yours. The stock sits in transit for days. It comes back damaged. One unconfirmed COD order costs money, time, and stock — all three.

The fix is confirmation before dispatch, done by machine:

:::demo codconfirm:::

The moment an order arrives, an automatic WhatsApp goes out: reply YES to confirm. No reply in an hour triggers a reminder, then another. What isn't confirmed never ships. Duplicate and suspicious orders get flagged before they cost you anything.

COD isn't a trust problem. It's a confirmation problem. And confirmation is a machine's job.

*Selling on Instagram, Facebook, or WhatsApp? DM me "COD" — I'll walk you through the full system.*`,
  },
  {
    slug: 'freelancer-invoice-chasing',
    title: "A Freelancer's Biggest Unpaid Job: Asking for His Own Money",
    excerpt:
      'Six clients, six portals, six definitions of "net 30." Three hours a week of polite chasing — none of it billable.',
    tags: ['Freelancing', 'Automation', 'Finance'],
    content: `Six clients. Six portals. Six definitions of "net 30."

Three hours a week writing carefully-worded reminders — and none of that time is billable. Write too firm and the relationship suffers. Write too soft and the money comes late. The freelancer becomes a part-time debt collector.

The fix is a tracker that chases for you:

:::demo invoicechaser:::

Every invoice on one dashboard — who's late and by how much, at a glance. Automatic reminder sequences: gentle on the due date, firmer on day 7, final on day 14. The tone escalates; you never say a word. It feels like the system sent it, so the awkwardness disappears.

Your job is doing the work. Asking for the money is the system's job.

*Freelancer? Tell me in the comments — what was your most overdue payment ever?*`,
  },
  {
    slug: 'cold-leads-buried-money',
    title: "There's Money Buried in Your Cold Leads",
    excerpt:
      'Leads in spreadsheets, conversations in inboxes, follow-ups in memory. Warm leads die quietly every single week.',
    tags: ['Agencies', 'Sales', 'CRM'],
    content: `The small agency reality: leads live in spreadsheets, conversations live in inboxes, notes live somewhere else, and follow-ups live in someone's memory.

Then one busy day arrives — the follow-up never happens, and the lead goes cold. Warming it back up means reconstructing the whole story from inbox plus spreadsheet plus notes. That feels like so much work that finding a new lead seems easier. So the old one gets buried.

The fix is a lightweight CRM:

:::demo leadcrm:::

Every prospect, last conversation, and next follow-up in one place — with the system reminding you. One-click re-engagement messages to dormant leads. A share of cold leads always comes back, and that share is pure profit. Lost deals get reason tags, so the patterns become visible.

New leads are expensive. Old leads are free.

*Agency or service business? DM me "LEADS".*`,
  },
];
