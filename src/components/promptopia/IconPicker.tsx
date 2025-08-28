
"use client"

import * as React from "react"
import { Check, ChevronsUpDown, PenSquare, Code2, Megaphone, Zap, Lightbulb, Book, Brain, Briefcase, Palette, Gamepad2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export const availableIcons = [
  { name: 'PenSquare', component: PenSquare },
  { name: 'Code2', component: Code2 },
  { name: 'Megaphone', component: Megaphone },
  { name: 'Zap', component: Zap },
  { name: 'Lightbulb', component: Lightbulb },
  { name: 'Book', component: Book },
  { name: 'Brain', component: Brain },
  { name: 'Briefcase', component: Briefcase },
  { name: 'Palette', component: Palette },
  { name: 'Gamepad2', component: Gamepad2 },
];


type IconPickerProps = {
  onIconSelect: (iconName: string) => void;
};

export function IconPicker({ onIconSelect }: IconPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const handleSelect = (currentValue: string) => {
    const iconName = currentValue === value ? "" : currentValue;
    const iconData = availableIcons.find(icon => icon.name.toLowerCase() === iconName);
    setValue(iconName);
    onIconSelect(iconData ? iconData.name : '');
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
          className="w-full justify-between bg-card"
        >
          {value && SelectedIcon
            ? <div className="flex items-center"><SelectedIcon className="mr-2 h-4 w-4" /></div>
            : "Select icon..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
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
