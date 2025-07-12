"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { ArrowUpIcon, Square } from "lucide-react";
import { useForm } from "react-hook-form";
import TextAreaAutoSize from "react-textarea-autosize";
import { api } from "../../../../../convex/_generated/api";
import { optimisticallySendMessage } from "@convex-dev/agent/react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Form, FormField } from "@/components/ui/form";
import { useState } from "react";

interface Props {
  chatId: string | undefined;
  userId: string;
}

const formSchema = z.object({
  value: z.string().min(1, {
    message: "Prompt is required",
  }),
});

export const ChatForm = ({ chatId, userId }: Props) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  const sendMessage = useMutation(
    api.messages.generateAndRespond
  ).withOptimisticUpdate(
    optimisticallySendMessage(api.messages.listThreadMessages)
  );

  const createThread = useMutation(api.messages.createNewThread);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("This is messages form");
    if (!chatId) {
      try {
        setIsGenerating(true);
        createThread({
          title: "Untitled thread",
          prompt: values.value,
          userId: userId,
        })
          .then((data) => {
            sendMessage({
              prompt: values.value,
              threadId: data,
            })
              .then(({ assistantMessageId }) => {
                console.log(assistantMessageId);
              })
              .finally(() => {
                setIsGenerating(false);
              });

            form.reset();
            router.push(`/chats/${data}`);
          })
          .finally(() => {
            setIsGenerating(false);
          });
      } catch (error) {
        console.error("Failed to send event:", error);
      }
    } else {
      try {
        setIsGenerating(true);
        sendMessage({
          prompt: values.value,
          threadId: chatId,
        })
          .then(({ assistantMessageId }) => {
            console.log(assistantMessageId);
          })
          .finally(() => {
            setIsGenerating(false);
          });

        form.reset();
      } catch (err) {
        console.error("Failed to send event:", err);
      }
    }
  };

  const isDisabled = !form.formState.isValid;

  return (
    <div className="rounded-lg mx-14 bg-neutral-800 border overflow-hidden p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <TextAreaAutoSize
                {...field}
                minRows={1}
                rows={1}
                maxRows={1}
                className="p-4 resize-none text-sm border-none w-full outline-none bg-transparent"
                placeholder="What would you like to build?"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (e.shiftKey) {
                      // Allow newline (default behavior)
                      return;
                    } else {
                      e.preventDefault();
                      if (e.ctrlKey || !e.metaKey) {
                        form.handleSubmit(onSubmit)();
                      }
                    }
                  }
                }}
              />
            )}
          />
          <div className="h-8 flex justify-between items-center">
            <div />
            <Button size={`icon`} type="submit" disabled={isDisabled}>
              {isGenerating ? (
                <Square className="fill fill-white" />
              ) : (
                <ArrowUpIcon />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
