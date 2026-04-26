import { Project, Testimonial, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'SoftFlow SaaS',
    description: 'A comprehensive project management tool designed for teams to sync their workflow with high-performance architecture. Featuring real-time collaboration and AI-powered task prioritization.',
    category: 'SaaS',
    tags: ['React', 'Node.js', 'PostgreSQL', 'AI'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    demoUrl: '#',
    downloadUrl: '#',
    stats: [{ label: 'Users', value: '10k+' }, { label: 'Uptime', value: '99.9%' }]
  },
  {
    id: '2',
    title: 'ZenEngine Web App',
    description: 'An immersive focus and meditation application that uses generative soundscapes to enhance productivity. Designed for deep work sessions.',
    category: 'Web App',
    tags: ['Next.js', 'WebAudio API', 'Framer Motion'],
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop',
    demoUrl: '#',
    downloadUrl: '#',
    stats: [{ label: 'Sessions', value: '50k+' }, { label: 'Rating', value: '4.9/5' }]
  },
  {
    id: '3',
    title: 'Pulse Analytics Tool',
    description: 'A light-weight, high-performance analytics dashboard that provides real-time insights into user behavior without compromising privacy.',
    category: 'Tool',
    tags: ['TypeScript', 'D3.js', 'Redis'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bbda38a6fba1?q=80&w=2070&auto=format&fit=crop',
    demoUrl: '#',
    downloadUrl: '#',
    stats: [{ label: 'Latency', value: '<50ms' }, { label: 'Data Points', value: '1M/day' }]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Product Lead',
    company: 'TechFlow',
    content: 'The level of technical precision and creative flair brought to our project was exceptional. The results exceeded our expectations both in performance and design.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Marcus Thorne',
    role: 'Founder',
    company: 'SoftFlow Systems',
    content: "Working with Soft Tech Solution is a different experience. They don't just build features; they create experiences that resonate with users.",
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop'
  }
];

export const SKILLS: Skill[] = [
  { name: 'TypeScript/Frontend', level: 95, iconName: 'Code' },
  { name: 'Full-stack Node.js', level: 90, iconName: 'Server' },
  { name: 'AI Integration', level: 85, iconName: 'Brain' },
  { name: 'UI/UX & Motion', level: 92, iconName: 'Layers' },
  { name: 'Performance Optimization', level: 88, iconName: 'Zap' }
];
