import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  LogIn, LogOut, Plus, Trash2, Edit2, Save, UploadCloud,
  Briefcase, BrainCircuit, MessageSquareQuote,
  Send, LayoutDashboard, HelpCircle, Layers, Eye,
  ArrowLeft, Terminal, XCircle, ToggleLeft, ToggleRight,
  TrendingUp, Users, MousePointer2, Mail, Globe, Monitor, Smartphone,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { auth, signInWithPopup, googleProvider } from '../lib/firebase';
import {
  subscribeToProjects, saveProject, deleteProject,
  subscribeToSkills, saveSkill, deleteSkill,
  subscribeToTestimonials, saveTestimonial, deleteTestimonial,
  subscribeToActivity, subscribeToContacts,
  subscribeToFAQs, saveFAQ, deleteFAQ,
  subscribeToSectionSettings, saveSectionSettings,
} from '../services/dataService';
import { Project, Skill, Testimonial, FAQ, SectionSettings } from '../types';
import {
  PROJECTS as INITIAL_PROJECTS, SKILLS as INITIAL_SKILLS,
  TESTIMONIALS as INITIAL_TESTIMONIALS, FAQS as INITIAL_FAQS,
  DEFAULT_SECTION_SETTINGS,
} from '../constants';

type Tab = 'overview' | 'projects' | 'skills' | 'testimonials' | 'faqs' | 'sections' | 'messages' | 'activity';

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'overview',      label: 'Overview',      icon: LayoutDashboard },
  { id: 'projects',      label: 'Projects',       icon: Briefcase },
  { id: 'testimonials',  label: 'Testimonials',   icon: MessageSquareQuote },
  { id: 'skills',        label: 'Skills',          icon: BrainCircuit },
  { id: 'faqs',          label: 'FAQs',            icon: HelpCircle },
  { id: 'sections',      label: 'Sections',        icon: Layers },
  { id: 'messages',      label: 'Messages',        icon: Send },
  { id: 'activity',      label: 'Activity',        icon: TrendingUp },
];

const SECTION_LABELS: { key: keyof SectionSettings; label: string; description: string }[] = [
  { key: 'clientLogos', label: 'Technology Strip',   description: 'Scrolling tech logos banner below the hero' },
  { key: 'about',       label: 'About Section',      description: 'Founder story, stats, and company highlights' },
  { key: 'services',    label: 'Services',           description: 'All 9 service offering cards' },
  { key: 'projects',    label: 'Projects / Portfolio', description: 'Portfolio grid and project modals' },
  { key: 'whyChooseUs', label: 'Why Choose Us',      description: '6 reason cards with detail modals' },
  { key: 'skills',      label: 'Tech Stack',         description: 'Skill bars with expandable tool lists' },
  { key: 'testimonials', label: 'Testimonials',      description: 'Scrolling testimonial columns' },
  { key: 'faq',         label: 'FAQ',                description: 'Accordion frequently asked questions' },
];

function isMobile(ua: string) {
  return /mobile|android|iphone|ipad|phone/i.test(ua);
}

