"use client";

import { motion } from 'framer-motion';
import { Heart, Trash2 } from 'lucide-react';
import type { Prompt } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast"

type PromptCardProps = {
  prompt: Prompt;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function PromptCard({ prompt, onToggleFavorite, onDelete }: PromptCardProps) {
    const { toast } = useToast()

    const handleDelete = () => {
        onDelete(prompt.id);
        toast({
            title: "Prompt Deleted",
            description: `"${prompt.title}" has been removed.` ,
            variant: "destructive",
        });
    }

  return (
    <div className="prompt-card h-full shadow-md hover:shadow-lg transition-shadow duration-300">
      <Card className="relative z-10 flex flex-col h-full bg-card rounded-lg">
        <CardHeader>
          <CardTitle className="font-headline">{prompt.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground break-words">{prompt.content}</p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label={prompt.favorite ? 'Remove from favorites' : 'Add to favorites'}
            onClick={() => onToggleFavorite(prompt.id)}
          >
            <Heart className={cn(
              "h-5 w-5 transition-all duration-300",
              prompt.favorite ? "text-red-500 fill-current" : "text-muted-foreground"
            )} />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Delete prompt">
                <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive transition-colors duration-300" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the prompt
                  <span className="font-semibold"> "{prompt.title}"</span>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
