"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "lucide-react";
import TextAreaAutoSize from "react-textarea-autosize";

export const ChatForm = () => {
  return (
    <div className="rounded-lg bg-neutral-700 overflow-hidden p-2">
      <TextAreaAutoSize
        minRows={1}
        rows={1}
        maxRows={1}
        className="p-4 resize-none border-none w-full outline-none bg-transparent"
        placeholder="What would you like to build?"
      />
      <div className="h-8 flex justify-between items-center">
        <div />
        <Button size={`icon`}>
          <ArrowUpIcon />
        </Button>
      </div>
    </div>
  );
};
