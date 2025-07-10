import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { MessageSquare, LayoutTemplate, Video, ImageIcon } from "lucide-react";
import { ChevronDownIcon } from "lucide-react";

export const ModeSelector = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="absolute left-1/2">
        <Button variant={`ghost`}>
          Chat <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Select Modes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <MessageSquare className="mr-2 h-4 w-4" />
          Chat
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LayoutTemplate className="mr-2 h-4 w-4" />
          Website Builder
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ImageIcon className="mr-2 h-4 w-4" />
          Image Generator
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Video className="mr-2 h-4 w-4" />
          Video Generator
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
