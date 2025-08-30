import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Prompt, Category } from '@/lib/types';

const promptsCollection = collection(db, 'prompts');
const categoriesCollection = collection(db, 'categories');

// Prompt functions
export const getPrompts = async (): Promise<Prompt[]> => {
  const snapshot = await getDocs(promptsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Prompt));
};

export const addPrompt = async (prompt: Omit<Prompt, 'id'>): Promise<string> => {
  const docRef = await addDoc(promptsCollection, prompt);
  return docRef.id;
};

export const updatePrompt = async (id: string, updates: Partial<Prompt>): Promise<void> => {
  const promptDoc = doc(db, 'prompts', id);
  await updateDoc(promptDoc, updates);
};

export const deletePrompt = async (id: string): Promise<void> => {
  const promptDoc = doc(db, 'prompts', id);
  await deleteDoc(promptDoc);
};

// Category functions
export const getCategories = async (): Promise<Category[]> => {
  const snapshot = await getDocs(categoriesCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
};

export const addCategory = async (category: Omit<Category, 'id'>): Promise<string> => {
  const docRef = await addDoc(categoriesCollection, category);
  return docRef.id;
};

export const deleteCategory = async (id: string): Promise<void> => {
  const batch = writeBatch(db);

  // Delete the category document
  const categoryDoc = doc(db, 'categories', id);
  batch.delete(categoryDoc);

  // Find and delete all prompts in that category
  const q = query(promptsCollection, where('category', '==', id));
  const snapshot = await getDocs(q);
  snapshot.forEach(doc => {
    batch.delete(doc.ref);
  });

  await batch.commit();
};
