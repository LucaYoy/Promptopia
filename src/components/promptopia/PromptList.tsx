"use client";

import type { Prompt, Category } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PromptCard from '@/components/promptopia/PromptCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart, Archive } from 'lucide-react';

type PromptListProps = {
  prompts: Prompt[];
  favoritePrompts: Prompt[];
  categories: Category[];
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function PromptList({
  prompts,
  favoritePrompts,
  categories,
  onToggleFavorite,
  onDelete,
}: PromptListProps) {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
        <TabsTrigger value="all">All Prompts</TabsTrigger>
        <TabsTrigger value="favorites">Favorites</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="mt-6">
        <div className="space-y-8">
          {categories.map((category) => {
            const categoryPrompts = prompts.filter(p => p.category === category.id);
            if (categoryPrompts.length === 0) return null;

            const CategoryIcon = category.icon;

            return (
              <div key={category.id}>
                <div className="flex items-center gap-3 mb-4">
                  <CategoryIcon className="h-6 w-6 text-muted-foreground" />
                  <h2 className="text-xl font-semibold tracking-tight font-headline text-foreground">
                    {category.name}
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categoryPrompts.map((prompt) => (
                    <PromptCard
                      key={prompt.id}
                      prompt={prompt}
                      onToggleFavorite={onToggleFavorite}
                      onDelete={onDelete}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </TabsContent>
      <TabsContent value="favorites" className="mt-6">
        {favoritePrompts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {favoritePrompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                onToggleFavorite={onToggleFavorite}
                onDelete={onDelete}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border text-center p-12 min-h-[300px]">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">No Favorites Yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Click the heart on any prompt to save it here.
            </p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
