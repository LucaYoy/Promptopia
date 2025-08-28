"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import type { Category, Prompt } from "@/lib/types"

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  content: z.string().min(10, "Prompt content must be at least 10 characters long."),
  category: z.string({
    required_error: "Please select a category.",
  }),
})

type NewPromptCardProps = {
  categories: Category[]
  onAddPrompt: (newPrompt: Omit<Prompt, 'id' | 'favorite'>) => void
}

export default function NewPromptCard({ categories, onAddPrompt }: NewPromptCardProps) {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddPrompt(values)
    form.reset()
    toast({
      title: "Success!",
      description: "Your new prompt has been saved.",
    })
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Create a New Prompt</CardTitle>
        <CardDescription>
          Add a new prompt template to your personal library.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <div className="input-focus-gradient">
                          <Input placeholder="e.g., Blog Post Idea Generator" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <div className="select-open-gradient">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt Content</FormLabel>
                  <FormControl>
                    <div className="input-focus-gradient">
                      <Textarea
                        placeholder="Enter your prompt template. Use {placeholders} for dynamic values."
                        className="min-h-[120px] resize-y"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Prompt
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
