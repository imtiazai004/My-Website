import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Trash2, Edit2, LogIn, LogOut, Save, UploadCloud, Briefcase, BrainCircuit, MessageSquareQuote, Activity as ActivityIcon, Eye, MousePointer2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { auth, signInWithPopup, googleProvider } from '../lib/firebase';
import { subscribeToProjects, saveProject, deleteProject, subscribeToSkills, saveSkill, deleteSkill, subscribeToTestimonials, saveTestimonial, deleteTestimonial, subscribeToActivity } from '../services/dataService';
import { Project, Skill, Testimonial } from '../types';
import { PROJECTS as INITIAL_PROJECTS, SKILLS as INITIAL_SKILLS, TESTIMONIALS as INITIAL_TESTIMONIALS } from '../constants';

type Tab = 'projects' | 'skills' | 'testimonials' | 'activity';

export default function AdminDashboard({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab ] = useState<Tab>('projects');
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      const unsubProjects = subscribeToProjects(setProjects);
      const unsubSkills = subscribeToSkills(setSkills);
      const unsubTestimonials = subscribeToTestimonials(setTestimonials);
      const unsubActivity = subscribeToActivity(setActivityLogs);
      return () => { unsubProjects(); unsubSkills(); unsubTestimonials(); unsubActivity(); };
    }
  }, [isAdmin]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLogout = () => auth.signOut();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setIsSubmitting(true);
    try {
      if (activeTab === 'projects') await saveProject(editingItem);
      if (activeTab === 'skills') await saveSkill(editingItem);
      if (activeTab === 'testimonials') await saveTestimonial(editingItem);
      setEditingItem(null);
    } catch (error) {
      console.error('Save failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(`Delete this ${activeTab.slice(0, -1)}?`)) {
      if (activeTab === 'projects') await deleteProject(id);
      if (activeTab === 'skills') await deleteSkill(id);
      if (activeTab === 'testimonials') await deleteTestimonial(id);
    }
  };

  const seedData = async () => {
    if (window.confirm(`Upload default ${activeTab} to Firestore?`)) {
      if (activeTab === 'projects') {
        for (const p of INITIAL_PROJECTS) await saveProject(p);
      } else if (activeTab === 'skills') {
        for (const s of INITIAL_SKILLS) await saveSkill(s);
      } else if (activeTab === 'testimonials') {
        for (const t of INITIAL_TESTIMONIALS) await saveTestimonial(t);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-bg/95 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-brand-surface border border-brand-border rounded-2xl w-full max-w-5xl h-[85vh] overflow-hidden flex flex-col shadow-2xl"
      >
        <div className="p-6 border-b border-brand-border flex items-center justify-between bg-brand-surface">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Soft Tech Console</h2>
            <div className="flex bg-brand-bg p-1 rounded-lg border border-brand-border">
              {(['projects', 'skills', 'testimonials', 'activity'] as Tab[]).map(t => (
                <button
                  key={t}
                  onClick={() => { setActiveTab(t); setEditingItem(null); }}
                  className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === t ? 'bg-brand-accent text-white' : 'text-brand-text-dim hover:text-white'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-brand-surface-muted rounded-lg border border-brand-border transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {!user ? (
            <div className="h-full flex flex-col items-center justify-center space-y-6">
              <LogIn className="w-12 h-12 text-brand-accent opacity-20" />
              <div className="text-center">
                <p className="text-brand-text font-bold">Authentication Required</p>
                <p className="text-brand-text-dim text-sm">Login with your verified admin email to access the console.</p>
              </div>
              <button onClick={handleLogin} className="btn-primary flex items-center gap-2 px-8">
                LOGIN WITH GOOGLE
              </button>
            </div>
          ) : !isAdmin ? (
            <div className="h-full flex flex-col items-center justify-center space-y-6 text-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
                <X className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <p className="text-brand-text font-bold text-xl uppercase tracking-widest">Unauthorized Entry</p>
                <p className="text-brand-text-dim text-sm max-w-xs mt-2">Your email ({user.email}) is not registered in the Core Admin Database.</p>
              </div>
              <button onClick={handleLogout} className="text-brand-text-dim hover:text-white flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Try different account
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tighter flex items-center gap-2">
                    {activeTab === 'projects' && <Briefcase className="w-5 h-5 text-brand-accent" />}
                    {activeTab === 'skills' && <BrainCircuit className="w-5 h-5 text-brand-accent" />}
                    {activeTab === 'testimonials' && <MessageSquareQuote className="w-5 h-5 text-brand-accent" />}
                    {activeTab === 'activity' && <ActivityIcon className="w-5 h-5 text-brand-accent" />}
                    {activeTab}_Archive
                  </h3>
                  <p className="text-xs text-brand-text-dim font-mono">Status: Secure Layer 1 Active</p>
                </div>
                {activeTab !== 'activity' && (
                  <div className="flex gap-4">
                    <button onClick={seedData} className="px-4 py-2 border border-brand-border rounded-lg text-[10px] font-bold uppercase tracking-widest hover:border-brand-accent transition-colors flex items-center gap-2 bg-brand-surface-muted">
                      <UploadCloud className="w-4 h-4" /> Sync_Defaults
                    </button>
                    <button onClick={() => setEditingItem({})} className="bg-brand-accent text-white px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-brand-accent-hover transition-colors flex items-center gap-2">
                      <Plus className="w-4 h-4" /> New_Record
                    </button>
                  </div>
                )}
              </div>

              {/* Form Render */}
              <AnimatePresence>
                {editingItem && (
                  <motion.form 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    onSubmit={handleSave}
                    className="bg-brand-bg border border-brand-accent/20 rounded-2xl p-8 space-y-6 overflow-hidden shadow-xl"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {activeTab === 'projects' && (
                        <>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">Title</label>
                            <input value={editingItem.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} className="admin-input" required />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">Category</label>
                            <select value={editingItem.category || 'SaaS'} onChange={e => setEditingItem({...editingItem, category: e.target.value})} className="admin-input" required>
                              <option>SaaS</option><option>Web App</option><option>Website</option><option>Tool</option>
                            </select>
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">Description</label>
                            <textarea value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} className="admin-input" rows={3} required />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">Image URL</label>
                            <input value={editingItem.imageUrl || ''} onChange={e => setEditingItem({...editingItem, imageUrl: e.target.value})} className="admin-input" required />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">Download URL</label>
                            <input value={editingItem.downloadUrl || ''} onChange={e => setEditingItem({...editingItem, downloadUrl: e.target.value})} className="admin-input" />
                          </div>
                        </>
                      )}
                      {activeTab === 'skills' && (
                        <>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">Skill Name</label>
                            <input value={editingItem.name || ''} onChange={e => setEditingItem({...editingItem, name: e.target.value})} className="admin-input" required />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">Level (0-100)</label>
                            <input type="number" min="0" max="100" value={editingItem.level || 0} onChange={e => setEditingItem({...editingItem, level: parseInt(e.target.value)})} className="admin-input" required />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">Lucide Icon Name</label>
                            <input value={editingItem.iconName || 'Code'} onChange={e => setEditingItem({...editingItem, iconName: e.target.value})} className="admin-input" required />
                          </div>
                        </>
                      )}
                      {activeTab === 'testimonials' && (
                        <>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">Client Name</label>
                            <input value={editingItem.name || ''} onChange={e => setEditingItem({...editingItem, name: e.target.value})} className="admin-input" required />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">Company</label>
                            <input value={editingItem.company || ''} onChange={e => setEditingItem({...editingItem, company: e.target.value})} className="admin-input" required />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">Role</label>
                            <input value={editingItem.role || ''} onChange={e => setEditingItem({...editingItem, role: e.target.value})} className="admin-input" required />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">Avatar URL</label>
                            <input value={editingItem.avatarUrl || ''} onChange={e => setEditingItem({...editingItem, avatarUrl: e.target.value})} className="admin-input" required />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest">Content</label>
                            <textarea value={editingItem.content || ''} onChange={e => setEditingItem({...editingItem, content: e.target.value})} className="admin-input" rows={4} required />
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                      <button type="button" onClick={() => setEditingItem(null)} className="text-xs font-bold text-brand-text-dim hover:text-white uppercase tracking-widest">Abort</button>
                      <button disabled={isSubmitting} className="btn-primary py-3 px-10 text-xs flex items-center gap-2">
                         <Save className="w-4 h-4" /> {isSubmitting ? 'SYNCING...' : 'SAVE_CHANGES'}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Data List Component */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeTab === 'activity' ? (
                  (activityLogs || []).map((log: any) => (
                    <div key={log.id} className="p-4 bg-brand-surface-muted border border-brand-border rounded-xl flex items-start gap-4">
                      {log.type === 'PAGE_VIEW' ? <Eye className="w-5 h-5 text-blue-400" /> : <MousePointer2 className="w-5 h-5 text-brand-accent" />}
                      <div className="flex-1 overflow-hidden">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-bold text-white tracking-widest">{log.type}</span>
                          <span className="text-[8px] text-brand-text-dim font-mono">{log.timestamp ? new Date(log.timestamp.toDate()).toLocaleString() : 'Recent'}</span>
                        </div>
                        <p className="text-[10px] text-brand-text-dim truncate">{log.path}</p>
                        {log.metadata?.projectTitle && (
                          <p className="text-[9px] text-brand-accent mt-1">Target: {log.metadata.projectTitle}</p>
                        )}
                        <div className="mt-2 text-[8px] text-brand-text-dim/50 font-mono truncate">
                           {log.metadata?.userAgent}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  (activeTab === 'projects' ? (projects || []) : activeTab === 'skills' ? (skills || []) : (testimonials || [])).map((item: any) => (
                    <div key={item.id} className="p-5 bg-brand-surface-muted border border-brand-border rounded-xl group hover:border-brand-accent transition-all flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-white">{item.title || item.name}</h4>
                        <p className="text-[10px] font-mono text-brand-text-dim uppercase tracking-wider">{item.category || `${item.level}%` || item.company}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingItem(item)} className="p-2 hover:bg-white/5 rounded-lg border border-brand-border text-brand-text-dim hover:text-white transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-500/10 rounded-lg border border-brand-border text-brand-text-dim hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        
        {user && (
          <div className="p-4 bg-brand-bg border-t border-brand-border flex items-center justify-between text-[10px] font-mono">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                <span className="text-brand-text-dim lowercase tracking-tighter">{user.email}</span>
                <span className="px-2 py-0.5 bg-brand-accent/10 text-brand-accent rounded text-[8px] font-bold uppercase tracking-widest border border-brand-accent/20">Encrypted</span>
             </div>
             <button onClick={handleLogout} className="text-brand-text-dim hover:text-red-500 flex items-center gap-2 transition-colors">
               <LogOut className="w-3 h-3" /> DE-AUTHENTICATE
             </button>
          </div>
        )}
      </motion.div>

      <style>{`
        .admin-input {
          width: 100%;
          background: #0A0A0B;
          border: 1px solid #1f2937;
          border-radius: 12px;
          padding: 10px 16px;
          font-size: 0.875rem;
          color: white;
          transition: all 0.2s;
        }
        .admin-input:focus {
          border-color: #6366F1;
          outline: none;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }
      `}</style>
    </div>
  );
}

