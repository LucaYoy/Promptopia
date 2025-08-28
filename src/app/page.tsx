"use client";

import type { FormEvent } from "react";
import React, { useState, useMemo } from 'react';
import type { Prompt, Category } from '@/lib/types';
import Header from '@/components/promptopia/Header';
import NewPromptCard from '@/components/promptopia/NewPromptCard';
import PromptList from '@/components/promptopia/PromptList';
import ManageCategoriesButton from '@/components/promptopia/ManageCategoriesButton';
import { PenSquare, Megaphone, Code2, Zap, Gamepad2 } from 'lucide-react';

const initialCategories: Category[] = [
  { id: 'writing', name: 'Writing', icon: PenSquare },
  { id: 'marketing', name: 'Marketing', icon: Megaphone },
  { id: 'coding', name: 'Coding', icon: Code2 },
  { id: 'productivity', name: 'Productivity', icon: Zap },
  { id: 'fun', name: 'Fun', icon: Gamepad2 },
];

const initialPrompts: Prompt[] = [
  {
    id: '1',
    title: 'Blog Post Idea Generator',
    content: 'Generate 5 blog post ideas for a blog about {topic}. The ideas should be catchy, relevant, and SEO-friendly.',
    category: 'writing',
    favorite: true,
  },
  {
    id: '2',
    title: 'React Component Boilerplate',
    content: 'Create a functional React component called `{componentName}` with TypeScript. It should accept the following props: {props}. Include basic styling with Tailwind CSS.',
    category: 'coding',
    favorite: false,
  },
  {
    id: '3',
    title: 'Ad Copy for Social Media',
    content: 'Write 3 versions of ad copy for a new {product} on {platform}. The target audience is {audience}, and the key benefit is {benefit}.',
    category: 'marketing',
    favorite: true,
  },
  {
    id: '4',
    title: 'Meeting Summary',
    content: 'Summarize the following meeting transcript into key bullet points, action items, and decisions made. Transcript: {transcript}',
    category: 'productivity',
    favorite: false,
  },
];


export default function Home() {
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const handleAddPrompt = (newPrompt: Omit<Prompt, 'id' | 'favorite'>) => {
    setPrompts(prev => [
      { ...newPrompt, id: Date.now().toString(), favorite: false },
      ...prev,
    ]);
  };

  const handleDeletePrompt = (id: string) => {
    setPrompts(prev => prev.filter(p => p.id !== id));
  };

  const handleToggleFavorite = (id: string) => {
    setPrompts(prev =>
      prev.map(p => (p.id === id ? { ...p, favorite: !p.favorite } : p))
    );
  };

  const handleAddCategory = (category: Category) => {
    const newCategory: Category = {
      ...category,
      id: category.name.toLowerCase().replace(/\s+/g, '-'),
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    // Also delete prompts associated with this category
    setPrompts(prev => prev.filter(p => p.category !== id));
  };

  const favoritePrompts = useMemo(() => prompts.filter(p => p.favorite), [prompts]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
            <div className="flex justify-between items-start">
              <NewPromptCard categories={categories} onAddPrompt={handleAddPrompt} />
              <div className="ml-4">
                  <ManageCategoriesButton
                    categories={categories}
                    onAddCategory={handleAddCategory}
                    onDeleteCategory={handleDeleteCategory}
                  />
              </div>
            </div>
          <div className="mt-12">
            <PromptList
              prompts={prompts}
              favoritePrompts={favoritePrompts}
              categories={categories}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDeletePrompt}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
