
"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Book, Code2, Gamepad2, Megaphone, PenSquare, Zap, Star, Beaker, Brain, Briefcase, Film, GraduationCap, Lightbulb, Mic, Music, Palette, Plane, School, ShoppingCart, Video, Wallet } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export const availableIcons = [
  { name: 'PenSquare', component: PenSquare },
  { name: 'Megaphone', component: Megaphone },
  { name: 'Code2', component: Code2 },
  { name: 'Zap', component: Zap },
  { name: 'Gamepad2', component: Gamepad2 },
  { name: 'Book', component: Book },
  { name: 'Star', component: Star },
  { name: 'Beaker', component: Beaker },
  { name: 'Brain', component: Brain },
  { name: 'Briefcase', component: Briefcase },
  { name: 'Film', component: Film },
  { name: 'GraduationCap', component: GraduationCap },
  { name: 'Lightbulb', component: Lightbulb },
  { name: 'Mic', component: Mic },
  { name: 'Music', component: Music },
  { name: 'Palette', component: Palette },
  { name: 'Plane', component: Plane },
  { name: 'School', component: School },
  { name: 'ShoppingCart', component: ShoppingCart },
  { name: 'Video', component: Video },
  { name: 'Wallet', component: Wallet },
];


type IconPickerProps = {
  onIconSelect: (iconName: string) => void;
};

export function IconPicker({ onIconSelect }: IconPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const handleSelect = (currentValue: string) => {
    const iconName = currentValue === value ? "" : currentValue;
    setValue(iconName);
    onIconSelect(iconName);
    setOpen(false);
  }

  const SelectedIcon = availableIcons.find((icon) => icon.name.toLowerCase() === value)?.component;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value && SelectedIcon
            ? <div className="flex items-center"><SelectedIcon className="mr-2 h-4 w-4" /></div>
            : "Select icon..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search icon..." />
          <CommandEmpty>No icon found.</CommandEmpty>
          <CommandGroup>
            {availableIcons.map((icon) => {
              const IconComponent = icon.component;
              return (
                <CommandItem
                  key={icon.name}
                  value={icon.name.toLowerCase()}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === icon.name.toLowerCase() ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <IconComponent className="mr-2 h-4 w-4" />
                </CommandItem>
              )
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
