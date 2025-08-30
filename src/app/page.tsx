
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import type { Prompt, Category } from '@/lib/types';
import Header from '@/components/promptopia/Header';
import NewPromptCard from '@/components/promptopia/NewPromptCard';
import PromptList from '@/components/promptopia/PromptList';
import ManageCategoriesButton from '@/components/promptopia/ManageCategoriesButton';
import {
  addCategory as dbAddCategory,
  deleteCategory as dbDeleteCategory,
  getCategories,
  addPrompt as dbAddPrompt,
  deletePrompt as dbDeletePrompt,
  getPrompts,
  updatePrompt,
} from '@/services/firestore';
import { PenSquare } from 'lucide-react';

export default function Home() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedPrompts, fetchedCategories] = await Promise.all([
          getPrompts(),
          getCategories(),
        ]);
        setPrompts(fetchedPrompts);
        
        // If no categories are fetched, create a default one.
        if (fetchedCategories.length === 0) {
          const defaultCategory = { name: 'Writing', icon: 'PenSquare' };
          const newCategoryId = await dbAddCategory(defaultCategory);
          setCategories([{ ...defaultCategory, id: newCategoryId }]);
        } else {
          setCategories(fetchedCategories);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddPrompt = async (newPrompt: Omit<Prompt, 'id' | 'favorite'>) => {
    try {
      const newPromptId = await dbAddPrompt({ ...newPrompt, favorite: false });
      setPrompts(prev => [
        { ...newPrompt, id: newPromptId, favorite: false },
        ...prev,
      ]);
    } catch (error) {
      console.error("Error adding prompt: ", error);
    }
  };

  const handleDeletePrompt = async (id: string) => {
    try {
      await dbDeletePrompt(id);
      setPrompts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error deleting prompt: ", error);
    }
  };

  const handleToggleFavorite = async (id: string) => {
    const promptToUpdate = prompts.find(p => p.id === id);
    if (!promptToUpdate) return;
    
    const updatedFavoriteStatus = !promptToUpdate.favorite;
    
    try {
      await updatePrompt(id, { favorite: updatedFavoriteStatus });
      setPrompts(prev =>
        prev.map(p => (p.id === id ? { ...p, favorite: updatedFavoriteStatus } : p))
      );
    } catch (error) {
      console.error("Error toggling favorite: ", error);
    }
  };

  const handleAddCategory = async (category: Omit<Category, 'id'>) => {
    try {
      const newCategoryId = await dbAddCategory(category);
      setCategories(prev => [...prev, { ...category, id: newCategoryId }]);
    } catch (error) {
      console.error("Error adding category: ", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await dbDeleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
      // Also delete prompts associated with this category
      setPrompts(prev => prev.filter(p => p.category !== id));
    } catch (error) {
      console.error("Error deleting category: ", error);
    }
  };

  const favoritePrompts = useMemo(() => prompts.filter(p => p.favorite), [prompts]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
            <NewPromptCard categories={categories} onAddPrompt={handleAddPrompt} />
            <div className="flex justify-start pt-4">
                <ManageCategoriesButton
                  categories={categories}
                  onAddCategory={handleAddCategory}
                  onDeleteCategory={handleDeleteCategory}
                />
            </div>
          <div className="mt-12">
            {loading ? (
              <p>Loading...</p> 
            ) : (
              <PromptList
                prompts={prompts}
                favoritePrompts={favoritePrompts}
                categories={categories}
                onToggleFavorite={handleToggleFavorite}
                onDelete={handleDeletePrompt}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
