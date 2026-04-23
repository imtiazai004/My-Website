export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'SaaS' | 'Web App' | 'Website' | 'Tool';
  tags: string[];
  imageUrl: string;
  demoUrl: string;
  downloadUrl?: string;
  stats?: { label: string; value: string }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  iconName: string;
}
