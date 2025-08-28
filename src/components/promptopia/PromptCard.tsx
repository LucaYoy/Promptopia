
"use client";

import { useState } from 'react';
import { Heart, Trash2, ChevronDown, ChevronUp, ClipboardCopy } from 'lucide-react';
import type { Prompt } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
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
    const [isExpanded, setIsExpanded] = useState(false);

    const handleDelete = () => {
        onDelete(prompt.id);
        toast({
            title: "Prompt Deleted",
            description: `"${prompt.title}" has been removed.` ,
            variant: "destructive",
        });
    }

    const handleCopy = () => {
      navigator.clipboard.writeText(prompt.content);
      toast({
        title: "Prompt Copied!",
        description: "The prompt content has been copied to your clipboard.",
      });
    };

    const promptTooLong = prompt.content.length > 150;

  return (
      <Card className="prompt-card h-full shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative flex flex-col h-full bg-card rounded-md z-10">
            <CardHeader>
            <CardTitle className="font-headline">{prompt.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className={cn(
                "text-sm text-muted-foreground break-words",
                !isExpanded && promptTooLong && "line-clamp-3"
              )}>
                {prompt.content}
              </p>
               {promptTooLong && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-primary text-sm font-semibold hover:underline mt-2 flex items-center gap-1"
                >
                  {isExpanded ? 'Show less' : 'Show more'}
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-4">
            <Button
                variant="ghost"
                size="icon"
                aria-label="Copy prompt"
                onClick={handleCopy}
            >
                <ClipboardCopy className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors duration-300" />
            </Button>
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
        </div>
      </Card>
  );
}
