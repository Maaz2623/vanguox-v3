import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";
import { useThreadMessages } from "@convex-dev/agent/react";
import { api } from "../../../../../convex/_generated/api";
import { MessageLoading } from "./messages-loading";
import { MessagesCard } from "./message-card";
import { MessagesListLoading } from "./messages-list-loading";
import { useFreshAssistantMessageId } from "@/hooks/use-fresh-assistant-message-id";

export const MessagesList = ({ chatId }: { chatId: string }) => {
  const { freshAssistantMessageId } = useFreshAssistantMessageId();

  const bottomRef = useRef<HTMLDivElement>(null);
  const lastMessageIdRef = useRef<string | null>(null);

  const messages = useThreadMessages(
    api.messages.listThreadMessages,
    {
      threadId: chatId,
    },
    {
      initialNumItems: 10,
    }
  );

  const formattedMessages = messages.results.map((message) => ({
    role: message.message?.role,
    status: message.status,
    content: message.message?.content,
    id: message._id,
  }));

  const lastMessage = formattedMessages[formattedMessages.length - 1];
  const isLastMessageUser = lastMessage?.role === "user";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const lastMessage = formattedMessages[formattedMessages.length - 1];

    if (lastMessage && lastMessage.id !== lastMessageIdRef.current) {
      // New message detected
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      lastMessageIdRef.current = lastMessage.id;
    }
  }, [formattedMessages.length, formattedMessages]);

  if (messages.status === "LoadingFirstPage") {
    return <MessagesListLoading />;
  }

  return (
    <ScrollArea className="h-[580px] pb-24 max-h-full px-22 mx-auto overflow-y-auto flex flex-col">
      <div className="flex flex-col pt-10 gap-y-4 ">
        {formattedMessages.map((message) => {
          if (lastMessage.role === "assistant") {
            console.log(freshAssistantMessageId, lastMessage.id);
          }
          return (
            <MessagesCard
              key={message.id}
              role={message.role}
              content={
                typeof message.content === "string"
                  ? message.content
                  : Array.isArray(message.content)
                    ? message.content
                        .filter((part) => part.type === "text")
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //   @ts-ignore
                        .map((part) => part.text)
                        .join(" ")
                    : ""
              }
              isTypewriter={message.id === freshAssistantMessageId}
            />
          );
        })}
        {isLastMessageUser && <MessageLoading />}
        <div ref={bottomRef} className="" />
      </div>
    </ScrollArea>
  );
};
