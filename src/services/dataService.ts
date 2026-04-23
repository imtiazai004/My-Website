import { collection, query, orderBy, onSnapshot, doc, setDoc, deleteDoc, Timestamp, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError } from '../lib/firebase';
import { Project, Testimonial, Skill } from '../types';

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
    const skills = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Skill));
    callback(skills);
  }, (error) => handleFirestoreError(error, 'list', 'skills'));
};

export const saveProject = async (project: Partial<Project>) => {
  try {
    const data = {
      ...project,
      updatedAt: serverTimestamp(),
      createdAt: project.id ? (project.createdAt || serverTimestamp()) : serverTimestamp(),
    };
    if (project.id) {
      await setDoc(doc(db, 'projects', project.id), data);
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
    const data = { ...skill };
    if (skill.id) {
      await setDoc(doc(db, 'skills', skill.id), data);
    } else {
      await addDoc(collection(db, 'skills'), data);
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

export const saveTestimonial = async (testimonial: Partial<Testimonial> & { id?: string }) => {
  try {
    const data = {
      ...testimonial,
      createdAt: testimonial.id ? (testimonial.createdAt || serverTimestamp()) : serverTimestamp(),
    };
    if (testimonial.id) {
      await setDoc(doc(db, 'testimonials', testimonial.id), data);
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
