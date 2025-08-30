"use client";

import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight font-headline">
            Promptopia
          </h1>
        </div>
      </div>
    </header>
  );
}
