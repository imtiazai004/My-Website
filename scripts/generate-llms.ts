// Regenerates public/llms.txt from the same data files the website renders.
// Run: npm run llms
import { PROJECTS } from '../src/data/projects';
import { SERVICES } from '../src/data/services';
import { DEMO_APPS, DEMOS } from '../src/data/demos';
import { GUIDES } from '../src/data/guides';
import { FAQS } from '../src/constants';

const SITE = 'https://aisofttechsolution.com';
const abs = (u: string) => (u.startsWith('http') ? u : SITE + u);
const L: string[] = [];
L.push('# Soft Tech Solution', '');
L.push(`> UK-registered software studio that builds AI assistants, automation systems and custom apps for online sellers and small businesses — WhatsApp AI assistants, COD order confirmation, booking and reminder systems, TikTok Shop tools, custom web/mobile/desktop apps and government office systems. Visitors can try ${DEMO_APPS.length} working demos before they pay.`, '');
L.push('This file is generated from the same data files the website uses (src/data/*.ts). Every project listed is real; statuses are stated honestly.', '');
L.push('## Facts', '');
L.push('- Company: Soft Tech Solution, a brand operated by Atlantic LTD STORE LIMITED, a company registered in England and Wales.');
L.push('- Founder: Imtiaz Ahmad, founder and lead engineer (https://www.linkedin.com/in/imtiazahmad004).');
L.push('- Clients: businesses in the United Kingdom and Pakistan. Languages: English and Urdu.');
L.push(`- Proof of work: ${PROJECTS.length} projects at ${SITE}/work and ${DEMO_APPS.length} interactive demos at ${SITE}/demos.`);
L.push('- Pricing model: fixed-price proposals after a free 30-minute discovery call; no hourly billing; no published price list.');
L.push('- Typical timelines: landing page 1–2 weeks, full web app 4–8 weeks, larger systems 3–6 months.');
L.push('- Support: 30 days of free post-launch support; Basic, Standard or Premium plans after that.');
L.push('- Contracts: NDA before confidential discussion; 100% IP assignment to the client.');
L.push('- Payment descriptor: charges appear as "AI SOFT TECH SOLUTION", processed by Atlantic LTD STORE LIMITED.');
L.push('- Contact: info@aisofttechsolution.com · WhatsApp UK +44 7462 086661 · WhatsApp Pakistan +92 300 5863032. Open Monday to Saturday, 24 hours (closed Sunday). Replies within 24 hours.', '');
L.push('## Services', '');
for (const s of SERVICES) {
  L.push(`- **${s.label}** — ${s.description} For: ${s.forWho} Examples: ${s.examples.map((e) => `${e.label} (${abs(e.href)})`).join(', ')}.`);
}
L.push('', '## Products and projects', '');
for (const p of PROJECTS) {
  const links = [p.links?.live && `live: ${abs(p.links.live)}`, p.links?.page && `page: ${abs(p.links.page)}`].filter(Boolean).join(' · ');
  L.push(`- **${p.title}** (${p.category}; status: ${p.status}) — ${p.summary} ${p.description} Built with ${p.tags.join(', ')}.${links ? ' ' + links : ''}`);
}
L.push('', '## Live demos', '');
L.push(`All demos: ${SITE}/demos`, '');
for (const d of DEMO_APPS) {
  L.push(`- **${d.name}** (${d.industry}) — ${d.description} Problem it solves: ${d.problem} ${SITE}/demos/${d.slug}${d.post ? ` · explained: ${SITE}/blog/${d.post}` : ''}`);
}
for (const d of DEMOS) {
  L.push(`- **${d.client} — ${d.title}** (${d.category}) — ${d.description} ${abs(d.url)}`);
}
L.push('', '## Free guides', '');
for (const g of GUIDES) L.push(`- **${g.title}** — ${g.description} ${g.meta}. ${SITE}/guides/${g.slug}`);
L.push('', `All guides: ${SITE}/guides`, '');
L.push('## Compare', '');
L.push(`- [Soft Tech Solution vs hiring a freelancer](${SITE}/compare/agency-vs-freelancer) — side-by-side on pricing model, skill coverage, continuity risk, NDA/IP terms and timelines.`, '');
L.push('## FAQs', '');
for (const f of FAQS) L.push(`**${f.question}**`, f.answer, '');
L.push('## Other pages', '');
L.push(`- Blog (problems we solve, explained): ${SITE}/blog`);
L.push(`- Blueprint library: ${SITE}/blueprint-library`);
L.push(`- ProfitScout Chrome extension: ${SITE}/profitscout`);
L.push(`- Soft Clipper: https://softclipper.pro`);
L.push(`- Privacy: ${SITE}/privacy · Terms: ${SITE}/terms`);
console.log(L.join('\n'));
