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
      className="bg-sidebar"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <ChatSidebar variant="inset" />
      <SidebarInset className="flex flex-col  ">
        <SiteHeader />
        <div className="flex-1 p-2">
          <MessagesList chatId={chatId} />
        </div>
        <div className="px-2 py-2">
          <ChatForm chatId={chatId} userId={userId} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
