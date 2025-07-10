import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { ChatForm } from "@/modules/chats/ui/components/chat-form";
import { ChatSidebar } from "@/modules/chats/ui/components/chat-sidebar";
import { SiteHeader } from "@/modules/chats/ui/components/chat-sidebar-header";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const HomePage = async () => {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  if (!data) {
    redirect(`/auth`);
  }

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
          <div className="flex flex-col h-full gap-y-4 p-5 justify-center items-center">
            <div>
              <Image src={`/logo.svg`} alt="logo" width={100} height={100} />
            </div>
            <div className="text-center flex flex-col gap-y-2">
              <span className="text-4xl font-bold tracking-wide">
                Start using Vanguox
              </span>
              <p className="text-muted-foreground">
                Get smart AI answers with vanguox AI
              </p>
            </div>
          </div>
        </div>
        <div className="px-2 py-2">
          <ChatForm userId={data.user.id} chatId={undefined} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default HomePage;
