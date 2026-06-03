import { collection, query, orderBy, onSnapshot, doc, setDoc, deleteDoc, Timestamp, addDoc, serverTimestamp, limit } from 'firebase/firestore';
import { db, handleFirestoreError } from '../lib/firebase';
import { Project, Testimonial, Skill, FAQ, SectionSettings } from '../types';
import { DEFAULT_SECTION_SETTINGS } from '../constants';

export const subscribeToProjects = (callback: (projects: Project[]) => void) => {
  const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Project));
    callback(projects);
  }, (error) => handleFirestoreError(error, 'list', 'projects'));
};

export const subscribeToTestimonials = (callback: (testimonials: Testimonial[]) => void) => {
  const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const testimonials = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Testimonial));
    callback(testimonials);
  }, (error) => handleFirestoreError(error, 'list', 'testimonials'));
};

export const subscribeToSkills = (callback: (skills: Skill[]) => void) => {
  const q = query(collection(db, 'skills'), orderBy('order', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const skills = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data
      } as any as Skill;
    });
    callback(skills);
  }, (error) => handleFirestoreError(error, 'list', 'skills'));
};

export const saveProject = async (project: any) => {
  try {
    const { id, ...fields } = project;
    const data = {
      ...fields,
      updatedAt: serverTimestamp(),
      createdAt: id ? (fields.createdAt || serverTimestamp()) : serverTimestamp(),
    };
    if (id) {
      await setDoc(doc(db, 'projects', id), data);
    } else {
      await addDoc(collection(db, 'projects'), data);
    }
  } catch (error) {
    handleFirestoreError(error, project.id ? 'update' : 'create', `projects/${project.id || 'new'}`);
  }
};

export const deleteProject = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'projects', id));
  } catch (error) {
    handleFirestoreError(error, 'delete', `projects/${id}`);
  }
};

export const saveSkill = async (skill: Partial<Skill> & { id?: string }) => {
  try {
    const { id, ...fields } = skill;
    if (id) {
      await setDoc(doc(db, 'skills', id), fields);
    } else {
      await addDoc(collection(db, 'skills'), fields);
    }
  } catch (error) {
    handleFirestoreError(error, skill.id ? 'update' : 'create', `skills/${skill.id || 'new'}`);
  }
};

export const deleteSkill = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'skills', id));
  } catch (error) {
    handleFirestoreError(error, 'delete', `skills/${id}`);
  }
};

export const saveTestimonial = async (testimonial: any) => {
  try {
    const { id, ...fields } = testimonial;
    const data = {
      ...fields,
      createdAt: id ? (fields.createdAt || serverTimestamp()) : serverTimestamp(),
    };
    if (id) {
      await setDoc(doc(db, 'testimonials', id), data);
    } else {
      await addDoc(collection(db, 'testimonials'), data);
    }
  } catch (error) {
    handleFirestoreError(error, testimonial.id ? 'update' : 'create', `testimonials/${testimonial.id || 'new'}`);
  }
};

export const deleteTestimonial = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'testimonials', id));
  } catch (error) {
    handleFirestoreError(error, 'delete', `testimonials/${id}`);
  }
};

export const trackActivity = async (type: string, metadata: any = {}) => {
  try {
    await addDoc(collection(db, 'activity'), {
      type,
      path: window.location.pathname,
      timestamp: serverTimestamp(),
      metadata: {
        ...metadata,
        userAgent: navigator.userAgent,
        screen: `${window.innerWidth}x${window.innerHeight}`
      }
    });
  } catch (error) {
    // Fail silently for tracker to avoid UX impact
    console.error('Tracking failed', error);
  }
};

export const subscribeToActivity = (callback: (logs: any[]) => void) => {
  const q = query(collection(db, 'activity'), orderBy('timestamp', 'desc'), limit(100));
  return onSnapshot(q, (snapshot) => {
    const logs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(logs);
  });
};

export const sendContactMessage = async (email: string, message: string) => {
  try {
    await addDoc(collection(db, 'contacts'), {
      email,
      message,
      status: 'new',
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, 'create', 'contacts');
  }
};

export const subscribeToFAQs = (callback: (faqs: FAQ[]) => void) => {
  const q = query(collection(db, 'faqs'), orderBy('order', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const faqs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as FAQ));
    callback(faqs);
  }, (error) => handleFirestoreError(error, 'list', 'faqs'));
};

export const saveFAQ = async (faq: Partial<FAQ> & { id?: string }) => {
  try {
    const { id, ...fields } = faq;
    if (id) {
      await setDoc(doc(db, 'faqs', id), fields);
    } else {
      await addDoc(collection(db, 'faqs'), fields);
    }
  } catch (error) {
    handleFirestoreError(error, faq.id ? 'update' : 'create', `faqs/${faq.id || 'new'}`);
  }
};

export const deleteFAQ = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'faqs', id));
  } catch (error) {
    handleFirestoreError(error, 'delete', `faqs/${id}`);
  }
};

export const subscribeToSectionSettings = (callback: (settings: SectionSettings) => void) => {
  return onSnapshot(doc(db, 'settings', 'sections'), (snap) => {
    callback(snap.exists() ? (snap.data() as SectionSettings) : DEFAULT_SECTION_SETTINGS);
  });
};

export const saveSectionSettings = async (settings: SectionSettings) => {
  try {
    await setDoc(doc(db, 'settings', 'sections'), settings);
  } catch (error) {
    handleFirestoreError(error, 'update', 'settings/sections');
  }
};

export const subscribeToContacts = (callback: (contacts: any[]) => void) => {
  const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const contacts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(contacts);
  }, (error) => handleFirestoreError(error, 'list', 'contacts'));
};
