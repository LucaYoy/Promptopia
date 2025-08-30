"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Settings, Plus, Trash2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import type { Category } from '@/lib/types';
import { IconPicker, availableIcons } from './IconPicker';
import { ScrollArea } from '../ui/scroll-area';

const formSchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters long.'),
  icon: z.string().min(1, 'Please select an icon.'),
});

type ManageCategoriesButtonProps = {
  categories: Category[];
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  onDeleteCategory: (id: string) => void;
};

export default function ManageCategoriesButton({
  categories,
  onAddCategory,
  onDeleteCategory,
}: ManageCategoriesButtonProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      icon: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (categories.some(c => c.name.toLowerCase() === values.name.toLowerCase())) {
        form.setError('name', { type: 'custom', message: 'Category name must be unique.' });
        return;
    }
    onAddCategory({ name: values.name, icon: values.icon });
    toast({
      title: 'Category Added',
      description: `"${values.name}" has been added.`,
    });
    form.reset();
    setShowAddForm(false);
  };

  const handleDelete = (id: string, name: string) => {
    onDeleteCategory(id);
    toast({
      title: 'Category Deleted',
      description: `"${name}" and all its prompts have been removed.`,
      variant: 'destructive',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Manage Categories
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Categories</DialogTitle>
          <DialogDescription>
            Add, or remove prompt categories.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-60 pr-4">
          <div className="space-y-4 py-4">
            {categories.map((category) => {
              const iconName = category.icon as string;
              const CategoryIcon = availableIcons.find(
                (i) => i.name === iconName
              )?.component;

              if (!CategoryIcon) return null;

              return (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                    <span>{category.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(category.id, category.name)}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {showAddForm ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Category Name</FormLabel>
                    <FormControl>
                      <div className="input-focus-gradient">
                        <Input placeholder="e.g., Education" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <div className="select-open-gradient">
                        <IconPicker onIconSelect={field.onChange} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                <Button type="submit">Save Category</Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
