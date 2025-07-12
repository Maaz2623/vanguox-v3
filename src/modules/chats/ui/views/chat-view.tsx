"use client";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ChatSidebar } from "../components/chat-sidebar";
import { SiteHeader } from "../components/chat-sidebar-header";
import { ChatForm } from "../components/chat-form";
import { MessagesList } from "@/modules/messages/ui/components/messages-list";

interface Props {
  chatId: string;
  userId: string;
}

export const ChatView = ({ chatId, userId }: Props) => {
  return (
    <SidebarProvider
      className="bg-neutral-900! p-0! border"
      // style={
      //   {
      //     "--sidebar-width": "calc(var(--spacing) * 72)",
      //     "--header-height": "calc(var(--spacing) * 12)",
      //   } as React.CSSProperties
      // }
    >
      <ChatSidebar variant="inset" className="border-r border-neutral-800" />
      <SidebarInset className="flex  flex-col rounded-none! relative w-full! shadow-none!">
        <SiteHeader />
        <div className="flex-1">
          <MessagesList chatId={chatId} />
        </div>
        <div className="px-10 pb-2 absolute bg-transparent bottom-0 left-0 w-full">
          <ChatForm chatId={chatId} userId={userId} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
