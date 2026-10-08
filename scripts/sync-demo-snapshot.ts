// Update the crawler-only homepage snapshot without fetching Firestore content.
import { readFileSync, writeFileSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import DemosSection from '../src/components/DemosSection';

const file = new URL('../public/prerendered/home.html', import.meta.url);
let html = readFileSync(file, 'utf8');
const section = renderToStaticMarkup(createElement(MemoryRouter, null, createElement(DemosSection)));
if (!html.includes('</main>')) throw new Error('Homepage snapshot is missing its main element');
html = html.replace(/<!-- demos:start -->[\s\S]*?<!-- demos:end -->/g, '');
html = html.replace(/<section id="demos"[\s\S]*?<\/section>/g, '');
html = html.replace('</main>', `<!-- demos:start -->${section}<!-- demos:end --></main>`);
writeFileSync(file, html);
console.log('Homepage crawler snapshot includes the current demo cards');
