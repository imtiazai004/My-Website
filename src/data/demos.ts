export interface Demo {
  id: string;
  client: string;
  title: string;
  description: string;
  category: string;
  url: string;
  /** If set, the demo is passcode-gated. The passcode itself is never shown publicly. */
  passcodeProtected?: boolean;
  dateAdded: string;
  featured?: boolean;
  /** Gradient classes for the card thumbnail */
  gradient: string;
}

export const DEMOS: Demo[] = [
  {
    id: 'family-dental-3d-immersive',
    client: 'Family Dental & Aesthetic Clinic',
    title: 'Immersive 3D Website',
    description:
      'A cinematic 3D scroll experience — take a tooth apart layer by layer, explore treatments in interactive 3D, and book through an on-page assistant.',
    category: '3D Experience',
    url: 'https://family-dental-clinic-3d-website-wit.vercel.app/',
    dateAdded: '8 Oct 2026',
    featured: true,
    gradient: 'from-indigo-500 via-purple-500 to-fuchsia-500',
  },
  {
    id: 'family-dental-simple',
    client: 'Family Dental & Aesthetic Clinic',
    title: 'Simple Website',
    description:
      'Clean and fast clinic website — home, about, services with 15 treatment pages, reviews and contact, with a chat booking assistant built in.',
    category: 'Business Website',
    url: 'https://flourishing-figolla-d8bb17.netlify.app/',
    dateAdded: '8 Oct 2026',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
  },
];