function getDay(ts: any): string {
  if (!ts?.toDate) return '';
  const d = ts.toDate();
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function Analytics({ logs, contacts }: { logs: any[]; contacts: any[] }) {
  const today = new Date();
  const todayStr = `${today.getMonth() + 1}/${today.getDate()}`;

  const pageViews = logs.filter(l => l.type === 'PAGE_VIEW');
  const todayViews = pageViews.filter(l => getDay(l.timestamp) === todayStr).length;

  const mobileCount = pageViews.filter(l => isMobile(l.metadata?.userAgent || '')).length;
  const desktopCount = pageViews.length - mobileCount;

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    const label = `${d.getMonth() + 1}/${d.getDate()}`;
    return { label, count: pageViews.filter(l => getDay(l.timestamp) === label).length };
  });
  const maxCount = Math.max(...last7.map(d => d.count), 1);

  const newMessages = contacts.filter(c => c.status === 'new' || !c.status).length;

  return (
    <div className="space-y-8">
      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Eye,          label: 'Total Page Views',  value: pageViews.length,  color: 'text-blue-400' },
          { icon: TrendingUp,   label: "Today's Views",     value: todayViews,         color: 'text-emerald-400' },
          { icon: Mail,         label: 'New Messages',      value: newMessages,        color: 'text-brand-accent' },
          { icon: Users,        label: 'All Messages',      value: contacts.length,    color: 'text-purple-400' },
        ].map(({ icon: Icon, label, value, color }, i) => (
          <div key={i} className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl space-y-3">
            <Icon className={`w-5 h-5 ${color}`} />
            <p className="text-3xl font-display font-bold tracking-tighter text-white">{value}</p>
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{label}</p>
          </div>
        ))}
      </div>

      {/* Bar chart — last 7 days */}
      <div className="p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl space-y-4">
        <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Page Views — Last 7 Days</p>
        <div className="flex items-end gap-2 h-28">
          {last7.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-[9px] font-mono text-white/30">{d.count > 0 ? d.count : ''}</span>
              <div className="w-full rounded-t-md bg-brand-accent/20 relative overflow-hidden" style={{ height: `${Math.max((d.count / maxCount) * 96, 4)}px` }}>
                <div className="absolute inset-0 bg-brand-accent opacity-70" style={{ height: '100%' }} />
              </div>
              <span className="text-[8px] font-mono text-white/20">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Device split + recent visitors */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl space-y-5">
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Device Breakdown</p>
          <div className="space-y-3">
            {[
              { icon: Monitor,    label: 'Desktop', count: desktopCount, color: 'bg-brand-accent' },
              { icon: Smartphone, label: 'Mobile',  count: mobileCount,  color: 'bg-purple-500' },
            ].map(({ icon: Icon, label, count, color }, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-2 text-white/50 font-medium"><Icon className="w-3.5 h-3.5" /> {label}</span>
                  <span className="font-mono text-white/40">{count} ({pageViews.length > 0 ? Math.round(count / pageViews.length * 100) : 0}%)</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pageViews.length > 0 ? (count / pageViews.length) * 100 : 0}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl space-y-4">
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Recent Visitors</p>
          <div className="space-y-2 max-h-36 overflow-y-auto">
            {pageViews.slice(0, 8).map((log, i) => (
              <div key={i} className="flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-2 text-white/40">
                  {isMobile(log.metadata?.userAgent || '') ? <Smartphone className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
                  {log.metadata?.screen || 'Unknown'}
                </span>
                <span className="font-mono text-white/20">
                  {log.timestamp?.toDate ? new Date(log.timestamp.toDate()).toLocaleDateString() : '—'}
                </span>
              </div>
            ))}
            {pageViews.length === 0 && <p className="text-white/20 text-xs">No visitors recorded yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const [projects,        setProjects]        = useState<Project[]>([]);
  const [skills,          setSkills]          = useState<Skill[]>([]);
  const [testimonials,    setTestimonials]    = useState<Testimonial[]>([]);
  const [faqs,            setFaqs]            = useState<FAQ[]>([]);
  const [sectionSettings, setSectionSettings] = useState<SectionSettings>(DEFAULT_SECTION_SETTINGS);
  const [activityLogs,    setActivityLogs]    = useState<any[]>([]);
  const [contacts,        setContacts]        = useState<any[]>([]);

  const [editingItem,  setEditingItem]  = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savingSection, setSavingSection] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    const unsubs = [
      subscribeToProjects(setProjects),
      subscribeToSkills(setSkills),
      subscribeToTestimonials(setTestimonials),
      subscribeToFAQs(setFaqs),
      subscribeToSectionSettings(setSectionSettings),
      subscribeToActivity(setActivityLogs),
      subscribeToContacts(setContacts),
    ];
    return () => unsubs.forEach(fn => fn());
  }, [isAdmin]);

  const handleLogin = async () => {
    try { await signInWithPopup(auth, googleProvider); } catch (e) { console.error(e); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setIsSubmitting(true);
    try {
      if (activeTab === 'projects')     await saveProject(editingItem);
      if (activeTab === 'skills')       await saveSkill(editingItem);
      if (activeTab === 'testimonials') await saveTestimonial(editingItem);
      if (activeTab === 'faqs')         await saveFAQ(editingItem);
      setEditingItem(null);
    } finally { setIsSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this item?')) return;
    if (activeTab === 'projects')     await deleteProject(id);
    if (activeTab === 'skills')       await deleteSkill(id);
    if (activeTab === 'testimonials') await deleteTestimonial(id);
    if (activeTab === 'faqs')         await deleteFAQ(id);
  };

  const handleToggleSection = async (key: keyof SectionSettings) => {
    const updated = { ...sectionSettings, [key]: !sectionSettings[key] };
    setSectionSettings(updated);
    setSavingSection(true);
    await saveSectionSettings(updated);
    setSavingSection(false);
  };

  const seedData = async () => {
    if (!window.confirm('Seed default data to Firestore?')) return;
    if (activeTab === 'projects')     for (const p of INITIAL_PROJECTS)     await saveProject(p);
    if (activeTab === 'skills')       for (const s of INITIAL_SKILLS)       await saveSkill(s);
    if (activeTab === 'testimonials') for (const t of INITIAL_TESTIMONIALS) await saveTestimonial(t);
    if (activeTab === 'faqs')         for (const f of INITIAL_FAQS)         await saveFAQ(f);
  };

  const inp = "w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-accent transition-all";

  const isCrudTab = ['projects', 'skills', 'testimonials', 'faqs'].includes(activeTab);
  const crudItems = activeTab === 'projects' ? projects : activeTab === 'skills' ? skills : activeTab === 'testimonials' ? testimonials : faqs;

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col">

      {/* Header */}
      <header className="border-b border-white/5 bg-[#0d1117]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-white/30 hover:text-white transition-colors text-[11px] font-mono font-bold uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" /> Back to Site
            </Link>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-brand-accent" />
              <span className="font-display font-bold tracking-tight">Soft Tech Console</span>
            </div>
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
                <span className="text-[11px] font-mono text-white/40">{user.email}</span>
              </div>
              <button onClick={() => auth.signOut()} className="flex items-center gap-2 text-[11px] font-mono text-white/30 hover:text-red-400 transition-colors">
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Login screen */}
      {!user ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-8 max-w-sm mx-auto px-6">
            <div className="w-20 h-20 rounded-3xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mx-auto">
              <Terminal className="w-10 h-10 text-brand-accent" />
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-display font-bold">Admin Access</h1>
              <p className="text-white/40 leading-relaxed text-sm">Sign in with your authorised Google account to access the dashboard.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              className="w-full py-4 bg-brand-accent text-white font-bold uppercase tracking-widest text-[11px] rounded-2xl hover:bg-indigo-400 transition-all flex items-center justify-center gap-3"
            >
              <LogIn className="w-4 h-4" /> Sign in with Google
            </motion.button>
            <p className="text-white/20 text-[11px]">Access restricted to registered admin accounts only.</p>
          </div>
        </div>

      ) : !isAdmin ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6 max-w-sm mx-auto px-6">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <p className="font-bold text-xl">Unauthorised</p>
              <p className="text-white/40 text-sm mt-2">{user.email} does not have admin access.</p>
            </div>
            <button onClick={() => auth.signOut()} className="text-white/40 hover:text-white text-sm flex items-center gap-2 mx-auto transition-colors">
              <LogOut className="w-4 h-4" /> Try a different account
            </button>
          </div>
        </div>

      ) : (
        <div className="flex-1 flex">

          {/* Sidebar */}
          <aside className="w-52 border-r border-white/5 bg-[#0d1117] shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="p-3 space-y-0.5">
              {TABS.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setEditingItem(null); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${
                      activeTab === tab.id
                        ? 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20'
                        : 'text-white/30 hover:text-white hover:bg-white/[0.03] border border-transparent'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" /> {tab.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-4xl space-y-8">

              {/* ── Overview ── */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-display font-bold">Analytics Overview</h2>
                    <p className="text-white/30 text-sm mt-1">Live data from your website visitors and messages.</p>
                  </div>
                  <Analytics logs={activityLogs} contacts={contacts} />

                  {/* Quick access */}
                  <div className="p-5 bg-white/[0.02] border border-white/[0.06] rounded-2xl space-y-3">
                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Quick Access</p>
                    <div className="flex flex-wrap gap-2">
                      {(['projects', 'testimonials', 'faqs', 'sections'] as Tab[]).map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)}
                          className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-xl text-brand-accent text-[10px] font-bold uppercase tracking-widest hover:bg-brand-accent/20 transition-all capitalize">
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Section Toggles ── */}
              {activeTab === 'sections' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-display font-bold">Section Visibility</h2>
                      <p className="text-white/30 text-sm mt-1">Toggle sections on/off. Changes go live instantly.</p>
                    </div>
                    {savingSection && <span className="text-[11px] font-mono text-brand-accent animate-pulse">Saving…</span>}
                  </div>
                  <div className="space-y-3">
                    {SECTION_LABELS.map(({ key, label, description }) => {
                      const enabled = sectionSettings[key];
                      return (
                        <div key={key} className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${enabled ? 'border-white/[0.08] bg-white/[0.03]' : 'border-white/[0.04] bg-transparent opacity-50'}`}>
                          <div>
                            <p className="font-medium text-white text-sm">{label}</p>
                            <p className="text-[11px] text-white/30 mt-0.5">{description}</p>
                          </div>
                          <button onClick={() => handleToggleSection(key)} className="shrink-0 ml-6">
                            {enabled
                              ? <ToggleRight className="w-8 h-8 text-brand-accent" />
                              : <ToggleLeft className="w-8 h-8 text-white/20" />}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── CRUD tabs ── */}
              {isCrudTab && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-display font-bold capitalize">{activeTab}</h2>
                      <p className="text-white/30 text-sm mt-1">{(crudItems as any[]).length} items</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={seedData} className="px-4 py-2 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/40 hover:border-brand-accent hover:text-white transition-all flex items-center gap-2">
                        <UploadCloud className="w-4 h-4" /> Seed Defaults
                      </button>
                      <button onClick={() => setEditingItem({})} className="px-4 py-2 bg-brand-accent text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-400 transition-all flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add New
                      </button>
                    </div>
                  </div>

                  {/* Form */}
                  <AnimatePresence>
                    {editingItem && (
                      <motion.form
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        onSubmit={handleSave}
                        className="bg-brand-accent/5 border border-brand-accent/20 rounded-2xl p-6 space-y-4 overflow-hidden"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {activeTab === 'projects' && (<>
                            <div><label className="lbl">Title</label><input className={inp} value={editingItem.title||''} onChange={e=>setEditingItem({...editingItem,title:e.target.value})} required /></div>
                            <div><label className="lbl">Category</label>
                              <select className={inp} value={editingItem.category||'SaaS'} onChange={e=>setEditingItem({...editingItem,category:e.target.value})}>
                                <option>SaaS</option><option>Web App</option><option>Website</option><option>Tool</option><option>Desktop App</option>
                              </select>
                            </div>
                            <div className="md:col-span-2"><label className="lbl">Description</label><textarea className={inp} rows={3} value={editingItem.description||''} onChange={e=>setEditingItem({...editingItem,description:e.target.value})} required /></div>
                            <div><label className="lbl">Image URL</label><input className={inp} value={editingItem.imageUrl||''} onChange={e=>setEditingItem({...editingItem,imageUrl:e.target.value})} required /></div>
                            <div><label className="lbl">Tags (comma-separated)</label><input className={inp} value={Array.isArray(editingItem.tags)?editingItem.tags.join(', '):(editingItem.tags||'')} onChange={e=>setEditingItem({...editingItem,tags:e.target.value.split(',').map((t:string)=>t.trim())})} /></div>
                            <div><label className="lbl">Live Demo URL</label><input className={inp} value={editingItem.demoUrl||''} onChange={e=>setEditingItem({...editingItem,demoUrl:e.target.value})} /></div>
                            <div><label className="lbl">Source / Download URL</label><input className={inp} value={editingItem.downloadUrl||''} onChange={e=>setEditingItem({...editingItem,downloadUrl:e.target.value})} /></div>
                          </>)}
                          {activeTab === 'skills' && (<>
                            <div><label className="lbl">Skill Name</label><input className={inp} value={editingItem.name||''} onChange={e=>setEditingItem({...editingItem,name:e.target.value})} required /></div>
                            <div><label className="lbl">Level (0–100)</label><input type="number" min={0} max={100} className={inp} value={editingItem.level||0} onChange={e=>setEditingItem({...editingItem,level:parseInt(e.target.value)})} required /></div>
                            <div><label className="lbl">Lucide Icon Name</label><input className={inp} value={editingItem.iconName||'Code'} onChange={e=>setEditingItem({...editingItem,iconName:e.target.value})} required /></div>
                          </>)}
                          {activeTab === 'testimonials' && (<>
                            <div><label className="lbl">Full Name</label><input className={inp} value={editingItem.name||''} onChange={e=>setEditingItem({...editingItem,name:e.target.value})} required /></div>
                            <div><label className="lbl">Company</label><input className={inp} value={editingItem.company||''} onChange={e=>setEditingItem({...editingItem,company:e.target.value})} required /></div>
                            <div><label className="lbl">Role / Title</label><input className={inp} value={editingItem.role||''} onChange={e=>setEditingItem({...editingItem,role:e.target.value})} required /></div>
                            <div><label className="lbl">Avatar URL</label><input className={inp} value={editingItem.avatarUrl||''} onChange={e=>setEditingItem({...editingItem,avatarUrl:e.target.value})} /></div>
                            <div className="md:col-span-2"><label className="lbl">Testimonial Text</label><textarea className={inp} rows={4} value={editingItem.content||''} onChange={e=>setEditingItem({...editingItem,content:e.target.value})} required /></div>
                          </>)}
                          {activeTab === 'faqs' && (<>
                            <div className="md:col-span-2"><label className="lbl">Question</label><input className={inp} value={editingItem.question||''} onChange={e=>setEditingItem({...editingItem,question:e.target.value})} required /></div>
                            <div className="md:col-span-2"><label className="lbl">Answer</label><textarea className={inp} rows={4} value={editingItem.answer||''} onChange={e=>setEditingItem({...editingItem,answer:e.target.value})} required /></div>
                            <div><label className="lbl">Display Order</label><input type="number" className={inp} value={editingItem.order||1} onChange={e=>setEditingItem({...editingItem,order:parseInt(e.target.value)})} /></div>
                          </>)}
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                          <button type="button" onClick={()=>setEditingItem(null)} className="text-xs font-bold text-white/30 hover:text-white uppercase tracking-widest transition-colors">Cancel</button>
                          <button disabled={isSubmitting} className="px-6 py-2.5 bg-brand-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-400 transition-all flex items-center gap-2 disabled:opacity-50">
                            <Save className="w-3.5 h-3.5" /> {isSubmitting ? 'Saving…' : 'Save'}
                          </button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>

                  {/* List */}
                  <div className="space-y-2">
                    {(crudItems as any[]).map((item, i) => (
                      <div key={item.id||i} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:border-white/10 transition-all group">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm text-white truncate">{item.title || item.name || item.question}</p>
                          <p className="text-[10px] font-mono text-white/30 mt-0.5 uppercase tracking-widest">
                            {item.category || (item.level !== undefined ? `${item.level}%` : '') || item.company || (item.order !== undefined ? `Order #${item.order}` : '')}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={()=>setEditingItem(item)} className="p-2 hover:bg-white/5 rounded-lg border border-white/10 text-white/40 hover:text-white transition-all">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={()=>handleDelete(item.id)} className="p-2 hover:bg-red-500/10 rounded-lg border border-white/10 text-white/40 hover:text-red-400 transition-all">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {(crudItems as any[]).length === 0 && (
                      <div className="text-center py-12 text-white/20 text-sm">No items yet. Click "Add New" or "Seed Defaults".</div>
                    )}
                  </div>
                </div>
              )}

              {/* ── Messages ── */}
              {activeTab === 'messages' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-display font-bold">Messages</h2>
                    <p className="text-white/30 text-sm mt-1">{contacts.length} contact submissions received</p>
                  </div>
                  <div className="space-y-3">
                    {contacts.map((c: any, i: number) => (
                      <div key={c.id||i} className="p-5 bg-white/[0.02] border border-white/[0.06] rounded-2xl space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-brand-accent text-sm font-bold">{c.email}</p>
                            <p className="text-[10px] font-mono text-white/25 mt-0.5">
                              {c.createdAt?.toDate ? new Date(c.createdAt.toDate()).toLocaleString() : 'Recent'}
                            </p>
                          </div>
                          <span className="shrink-0 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full text-[9px] font-bold uppercase tracking-widest border border-emerald-500/20">
                            {c.status || 'NEW'}
                          </span>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed">{c.message}</p>
                      </div>
                    ))}
                    {contacts.length === 0 && <div className="text-center py-12 text-white/20 text-sm">No messages yet.</div>}
                  </div>
                </div>
              )}

              {/* ── Activity log ── */}
              {activeTab === 'activity' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-display font-bold">Activity Log</h2>
                    <p className="text-white/30 text-sm mt-1">Last 100 visitor events</p>
                  </div>
                  <div className="space-y-1.5">
                    {activityLogs.map((log: any, i: number) => (
                      <div key={log.id||i} className="flex items-center gap-4 p-3.5 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                        {log.type === 'PAGE_VIEW'
                          ? <Eye className="w-4 h-4 text-blue-400 shrink-0" />
                          : <MousePointer2 className="w-4 h-4 text-brand-accent shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-bold text-white uppercase tracking-widest">{log.type}</p>
                          <p className="text-[10px] text-white/25 font-mono truncate">{log.metadata?.screen} · {log.metadata?.userAgent?.slice(0, 60)}</p>
                        </div>
                        <span className="text-[9px] text-white/20 font-mono shrink-0">
                          {log.timestamp?.toDate ? new Date(log.timestamp.toDate()).toLocaleString() : '—'}
                        </span>
                      </div>
                    ))}
                    {activityLogs.length === 0 && <div className="text-center py-12 text-white/20 text-sm">No activity recorded yet.</div>}
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
      )}

      <style>{`
        .lbl { display:block; font-size:10px; font-weight:700; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:0.2em; margin-bottom:8px; }
      `}</style>
    </div>
  );
}
