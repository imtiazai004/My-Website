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
    id: 'family-dental-3d',
    client: 'Family Dental & Aesthetic Clinic',
    title: 'Business Website Demo',
    description:
      'Complete clinic website — home, services with 12 detailed treatment pages, about, contact, reviews and WhatsApp booking built in.',
    category: 'Business Website',
    url: 'https://aisofttechsolution.com/demos/family-dental-3d/',
    passcodeProtected: true,
    dateAdded: '6 Oct 2026',
    gradient: 'from-sky-500 via-brand-accent to-blue-600',
  },
];
