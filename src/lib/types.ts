import type { LucideIcon } from 'lucide-react';

export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  favorite: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string | LucideIcon;
}
